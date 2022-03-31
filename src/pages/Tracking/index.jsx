import { useEffect, useState } from 'react';
import { MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import useGetLocation from '../../hooks/useGetLocation'
import Header from '../../Components/Header';
//import useAuth from '../../hooks/useAuth';
import 'leaflet/dist/leaflet.css';
import './tracking.css';

export default function Tracking() {
  const [ change, setChange ] = useState(true);
  const { coords } = useGetLocation();
  const[ lastCoords, setLastCoords ] = useState({
    timestamp: 1,
    longitude: 1,
    latitude: 1
  });
  let timeOut = null;


  if (!coords) {
    return <h1>Obtendo localização ...</h1>
  }

  handleGeolocation();

  async function handleGeolocation() {
    console.log("oii")
    console.log(coords)
    const  userCoords = {
      timestamp: coords[2],
      longitude: coords[1],
      latitude: coords[0]
    }; 
    if(userCoords.latitude === lastCoords.latitude && userCoords.longitude === lastCoords.longitude){
      console.log("mesma coisa carai")
    
      return
    }
    setLastCoords(userCoords);
    console.log(coords)
    console.log(userCoords)

    try {
      const request = await fetch('http://localhost:8080/api/v1/geolocation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJIZW5yaXF1ZUBFbWFpbC5jb20iLCJpc3MiOiJBZG1pbiIsImV4cCI6MTY0ODY3MzgwMCwidXNlciI6IntcImlkXCI6MTEsXCJuYW1lXCI6XCJIZW5yaXF1ZVwiLFwicGhvbmVcIjpcIjY1NDM4NzY5MDc2XCJ9In0.BenqdUFzPS2LXBYi-1CmqXrZXukMtwi4AgEn0FDKAH8"
        },
        body: JSON.stringify(userCoords)
      })
      console.log(await request.status);

    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <Header title='Pedidos' />
        <div className="row cliente">
          <p className="cliente-pedido">Cliente: Ze endereco: Rua 1, vila 1, cidade um</p>
        </div>

      <div className="container container-map">
        <MapContainer center={{
          lat: coords[0],
          lng: coords[1]
        }}
          zoom={13} 
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords[0], coords[1]]} >
            <Popup>
              Entregador
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="container alinhar-btn">
        <button type="submit" className="btn btn-primary btn-verde "><a href="./pedidos.html">Concluir</a></button>
        <button type="submit" className="btn btn-primary " >Cancelar</button>
      </div>
    </>
  )
}