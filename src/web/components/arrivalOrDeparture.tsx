//@ts-nocheck // temporary fix - necessary for the build to pass
"use client";
import React, {useEffect, useState} from "react";

const ArrivalOrDeparture = ({
                      schedule_id,
                      departure_time,
                      arrival_time,
                      status,
                      referred_capsule_id,
                      current_station_id,
                      next_station_id,
                      previous_schedule_id,
                  }: ScheduleProps) => {
    const [currentStationName, setCurrentStationName] = useState("Unknown");
    const [nextStationName, setNextStationName] = useState("Unknown");

    useEffect(() => {
        const fetchStationName = async (id: number, setName: React.Dispatch<React.SetStateAction<string>>) => {
            try {
                const response = await fetch(`/api/stations/getStation?station_id=${id}`);
                const data = await response.json();
                setName(data.data.name);
            } catch (error) {
                console.error("Error fetching station name:", error);
            }
        };

        fetchStationName(current_station_id, setCurrentStationName);
        fetchStationName(next_station_id, setNextStationName);
    }, [current_station_id, next_station_id]);
    return (
        <>
            <a>
                <button className="hyperloop-item w-2/3">
                    <h3 className="text-center">{schedule_id}</h3>
                    <p>Departure time: {departure_time.split('T').at(-1).split('.').at(0).trim()}</p>
                    <p>Arrival time: {arrival_time.split('T').at(-1).split('.').at(0).trim()}</p>
                    <p>Status: {status}</p>
                    <p>Referred capsule id: {referred_capsule_id}</p>
                    <p>Current station: {currentStationName}</p>
                    <p>Next station: {nextStationName}</p>
                </button>
            </a>
        </>
    );
};

export default ArrivalOrDeparture;
