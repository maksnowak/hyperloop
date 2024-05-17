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
    const t = props.tube;
    const travelTime: string = `${props.tube.estimated_travel_time.getHours()}h ${props.tube.estimated_travel_time.getMinutes()}min`;

    return (
        <div>
            <a href={`/tubes/${t.tube_id}`}>
                <h3>Tube {t.name}</h3>
                <p>Length {t.length}km</p>
                <p>Max allowed speed {t.max_speed}km/h</p>
                <p>Estimated travel time {travelTime}</p>
            </a>
        </div>
    );
};

export default Tube;

export const dynamic = 'force-dynamic';

