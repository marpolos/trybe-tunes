import React from 'react';
import propTypes from 'prop-types';

export default class MusicCard extends React.Component {
  /* handleFavorite = () => {
      const { getMusic } = this.props;
      this.setState((prevState) => ({
        loading: true,
        favorites: [...prevState.favorites, getMusic] }),
      async () => {
        await addSong(getMusic);
        this.setState({ loading: false });
      });
    }; */

  // Como a page é renderizada toda vez que faço uma atualização, se o checkbox
  // ficasse aqui ele nunca ficaria check porque ao desmontar a page ela zera.
  /* handleChecked = () => {
      const { getMusic } = this.props;
      const { favorites } = this.state;
      favorites.some((song) => song.trackId === getMusic.trackId);
    } */

  render() {
    const { trackName, previewUrl, trackId,
      handleChecked, handleFavorite } = this.props;

    return (
      <ol>
        <li>
          <p>{ trackName }</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ handleFavorite }
              checked={ handleChecked }
            />
          </label>
        </li>
      </ol>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  handleChecked: propTypes.bool.isRequired,
  handleFavorite: propTypes.func.isRequired,
};
