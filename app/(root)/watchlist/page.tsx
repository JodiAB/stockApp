'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Stock {
    name: string;
    symbol: string;
    price: number;
    change: number;
    marketCap: string;
    peRatio: number;
}

interface Alert {
    name: string;
    symbol: string;
    condition: string;
}

interface NewsItem {
    title: string;
    link: string;
}

export default function WatchlistPage() {
    const [stocks, setStocks] = useState<Stock[]>([
        { name: 'Apple Inc', symbol: 'AAPL', price: 240.6, change: 1.2, marketCap: '3.6T', peRatio: 28.4 },
        { name: 'Microsoft Corp', symbol: 'MSFT', price: 320.4, change: -0.8, marketCap: '2.9T', peRatio: 35.1 },
        { name: 'Alphabet Inc', symbol: 'GOOGL', price: 136.2, change: 0.6, marketCap: '1.8T', peRatio: 27.3 },
        { name: 'Amazon.com Inc', symbol: 'AMZN', price: 178.1, change: 2.1, marketCap: '1.9T', peRatio: 60.2 },
    ]);

    const [alerts, setAlerts] = useState<Alert[]>([
        { name: 'Apple Inc', symbol: 'AAPL', condition: 'Price > $240.60' },
    ]);

    const [news] = useState<NewsItem[]>([
        { title: 'Apple hits record high on strong earnings', link: '#' },
        { title: 'Microsoft announces new AI tools', link: '#' },
        { title: 'Alphabet expands cloud business', link: '#' },
        { title: 'Amazon reports strong holiday sales', link: '#' },
    ]);

    const [newStock, setNewStock] = useState('');

    const handleAddStock = () => {
        if (!newStock.trim()) return;
        // TODO: Fetch real stock data from API
        // Example: const stockData = await searchStocks(newStock.trim());
        // if (stockData[0]) { setStocks([...stocks, stockData[0]]); }
        setNewStock('');
    };

    const handleRemoveStock = (symbol: string) => {
        setStocks(stocks.filter((s) => s.symbol !== symbol));
    };

    const handleCreateAlert = (stock: Stock) => {
        setAlerts([
            ...alerts,
            {
                name: stock.name,
                symbol: stock.symbol,
                condition: `Price > $${stock.price.toFixed(2)}`,
            },
        ]);
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white px-8 py-12 flex flex-col lg:flex-row gap-10">
            {/* LEFT: Watchlist Table & News */}
            <div className="flex-1 flex flex-col gap-12">
                <div>
                    <h1 className="text-4xl font-bold mb-6">Watchlist</h1>
                    <div className="flex gap-2 mb-6">
                        <Input
                            placeholder="Enter stock name or symbol"
                            value={newStock}
                            onChange={(e) => setNewStock(e.target.value)}
                            className="bg-[#1c1c1c] border-none text-white"
                        />
                        <Button onClick={handleAddStock} className="bg-white text-black font-semibold">
                            Add
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                            <tr className="bg-[#1c1c1c] text-gray-300">
                                <th className="py-3 px-4 font-semibold">Company</th>
                                <th className="py-3 px-4 font-semibold">Symbol</th>
                                <th className="py-3 px-4 font-semibold">Price</th>
                                <th className="py-3 px-4 font-semibold">Change</th>
                                <th className="py-3 px-4 font-semibold">Market Cap</th>
                                <th className="py-3 px-4 font-semibold">P/E</th>
                                <th className="py-3 px-4 font-semibold">Alert</th>
                            </tr>
                            </thead>
                            <tbody>
                            {stocks.map((stock) => (
                                <tr key={stock.symbol} className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a]">
                                    <td className="py-3 px-4">{stock.name}</td>
                                    <td className="py-3 px-4">{stock.symbol}</td>
                                    <td className="py-3 px-4">${stock.price.toFixed(2)}</td>
                                    <td
                                        className={`py-3 px-4 ${
                                            stock.change >= 0 ? 'text-green-500' : 'text-red-500'
                                        }`}
                                    >
                                        {stock.change.toFixed(2)}%
                                    </td>
                                    <td className="py-3 px-4">{stock.marketCap}</td>
                                    <td className="py-3 px-4">{stock.peRatio}</td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <Button
                                            onClick={() => handleCreateAlert(stock)}
                                            className="bg-white text-black text-sm font-semibold"
                                        >
                                            Set Alert
                                        </Button>
                                        <Button
                                            onClick={() => handleRemoveStock(stock.symbol)}
                                            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white text-sm font-semibold"
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* News Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Latest News</h2>
                    <div className="space-y-3">
                        {news.map((item, i) => (
                            <Card key={i} className="bg-[#1c1c1c] border-none">
                                <CardContent className="p-4">
                                    <a href={item.link} className="text-white hover:underline">
                                        {item.title}
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: Alerts */}
            <div className="w-full lg:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Alerts</h2>
                <div className="space-y-4 mb-6">
                    {alerts.map((alert, index) => (
                        <Card key={index} className="bg-[#1c1c1c] border-none">
                            <CardContent className="p-4">
                                <p className="font-semibold text-lg">{alert.name}</p>
                                <p className="text-gray-400 text-sm">{alert.symbol}</p>
                                <p className="text-gray-300 text-sm mt-2">{alert.condition}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
