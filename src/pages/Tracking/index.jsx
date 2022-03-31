import { useEffect, useState } from 'react';
import { MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import useGetLocation from '../../hooks/useGetLocation'
import Header from '../../Components/Header';
//import useAuth from '../../hooks/useAuth';
import 'leaflet/dist/leaflet.css';
import './tracking.css';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import { useNavigate } from 'react-router';

export default function Tracking() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { orderInfo } = useOrder();
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
    const  userCoords = {
      timestamp: coords[2],
      longitude: coords[1],
      latitude: coords[0]
    }; 
    if(userCoords.latitude === lastCoords.latitude && userCoords.longitude === lastCoords.longitude){
      return;
    }
    setLastCoords(userCoords);

    try {
      const request = await fetch('https://ilocation.herokuapp.com/api/v1/geolocation', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${getToken()}`
        },
        body: JSON.stringify(userCoords)
      });

      //console.log(request);

    } catch (error) {
      console.log(error.message)
    }
    console.log('Peguei geolocalização!');
  }

  const handleConcludedOrder = async() => {
    try {
      const request = await fetch('https://ilocation.herokuapp.com/api/v1/order/status/delivered', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `${getToken()}`
        }
      });

      console.log(getToken());
      console.log(request);
      //setOrderInfo({});
       //encerrar watch ID
      //navigator.geolocation.clearWatch(watchID);
      navigate('/pedidos', { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleCancelOrder = async() => {
    try {
      const request = await fetch('https://ilocation.herokuapp.com/api/v1/order/status/cancelled', {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `${getToken()}`
        }
      });

      console.log(request);
      //setOrderInfo({});
      //encerrar watch ID
      //navigator.geolocation.clearWatch(watchID);
      navigate('/pedidos', { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Header title='Pedidos' />
        <div className="row cliente">
          <p className="cliente-pedido">{orderInfo.id}</p>
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
        <button type="button" className="btn btn-primary btn-verde " onClick={handleConcludedOrder}>Concluir</button>
        <button type="button" className="btn btn-primary "onClick={handleCancelOrder} >Cancelar</button>
      </div>
    </>
  )
}