import './header.css';

function Header({ title, order = { id:null, endereco:null } }) {
  return (
    <header>
      <div className='header-title'>
        <h1 className='title-order'>{title}</h1>
      </div>
      {order.id && 
        <div className='client'>
          <p className='client-order'>
            ID do pedido: {order.id} <br /> {order.endereco}
          </p> 
        </div>
      }
    </header>
  );
}

export default Header;