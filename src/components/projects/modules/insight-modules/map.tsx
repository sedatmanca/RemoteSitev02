'use client'

import "leaflet/dist/leaflet.css";
import { LatLngExpression } from 'leaflet';

import { 
  MapContainer, 
  TileLayer,  
} from "react-leaflet";
import { TTranslation } from "@/services/translationService";


const Map = ({ translation } : { translation: TTranslation }) => {
    const MapPlaceholder = () => {
        return (
        <p>
            <noscript>
                {translation.projects['javascript-disabled']}
            </noscript>
        </p>
        );
    }
  
    const position: LatLngExpression = {
        lat: 41.0166, 
        lng: 29.0122
    }

    return (
        <MapContainer
            className="w-full h-full bg-slate-100 z-40"
            center={position}
            zoom={11}
            scrollWheelZoom={true}
            placeholder={<MapPlaceholder/>}
        >
            <TileLayer
                url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                subdomains={['mt1','mt2','mt3']}
            />
        </MapContainer>
    );
};

export default Map;