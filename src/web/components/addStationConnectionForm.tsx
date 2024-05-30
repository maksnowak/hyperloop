"use client";
import React, {useEffect} from "react";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";

const AddStationConnectionForm = ({ params }: { params: { station_id: number, station_name: string, refreshHandle: Function } }) => {
    const [stations, setStations] = React.useState([]);
    const [isDisabled, setIsDisabled] = React.useState(false);
    const [label, setLabel] = React.useState("");
    const [otherStationName, setOtherStationName] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/stations/getUnconnectedStations?station_id=${params.station_id}`);
                const data = await response.json();
                setStations(data.data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        };
        fetchData();
    }, []);
    const handleSubmit = async (e: any) => {
        e.preventDefault(); // Prevent the default form submission
        const response = await (await fetch(`/api/stations/connectStations?station1_name=${params.station_name}&station2_name=${otherStationName}`)).json();
        setIsDisabled(true);
        if (response.status === 200) {
            console.log(response.message);
            params.refreshHandle("Tube");
        } else {
            console.log("ERROR: " + response.message);
            setLabel("ERROR: " + response.message);
        }
    };

    return (
        <div>
            <h3>Connect this station to another station?</h3>
            <form id={"add-connection-form"} onSubmit={handleSubmit}>
                <Select required id="station_id" onChange={(e) => {setOtherStationName(e.target.value)}}>
                    <SelectSection>
                        {stations.map((station: any) => (
                            <SelectItem key={station.name} value={station.name}>{station.name}</SelectItem>
                        ))}
                    </SelectSection>
                </Select>
                <Button id={"sub"} type={"submit"} disabled={isDisabled}>Add connection</Button>
                <br/>
                <label htmlFor={"sub"}>{label}</label>
            </form>
        </div>
    );
}

export default AddStationConnectionForm;