from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from .serializers import LoginSerializer, UserSerializer
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authtoken.models import Token
import logging

logger = logging.getLogger(__name__)

class LoginView(APIView):
    permission_classes = [AllowAny]  # Allow any user to access login endpoint
    
    def post(self, request):
        logger.debug(f"Login attempt with data: {request.data}")
        serializer = LoginSerializer(data=request.data, context={'request': request})
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            logger.debug(f"Login successful for user: {user.username}, token: {token.key}")
            return Response({
                'user': UserSerializer(user).data,
                'token': token.key
            })
        logger.error(f"Login failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    
    def post(self, request):
        if request.user.is_authenticated:
            if request.auth and isinstance(request.auth, Token):
                request.auth.delete()
            logout(request)
        return Response({"detail": "Successfully logged out."})

class UserView(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class CSRFTokenView(APIView):
    def get(self, request):
        return Response({"csrfToken": get_token(request)})

class TokenView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        token, created = Token.objects.get_or_create(user=request.user)
        return Response({"token": token.key})
