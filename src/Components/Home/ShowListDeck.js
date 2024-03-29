import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../../utils/api';

export default function ShowListDeck() {
  // State Initialization
  const [decks, setDecks] = useState([]);

  const abortController = new AbortController();
  const signal = abortController.signal;

  // useEffect fetches the list of decks using the listDecks function
  useEffect(() => {
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

  // handleDelete function effectively manages the deletion of a deck,
  //  displays a confirmation message to ensure the user's intent,
  const handleDelete = async (id) => {
    const confirmMessage =
      'Delete this deck?\n\nYou will not be able to recover it.';
    const confirm = window.confirm(confirmMessage);

    if (confirm) {
      await deleteDeck(id);
      const response = await listDecks(signal);
      setDecks(response);
    }
  };

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
                    value={deck.id}
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
