import { useEffect, useState } from "react";
import axios from 'axios'
import styles from "./Locations.page.module.scss";
import { useNavigate } from "react-router-dom";
import { LatLngTuple } from 'leaflet'
import LocationMap from "../../assets/Components/LocationMap/LocationMap";
import LocationList, { Location } from "../../assets/Components/LocationList/LocationList";
import { v4 as uuidv4 } from 'uuid';

const LocationsPage = () => {

  const mapCenter = [56.9462, 24.1050]
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

  useEffect(() => {
    if(!userEmail || !userPassword){
      redirect('/')
    }
    getLocationsFromServer()
  }, []);

  const getLocationsFromServer = async () => {
    await axios.get('http://localhost:3004/locations').then(({ data }) => {
      if(!data){
        throw new Error('Somethong went wrong!')
      }
      setLocations(data);
      data.forEach((location: Location) => {
        newPolyLineCoordinates.push([location.latitude, location.longitude])
      })
      setPolyLineCoordinates(newPolyLineCoordinates)
    })
  }
  const postLocationToDb = async (locationId: number, locationName: string, latitude: number, longitude: number) => {
    await axios.post(`http://localhost:3004/locations/new`, {
      id: uuidv4(),
      locationId,
      name: locationName,
      latitude,
      longitude
    }).then((res) => {
      if(!res.data){
        throw new Error('Somethong went wrong!')
      }
    })
  }

  const handleGenerateLocationsClick = async () => {
    await generateLocations()
    getLocationsFromServer()
  }

  const generateLocations = async () => {
    await axios.get('http://localhost:3004/locations/generate')
  }

  const handleDeleteClick = (id: string) => {
    axios.delete(`http://localhost:3004/locations/delete/${id}`).then(({ data }) => {
      if(!data){
        throw new Error('Somethong went wrong!')
      }
      const newLocations = locations.filter((location) => {
          return location.id != id;
      })
      setLocations(newLocations)
    })
  }

  const handleAddFormSubmit = async (locationId: number, locationName: string, latitude: number, longitude: number) => {
    await postLocationToDb(locationId, locationName, latitude, longitude)
    getLocationsFromServer()
  }

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
        <p>Random { locationCount } locations in range of { deviationFromMapCenterInKm }km horizontally and vertically from map center with latitude: { mapCenter[0] } and longitude: { mapCenter[1] }</p>
        <button 
        className={ styles.generateLocationsButton }
        onClick={ handleGenerateLocationsClick }
      >
        Generate 1000 locations
      </button>
      </header>

      <LocationMap
        mapCenterLatitude={mapCenter[0]}
        mapCenterLongitude={mapCenter[1]}
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

export default LocationsPage;