import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CanvasJSReact from '@canvasjs/react-charts';
import useMediaQuery from 'shared/hooks/useMediaQuery';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DonutChart = ({ title, subtitle, dataPoints }) => {

    const width = useMediaQuery('(max-width: 767px)')
    const [options, setOptions] = useState({
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
            // yValueFormatString: "#,###'%'",
            yValueFormatString: "#,###'%'",
            dataPoints: dataPoints
        }]
    });

    useEffect(() => {
        const elementToRemove = document.querySelector('.canvasjs-chart-credit');
        elementToRemove?.remove();
    }, [width]);

    useEffect(() => {
        // Update options when dataPoints change
        setOptions(prevOptions => ({
            ...prevOptions,
            subtitles: [{
                ...prevOptions.subtitles[0],
                text: subtitle
            }],
            data: [{
                ...prevOptions.data[0],
                dataPoints: dataPoints
            }]
        }));
    }, [dataPoints]);
    console.log('dataPoints', dataPoints)

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
