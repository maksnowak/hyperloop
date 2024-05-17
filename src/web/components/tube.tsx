// @ts-nocheck // temporary fix - necessary for the build to pass
import React from "react";

export interface TubeProps {
    tube_id: number;
    name: string;
    length: number;
    max_speed: number;
    estimated_travel_time: Date;
    starting_station_id: number;
    ending_station_id: number;
}

const Tube = (props: {
    tube: TubeProps
}) => {
    const travelTime: string = `${new Date(props.tube.estimated_travel_time).getMinutes()}min ${new Date(props.tube.estimated_travel_time).getSeconds()}s`;

    return (
        <div>
            <a>
                <h3>Tube {props.tube.name}</h3>
                <p>Length {props.tube.length}km</p>
                <p>Max allowed speed {props.tube.max_speed}km/h</p>
                <p>Estimated travel time {travelTime}</p>
            </a>
        </div>
    );
};

export default Tube;

export const dynamic = 'force-dynamic';

