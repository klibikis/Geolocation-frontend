import { useEffect, useState } from "react";
import axios from 'axios'
import styles from "./Home.page.module.scss";
import { useNavigate } from "react-router-dom";
import { LatLngTuple } from '../../../node_modules/@types/leaflet/index'
import {LatLng} from '@molteni/coordinate-utils'
import LocationMap from "../../assets/Components/LocationMap/LocationMap";
import LocationList from "../../assets/Components/LocationList/LocationList";
import { Location } from "../../assets/Components/LocationList/LocationList"
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {

  const mapCenter = new LatLng(56.946285, 24.105078)
  const deviationFromMapCenterInKm = 200;
  const locationCount = 1000;

  const newPolyLineCoordinates: LatLngTuple[] = []

  const userEmail = sessionStorage.getItem("geoLocation_userEmail");
  const userPassword = sessionStorage.getItem("geoLocation_userPassword");

  const [locations, setLocations] = useState<Location[]>([]);
  const [polyLineCoordinates, setPolyLineCoordinates] = useState<LatLngTuple[]>([])
  const redirect = useNavigate();

  const handleLogOutClick = () => {
    sessionStorage.clear()
    redirect('/')
  }
  const getLocationsFromServer = () => {
    axios.get('http://localhost:3004/locations').then(({ data }) => {
      setLocations(data);
      data.forEach((location: Location) => {
        newPolyLineCoordinates.push([location.latitude, location.longitude])
      })
      setPolyLineCoordinates(newPolyLineCoordinates)
    })
  }

  const handleGenerateLocationsClick = () => {
    generateLocations()
    getLocationsFromServer()
  }

  const generateLocations = () => {
    axios.get('http://localhost:3004/locations/generate')
  }

  const handleDeleteClick = (id: string) => {
    axios.delete(`http://localhost:3004/locations/delete/${id}`).then(({ data }) => {
      setLocations(data)
    })
  }

  const handleAddFormSubmit = (locationId: number, locationName: string, latitude: number, longitude: number) => {
    axios.post(`http://localhost:3004/locations/new`, {
      id: uuidv4(),
      locationId,
      name: locationName,
      latitude,
      longitude
    }).then(({ data }) => {
      setLocations(data)
    })
  }

  useEffect(() => {
    // Check if registered
    if(!userEmail || !userPassword){
      redirect('/')
    }
    getLocationsFromServer()
  }, []);

  return (
  <>
  <div className={styles.background}></div>
  <div className={ styles.appContainer }>
    <button 
      className={ styles.logOutButton }
      onClick={ handleLogOutClick }
    >
      Logout
    </button>
    <header className={ styles.header }>
      <h1 className={ styles.title }>Geolocation map</h1>
      <p>Random { locationCount } locations in range of { deviationFromMapCenterInKm }km horizontally and vertically from map center with latitude: { mapCenter.latitude } and longitude: { mapCenter.longitude }</p>
      <button 
      className={ styles.generateLocationsButton }
      onClick={ handleGenerateLocationsClick }
    >
      Generate 1000 locations
    </button>
    </header>

    <LocationMap
      mapCenterLatitude={mapCenter.latitude}
      mapCenterLongitude={mapCenter.longitude}
      locations={locations}
      polyLineCoordinates={polyLineCoordinates}
    />
    <LocationList 
      locations={locations}
      handleDeleteClick={(id) => {
        handleDeleteClick(id)
      }}
      handleFormSubmit={(locationId, locationName, latitude, longitude) => {
        handleAddFormSubmit(locationId, locationName, latitude, longitude)
      }}
    />
  </div>
  </>
  );
};

export default HomePage;