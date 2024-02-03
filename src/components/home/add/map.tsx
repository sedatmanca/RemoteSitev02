'use client'

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from 'leaflet';
import { useMap } from "react-leaflet";

import markerIcon2x from '#/assets/markers/marker-icon-2x-red.png';
import markerIcon from '#/assets/markers/marker-icon-red.png';
import markerShadow from '#/assets/markers/marker-shadow.png';

import { 
    MapContainer, 
    TileLayer, 
    Marker,
} from "react-leaflet";
import { LeafletMouseEvent, PointTuple } from "leaflet";
import { useRef } from "react";
import { IMapProps } from "@/types/home/addProjectComponentProps";

const position: LatLngExpression = {
  lat: 41.0166, 
  lng: 29.0122
}

const Map = ({
  translation,
  coords,
  setCoords
}: IMapProps ) => {
  const iconSize: PointTuple = [30, 50];

  const markerRef = useRef<any>();
  
  const MapPlaceholder = () => {
    return (
      <p>
        <noscript>
          {translation['javascript-disabled']}
        </noscript>
      </p>
    );
  }

  const RenderMap = () => {
    const map = useMap();

    const mapSize = map.getSize();

    if(mapSize.x === 0 || mapSize.y === 0) map.invalidateSize();
    
    return null;
  }

  const AddMarker = () => {
    const map = useMap();

    map.on("click", (e: LeafletMouseEvent) => { 
      setCoords(e.latlng);

      map.setView(e.latlng, map.getZoom());
    });

    return null;
  };

  const defaultMarker = new L.Icon({
      iconUrl: markerIcon.src,
      iconRetinaUrl: markerIcon2x.src,
      shadowUrl: markerShadow.src,
      iconSize: iconSize,
      shadowSize: iconSize
  });
  
  const mapPosition: LatLngExpression = {
    lat: coords?.lat ?? position.lat,
    lng: coords?.lng ?? position.lng
  }

  return (
    <MapContainer
      className="h-[500px] bg-slate-100 z-40 cursor-pointer"
      center={mapPosition}
      zoom={11}
      scrollWheelZoom
      placeholder={<MapPlaceholder />}
    >
        <TileLayer
            attribution={`\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ${translation['contributors']}`}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RenderMap/>
        <AddMarker/>
        {(coords?.lat && coords?.lng) &&
          <Marker
            ref={markerRef}
            draggable
            position={{lat: coords.lat, lng: coords.lng}}
            icon={defaultMarker}
            eventHandlers={{ dragend: () => {
                setCoords(markerRef.current?.getLatLng());
            }}}
          />
        }
    </MapContainer>
  );
};

export default Map;