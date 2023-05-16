from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from rest_framework.decorators import api_view,  permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from polls.serializers import UserSerializer , RegisterSerializer ,OrderSerializer , OrdersSerializer , Video_ChannelsSerializers
from rest_framework import generics
from polls.models import Medicine, Inventory, Products, Vending_machines, Orders , Video_Channels
from django.contrib.auth import get_user_model
from agora_token_builder import RtcTokenBuilder
import time

User = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        credentials = {
            'username': '',
            'password': attrs.get("password")
        }

        user_obj = User.objects.filter(email=attrs.get("username")).first(
        ) or User.objects.filter(username=attrs.get("username")).first()
        if user_obj:
            credentials['username'] = user_obj.username
        data = super().validate(credentials)
        data['user'] = {
            'id': self.user.id,
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "email": self.user.email,
            "phone": str(self.user.profile.phone),
            "groups": self.user.groups.values_list('name', flat=True)}

        return data


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user,    context=self.get_serializer_context()).data,
            "message": "User Created Successfully.  Now perform Login to get your token",
        })


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def get_routes(request):
    """returns a view containing all the possible routes"""
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def userCreate(request):

    userSerializer = UserSerializer(data=request.data)
    if userSerializer.is_valid():
        user = userSerializer.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def completeOrder(request):
    machine = request.data['machine_id']
    medicine = request.data['medicine_id']
    product = Products.objects.all().values().filter(medicine_id = medicine)  
    inventory = Inventory.objects.all().values()
    product = inventory.filter(machine_id = machine , product_id__in = product.values_list('id'))[0]
    request.data['product_id'] = product['product_id_id']
    orderSerializer = OrderSerializer(data = request.data)
    orderSerializer.is_valid(raise_exception=True)

    order = orderSerializer.save()
    data = order.id
    return Response(data=data)


@api_view(['GET'])
def getMedicines(request):
    medicines = Medicine.objects.all().values()
    prescription_required = request.GET.get('q',None)
    print(prescription_required)
    if prescription_required is not None:
        medicines = medicines.filter(is_prescription = prescription_required)

    return Response(medicines)



@api_view(['GET'])
def getOrder(request):
    orders = Orders.objects.all()
    order = request.GET.get('q',None)
  
    if order is not None:
        orders = orders.filter(id = order)
    serializer = OrdersSerializer(orders, many=True)
    inventory  = Inventory.objects.all().values().filter(product_id = orders.first().product_id)[0]
    
    machine = Vending_machines.objects.all().values().filter(id = inventory['machine_id_id'])[0]
    serializer.data[0]['machine'] =  machine
    return Response(serializer.data[0])


@api_view(['GET'])
def medicineInStock(request):
    machines = Vending_machines.objects.all().values()
    inventory = Inventory.objects.all().values()
    products = Products.objects.all().values()
    medicine = request.GET.get('q', None)
    if medicine is not None:
        products = products.filter(medicine_id=medicine)
        inventory = inventory.filter(product_id__in=products.values_list('id'))
        machines = machines.filter(id__in=inventory.values_list('machine_id'))
    return Response(machines)


@api_view(['POST'])
def cancelOrder(request):
    orders = Orders.objects.all().values()
    order = request.data['order_id']
    if order is not None:
        orders = Orders.objects.get(id=order)
        orders.order_status_id = 3
        orders.save()
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getMyOrders(request):
    user = request.GET.get('q', None)
    orders = Orders.objects.all().values()
    if user is not None:
        orders = orders.filter(user_id = user , order_status = 1)
    return Response(orders)

@api_view(['GET'])
def getToken(request):
    channel  = Video_Channels.objects.all().values().last()
    # serializer = Video_ChannelsSerializers(data = channel)
    # serializer.is_valid(raise_exception = True)
    return Response(channel)


@api_view(['POST'])
def tokenGenerator(request):
    
    appId = "d3754641865b422f90f234d5766a4d8a"
    appCertificate = "086e46eb10be41a5b00982c16279b6e6"
    channelName = "main"
    uid = 0
    role = 1
    privilegeExpiredTs =  int(time.time()) + 3600
    
    token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    request.data['token'] = token
    serializer = Video_ChannelsSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)
