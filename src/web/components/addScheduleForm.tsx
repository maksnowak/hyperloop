//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";

const AddScheduleForm = () => {
    const [stations, setStations] = useState<string[]>([]);
    const [selectedStations, setSelectedStations] = useState([]);
    const [departureTime, setDepartureTime] = useState("");
    const [capsuleType, setCapsuleType] = useState("");
    const [bothWays, setBothWays] = useState(false);

    useEffect(() => {
        const fetchData = React.cache(async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getAllStations`);
                const data = await response.json();
                setStations(data);
            } catch (error) {
                console.error("Error fetching stations:", error);
            }
        });
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await (await fetch(`/api/schedules/addSchedule?station_names=${selectedStations}&starting_time=${departureTime}&capsule_type=${capsuleType}&both_ways=${bothWays}`)).json();
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
            <h3>Add new schedule</h3>
            <form id={"add-schedule-form"} onSubmit={handleSubmit}>
                <label htmlFor="departureTime">Departure Time</label>
                <input required type="time" id="departureTime" onChange={(e) => setDepartureTime(e.target.value)} />
                <br />

                <label htmlFor="type">Capsule Type</label>
                <select required id="type" onChange={(e) => setCapsuleType(e.target.value)}>
                    <option value=""></option>
                    <option value="Passenger">Passenger</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Cargo">Cargo</option>
                </select>
                <br />

                <label htmlFor="bothWays">Is it both ways?</label>
                <input required type="checkbox" id="bothWays" onChange={(e) => setBothWays(e.target.value)} />
                <br />

                <label htmlFor="station">Stations</label>
                <select required id="station" value={stations.length} onChange={(e) => {
                    if (!selectedStations.includes(e.target.value)) {
                        setSelectedStations([...selectedStations, e.target.value]);
                    }
                    // console.log(stations, selectedStations);
                }}>
                    <option value=""></option >
                    {stations.map((s) => {
                        <option key={s.station_id} value={s.station_id}>
                            {s.name}
                        </option>
                    })}
                </select>
                <br />

                <div className="hyperloop-grid">
                    {selectedStations.map((s) => <div className="hyperloop-item">{s.name}</div>)}
                </div >
                <br />

                <button className={"hyperloop-item"} type={"submit"}>Add schedule</button>
                <br />
            </form>
        </div>
    );
}

export default AddScheduleForm;
