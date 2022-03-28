
import 'leaflet/dist/leaflet.css';
import { MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import "./tracking.css"
import useGetLocation from '../../hooks/useGetLocation'
import { useState } from 'react';

export default function Tracking() {
  const [ change, setChange ] = useState(true);
  const { coords } = useGetLocation();

  if (!coords) {
    return <h1>Obtendo localização ...</h1>
  }

  function handleChange(){
    while(change){
      handleGeolocation()
    }
      setChange(!change)
      // navigate('/orders', { replace: true });
  }

  const handleGeolocation = async(event) => {
    event.preventDefault();

    //** validação básica de usuário **
    
    const userCoords = {
      latitude: coords[0],
      longitude: coords[1],
      timeStamp: coords[2]
    }; //para mandar pro back

    try {
      const request = await fetch('endpoint de geolocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCoords)
      })
        .then((response) => response.json())
        .then((userCoords) => {
          console.log("Success:", userCoords);
        })
      // const response = await request.json();

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
      <div className="container">
        <div className="row header-titulo">
          <p className="titulo-pedido">Pedidos</p>
        </div>
        <div className="row cliente">
          <p className="cliente-pedido">Cliente: Ze endereco: Rua 1, vila 1, cidade um</p>
        </div>
      </div>

      <h3>
        Latitude: {coords[0]} <br />
        Longitude: {coords[1]} <br />
        TimeStamp: {coords[2]}
      </h3>

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
        <button type="submit" className="btn btn-primary " onClick={() => handleChange()}><a href="./pedidos.html">Cancelar</a></button>
      </div>
    </>
  )
}
