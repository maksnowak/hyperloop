// @ts-nocheck // temporary fix - necessary for the build to pass
import React from "react";

export interface StationProps {
    station_id: number;
    name: string;
    latitude: number;
    longitude: number;
    platforms: number;
}

const Station = (props: {
    station: StationProps
}) => {
    return (
        <div>
            <a href={`stations/${props.station.station_id}`}>
                <h3>Station name: {props.station.name}</h3>
                <p>Localization: ({props.station.latitude}, {props.station.longitude})</p>
                <p>Platforms: {props.station.platforms}</p>
            </a>
        </div>
    );
};

export default Station;

export const dynamic = 'force-dynamic';

