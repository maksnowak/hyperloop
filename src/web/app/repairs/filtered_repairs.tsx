"use client"

import Repair, { RepairProps } from "@/components/repair";
import { DepotProps } from "@/components/depot";
import React, { useState } from "react";
import { CapsuleProps } from "@/components/capsule";

const FilteredRepairs = (props: {
  repairs: RepairProps[],
  depots: DepotProps[],
  capsules: CapsuleProps[],
}) => {
  const filter_repairs = () => {
    const from = new Date(document.getElementById("date_from")?.value);
    const to = new Date(document.getElementById("date_to")?.value);
    const depot = document.getElementById("depot").value;
    const capsule_no = document.getElementById("capsule").value;

    set_repairs(props.repairs.filter((r, i) => {
      return (isNaN(from) || r.date_start.getTime() >= from.getTime()) &&
        (isNaN(to) || (r.date_end != null && r.date_end.getTime() <= to.getTime())) &&
        (depot == "" || depot == props.depots[i].name) &&
        (capsule_no == "" || capsule_no == props.capsules[i].capsule_id);
    }))
  }
  const [repairs, set_repairs] = useState(props.repairs);

  return (
    <>
      <form>
        <label>Search for a repair</label><br />

        <label>From</label>
        <input type="date" id="date_from" onChange={filter_repairs} /><br />

        <label>To</label>
        <input type="date" id="date_to" onChange={filter_repairs} /><br />

        <label>Depot</label>
        <input type="text" id="depot" onChange={filter_repairs} /> <br />

        <label>Capsule no.</label>
        <input type="number" id="capsule" onChange={filter_repairs} /> <br />
      </form>

      <div>
        {repairs.map((r) => <Repair repair={r} depot={props.depots.find((d) => d.depot_id == r.performing_depot_id)} />)}
      </div>
    </>
  );
}

export default FilteredRepairs;
