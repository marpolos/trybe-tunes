import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h2>Page não encontrada(404)</h2>
        <Link to="/trybe-tunes/search">
          <button type="button">
            Pesquisa
          </button>
        </Link>
      </div>
    );
  }
}
