import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from '../Componets/Home/Home';
// import Decks from '../Componets/Decks/CreatDeckSreen';
import CreatDeckScreen from '../Componets/Decks/CreatDeckSreen';

function Layout() {
  return (
    <>
      <Header />
      <div className='container'>
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route>
            <CreatDeckScreen path='/decks/new' />
          </Route>
        </Switch>
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
