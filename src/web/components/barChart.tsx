"use client";
import React from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";

type ChartProps = {
    url: string;
    labels: string[];
    label_names?: string[];
}

const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const BarChartComponent = ({url, labels, label_names}: ChartProps) => {
    const [apiData, setApiData] = React.useState<any>();
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setApiData(data.data);
        };
        fetchData();
    }, [url]);

    const data = {
        labels: labels,
        datasets: labels.map((label) => ({
            label: label_names ? label_names[labels.indexOf(label)] : label,
            data: apiData?.map((item: any) => item[label]),
            fill: false,
            backgroundColor: randomColor(),
            borderColor: randomColor(),
        })),
    };

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const chartRef = React.useRef<Chart | null>(null);

    React.useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
                chartRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                });
            }
        }
    }, [apiData]);

    return <canvas ref={canvasRef} />;
};

export default BarChartComponent;

export const dynamic = 'force-dynamic';