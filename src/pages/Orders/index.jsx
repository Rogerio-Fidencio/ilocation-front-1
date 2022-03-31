import ordersList from './list';
import { useEffect, 
  useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import Header from '../../Components/Header';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
//import pinIcon from '../../assets/maps-black.svg';
import './orders.css';

function orderItem(order, handleModal) {
  const { id, customerCep, customerNumRes, customerCompl } = order;

  return (
    <tr key={id} id={String(id)} onClick={(event) => handleModal(event)}>
      <td id={String(id)}>
        Pedido nº{id}
        <div id={String(id)} className="order-info">
          <span id={String(id)} className="info-address">
            {customerCep}, {customerNumRes} - {customerCompl}
          </span>
          {/* <span id={String(id)}>
            <img id={String(id)} className="pin-icon" src={pinIcon} alt="pin map icon" />
            {(distancia / 1000).toFixed(1)}km
          </span> */}
        </div>
      </td>
    </tr>
  );
}

function Orders() {
  const { getToken } = useAuth();
  const { setOrderInfo } = useOrder();
  const [ ordersList, setOrdersList ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ infoModal, setInfoModal ] = useState({ 
    id: '', customerCep: '', customerNumRes: '', customerCompl: ''
  });
  const navigate = useNavigate();

  const handleLoadList = async() => {
    try {
      console.log(getToken());
      const request = await fetch('http://localhost:8080/api/v1/order/available', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getToken()}`
        }
      });

      const response = await request.json();

      console.log(response);

      setOrdersList(response);
    } catch (error) {
      console.log(error.message);
      //navigate('/server_internal_error', { replace: true });
    }
  };

  const handleModal = (event) => {
    console.log(event.target.id);
    setInfoModal(ordersList.find(
      order => order.id === Number(event.target.id)
    ));
    setShowModal(true);
  };

  const handleTrackingAssign = async() => {
    try {
      const request = await fetch(`http://localhost:8080/api/v1/assign/${infoModal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${getToken()}`
        }
      });

      //const response = await request.json();

      //**tratamento do response **

      setOrderInfo({
        id: infoModal.id, 
        endereco: infoModal.endereco, 
        distancia: infoModal.distancia
      });
      navigate('/rastreio', { replace: true });
    } catch (error) {
      console.log(error.message);
      //navigate('/server_internal_error', { replace: true });
    }
  }

  useEffect(() => {
    handleLoadList();
  }, []);

  return (
    <>
      <Header title='Pedidos' />

      <Table responsive>
        <tbody>
          {ordersList.map(order => orderItem(order, handleModal))}
        </tbody>
      </Table>

      <Modal className='order-modal' isOpen={showModal} fullscreen='sm'>
        <Button className='modal-close' close onClick={() => setShowModal(false)} />
        <ModalHeader>
            Pedido nº {infoModal.id}
        </ModalHeader>
        <ModalBody>
          <p className='modal-p'>
            {infoModal.customerCep}, {infoModal.customerNumRes} - {infoModal.customerCompl}
          </p>
          <br />
          {/* <span className='modal-span'>
            <img className='pin-icon' src={pinIcon} alt='pin map icon' />
            {(infoModal.distancia / 1000).toFixed(1)}km
          </span> */}
        </ModalBody>
        <ModalFooter>
          <Button className='modal-btn tracking' 
            onClick={handleTrackingAssign}
          >
            Iniciar rastreio
          </Button>
          <Button className='modal-btn cancel' onClick={() => setShowModal(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Orders;