'use client';
import React, { FC } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import { Capsule, Depot, Station, Tube } from '../../types';
import { CapsuleMarker } from './capsuleMarker';
import { default as StationContainer } from '../station';
import { default as TubeContainer } from '../tube';

interface MapProps {
	capsules: Capsule[];
	depots: Depot[];
	stations: Station[];
	tubes: Tube[];
}

const Map: FC<MapProps> = ({ capsules, depots, stations, tubes }) => {
	return (
		<div className='h-full'>
			<MapContainer className='h-full' center={[52.218, 21.011]} zoom={8} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				{capsules.map((capsule) => (
					<CapsuleMarker key={capsule.capsule_id} capsule={capsule} />
				))}
				{depots.map((depot) => {
					return (
						<Marker key={depot.depot_id} position={[Number(depot.latitude), Number(depot.longitude)]}>
							<Popup>Depot: {depot.name}</Popup>
						</Marker>
					);
				})}
				{stations.map((station) => {
					return (
						<Marker key={station.station_id} position={[Number(station.latitude), Number(station.longitude)]}>
							<Popup>
								<StationContainer station={station} />
							</Popup>
						</Marker>
					);
				})}
				{tubes.map((tube) => {
					const { pos } = getLinkedStations(stations, tube);

					return (
						<Polyline key={tube.tube_id} positions={pos} color='#64748b'>
							<Popup>
								<TubeContainer tube={tube} />
							</Popup>
						</Polyline>
					);
				})}
			</MapContainer>
		</div>
	);
};

export default Map;

function getLinkedStations(stations: Station[], tube: Tube) {
	const station1 = stations.find((station) => station.station_id === tube.starting_station_id);
	const station2 = stations.find((station) => station.station_id === tube.ending_station_id);
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
