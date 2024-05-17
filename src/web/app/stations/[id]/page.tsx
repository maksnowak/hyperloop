"use client";
import React, {useEffect} from "react";
import "../../globals.css";
import Sidebar from "@/components/sidebar";
import {StationProps} from "@/components/station";
import ArrivalOrDeparture from "@/components/arrivalOrDeparture";

const extractTime = (time: string) => {
    const date = new Date(time);
    return {
        hours: date.getUTCHours(),
        minutes: date.getUTCMinutes(),
        seconds: date.getUTCSeconds(),
    };
}

const compareTimes = (time1: string, time2: string) => {
    const t1 = extractTime(time1);
    const t2 = extractTime(time2);
    if (t1.hours !== t2.hours) {
        return t1.hours - t2.hours;
    }
    if (t1.minutes !== t2.minutes) {
        return t1.minutes - t2.minutes;
    }
    return t1.seconds - t2.seconds;
}

const StationPage = ({ params }: { params: { id: string } }) => {
    const [gridText, setGridText] = React.useState("");
    const [view, setView] = React.useState<string>("Arrivals");
    const [data, setData] = React.useState([]);
    const [station, setStation] = React.useState<StationProps | null>(null);

    useEffect(() => {
        const fetchStation = async () => {
            try {
                const response = await fetch(`/api/stations/getStation?station_id=${params.id}`);
                const data = await response.json();
                setStation(data.data);
            } catch (error) {
                console.error("Error fetching depots:", error);
            }
        }
        fetchStation();
    }, []);

    useEffect(() => {
        fetchData();
    }, [view]);

    useEffect(() => {}, [gridText]);

    const fetchData = async () => {
        const endpoint = view === "Arrivals" ? `/api/schedules/getArrivals?arrival_id=${params.id}` : `/api/schedules/getDepartures?departure_id=${params.id}`;
        const response = await (await fetch(endpoint)).json();
        if (response.status !== 200) {
            setGridText(response.message);
            return;
        }
        setGridText(view);
        const schedules = response.data;
        setData(schedules.sort((s1, s2) => compareTimes(
            view === "Arrivals" ? s1.arrival_time : s1.departure_time,
            view === "Arrivals" ? s2.arrival_time : s2.departure_time
        ))
            .map((s) => <ArrivalOrDeparture key={s.schedule_id} {...s} />));
        console.log(gridText);
    }

    if (!station) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Sidebar />
            <h1>Station {station.name}</h1>
            <p>Latitude: {Number(station.latitude)}</p>
            <p>Longitude: {Number(station.longitude)}</p>
            <br />
            <button className={"hyperloop-item"} onClick={() => setView("Arrivals")}>Show arrivals</button>
            <button className={"hyperloop-item"} onClick={() => setView("Departures")}>Show departures</button>
            <h1>{gridText}</h1>
            <div className={"hyperloop-grid"}>
                {data}
            </div>
        </div>
    );
}

export default StationPage;
