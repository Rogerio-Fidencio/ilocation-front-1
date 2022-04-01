import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import Header from '../../Components/Header';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
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
      const request = await fetch('https://ilocation.herokuapp.com/api/v1/order/available', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${getToken()}`
        }
      });

      const response = await request.json();

      setOrdersList(response);
    } catch (error) {
      console.log(error.message);
      //navigate('/server_internal_error', { replace: true });
    }
  };

  const handleModal = (event) => {
    setInfoModal(ordersList.find(
      order => order.id === Number(event.target.id)
    ));

    setShowModal(true);
  };

  const handleTrackingAssign = async() => {
    try {
      const request = await fetch(`https://ilocation.herokuapp.com/api/v1/order/assign/${infoModal.id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `${getToken()}`
        }
      });

      if (request.status > 204) return;

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
            {/*validar campos vazios*/}
            {infoModal.customerCep}, {infoModal.customerNumRes} - 
            {infoModal.customerCompl}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button className='modal-btn tracking' 
            onClick={handleTrackingAssign}>
            Iniciar rastreio
          </Button>
          <Button className='modal-btn cancel' onClick={() => setShowModal (false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Orders;