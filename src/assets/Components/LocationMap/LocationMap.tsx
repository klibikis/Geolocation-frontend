import styles from "./LocationMap.module.scss";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import { LatLngTuple } from '../../../../node_modules/@types/leaflet/index'
import { v4 as uuidv4 } from 'uuid';
import { Location } from "../LocationList/LocationList"

type LocationListProps = {
  locations: Location[],
  mapCenterLatitude: number,
  mapCenterLongitude: number,
  polyLineCoordinates: LatLngTuple[]
};

const LocationMap = ({ locations, mapCenterLatitude, mapCenterLongitude, polyLineCoordinates }: LocationListProps) => {

  return (
    <>
      <MapContainer
        className={styles.mapContainer}
        center={[mapCenterLatitude, mapCenterLongitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => {
          return (
            <Marker position={[location.latitude, location.longitude]} key={uuidv4()}>
              <Popup>
                Id: {location.id} <br /> 
                Location: {location.name} <br /> 
                Latitude: {location.latitude} <br /> 
                Longitude: {location.longitude}
              </Popup>
            </Marker>
          )
        })}
        <Polyline pathOptions={ {color: 'lime'} } positions={polyLineCoordinates} />
      </MapContainer>
    </>
  );
};

export default LocationMap;
