from django.urls import path
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .views import RegisterApi
urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', views.get_profile),
    path('register/', RegisterApi.as_view()),
    path('medicines/', views.getMedicines),
    path('medicineinstock/', views.medicineInStock),
    path('completeorder/', views.completeOrder),
    path('getorder/', views.getOrder),
    path('cancelorder/', views.cancelOrder),
    path('getmyorders/', views.getMyOrders),
    path('generatetoken/', views.tokenGenerator),
    path('joinchannel/', views.joinChannel),
    path('endsession/', views.endSession),
    path('getchannel/' , views.getChannel),
    path('getmedicine/', views.get_medicine),
] + static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)
