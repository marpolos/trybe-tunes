import React, { Component } from 'react';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';
import AlbunsUnitarios from '../Components/AlbunsUnitarios';

export default class Search extends Component {
  state = {
    artist: '',
    artistSearch: '',
    isButtonOff: true,
    loading: false,
    albuns: [],
  };

  handleSearch = (event) => {
    const { target: { value } } = event;
    this.setState(() => ({ artist: value,
      artistSearch: value }),
    () => {
      this.setState({ isButtonOff: value.length < 2 });
    });
  }

  handleCatch = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { artist } = this.state;
    const data = await searchAlbumsAPI(artist);
    this.setState(() => ({
      artist: '',
      albuns: data,
      loading: false,
    }));
  }

  render() {
    const { artist, isButtonOff,
      loading, albuns, artistSearch } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form htmlFor="pesquisa">
          Nome da banda ou artista
          <br />
          <input
            type="text"
            value={ artist }
            onChange={ this.handleSearch }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ isButtonOff }
            data-testid="search-artist-button"
            onClick={ this.handleCatch }
          >
            Pesquisar
          </button>
          {
            (albuns.length)
              ? (
                <section
                  className="albuns-search"
                >
                  <p className="texto-busca">
                    { `Resultado de álbuns de: ${artistSearch}` }
                  </p>
                  {albuns.map((album) => (
                    <AlbunsUnitarios
                      key={ album.collectionId }
                      { ...album }
                    />
                  ))}
                </section>
              )
              : <h3>Nenhum álbum foi encontrado</h3>
          }
        </form>
      </div>
    );
  }
}
