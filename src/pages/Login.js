import React, { Component } from 'react';
import { string, func, bool } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

export default class Login extends Component {
  state = {
    redirect: false,
    loading: false,
  }

  componentWillUnmount() {
    // Aqui coloquei o unmount para resatar o valor do redirect
    this.setState({ redirect: false });
  }

  handleButton = async () => {
    // Quando clico no butto ele vem pra cá e chama o loadind
    // Depois muda o state quando a promise retorna.
    const { nameUser } = this.props;
    this.setState({ loading: true });
    const userOK = await createUser({ name: nameUser });
    if (userOK === 'OK') {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  }

  render() {
    const {
      props: { nameUser, buttonFree, handleNameUser },
      state: { loading, redirect },
    } = this;

    // Aqui tenho 3 possibilidades de renderização de acordo com o state.
    if (loading) {
      return <Loading />;
    }

    if (redirect) {
      return <Redirect to="/trybe-tunes/search" />;
    }

    return (
      <div className="login" data-testid="page-login">
        <h2>Login</h2>
        User:
        <input
          data-testid="login-name-input"
          type="text"
          value={ nameUser }
          onChange={ handleNameUser }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ buttonFree }
          onClick={ this.handleButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  nameUser: string.isRequired,
  buttonFree: bool.isRequired,
  handleNameUser: func.isRequired,
};
