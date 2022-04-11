import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  state = {
    user: '',
    loading: false,
  }
  // Criei um novo state porque precisava pegar o user na API,e não por props.

  componentDidMount() {
    // Usei o did mount porque ele espera o componente montar e aí chama essa
    // promise que é async, então provavelmente didMount deve ser async porque
    // a partir dela consigo acessar o valor, mas fora recebo promise.
    this.getUserLogOn();
  }

  getUserLogOn = async () => {
    // A func que chama loading e a API.
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ loading: false, user: name });
  };

  render() {
    const { user, loading } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <header className="header" data-testid="header-component">
        <Link className="link" to="/search" data-testid="link-to-search">Search</Link>
        <Link
          className="link"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritos
        </Link>
        <Link className="link" to="/profile" data-testid="link-to-profile">Perfil</Link>
        <p data-testid="header-user-name">
          {`Usuário: ${user}` }
        </p>
      </header>

    );
  }
}

// Como chamaa uma assync no corpo do componente:
// https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
