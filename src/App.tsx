import styles from './App.module.scss'
import LocationsPage from './Pages/Locations/Locations.page'
import LoginPage from './Pages/Login/Login.page'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (

    <div className={styles.appContainer}>
      <Routes>
        <Route path = '/' element = {<LoginPage/>} />
        <Route path = '/map' element = {<LocationsPage/>} />
      </Routes>
    </div>
  )
}

export default App
