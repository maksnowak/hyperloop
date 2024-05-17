//@ts-nocheck
"use client";
import { Decimal } from "@prisma/client/runtime/library";
import React, { FC } from "react";
import {
    MapContainer,
    Marker,
    Polyline,
    Popup,
    TileLayer, useMapEvents,
} from "react-leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Station from "./station";
import Tube from "./tube";
import AddDepotOrStationForm from "@/components/addDepotOrStationForm";
import AddStationConnectionForm from "@/components/addStationConnectionForm";

interface capsule_location_event {
    event_id: number;
    timestamp: Date;
    latitude: Decimal;
    longitude: Decimal;
    speed: Decimal;
    interior_conditions: string | null;
    signal_strength: Decimal;
    operational_status: string | null;
    health_status: string | null;
    referred_capsule_id: number;
    referred_tube_id: number;
    rau_id: number;
}

interface Depot {
    depot_id: number;
    name: string;
    latitude: Decimal;
    longitude: Decimal;
}

interface Station {
    station_id: number;
    name: string;
    latitude: Decimal;
    longitude: Decimal;
    platforms: number;
}

interface Tube {
    tube_id: number;
    name: string;
    length: Decimal;
    max_speed: Decimal;
    estimated_travel_time: Date;
    starting_station_id: number;
    ending_station_id: number;
}

interface MapProps {
    cle: capsule_location_event[];
    depots: Depot[];
    stations: Station[];
    tubes: Tube[];
}

const Map: FC<MapProps> = ({ cle, depots, stations, tubes }) => {
    const [lastClicked, setLastClicked] = React.useState<null | number[]>(null);
    const DynamicMarker = () => {

        const map = useMapEvents({
            click(e) {
                setLastClicked([
                    e.latlng.lat,
                    e.latlng.lng
                ]);
            },
        })

        return (
            lastClicked ?
                <Marker
                    key={lastClicked[0]}
                    position={lastClicked}
                >
                    <Popup>
                        <AddDepotOrStationForm params={{ lat: lastClicked[0], lon: lastClicked[1] }} />
                    </Popup>
                </Marker>
                : null
        )

    }

    return (
        <div>
            <MapContainer
                style={{ height: "100vh" }}
                center={[51.875, 19.415]}
                zoom={7}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cle.map((capsule_location_event) => {
                    return (
                        <Marker
                            key={capsule_location_event.event_id}
                            position={[
                                Number(capsule_location_event.latitude),
                                Number(capsule_location_event.longitude),
                            ]}
                        >
                            <Popup>
                                Capsule number {capsule_location_event.referred_capsule_id}
                            </Popup>
                        </Marker>
                    );
                })}
                {depots.map((depot) => {
                    return (
                        <Marker
                            key={depot.depot_id}
                            position={[Number(depot.latitude), Number(depot.longitude)]}
                        >
                            <Popup>Depot: {depot.name}</Popup>
                        </Marker>
                    );
                })}
                {stations.map((station) => {
                    return (
                        <Marker
                            key={station.station_id}
                            position={[Number(station.latitude), Number(station.longitude)]}
                        >
                            <Popup>
                                <Station station={station} />
                                <AddStationConnectionForm params={{ station_id: station.station_id, station_name: station.name }} />
                            </Popup>
                        </Marker>
                    );
                })}
                {tubes.map((tube) => {
                    const { pos } = getLinkedStations(stations, tube);

                    return (
                        <Polyline key={tube.tube_id} positions={pos}>
                            <Popup>
                                <Tube tube={tube} />
                            </Popup>
                        </Polyline>
                    );
                })}
                <DynamicMarker />
            </MapContainer>
        </div>
    );
};

export default Map;

function getLinkedStations(stations: Station[], tube: Tube) {
    const station1 = stations.find(
        (station) => station.station_id === tube.starting_station_id
    );
    const station2 = stations.find(
        (station) => station.station_id === tube.ending_station_id
    );
    const pos = [
        {
            lat: Number(station1?.latitude),
            lng: Number(station1?.longitude),
        },
        {
            lat: Number(station2?.latitude),
            lng: Number(station2?.longitude),
        },
    ];
    const name1 = station1?.name;
    const name2 = station2?.name;
    return { pos, name1, name2 };
}


export const dynamic = 'force-dynamic';
