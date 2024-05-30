"use client";
import React from "react";
import Chart from "chart.js/auto";

type ChartProps = {
    url: string;
    labels_key: string;
    data_key: string;
    label_name?: string;
    granularity: number;
}

const LineChartComponent = ({ url, labels_key, data_key, label_name, granularity }: ChartProps) => {
    // warning: this is the only way to make charts work with api data
    const [apiData, setApiData] = React.useState<any>();
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            // if there is date label, convert it to locale string
            try {
                data.data.forEach((item: any) => {
                    item[labels_key] = new Date(item[labels_key]).toLocaleString("pl-PL", { timeZone: "UTC" });
                });
            } catch (e) {
                // do nothing
            }
            setApiData(data.data);
        };
        fetchData();
    }, [url]);

    const data = {
        labels: apiData?.filter((_: any, i: number) => i % granularity === 0).map((item: any) => item[labels_key]),
        datasets: [
            {
                label: label_name! || "Data",
                data: apiData?.filter((_: any, i: number) => i % granularity === 0).map((item: any) => item[data_key]),
                fill: false,
                backgroundColor: "rgb(0, 0, 0)",
                borderColor: "rgba(0, 0, 0, 0.2)",
            },
        ],
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
                    type: 'line',
                    data: data,
                });
            }
        }

        // Cleanup function
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <canvas ref={canvasRef} />
    );
};

export default LineChartComponent;

export const dynamic = 'force-dynamic';
