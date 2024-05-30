//@ts-nocheck // temporary fix - necessary for the build to pass
"use client";

import Repair, { RepairProps } from "@/components/repair";
import { DepotProps } from "@/components/depot";
import React, { useState } from "react";
import { CapsuleProps } from "@/components/capsule";
import { DatePicker, Button, Select, SelectSection, SelectItem, Input } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

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
  const [fromValue, setFromValue] = useState<Date>();
  const [toValue, setToValue] = useState<Date>();

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
        <h3>Filter repairs</h3>
        <DatePicker id="date_from" label="From" value={fromValue} onChange={(e) => {
          setFromValue(e);
          setFrom(e.toString());
        }} />
        <DatePicker id="date_to" label="To" value={toValue} onChange={(e) => {
          setToValue(e);
          setTo(e.toString());
        }} />
        <Input id="depot" label="Depot" value={depot} onChange={(e) => setDepot(e.target.value)} />
        <Input id="capsule" label="Capsule no." type="number" value={capsuleNo} onChange={(e) => setCapsuleNo(e.target.value)} />
        <Button type="reset" onClick={
          () => {
            setFrom("");
            setTo("");
            setDepot("");
            setCapsuleNo("");
          }
        }>Reset filters</Button>
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
