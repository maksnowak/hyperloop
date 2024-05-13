import React from "react";
import Chart, { ChartTypeRegistry } from "chart.js/auto";

type ChartProps = {
    type: keyof ChartTypeRegistry;
    data: any;
}

const ChartComponent = ({type, data}: ChartProps) => {
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