//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { Accordion, AccordionItem, TimeInput, Checkbox, Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import { Time } from "@internationalized/date";

const AddScheduleForm = () => {
    const [stations, setStations] = useState([]);
    const [selectedStations, setSelectedStations] = useState([]);
    const [departureTime, setDepartureTime] = useState("");
    const [capsuleType, setCapsuleType] = useState("");
    const [bothWays, setBothWays] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchData = React.cache(async () => {
            try {
                const response = await fetch(`/api/stations/getStations`);
                const data = await response.json();
                setStations(data.data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        });
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await (await fetch(`/api/schedules/addSchedule?station_names=${Array.from(selectedStations).join(',')}&starting_time=${departureTime}&capsule_type=${capsuleType}&both_ways=${bothWays}`)).json();
        if (response.status === 200) {
            console.log(response.message);
            await new Promise(f => setTimeout(f, 1000));
            setErrorMsg("");
            window.location.reload();
        } else {
            setErrorMsg(response.message);
            console.log("ERROR: " + response.message);
        }
    };

    return (
        <div>
            <h3>Add new schedule</h3>
            <form id={"add-schedule-form"} onSubmit={handleSubmit}>
                <TimeInput isRequired id="departureTime" label="Departure Time" onChange={setDepartureTime} />
                <Select isRequired id="type" label="Capsule Type" value={capsuleType} onChange={(e) => setCapsuleType(e.target.value)}>
                    <SelectSection>
                        <SelectItem key="Passenger" value="Passenger">Passenger</SelectItem>
                        <SelectItem key="Hybrid" value="Hybrid">Hybrid</SelectItem>
                        <SelectItem key="Cargo" value="Cargo">Cargo</SelectItem>
                    </SelectSection>
                </Select>
                <Checkbox id="bothWays" isSelected={bothWays} onValueChange={setBothWays}>Is it both ways?</Checkbox> 
                <Select isRequired id="station" label="Stations" selectionMode="multiple" onSelectionChange={setSelectedStations}>
                    <SelectSection>
                        {stations.map(s => (
                            <SelectItem key={s.name} value={s.name}>
                                {s.name}
                            </SelectItem>
                        ))}
                    </SelectSection>
                </Select>
                <Button type="submit">Add schedule</Button>
                <br />

                <div className="err">{errorMsg}</div>
            </form >
        </div >
    );
}

export default AddScheduleForm;
