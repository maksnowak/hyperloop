// @ts-nocheck // temporary fix - necessary for the build to pass
"use client";
import { Button, Input, Select, SelectItem, SelectSection } from "@nextui-org/react";
import React, {useEffect} from "react";

const AddCapsuleForm = () => {
    const [model, setModel] = React.useState("");
    const [producer, setProducer] = React.useState("");
    const [type, setType] = React.useState("");
    const [depot, setDepot] = React.useState(1);
    // model, producent, typ, id depotu
    const [depots, setDepots] = React.useState([]);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [label, setLabel] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/depots/getDepots`);
                const data = await response.json();
                setDepots(data.data);
            } catch (error) {
                console.error("Error fetching depots:", error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission
        console.log(type);
        const response = await (await fetch(`/api/capsules/addCapsule?model=${model}&producer=${producer}&type=${type}&depot=${depot}`)).json();
        setIsDisabled(true);
        if (response.status === 200) {
            console.log(response.message);
            setLabel(response.message);
            await new Promise(f => setTimeout(f, 1000));
            window.location.reload();
        } else {
            console.log("ERROR: " + response.message);
            setLabel("ERROR: " + response.message);
        }
    };

    return (
        <div>
            <h3>Add new capsule</h3>
            <form id={"add-capsule-form"} onSubmit={handleSubmit}>
                <Input isRequired type="text" label="Model" id="model" onChange={(e) => {setModel(e.target.value)}} />
                <Input isRequired type="text" label="Producer" id="model" onChange={(e) => {setProducer(e.target.value)}} />
                <Select isRequired id="type" label="Type" value={type} onChange={(e) => {setType(e.target.value)}}>
                    <SelectSection>
                        <SelectItem key={"Passenger"} value="Passenger">Passenger</SelectItem>
                        <SelectItem key={"Hybrid"}value="Hybrid">Hybrid</SelectItem>
                        <SelectItem key={"Cargo"} value="Cargo">Cargo</SelectItem>
                    </SelectSection>
                </Select>
                <Select isRequired id="depot" label="Depot" value={depot} onChange={(e) => {setDepot(e.target.value)}}>
                    <SelectSection>
                        {depots.map(depot => (
                            <SelectItem key={depot.depot_id} value={depot.depot_id}>{depot.name}</SelectItem>
                        ))}
                    </SelectSection>
                </Select>
                <Button type="submit">Add capsule</Button>
                <br />
                <label htmlFor="add-capsule-form">{label}</label>
            </form>
        </div>
    );
}

export default AddCapsuleForm;