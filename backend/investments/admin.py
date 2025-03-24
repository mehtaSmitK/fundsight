from django.contrib import admin

from .models import Investment, PerformanceHistory, SectorAllocation, Fund, Stock, FundStockHolding

@admin.register(Investment)
class InvestmentAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'current_value', 'initial_value', 'created_at', 'updated_at')
    search_fields = ('user_name',)

@admin.register(PerformanceHistory)
class PerformanceHistoryAdmin(admin.ModelAdmin):
    list_display = ('investment', 'date', 'value')
    list_filter = ('date',)

@admin.register(SectorAllocation)
class SectorAllocationAdmin(admin.ModelAdmin):
    list_display = ('investment', 'name', 'amount', 'percentage')

@admin.register(Fund)
class FundAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')
    search_fields = ('name',)

@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(FundStockHolding)
class FundStockHoldingAdmin(admin.ModelAdmin):
    list_display = ('fund', 'stock', 'weight')
    list_filter = ('fund', 'stock')