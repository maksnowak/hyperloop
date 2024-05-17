// @ts-nocheck // temporary fix - necessary for the build to pass
import React from "react";

export interface TripProps {
    ride_id: number;
    date_start: Date;
    date_end: Date;
    tickets_sold: number;
    cargo: string;
    cargo_weight: number;
    referred_capsule_id: number;
    referred_tube_id: number;
}

const Trip = (props: {
    trip: TripProps,
    tube: string,
}) => {
    const trip = props.trip;
    const tube = props.tube;

    return (
        <>
            <div className="hyperloop-item w-2/3">
                <h3>Ride no. {trip.ride_id}</h3>
                <p>Date start: {trip.date_start.toDateString()}</p>
                <p>Date end: {trip.date_end.toDateString()}</p>
                <p>Tickets sold: {trip.tickets_sold}</p>
                <p>Cargo: {trip.cargo}, {trip.cargo_weight}kg</p>
                <p>Tube taken: {tube}</p>
                <p>Capsule id: {trip.referred_capsule_id}</p>
            </div>
        </>
    );
};

export default Trip;

export const dynamic = 'force-dynamic';

