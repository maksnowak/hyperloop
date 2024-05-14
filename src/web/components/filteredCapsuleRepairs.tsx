"use client";

import Repair, { RepairProps } from "@/components/repair";
import { DepotProps } from "@/components/depot";
import React, { useState } from "react";

const FilteredCapsuleRepairs = (props: {
    repairs: RepairProps[];
    depots: DepotProps[];
    capsule_id: number;
}) => {
    const [from, setFrom] = useState(new String());
    const [to, setTo] = useState(new String());

    const getFilteredRepairs = () => {
        return props.repairs.filter(
            (r, i) =>
                (from == "" || r.date_start.getTime() >= new Date(from).getTime()) &&
                (to == "" ||
                    (r.date_end != null &&
                        r.date_end.getTime() <= new Date(to).getTime()))
        );
    };

    return (
        <>
            <form>
                <label>Search for a repair</label>
                <br />
                <label>Started after</label>
                <input
                    value={from}
                    type="date"
                    id="date_from"
                    onChange={(e) => setFrom(e.target.value)}
                />
                <br />
                <label>Ended before</label>
                <input
                    value={to}
                    type="date"
                    id="date_to"
                    onChange={(e) => setTo(e.target.value)}
                />
                <br />
            </form>
            <br />
            <div className="hyperloop-grid">
                {getFilteredRepairs().map((r) => (
                    <div key={r.repair_id}>
                        <Repair
                            repair={r}
                            depot={
                                props.depots.find((d) => d.depot_id == r.performing_depot_id)!
                            }
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default FilteredCapsuleRepairs;
