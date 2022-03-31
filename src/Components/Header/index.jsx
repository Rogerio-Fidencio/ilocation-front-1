import './header.css';

function Header({ title = null, order = { id: null, customerName: null,
  customerCep: null, customerNumRes: null, customerCompl: null } 
}) {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1 className='title-order'>
          {title ? title : `Pedido nº ${order.id}`}
        </h1>
      </div>
      {order.id && 
        <div className='client'>
          <p className='client-order'>
            {order.customerName} <br />
            {order.customerCep}
            {order.customerCompl ? ` - ${order.customerCompl}` : ''}
            {order.customerNumRes ? `, ${order.customerNumRes}` : ''}
          </p> 
        </div>
      }
    </header>
  );
}

export default Header;