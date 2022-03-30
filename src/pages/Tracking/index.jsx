
import 'leaflet/dist/leaflet.css';
import { MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import "./tracking.css"
import useGetLocation from '../../hooks/useGetLocation'
import { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import useAuth from '../../hooks/useAuth';

export default function Tracking() {
  const [ change, setChange ] = useState(true);
  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Obtendo localização ...</h1>
  }

  
  function handleChange(){

    handleGeolocation()
    // while(change){
    // }
      setChange(!change)
      // navigate('/orders', { replace: true });
  }

  const handleGeolocation = async(event) => {

    //** validação básica de usuário **


    const userCoords = {
      timestamp: coords[2],
      longitude: coords[1],
      latitude: coords[0]
    }; //para mandar pro back

    console.log(userCoords)

    try {
      const request = await fetch('http://localhost:8080/api/v1/geolocation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb2dlcmlvQGVtYWlsLmNvbSIsImlzcyI6IkFkbWluIiwiZXhwIjoxNjQ4NjAxNzcyLCJ1c2VyIjoie1wiaWRcIjoxMyxcIm5hbWVcIjpcIlJvZ2VyaW9cIixcInBob25lXCI6XCI5OTg4NjY1NTQ0M1wifSJ9.B5zJ44RBEqV3l7fYlQCUH6UMEThDGJoAckYkI2Cz4eE"
        },
        body: JSON.stringify(userCoords)
      })
        .then((response) => response.json())
        .then((userCoords) => {
          console.log("Success:", userCoords);
        })
      const response = await request.json();

      console.log(response)

      //**tratamento do response **

      // setAuthData({
        // token: response.token,
        // idUser: response.id,
      // });

      // navigate('/orders', { replace: true });
    } catch (error) {
      //**tratativa de erro no back
      //navigate('/server_internal_error', { replace: true });
    }
  }

  return (
    <>
      {/* <div className="container"> */}
      <Header title='Pedidos' />
        <div className="row cliente">
          <p className="cliente-pedido">Cliente: Ze endereco: Rua 1, vila 1, cidade um</p>
        </div>
      {/* </div> */}

      {/* <h3>
        Latitude: {coords[0]} <br />
        Longitude: {coords[1]} <br />
        TimeStamp: {coords[2]}
      </h3> */}

      <div className="container container-map">
        <MapContainer center={{
          lat: coords[0],
          lng: coords[1]
        }}
          zoom={13} 
          // whenCreated={() => { }}
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
        {/* <button type="submit" className="btn btn-primary btn-verde " onClick={handleChange()}>Concluir</button>
        <button type="submit" className="btn btn-primary " onClick={handleChange()}>Cancelar</button> */}
        <button type="submit" className="btn btn-primary btn-verde "><a href="./pedidos.html">Concluir</a></button>
        <button type="submit" className="btn btn-primary " onClick={(event) => handleChange()}>Cancelar</button>
      </div>
    </>
  )
}
