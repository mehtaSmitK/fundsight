from django.db import models

class Investment(models.Model):
    user_name = models.CharField(max_length=100)  # e.g., "Yashna"
    current_value = models.DecimalField(max_digits=12, decimal_places=2)  # e.g., 575000
    initial_value = models.DecimalField(max_digits=12, decimal_places=2)  # e.g., 500000
    best_performing_scheme = models.CharField(max_length=200, null=True)  # e.g., "ICICI Prudential Midcap Fund"
    best_performance_change = models.CharField(max_length=10, null=True)  # e.g., "+19%"
    worst_performing_scheme = models.CharField(max_length=200, null=True)  # e.g., "Axis Flexi Cap Fund"
    worst_performance_change = models.CharField(max_length=10, null=True)  # e.g., "-5%"
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Investment for {self.user_name}"

class PerformanceHistory(models.Model):
    investment = models.ForeignKey(Investment, on_delete=models.CASCADE, related_name="performance_history")
    date = models.DateField()  # e.g., "7 Feb"
    value = models.DecimalField(max_digits=12, decimal_places=2)  # e.g., 500000

    def __str__(self):
        return f"Performance on {self.date}: ₹{self.value}"

class SectorAllocation(models.Model):
    investment = models.ForeignKey(Investment, on_delete=models.CASCADE, related_name="sector_allocations")
    name = models.CharField(max_length=100)  # e.g., "Financial"
    amount = models.DecimalField(max_digits=12, decimal_places=2)  # e.g., 195000
    percentage = models.CharField(max_length=20)  # e.g., "34%"
    bgcolor = models.CharField(max_length=7)  # e.g., "#9bb0c7"

    def __str__(self):
        return f"{self.name} Allocation: {self.percentage}"

class Stock(models.Model):
    name = models.CharField(max_length=100, unique=True)  # e.g., "HDFC LTD."

    def __str__(self):
        return self.name

class Fund(models.Model):
    name = models.CharField(max_length=200)  # e.g., "Nippon Large Cap Fund - Direct Plan"
    color = models.CharField(max_length=7)  # e.g., "#f8d07b"

    def __str__(self):
        return self.name

class FundStockHolding(models.Model):
    fund = models.ForeignKey(Fund, on_delete=models.CASCADE, related_name="holdings")
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, related_name="funds")
    weight = models.IntegerField()  # e.g., 15

    class Meta:
        unique_together = ('fund', 'stock')

    def __str__(self):
        return f"{self.fund.name} holds {self.stock.name} (Weight: {self.weight})"
