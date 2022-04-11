import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './index.css';

class App extends React.Component {
  state = {
    nameUser: '',
    buttonFree: true,
    /* redirect: false,
    loading: false, */
  }

  handleNameUser = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      nameUser: value,
    }),
    () => {
      // Aqui nesse segunda função que uso como argumento faço a validação
      // do button. Na primeira função eu set o value do user.
      const { nameUser } = this.state;
      const MIN_NAME_USER = 3;
      this.setState({ buttonFree: nameUser.length < MIN_NAME_USER });
    });
  };

  render() {
    const { nameUser, buttonFree } = this.state;

    return (
      <Router>
        <h1>TrybeTunes</h1>
        <Switch>
          <Route exact path="/trybe-tunes/">
            <Login
              buttonFree={ buttonFree }
              nameUser={ nameUser }
              handleNameUser={ this.handleNameUser }
              /* redirect={ redirect }
              loading={ loading } */
            />
          </Route>
          <Route exact path="/trybe-tunes/profile"><Profile /></Route>
          <Route path="/trybe-tunes/search"><Search /></Route>
          <Route
            path="/trybe-tunes/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route path="/trybe-tunes/favorites"><Favorites /></Route>
          <Route path="/trybe-tunes/profile/edit"><ProfileEdit /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
        <footer>Marcelle Monteiro by Trybe</footer>
      </Router>
    );
  }
}

export default App;
