from django.core.management.base import BaseCommand
from investments.models import Investment, PerformanceHistory, SectorAllocation, Fund, Stock, FundStockHolding
from datetime import datetime, timedelta

class Command(BaseCommand):
    help = 'Populate the database with mock data'

    def handle(self, *args, **kwargs):
        # Clear existing data to avoid duplicates
        Investment.objects.all().delete()
        Fund.objects.all().delete()
        Stock.objects.all().delete()

        # Create Investments for multiple users
        users = [
            {
                "user_name": "Yashna",
                "current_value": 575000,
                "initial_value": 500000,
                "best_performing_scheme": "ICICI Prudential Midcap Fund",
                "best_performance_change": "+19%",
                "worst_performing_scheme": "Axis Flexi Cap Fund",
                "worst_performance_change": "-5%"
            },
            {
                "user_name": "Amit",
                "current_value": 820000,
                "initial_value": 750000,
                "best_performing_scheme": "SBI Bluechip Fund",
                "best_performance_change": "+22%",
                "worst_performing_scheme": "HDFC Small Cap Fund",
                "worst_performance_change": "-3%"
            },
            {
                "user_name": "Priya",
                "current_value": 430000,
                "initial_value": 400000,
                "best_performing_scheme": "Kotak Emerging Equity Fund",
                "best_performance_change": "+15%",
                "worst_performing_scheme": "Franklin India Flexi Cap Fund",
                "worst_performance_change": "-7%"
            },
        ]

        investments = []
        for user in users:
            investment = Investment.objects.create(
                user_name=user["user_name"],
                current_value=user["current_value"],
                initial_value=user["initial_value"],
                best_performing_scheme=user["best_performing_scheme"],
                best_performance_change=user["best_performance_change"],
                worst_performing_scheme=user["worst_performing_scheme"],
                worst_performance_change=user["worst_performance_change"]
            )
            investments.append(investment)

        # Performance History for each investment (more data points over 6 months)
        for investment in investments:
            start_date = datetime(2024, 9, 1)  # Start from September 2024
            performance_data = []
            current_value = float(investment.initial_value)
            for i in range(180):  # 6 months of daily data
                date = start_date + timedelta(days=i)
                # Simulate some realistic fluctuations
                fluctuation = (i % 10 - 5) * 1000 + (i * 50)  # Gradual growth with noise
                value = current_value + fluctuation
                performance_data.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "value": value
                })
            for entry in performance_data:
                PerformanceHistory.objects.create(
                    investment=investment,
                    date=datetime.strptime(entry["date"], "%Y-%m-%d").date(),
                    value=entry["value"]
                )

        # Sector Allocations for each investment
        sector_data_template = [
            {"name": "Financial", "amount": 0.34, "bgcolor": "#9bb0c7"},
            {"name": "Healthcare", "amount": 0.145, "bgcolor": "#adb8cf"},
            {"name": "Technology", "amount": 0.19, "bgcolor": "#c6c4d8"},
            {"name": "Consumer Goods", "amount": 0.095, "bgcolor": "#dad3e1"},
            {"name": "Energy", "amount": 0.095, "bgcolor": "#ebe2ea"},
            {"name": "Other Sectors", "amount": 0.095, "bgcolor": "#f8f3f5"},
            {"name": "Automobile", "amount": 0.05, "bgcolor": "#d1e0e0"},
            {"name": "Real Estate", "amount": 0.03, "bgcolor": "#e6d5e6"},
            {"name": "Telecom", "amount": 0.02, "bgcolor": "#f0e4d7"},
        ]

        for investment in investments:
            total_value = float(investment.current_value)
            for sector in sector_data_template:
                amount = total_value * sector["amount"]
                # Format percentage to ensure it's not too long (max 10 chars)
                percentage = f"{sector['amount'] * 100:.1f}%"
                SectorAllocation.objects.create(
                    investment=investment,
                    name=sector["name"],
                    amount=amount,
                    percentage=percentage,  # Ensure this is max 10 chars
                    bgcolor=sector["bgcolor"]
                )

        # Funds and Stocks (expanded dataset)
        funds_data = [
            {"name": "Nippon Large Cap Fund - Direct Plan", "color": "#f8d07b"},
            {"name": "Motilal Large Cap Fund - Direct Plan", "color": "#0070df"},
            {"name": "HDFC Large Cap Fund", "color": "#c56a09"},
            {"name": "ICICI Prudential Midcap Fund", "color": "#9e9d24"},
            {"name": "SBI Bluechip Fund", "color": "#ff6f61"},
            {"name": "Kotak Emerging Equity Fund", "color": "#4caf50"},
            {"name": "Axis Midcap Fund", "color": "#ab47bc"},
            {"name": "Franklin India Flexi Cap Fund", "color": "#ffca28"},
        ]

        stocks_data = [
            "HDFC LTD.", "RIL", "INFY", "TCS", "HDFCBANK", "BHARTIARTL",
            "ICICIBANK", "SBIN", "LT", "WIPRO", "TATAMOTORS", "ASIANPAINT",
            "MARUTI", "SUNPHARMA", "DRREDDY", "HINDUNILVR", "ITC", "ONGC"
        ]

        funds = [Fund.objects.create(name=f["name"], color=f["color"]) for f in funds_data]
        stocks = [Stock.objects.create(name=s) for s in stocks_data]

        # Fund-Stock Holdings (expanded connections)
        connections = [
            # Nippon Large Cap Fund
            (funds[0], stocks[0], 15),  # HDFC LTD.
            (funds[0], stocks[1], 12),  # RIL
            (funds[0], stocks[2], 8),   # INFY
            (funds[0], stocks[4], 6),   # HDFCBANK
            (funds[0], stocks[6], 10),  # ICICIBANK
            (funds[0], stocks[7], 5),   # SBIN
            # Motilal Large Cap Fund
            (funds[1], stocks[0], 14),
            (funds[1], stocks[1], 9),
            (funds[1], stocks[3], 11),  # TCS
            (funds[1], stocks[5], 7),   # BHARTIARTL
            (funds[1], stocks[8], 8),   # LT
            (funds[1], stocks[9], 6),   # WIPRO
            # HDFC Large Cap Fund
            (funds[2], stocks[1], 13),
            (funds[2], stocks[2], 10),
            (funds[2], stocks[4], 9),
            (funds[2], stocks[6], 7),
            (funds[2], stocks[10], 5),  # TATAMOTORS
            # ICICI Prudential Midcap Fund
            (funds[3], stocks[3], 8),
            (funds[3], stocks[5], 12),
            (funds[3], stocks[11], 9),  # ASIANPAINT
            (funds[3], stocks[12], 6),  # MARUTI
            # SBI Bluechip Fund
            (funds[4], stocks[0], 10),
            (funds[4], stocks[1], 8),
            (funds[4], stocks[7], 12),
            (funds[4], stocks[13], 7),  # SUNPHARMA
            (funds[4], stocks[14], 5),  # DRREDDY
            # Kotak Emerging Equity Fund
            (funds[5], stocks[10], 11),
            (funds[5], stocks[11], 9),
            (funds[5], stocks[12], 8),
            (funds[5], stocks[15], 6),  # HINDUNILVR
            # Axis Midcap Fund
            (funds[6], stocks[2], 7),
            (funds[6], stocks[3], 9),
            (funds[6], stocks[9], 10),
            (funds[6], stocks[16], 5),  # ITC
            # Franklin India Flexi Cap Fund
            (funds[7], stocks[4], 8),
            (funds[7], stocks[5], 6),
            (funds[7], stocks[8], 9),
            (funds[7], stocks[17], 4),  # ONGC
        ]

        for fund, stock, weight in connections:
            FundStockHolding.objects.create(fund=fund, stock=stock, weight=weight)

        self.stdout.write(self.style.SUCCESS(f"Successfully populated the database with mock data for {len(investments)} users"))
