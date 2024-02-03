'use client'

import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, PointTuple } from 'leaflet';
import { useMap } from "react-leaflet";

import blueIcon2x from '#/assets/markers/marker-icon-2x-blue.png';
import blueIcon from '#/assets/markers/marker-icon-blue.png';
import redIcon2x from '#/assets/markers/marker-icon-2x-red.png';
import redIcon from '#/assets/markers/marker-icon-red.png';
import markerShadow from '#/assets/markers/marker-shadow.png';

import { IMapProps } from "@/types/home/components/mapProps";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
} from "react-leaflet";
import { IProject } from "@/types/home/project";
import { PageState } from "@/types/home/pageState";

const position: LatLngExpression = {
  lat: 41.0166, 
  lng: 29.0122
}

const Map = ({
  translation,
  projects,
  showPopup,
  selectedProject,
  setProject,
  scrollIntoProject,
  pageState
} : IMapProps) => {
  const iconSize: PointTuple = [30, 50];

  const MapPlaceholder = () => {
    return (
      <p>
        <noscript>
          {translation['javascript-disabled']}
        </noscript>
      </p>
    );
  }

  const popupElement = `
    <div>        
      <h3 class="font-medium text-center break-all mb-2">
        ${selectedProject?.name}
      </h3>
      ${selectedProject?.image ? `<img src=${selectedProject?.image} width="200" height="100" />` : ''}
    </div>
  `

  const ChangeMapView = ({project} : {project: IProject | undefined }) => {
    const map = useMap();

    let lat, lng: number | undefined;

    if(project?.coordinates) {
      ({ lat, lng } = project?.coordinates)
    };

    if(project && lat && lng) {
      map.openPopup(popupElement, { lat: lat, lng: lng }, { minWidth: 200, maxWidth: 200 });
      map.setView({ lat: lat, lng: lng }, map.getZoom());
    }
    
    if(!showPopup) map.closePopup();

    return null;
  }

  const defaultMarker = new L.Icon({
      iconUrl: blueIcon.src,
      iconRetinaUrl: blueIcon2x.src,
      shadowUrl: markerShadow.src,
      iconSize: iconSize,
      shadowSize: iconSize   
    });
  
  const selectedMarker = new L.Icon({
      iconUrl: redIcon.src,
      iconRetinaUrl: redIcon2x.src,
      shadowUrl: markerShadow.src,
      iconSize: iconSize,
      shadowSize: iconSize
  });
  
  return (
    <div className={`${pageState === PageState.Map ? "grow opacity-100 visible" : "opacity-0 invisible"} duration-200 ease-in transition-opacity z-20`}>
      <MapContainer
        className="h-full w-full bg-slate-100 z-40"
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        placeholder={<MapPlaceholder/>}
      >
        <ChangeMapView
          project={selectedProject}
        />
        <TileLayer
          attribution={`\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ${translation['contributors']}`}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects?.map((project, index) => {
          const { lat, lng } = project.coordinates!;
          
          return(
            lat && lng &&
            <Marker
              key={index}
              position={{lat: lat, lng: lng}}
              icon={project.id === selectedProject?.id ? selectedMarker : defaultMarker}
              eventHandlers={{ click: () => {
                setProject({...project});
                scrollIntoProject(index);
              }}}
            />
          )
        })}
      </MapContainer>
    </div>
  );
};

export default Map;