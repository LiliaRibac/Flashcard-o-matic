import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listDecks, deleteDeck } from '../../utils/api';

export default function ShowListDeck() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
        const response = await listDecks(signal);
        setDecks(response);
      } catch (error) {
        console.log('Error fetching decks:', error);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  function handleDelete({ deckId }) {
    if (
      window.confirm(`Delete this deck? You will not be able to recover it.`)
    ) {
      deleteDeck(deckId);
      console.log(deleteDeck);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      window.location.reload();
    } else {
      history.push('/');
    }
  }
  return (
    <div className='row'>
      {decks.map((deck) => (
        <div className='col-sm-6' key={deck.id}>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{deck.name}</h5>
              <h6 className='card-title'>{deck.cards.length} cards</h6>
              <p className='card-text'>{deck.description}</p>
              <div className='d-flex justify-content-between'>
                <div>
                  <Link to={`/decks/${deck.id}`} className='btn btn-secondary'>
                    <span className='oi oi-eye mr-1'></span>
                    View
                  </Link>

                  <Link
                    to={`/decks/${deck.id}/study`}
                    className='btn btn-primary mx-1'
                  >
                    <span className='oi oi-book'></span> Study
                  </Link>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => handleDelete(deck.id)}
                  >
                    <span className='oi oi-trash'></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
