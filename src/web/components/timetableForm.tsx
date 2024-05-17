//@ts-nocheck
"use client"

import { useState } from "react";
import { ScheduleProps } from "./schedule";

const TimetableForm = (props: {
    schedule: ScheduleProps
}) => {
    const s = props.schedule;

    const [errorMsg, setErrorMsg] = useState();
    const [newDepartureTime, setNewDepartureTime] = useState("");
    const [newArrivalTime, setNewArrivalTime] = useState("");

    return (
        <>
            <form>
                <label>Departure time: {s.departure_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})} →</label>
                <input type="time" onChange={(e) => setNewDepartureTime(e.target.value)} />
                <br />

                <label>Arrival time: {s.arrival_time.toLocaleTimeString('en-GB', {timeZone: 'UTC'})} →</label>
                <input type="time" onChange={(e) => setNewArrivalTime(e.target.value)} />
                <br />

                <button className="hyperloop-item" onClick={async (e) => {
                    e.preventDefault();
                    const response = await (await fetch(`/api/schedules/setTimetable?schedule_id=${s.schedule_id}&newDepartureTime=${newDepartureTime}&newArrivalTime=${newArrivalTime}`)).json();

                    if (response.status === 200) {
                        console.log(response.message);
                        setErrorMsg(<div className="ok">{response.message}</div>);
                        await new Promise(f => setTimeout(f, 2000));
                        window.location.reload();
                    } else {
                        console.log(response.message);
                        setErrorMsg(<div className="err">{response.message}</div>);
                    }
                }}>Change</button>
            </form>

            {errorMsg}
        </>
    );
}

export default TimetableForm;
