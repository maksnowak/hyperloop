"use client";
import React from "react";

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
    return (
        <>
            <a href={`/schedules/${schedule_id}`}>
                <button className="hyperloop-item w-2/3">
                    <h3 className="text-center">{schedule_id}</h3>
                    <p>Departure time: {departure_time.split('T').at(-1).split('.').at(0).trim()}</p>
                    <p>Arrival time: {arrival_time.split('T').at(-1).split('.').at(0).trim()}</p>
                    <p>Status: {status}</p>
                    <p>Referred capsule id: {referred_capsule_id}</p>
                    <p>Current station id: {current_station_id}</p>
                    <p>Next station id: {next_station_id}</p>
                </button>
            </a>
        </>
    );
};

export default ArrivalOrDeparture;
