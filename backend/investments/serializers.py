from rest_framework import serializers
from .models import Investment, PerformanceHistory, SectorAllocation, Fund, Stock, FundStockHolding
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

class PerformanceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PerformanceHistory
        fields = ['date', 'value']

class SectorAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectorAllocation
        fields = ['name', 'amount', 'percentage', 'bgcolor']

class FundStockHoldingSerializer(serializers.ModelSerializer):
    stock = serializers.StringRelatedField()

    class Meta:
        model = FundStockHolding
        fields = ['stock', 'weight']

class FundSerializer(serializers.ModelSerializer):
    holdings = FundStockHoldingSerializer(many=True)

    class Meta:
        model = Fund
        fields = ['name', 'color', 'holdings']

class InvestmentSerializer(serializers.ModelSerializer):
    performance_history = PerformanceHistorySerializer(many=True)
    sector_allocations = SectorAllocationSerializer(many=True)

    class Meta:
        model = Investment
        fields = [
            'user_name', 'current_value', 'initial_value',
            'best_performing_scheme', 'best_performance_change',
            'worst_performing_scheme', 'worst_performance_change',
            'performance_history', 'sector_allocations'
        ]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, trim_whitespace=False)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # Try to find user by email first
            try:
                user = User.objects.get(email=email)
                # Use username for authentication
                user = authenticate(
                    request=self.context.get('request'),
                    username=user.username,
                    password=password
                )
            except User.DoesNotExist:
                user = None
                
            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs
