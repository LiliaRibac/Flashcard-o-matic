import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import AddCardsDeckButton from './AddCardsDeckButton';

export default function Deck() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const deckId = useParams().deckId;

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      <h1>DECK</h1>
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb' style={{ lineHeight: 'inherit' }}>
            <li className='breadcrumb-item'>
              <Link to='/'>
                <span
                  className='oi oi-home mr-1'
                  style={{ color: '#0d6efd' }}
                ></span>
                Home
              </Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              React Router
            </li>
          </ol>
        </nav>
      </div>

      <h3>{deck.name}Name</h3>

      <p>{deck.description}description</p>
      <div className='container d-flex px-0'>
        <Link type='button' class='btn btn-secondary mx-1'>
          <span className='oi oi-pencil mr-2'></span>
          Edit
        </Link>
        <Link type='button' className='btn btn-primary mx-1'>
          <span className='oi oi-book mr-2'></span>
          Study
        </Link>

        <Link type='button' className='btn btn-primary'>
          <AddCardsDeckButton deckId={deck.id} />
        </Link>

        <Link type='button' class='btn btn-danger ml-auto'>
          <span className='oi oi-trash mr-2'></span>
          Danger
        </Link>
      </div>

      <h2 className='mt-4'>Cards</h2>
      <div className='card-list'>
        {cards.map((card) => (
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h6>Your Question</h6>
                  <p className='card-text'></p>
                </div>
                <div className='col'>
                  <h6>Your Answer</h6>
                  <p className='card-text'></p>
                  <div className='d-flex justify-content-end'>
                    <div className='pr-2'>
                      <Link
                        // to={`edit-card/${card.id}`}
                        className='btn btn-secondary mx-1'
                      >
                        Edit
                      </Link>
                      <button className='btn btn-danger mx-1'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
