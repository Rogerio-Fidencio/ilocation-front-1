import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ordersList from './list';
import pinIcon from '../../assets/maps-black.svg';

function Orders() {
  return (
    <>
      <div class='header-title'>
        <p class='title-order'>Pedidos</p>
      </div>

      <Table responsive>
        <tbody>
          <tr id='1234'>
            <td id='1234'>
              Pedido nº1234
              <div id="1234" class="order-info">
                <span id="1234" class="info-address">Endereço: Rua Lirio Verde, 102, São Paulo/SP a historia comecou quando um relogio esquisito</span>
                <span id="1234">
                  <img id="1234" class="pin-icon" src={pinIcon} alt="pin map icon" />1,2km
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      <Modal toggle={function noRefCheck(){}} fullscreen='md'>
        <ModalHeader toggle={function noRefCheck(){}}>
          Pedido nº----
        </ModalHeader>
        <ModalBody>
          Informações aqui
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={function noRefCheck(){}}>
            Do Something
          </Button>
          {' '}
          <Button onClick={function noRefCheck(){}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Orders;