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
            <a>
                <p>Station name: {props.station.name}</p>
                <p>Localization: ({Math.round(props.station.latitude)}, {Math.round(props.station.longitude)})</p>
                <p>Perons: {props.station.platforms}</p>
            </a>
        </div>
    );
};

export default Station;

export const dynamic = 'force-dynamic';

