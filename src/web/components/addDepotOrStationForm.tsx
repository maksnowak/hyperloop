"use client";
import React from "react";

const AddDepotOrStationForm = ({ params }: { params: { lat: number, lon: number, refreshHandle: Function, markerHandle: Function } }) => {
    const [name, setName] = React.useState("");
    const [type, setType] = React.useState("");
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [label, setLabel] = React.useState("");
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission
        const call = type === "Depot" ? `/api/depots/addDepot?name=${name}&lat=${params.lat}&lon=${params.lon}` : `/api/stations/addStation?name=${name}&lat=${params.lat}&lon=${params.lon}`;
        const response = await (await fetch(call)).json();
        setIsDisabled(true);
        if (response.status === 200) {
            console.log(response.message);
            params.markerHandle(null);
            params.refreshHandle(type);
        } else {
            console.log("ERROR: " + response.message);
            setLabel("ERROR: " + response.message);
        }
    };

    return (
        <div>
            <h3>Register new facility here?</h3>
            <p>Latitude: {params.lat}</p>
            <p>Longitude: {params.lon}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <br/>
                <input required maxLength={32} type="text" id="name" onChange={(e) => {setName(e.target.value)}}/>
                <br/>
                <br/>
                <label htmlFor="type">Type</label>
                <select required id="type" onChange={(e)=>{setType(e.target.value)}}>
                    <option value=""></option>
                    <option value="Depot">Depot</option>
                    <option value="Station">Station</option>
                </select>
                <br/>
                <button id={"sub"} className={"hyperloop-item"} type={"submit"} disabled={isDisabled}>Register facility</button>
                <br/>
                <label htmlFor={"sub"}>{label}</label>
            </form>
        </div>
    );
}

export default AddDepotOrStationForm;