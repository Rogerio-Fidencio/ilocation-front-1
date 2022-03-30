import './servererror.css';

function ServerError() {
  return (
    <div className="container-error">
      <div className="error-content">
        {/* <img className="content-img" src={errorIcon} alt="erro 500: problema interno do servidor" /> */}

        <main className="content-main">
          <h1 className="main-h1">Falha nossa!</h1>
          <p className="main-description">
            <b>Parece que estamos com problemas &#128549;</b>
            <br />
            Tente mais tarde... <br /> Enquanto isso, tome um cafezinho &#9749;
          </p>
        </main>
      </div>
    </div>
  );
}

export default ServerError;