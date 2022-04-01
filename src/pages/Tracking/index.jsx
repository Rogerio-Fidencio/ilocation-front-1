import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import useGetLocation from '../../hooks/useGetLocation';
import Header from '../../Components/Header';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { Button, Spinner } from 'reactstrap';
import 'leaflet/dist/leaflet.css';
import './tracking.css';

export default function Tracking() {
  const { getToken } = useAuth();
  const { orderInfo } = useOrder();
  const { coords } = useGetLocation();
  const[ lastCoords, setLastCoords ] = useState({
    timestamp: 1,
    longitude: 1,
    latitude: 1
  });
  const navigate = useNavigate();

  if (!coords) {
    return <Spinner color="danger">Loading...</Spinner>
  }

  handleGeolocation();

  const handleGeolocation = async() => {
    const  userCoords = {
      timestamp: coords[2],
      longitude: coords[1],
      latitude: coords[0]
    }; 

    if(
      userCoords.latitude === lastCoords.latitude &&
      userCoords.longitude === lastCoords.longitude
    ) return;

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

      navigate('/pedidos', { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Header order={orderInfo} />

      <div className="container container-map">
        <MapContainer center={{ lat: coords[0], lng: coords[1] }}zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords[0], coords[1]]} >
            <Popup>Entregador</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="container align-btn">
        <Button className='btn-confirm' onClick={handleConcludedOrder}>Concluir</Button>
        <Button className='btn-cancel' onClick={handleCancelOrder}>Cancelar</Button>
      </div>
    </>
  )
}