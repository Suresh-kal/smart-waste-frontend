import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

function FitBounds({ bins }) {
    const map = useMap();

    useEffect(() => {
        if (!bins.length) return;

        const bounds = bins.map(bin => [
            bin.latitude,
            bin.longitude
        ]);

        map.fitBounds(bounds, {
            padding: [50, 50]
        });
    }, [bins, map]);

    return null;
}

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const createIcon = (color) =>
    new L.Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
        shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

const markerIcons = {
    EMPTY: createIcon("green"),
    "HALF-FULL": createIcon("yellow"),
    FULL: createIcon("orange"),
    OVERFLOWING: createIcon("red"),
};

function BinMap({ bins }) {
    return (
<div className="h-[320px] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
                center={[27.7135, 85.3245]}
                zoom={15}
                className="h-full w-full"
            >

               <TileLayer
    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
/>

                {bins.map((bin) => (
                    <Marker
    key={bin._id}
    position={[bin.latitude, bin.longitude]}
    icon={markerIcons[bin.status]}
>
                        <Popup>

                            <h2 className="font-bold">
                                {bin.binId}
                            </h2>

                            <p>{bin.location}</p>

                            <p>
                                Status: <strong>{bin.status}</strong>
                            </p>

                            <p>
                                Fill: {bin.fillPercentage}%
                            </p>

                        </Popup>
                        
                    </Marker>
                ))}
                <FitBounds bins={bins} />
            </MapContainer>

        </div>
    );
}

export default BinMap;