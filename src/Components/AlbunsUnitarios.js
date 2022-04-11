import React from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import '../index.css';

export default class AlbunsUnitarios extends React.Component {
  render() {
    const { artistName, collectionId,
      collectionName, artworkUrl100,
    } = this.props;
    return (
      <div classNam="album-unitario" key={ collectionId }>
        <h3>{ artistName }</h3>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          { collectionName }
        </Link>
      </div>
    );
  }
}

AlbunsUnitarios.propTypes = {
  artistName: string.isRequired,
  collectionId: string.isRequired,
  collectionName: string.isRequired,
  artworkUrl100: string.isRequired,
};
