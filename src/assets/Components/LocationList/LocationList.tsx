import styles from "./LocationList.module.scss";
import LocationListForm from "../AddLocationForm/LocationListForm";
import { v4 as uuidv4 } from 'uuid';

export type Location = {
  id: string;
  locationId: number;
  name: string;
  latitude: number;
  longitude: number;
};

type LocationListProps = {
  locations: Location[];
  handleDeleteClick: (id: string) => void
  handleFormSubmit: (locationId: number, locationName: string, latitude: number, longitude: number) => void
};

const LocationList = ( { locations, handleDeleteClick, handleFormSubmit }: LocationListProps) => {

  // Dividing location list by half to be able to show data in 2 columns
  const locationsPart1 = locations.slice(0, locations.length/2)
  const locationsPart2 = locations.slice(locations.length/2, locations.length)

  return (
    <div className={ styles.locationListMainWrapper }>
      <h2 className={ styles.locationListHeading }>Random Location List</h2>
      <LocationListForm
        handleFormSubmit={handleFormSubmit}
      />
      <div className={styles.locationListContainer}>
        <div className={ styles.locationListColumn }>
          <table className={styles.locationTable}>
            <thead>
              <tr className={ styles.tableHeading }>
                <th className={styles.tableCell}>ID</th>
                <th className={styles.tableCell}>Name</th>
                <th className={styles.tableCell}>Latitude</th>
                <th className={styles.tableCell}>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {locationsPart1.map((location: Location) => (
                <tr key={uuidv4()}>
                  <td className={styles.tableCell}>{location.locationId}</td>
                  <td className={styles.tableCell}>{location.name}</td>
                  <td className={styles.tableCell}>{location.latitude}</td>
                  <td className={`${styles.tableCell} ${styles.flexRow}`}>
                    <p>{location.longitude}</p>
                    <button 
                      className={styles.deleteLocationButton}
                      onClick={() => {
                        handleDeleteClick(location.id)
                      }}
                      >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={ styles.locationListColumn }>
          <table className={styles.locationTable}>
            <thead>
              <tr className={ styles.tableHeading }>
                <th className={styles.tableCell}>ID</th>
                <th className={styles.tableCell}>Name</th>
                <th className={styles.tableCell}>Latitude</th>
                <th className={styles.tableCell}>Longitude</th>
              </tr>
            </thead>
            <tbody>
              {locationsPart2.map((location: Location) => (
                <tr key={uuidv4()}>
                  <td className={styles.tableCell}>{location.locationId}</td>
                  <td className={styles.tableCell}>{location.name}</td>
                  <td className={styles.tableCell}>{location.latitude}</td>
                  <td className={`${styles.tableCell} ${styles.flexRow}`}>
                    <p>{location.longitude}</p>
                    <button 
                      className={styles.deleteLocationButton}
                      onClick={() => {
                        handleDeleteClick(location.id)
                      }}
                      >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationList;