import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DonutChart = () => {
    // Data for the donut chart
    const chartData = [
        { name: 'In Progress Block', y: 10 },
        { name: 'Remaining Block', y: 10 },
        { name: 'Completed Block', y: 50 },
        { name: 'Total Block', y: 30 },
    ];

    // Configuration options for the donut chart
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: 'My Block Progress'
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
            name: ' ',
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
        <div id="donut-chart">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default DonutChart;
