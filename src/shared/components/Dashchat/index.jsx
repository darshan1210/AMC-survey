import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from '@canvasjs/react-charts';
import useMediaQuery from 'shared/hooks/useMediaQuery';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = ({ title, subtitle, dataPoints }) => {

    const width = useMediaQuery('(max-width: 800px)')
    const [options] = useState({
        animationEnabled: true,
        title: {
            text: title
        },
        subtitles: [{
            text: subtitle,
            verticalAlign: "center",
            fontSize: 20,
            dockInsidePlotArea: true
        }],
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelPlacement: "inside",
            yValueFormatString: "#,###'%'",
            dataPoints: dataPoints
        }]
    });
    useEffect(() => {
        const elementToRemove = document.querySelector('.canvasjs-chart-credit');
        elementToRemove?.remove();
    }, [width]);
    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );
};

DonutChart.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    dataPoints: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            y: PropTypes.number.isRequired
        })
    ).isRequired
};

export default DonutChart;