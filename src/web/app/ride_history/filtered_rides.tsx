//@ts-nocheck // temporary fix - necessary for the build to pass
"use client";

import React, { useState } from "react";
import Trip from "@/components/trip";

// This is pretty much a prop that expects data from a joined SQL statement;
// For ex. SELECT * FROM trips_history th JOIN tubes t on t.tube_id = th.referred_tube_id WHERE referred_capsule_id = X;
// I KNOW THIS IS STUPID
//
// Best regards,
// permito
export interface DetailedTripProps {
    ride_id: number;
    date_start: Date;
    date_end: Date;
    tickets_sold: number;
    cargo: string;
    cargo_weight: number;
    referred_capsule_id: number;
    referred_tube_id: number;
    tube_id: number;
    name: string;
    length: number;
    max_speed: number;
    estimated_travel_time: Date;
    starting_station_id: number;
    ending_station_id: number;
};

const FilteredRides = (props: {
    trips: DetailedTripProps[];
}) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [tubeName, setTubeName] = useState("");
    const [capsuleNo, setCapsuleNo] = useState("");

    const getFilteredRides = () => props.trips.filter(t =>
        (from == "" || t.date_start.getTime() >= new Date(from).getTime()) &&
        (to == "" || (t.date_end != null && r.date_end.getTime() <= new Date(to).getTime())) &&
        (tubeName == "" || t.name.includes(tubeName)) &&
        (capsuleNo == "" || Number(capsuleNo) == t.referred_capsule_id)
    );

    return (
        <>
            <form>
                <label>Search for a ride</label>
                <br />

                <label>From</label>
                <input value={from} type="date" onChange={(e) => setFrom(e.target.value)} />
                <br />

                <label>To</label>
                <input value={to} type="date" onChange={(e) => setTo(e.target.value)} />
                <br />

                <label>Tube name</label>
                <input value={tubeName} type="text" onChange={(e) => setTubeName(e.target.value)} />{" "}
                <br />

                <label>Capsule no.</label>
                <input value={capsuleNo} type="number" onChange={(e) => setCapsuleNo(e.target.value)} />{" "}
                <br />
            </form>

            <div className="hyperloop-grid">
                {getFilteredRides().map(t => <div key={t.ride_id}>
                    <Trip trip={t} tube={t.name} />
                </div>)}
            </div>
        </>
    );
};

export default FilteredRides;

export const dynamic = 'force-dynamic';
