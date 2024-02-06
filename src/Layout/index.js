import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from '../Componets/Home/Home';
import Deck from '../Componets/Deck/Deck';
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
          <Route path='/decks/new'>
            <CreatDeckScreen />
          </Route>
          <Route path='/decks/:deckId'>
            <Deck />
          </Route>
        </Switch>
        <NotFound />
      </div>
    </>
  );
}

export default Layout;
