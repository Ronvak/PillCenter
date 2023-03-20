from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
def get_routes(request):
   routes = [
       '/api/token',
       '/api/token/refresh'
   ]
   return JsonResponse(routes, safe=False)


