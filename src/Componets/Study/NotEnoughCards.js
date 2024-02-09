import React from 'react';
import { Link } from 'react-router-dom';

const NotEnoughCards = ({ deckId, numberOfCards, deck }) => {
  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span
                className='oi oi-home mr-1'
                style={{ color: '#0d6efd' }}
              ></span>
              Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/'>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Study
          </li>
        </ol>
      </nav>
      <h3>Study</h3>
      <h4>Not enough cards in the deck.</h4>
      <p>
        You need at least 3 cards to study. There are {numberOfCards} cards in
        this deck.
      </p>
      <Link to={`/decks/${deckId}/cards/new`} className='btn btn-primary'>
        <strong>+</strong> Add Cards
      </Link>
    </>
  );
};

export default NotEnoughCards;
