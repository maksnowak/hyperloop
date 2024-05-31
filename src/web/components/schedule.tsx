"use client";
import React, {useEffect, useState} from "react";

export interface ScheduleProps {
    schedule_id: number;
    departure_time: Date;
    arrival_time: Date;
    status: string;
    referred_capsule_id: number;
    current_station_id: number;
    next_station_id: number;
    previous_schedule_id: number | null;
}


const Schedule = ({
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
                    <p>Departure time: {departure_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</p>
                    <p>Arrival time: {arrival_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</p>
                    <p>Status: {status}</p>
                    <p>Referred capsule id: {referred_capsule_id}</p>
                    <p>Current station: {currentStationName}</p>
                    <p>Next station: {nextStationName}</p>
                </button>
            </a>
        </>
    );
};

export default Schedule;
