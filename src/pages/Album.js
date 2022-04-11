import React, { Component } from 'react';
import { shape, number } from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../Loading';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    musics: [],
    loading: true,
    favorites: [],
    artista: '',
    album: '',
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    if (id) {
      this.handleAlbum(id);
      // Aqui no didMount eu chamo funções assíncronas.
      this.handleCallBackFavorites();
    }
  }

  handleAlbum = async (id) => {
    const data = await getMusics(id);

    this.setState({ musics: data,
      loading: false,
      artista: data[0].artistName,
      album: data[0].collectionName,
    });
  };

  handleFavorite = ({ target }) => {
    const { musics } = this.state;
    const { checked, id } = target;
    // console.log(checked);
    const music = musics.find((favorite) => favorite.trackId === parseInt(id, 10));
    this.setState((prevState) => ({
      loading: true,
      // Aqui precisei mudar o favorites porque não estava retirando
      // do array as desmarcadas no box.
      favorites: checked
        ? [...prevState.favorites, music]
        : prevState.favorites.filter((favs) => favs.trackId !== parseInt(id, 10)),
    }),
    async () => {
      if (checked) await addSong(music);
      // Aqui preciso ter um if/else para fazer uma coisa ou outra.
      else await removeSong(music);
      this.setState(() => ({
        loading: false,
      }));
    });
  };

  /* handleChecked = () => {
    const { favorites, musics } = this.state;

    favorites.some((song) => {
      musics.find((music) => music.trackId === song.trackId);
      return song.trackId === });
  } */

  handleCallBackFavorites = async () => {
    // Aqui era só chamar a função async.
    this.setState({ loading: true });
    const favoritesRecuperadas = await getFavoriteSongs();
    if (favoritesRecuperadas) {
      this.setState({
        // As favoritas já estarão marcadas porque quando
        // construo a lista eu já faço check de tudo que é
        // favorite. Toda vez que faço render, que é em toda atualização
        // também já vai checando as presentes no array favorites.
        favorites: [...favoritesRecuperadas],
        loading: false,
      });
    }
  }

  render() {
    const { musics, loading, favorites, artista, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          // Aqui o loading precisa estar abaixo do header para passar no requisito.
          loading
            ? <Loading />
            : (
              <main>
                <h2 data-testid="artist-name">{ artista }</h2>
                <h3 data-testid="album-name">{ album }</h3>
                {
                // Coloquei esse slice para pular a posição 1.
                // O slice faz um corte no array e cria um novo.
                // Na posição 1 coloco onde quero começar, depois da vírgula onde quero
                // parar. No caso fiz slice porque a posição 1 não é música.
                // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
                  musics.slice(1).map((music) => (
                    <MusicCard
                      key={ music.trackName }
                      // getMusic={ music }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackId={ music.trackId }
                      handleFavorite={ this.handleFavorite }
                      handleChecked={ favorites
                        .some((song) => song.trackId === music.trackId) }
                    />))
                }
              </main>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: shape({
    params: shape({
      id: number.isRequired,
    }).isRequired,
  }).isRequired,
};
