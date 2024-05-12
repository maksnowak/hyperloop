"use client"

import Repair, { RepairProps } from "@/components/repair";
import { DepotProps } from "@/components/depot";
import React, { useState } from "react";

const FilteredRepairs = (props: {
  repairs: RepairProps[],
  depots: DepotProps[],
}) => {
  const filter_repairs = () => {
    const from = new Date(document.getElementById("date_from")?.value);
    const to = new Date(document.getElementById("date_to")?.value);

    console.log(from, to);
    console.log(isNaN(from), isNaN(to));

    set_repairs(props.repairs.filter((r) => {
      return (isNaN(from) || r.date_start.getTime() >= from.getTime()) &&
        (isNaN(to) || (r.date_end != null && r.date_end.getTime() <= to.getTime()));
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
        <input type="date" id="date_to" onChange={filter_repairs} />
      </form>

      <div>
        {repairs.map((r, i) => <Repair repair={r} depot={props.depots[i]} />)}
      </div>
    </>
  );
}

export default FilteredRepairs;
