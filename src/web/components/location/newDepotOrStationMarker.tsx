import { Marker, Popup, useMapEvents } from "react-leaflet";
import AddDepotOrStationForm from "../addDepotOrStationForm";
import { useState } from "react";

interface NewDepotOrStationMarkerProps {
    onRefresh: (value: any) => void;
}

export const NewDepotOrStationMarker = ({ onRefresh} : NewDepotOrStationMarkerProps) => {
    const [lastClicked, setLastClicked] = useState<null | number[]>(null);
		useMapEvents({
			click(e) {
				setLastClicked([e.latlng.lat, e.latlng.lng]);
			},
		});

		return lastClicked ? (
			<Marker key={lastClicked[0]} position={lastClicked as [number, number]}>
				<Popup>
					<AddDepotOrStationForm
						params={{
							lat: lastClicked[0],
							lon: lastClicked[1],
							refreshHandle: onRefresh,
							markerHandle: setLastClicked,
						}}
					/>
				</Popup>
			</Marker>
		) : null;
	};