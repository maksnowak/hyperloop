import React from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";

const CapsulePage = async ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <Sidebar />
            <h1>Capsule no. {params.id}</h1>

            <a href={`/capsules/${params.id}/repairs`}>
                <button className="hyperloop-item w-1/5">Goto repairs</button>
            </a>

            <a href={`/capsules/${params.id}/ride_history`}>
                <button className="hyperloop-item w-1/5">Goto ride history</button>
            </a>
        </div >
    );
};

export default CapsulePage;
