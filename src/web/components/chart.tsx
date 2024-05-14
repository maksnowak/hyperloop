"use client";
import React from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";

type ChartProps = {
    type: keyof ChartTypeRegistry;
    url: string;
    labels_key: string;
    data_key: string;
    label_name?: string;
}

const ChartComponent = ({type, url, labels_key, data_key, label_name}: ChartProps) => {
    // warning: this is the only way to make charts work with api data
    const [apiData, setApiData] = React.useState<any>();
    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            // if there is date label, convert it to locale string
            try {
                data.data.forEach((item: any) => {
                    item[labels_key] = new Date(item[labels_key]).toLocaleString("pl-PL");
                });
            } catch (e) {
                // do nothing
            }
            setApiData(data.data);
        };
        fetchData();
    }, [url]);

    const data = {
        //FIXME: sort data by date
        labels: apiData?.map((item: any) => item[labels_key]),
        datasets: [
            {
                label: label_name! || "Data",
                data: apiData?.map((item: any) => item[data_key]),
                fill: false,
                backgroundColor: "rgb(75, 192, 192)",
                borderColor: "rgba(75, 192, 192, 0.2)",
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
                    type: type,
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
    }, [type, data]);

    return (
        <canvas ref={canvasRef} />
    );
};

export default ChartComponent;