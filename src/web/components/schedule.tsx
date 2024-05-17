"use client";
import React from "react";

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
    return (
        <>
            <a href={`/schedules/${schedule_id}`}>
                <button className="hyperloop-item w-2/3">
                    <h3 className="text-center">{schedule_id}</h3>
                    <p>Departure time: {departure_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</p>
                    <p>Arrival time: {arrival_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</p>
                    <p>Status: {status}</p>
                    <p>Referred capsule id: {referred_capsule_id}</p>
                    <p>Current station id: {current_station_id}</p>
                    <p>Next station id: {next_station_id}</p>
                </button>
            </a>
        </>
    );
};

export default Schedule;
