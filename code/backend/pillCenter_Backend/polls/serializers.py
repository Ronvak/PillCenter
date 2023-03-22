from rest_framework import serializers
from polls.models import *
from rest_framework import  serializers
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone','id_user'] 

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(**profile_data, user=user)
        return user



class RegisterSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = User 
        fields = ('username','password','first_name','last_name','email','profile')
        extra_kwargs = {
            'password':{'write_only': True},
        }
    def create(self, validated_data ):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(validated_data['username'],     password = validated_data['password']  ,    first_name=validated_data['first_name']  ,    last_name=validated_data['last_name'] ,    email=validated_data['email']  )
        Profile.objects.create(**profile_data, user=user)
        return user