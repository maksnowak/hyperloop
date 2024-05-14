"use client";

import Repair, { RepairProps } from "@/components/repair";
import { DepotProps } from "@/components/depot";
import React, { useState } from "react";
import { CapsuleProps } from "@/components/capsule";

const FilteredRepairs = (props: {
  repairs: RepairProps[];
  depots: DepotProps[];
  capsules: CapsuleProps[];
}) => {
  const [from, setFrom] = useState(new String());
  const [to, setTo] = useState(new String());
  const [depot, setDepot] = useState(new String());
  const [capsuleNo, setCapsuleNo] = useState(new String());
  const [repairs, setRepairs] = useState(props.repairs);

  const getFilteredRepairs = () => {
    return props.repairs.filter(
      (r, i) =>
        (from == "" || r.date_start.getTime() >= new Date(from).getTime()) &&
        (to == "" ||
          (r.date_end != null &&
            r.date_end.getTime() <= new Date(to).getTime())) &&
        (depot == "" || props.depots[i].name.includes(depot)) &&
        (capsuleNo == "" ||
          new Number(capsuleNo) == props.capsules[i].capsule_id)
    );
  };

  return (
    <>
      <form>
        <label>Search for a repair</label>
        <br />
        <label>From</label>
        <input
          value={from}
          type="date"
          id="date_from"
          onChange={(e) => setFrom(e.target.value)}
        />
        <br />
        <label>To</label>
        <input
          value={to}
          type="date"
          id="date_to"
          onChange={(e) => setTo(e.target.value)}
        />
        <br />
        <label>Depot</label>
        <input
          value={depot}
          type="text"
          id="depot"
          onChange={(e) => setDepot(e.target.value)}
        />{" "}
        <br />
        <label>Capsule no.</label>
        <input
          value={capsuleNo}
          type="number"
          id="capsule"
          onChange={(e) => setCapsuleNo(e.target.value)}
        />{" "}
        <br />
      </form>

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

export default FilteredRepairs;
