import './header.css';

function Header({ title, order = { id:null, endereco:null } }) {
  return (
    <header className='header'>
      <div className='header-title'>
        <h1 className='title-order'>{title}</h1>
      </div>
      {order.id && 
        <div className='client'>
          <p className='client-order'>
            Pedido nº {order.id} <br /> {order.endereco}
          </p> 
        </div>
      }
    </header>
  );
}

export default Header;