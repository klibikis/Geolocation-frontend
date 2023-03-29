import {  useState } from "react";
import styles from "./LocationListForm.module.scss";

type LocationListFormProps = {
  handleFormSubmit: (locationId: number, locationName: string, latitude: number, longitude: number) => void
}

const LocationListForm = ( { handleFormSubmit }:LocationListFormProps ) => {

  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  return (
    <div className={ styles.formContainer }>
      <form 
        className={ styles.form }
        onSubmit={(e) => {
          e.preventDefault()
          handleFormSubmit(+locationId, locationName, +latitude, +longitude)
          setLocationId('')
          setLocationName('')
          setLatitude('')
          setLongitude('')
        }}
      >
        <div>
          <input 
            type="text" 
            placeholder="Location ID" 
            value={locationId} 
            required
            onChange={(e) => {
              setLocationId(e.target.value)
            }}/>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Location name" 
            value={locationName} 
            required
            onChange={(e) => {
              setLocationName(e.target.value)
            }}/>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Latitude" 
            value={latitude} 
            required
            onChange={(e) => {
              setLatitude(e.target.value)
            }}/>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Longitude" 
            value={longitude} 
            required
            onChange={(e) => {
              setLongitude(e.target.value)
            }}/>
        </div>
        <div>
          <button 
            type="submit" 
            className={ styles.buttonSubmit }>
            Add Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationListForm;
