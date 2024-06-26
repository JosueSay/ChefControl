import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LoginForm from './Login/LoginForm';
import RegisterForm from './Register/RegisterForm';
import HomeChef from './Home/HomeChef';
import HomeMesero from './Home/HomeMesero';
import Cuentas from './Home/Cuentas'; 
import DetalleCuenta from './Home/DetalleCuenta';
import CrearCuenta from './Home/CrearCuenta';

function CrearCuentaWrapper() {
  // Extraer el userId de la URL
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('userId');

  return <CrearCuenta userId={userId} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
          <Route path="/home-chef">
            <HomeChef />
          </Route>
          <Route path="/home-mesero">
            <HomeMesero />
          </Route>
          <Route path="/cuentas" exact>
            <Cuentas />
          </Route>
          <Route path="/cuentas/:idCuenta">
            <DetalleCuenta />
          </Route>
          <Route path="/crearCuenta">
            <CrearCuentaWrapper /> {/* Usa el componente envolvente */}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
