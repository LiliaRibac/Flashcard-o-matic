import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from '../Components/Home/Home';
import Deck from '../Components/Deck/Deck';
import CreatDeckScreen from '../Components/Decks/CreatDeckSreen';
import AddCard from '../Components/Cards/AddCard';
import EditCard from '../Components/Cards/EditCard';
import EditDeckBtn from '../Components/Deck/EditDeckBtn';
import Study from '../Components/Study/StudyScreen';
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
          <Route exact path='/decks/new'>
            <CreatDeckScreen />
          </Route>
          <Route exact path='/decks/:deckId'>
            <Deck />
          </Route>

          <Route exact path='/decks/:deckId/edit'>
            <EditDeckBtn />
          </Route>
          <Route exact path='/decks/:deckId/cards/new'>
            <AddCard />
          </Route>
          <Route exact path='/decks/:deckId/cards/:cardId/edit'>
            <EditCard />
          </Route>
          <Route exact path='/decks/:deckId/study'>
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
