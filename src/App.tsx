import styles from './App.module.scss'
import HomePage from './Pages/Home/Home.page'
import LoginPage from './Pages/Login/Login.page'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (

    <div className={styles.appContainer}>
      <Routes>
        <Route path = '/' element = {<LoginPage/>} />
        <Route path = '/map' element = {<HomePage/>} />
      </Routes>
    </div>
  )
}

export default App
