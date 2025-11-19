import './App.css'
import { Routes, Route } from 'react-router';
import Home from "./assets/components/Home";
import MainLayout from './assets/components/Layout';

function App() {

  return (
    <>
      <Routes>
        <Route element={< MainLayout />}>
          <Route path='/' element={< Home />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
