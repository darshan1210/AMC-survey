import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutChart = () => {
    // Data for the donut chart
    const chartData = [
        { name: 'Chrome', y: 61.41 },
        { name: 'Firefox', y: 11.84 },
        { name: 'IE', y: 10.85 },
        { name: 'Safari', y: 4.67 },
        { name: 'Edge', y: 4.18 },
        { name: 'Others', y: 7.05 }
    ];

    // Configuration options for the donut chart
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Browser Market Share'
        },
        plotOptions: {
            pie: {
                innerSize: '60%', // This makes it a donut chart
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: chartData
        }]
    };

    useEffect(() => {
        Highcharts.chart('donut-chart', options);
        const elementToRemove = document.querySelector('.highcharts-credits');
        elementToRemove.remove();
    }, []);

    return (
        <div id="donut-chart" style={{ zIndex: '-10' }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DonutChart;
