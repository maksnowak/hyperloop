"use client";
import React from "react";
import { Input, Button, Select, SelectSection, SelectItem } from "@nextui-org/react";

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
                <Input isRequired maxLength={32} label="Name" onChange={(e) => { setName(e.target.value) }} />
                <Select isRequired id="type" label="Facility" onChange={(e) => { setType(e.target.value) }}>
                    <SelectSection>
                        <SelectItem key="Depot" value="Depot">Depot</SelectItem>
                        <SelectItem key="Station" value="Station">Station</SelectItem>
                    </SelectSection>
                </Select>
                <Button id={"sub"} type={"submit"} disabled={isDisabled}>Register facility</Button>
                <br/>
                <label htmlFor={"sub"}>{label}</label>
            </form>
        </div>
    );
}

export default AddDepotOrStationForm;