import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

function MapClick({ position, setPosition }) {

    useMapEvents({

        click(e) {

            setPosition({
                lat: e.latlng.lat,
                lng: e.latlng.lng
            });

        }

    });

    return position ? (
    <Marker position={position}>
    </Marker>
) : null;
}
function FlyToLocation({ position }) {

    const map = useMap();

    if (position) {
        map.flyTo(position, 16, {
            duration: 1
        });
    }

    return null;
}
const DEFAULT_CENTER = [27.7172, 85.324];
function LocationPicker({ position, setPosition }) {

    return (

        <MapContainer
            center={DEFAULT_CENTER}
            zoom={14}
            style={{ cursor: "crosshair" }}
scrollWheelZoom={true}
            className="h-[300px] sm:h-[400px] rounded-2xl border shadow-md mt-4"
        >

          <TileLayer
    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>

            <MapClick
                position={position}
                setPosition={setPosition}
            />
            <FlyToLocation position={position} />

        </MapContainer>

    );
}

export default LocationPicker;