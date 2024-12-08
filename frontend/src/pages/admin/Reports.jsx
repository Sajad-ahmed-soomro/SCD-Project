import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Reports = () => {
    const [eventData, setEventData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/report/reports')
            .then((response) => {
                setEventData(response.data.successfulEvents);
                setCategoryData(response.data.eventCategories);
            })
            .catch((error) => console.error('Error fetching report data:', error));
    }, []);

    const successfulEventsGraph = {
        labels: eventData.map(event => event.title),
        datasets: [
            {
                label: 'Tickets Sold',
                data: eventData.map(event => event.ticketsSold),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const categoryGraph = {
        labels: categoryData.map(category => category.name),
        datasets: [
            {
                label: 'Events',
                data: categoryData.map(category => category.count),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: { font: { size: 12 } },
            },
        },
        scales: {
            x: { ticks: { font: { size: 10 } } },
            y: { ticks: { font: { size: 10 } } },
        },
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>

            <div className="mb-8" style={{ height: '300px' }}>
                <h3 className="text-xl mb-4">Successful Events (Tickets Sold)</h3>
                <Bar data={successfulEventsGraph} options={chartOptions} />
            </div>

            <div style={{ height: '300px' }}>
                <h3 className="text-xl mb-4">Event Categories Popularity</h3>
                <Pie data={categoryGraph} options={chartOptions} />
            </div>
        </div>
    );
};

export default Reports;
