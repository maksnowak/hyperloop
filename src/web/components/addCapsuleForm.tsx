"use client";
import React from "react";
import 'reactjs-popup/dist/index.css';
import prisma from "@/app/client";

const AddCapsuleForm = () => {
    const [model, setModel] = React.useState("");
    const [producer, setProducer] = React.useState("");
    const [type, setType] = React.useState("Producer");
    const [depot, setDepot] = React.useState(1);
    // model, producent, typ, id depotu
    const getDepots = async () => {
    const response = await (await fetch (`/api/depots/findMany`)).json();
    return response.depots;
    }
    const depots = getDepots();

    const handleSubmit = () => {
        console.log("Adding capsule");
    }
    return (
        <div>
            <h3>Add new capsule</h3>
            <form id={"add-capsule-form"}>
                <label htmlFor="model">Model</label>
                <input required maxLength={32} type="text" id="model" onChange={(e)=>{setModel(e.target.value)}}/>
                <br/>
                <label htmlFor="producer">Producer</label>
                <input required maxLength={32} type="text" id="producer"onChange={(e)=>{setProducer(e.target.value)}}/>
                <br/>
                <label htmlFor="type">Type</label>
                <select required id="type" onChange={(e)=>{setType(e.target.value)}}>
                    <option value="Passenger">Passenger</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Cargo">Cargo</option>
                </select>
                <br/>
                <label htmlFor="depot">Depot</label>
                <select required id="depot" onChange={(e)=>{setDepot(e.target.value)}}>
                    {depots.map(depot => (
                        <option key={depot.depot_id} value={depot.depot_id}>
                            {depot.name}
                        </option>
                    ))}
                </select>
            </form>
            <button className={"hyperloop-item"} onClick={handleSubmit}>Add capsule</button>
        </div>
    );
}

export default AddCapsuleForm;