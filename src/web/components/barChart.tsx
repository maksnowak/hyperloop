"use client";
import React from "react";
import Chart from "chart.js/auto";

type ChartProps = {
    url?: string;
    labels: string[];
    label_names?: string[];
    dataset?: number[];
}

const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

const BarChartComponent = ({ url, labels, label_names, dataset }: ChartProps) => {
    const [apiData, setApiData] = React.useState<any>();
    const [datasetData, setDatasetData] = React.useState<number[]>([]);
    React.useEffect(() => {
        if (url !== undefined) {
            const fetchData = async () => {
                const response = await fetch(url!);
                const data = await response.json();
                setApiData(data.data);
            };
            fetchData();
        } else if (dataset !== undefined) {
            setApiData(null);
            setDatasetData(dataset);
        }
        console.log(labels, apiData, datasetData);
    }, [url, dataset]);

    const data = {
        labels: [""],
        datasets: labels.map((label, i) => ({
            label: label_names ? label_names[labels.indexOf(label)] : label,
            data: apiData !== null ? apiData?.map((item: any) => item[label]) : [datasetData[i]],
            fill: false,
            backgroundColor: randomColor(),
            borderColor: randomColor(),
        })),
    };
    console.log(data);

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
    }, [apiData, datasetData]);

    return <canvas ref={canvasRef} />;
};

export default BarChartComponent;

export const dynamic = 'force-dynamic';
