import React, { Component } from 'react';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Loading from '../Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favorites: [],
  }

  componentDidMount() {
    this.handleFavoritesMusics();
  }

  handleFavoritesMusics = async () => {
    this.setState({ loading: true });
    const response = await getFavoriteSongs();
    this.setState({ favorites: response, loading: false });
  };

  handleRemove = async (fav) => {
    this.setState((prevState) => ({
      loading: true,
      favorites: prevState.favorites.filter((song) => song !== fav),
    }));
    await removeSong(fav);
    this.setState({ loading: false });
  };

  render() {
    const { loading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <main>
                <h2>Favorites</h2>
                { favorites.map((fav) => (
                  <MusicCard
                    key={ fav.trackName }
                    trackName={ fav.trackName }
                    previewUrl={ fav.previewUrl }
                    trackId={ fav.trackId }
                    handleFavorite={ () => this.handleRemove(fav) }
                    handleChecked={ favorites.some((favorite) => favorite === fav) }
                  />
                ))}
              </main>
            )
        }
      </div>
    );
  }
}
