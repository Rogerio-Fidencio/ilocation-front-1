import ordersList from './list';
import { //useEffect, 
  useState } from 'react';
//import { useNavigate } from 'react-router';
//import useOrder from '../../hooks/useOrder';
import Header from '../../Components/Header';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import pinIcon from '../../assets/maps-black.svg';
import './orders.css';

function orderItem(order, handleModal) {
  const { id, endereco, distancia } = order;
  return (
    <tr key={id} id={String(id)} onClick={(event) => handleModal(event)}>
      <td id={String(id)}>
        Pedido nº{id}
        <div id={String(id)} className="order-info">
          <span id={String(id)} className="info-address">{endereco}</span>
          <span id={String(id)}>
            <img id={String(id)} className="pin-icon" src={pinIcon} alt="pin map icon" />
            {(distancia / 1000).toFixed(1)}km
          </span>
        </div>
      </td>
    </tr>
  );
}

function Orders() {
  //const { setOrderInfo } = useOrder();
  //const [ ordersList, setOrdersList ] = useState([]);
  const [ showModal, setShowModal ] = useState(false);
  const [ infoModal, setInfoModal ] = useState({ 
    id: '', endereco: '', distancia: '' 
  });
  //const navigate = useNavigate();

  // const handleLoadList = async() => {
  //   try {
  //     const request = await fetch('https://ilocation.herokuapp.com/api/v1/order', {
  //       method: 'metodo do endpoint',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     const response = await request.json();

  //     //**tratamento do response **

  //     setOrdersList(response);
  //   } catch (error) {
  //     //navigate('/server_internal_error', { replace: true });
  //   }
  // };

  const handleModal = (event) => {
    setInfoModal(ordersList.find(
      order => order.id === Number(event.target.id)
    ));
    setShowModal(true);
  };

  // const handleTrackingAssign = () => {
  //   try {
  //     const request = await fetch(`https://ilocation.herokuapp.com/api/v1/assign/${infoModal.id}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-type': 'application/json'
  //       }
  //     });

  //     const response = await request.json();

  //     //**tratamento do response **

  //     setOrderInfo({
  //       id: infoModal.id, 
  //       endereco: infoModal.endereco, 
  //       distancia: infoModal.distancia
  //     });
  //     navigate('/tracking', { replace: true });
  //   } catch (error) {
  //     navigate('/server_internal_error', { replace: true });
  //   }
  // }

  // useEffect(() => {
  //   handleLoadList();
  // }, []);

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
          <p className='modal-p'>{infoModal.endereco} </p>
          <br />
          <span className='modal-span'>
            <img className='pin-icon' src={pinIcon} alt='pin map icon' />
            {(infoModal.distancia / 1000).toFixed(1)}km
          </span>
        </ModalBody>
        <ModalFooter>
          <Button className='modal-btn tracking' 
          //onClick={handleTrackingAssign}
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