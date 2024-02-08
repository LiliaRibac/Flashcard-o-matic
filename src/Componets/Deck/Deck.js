import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteCard, deleteDeck } from '../../utils/api';
// import AddCardsDeckButton from './AddCardsDeckButton';
// import CreatDeckScreen from '../Decks/CreatDeckSreen';

export default function Deck() {
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const { deckId, cardId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, [deckId]);

  // const handleDelete = async (cardId) => {
  //   const confirmMessage =
  //     'Delete this deck?\n\nYou will not be able to recover it.';
  //   const confirm = window.confirm(confirmMessage);

  //   if (confirm) {
  //     await deleteCard(cardId);
  //     // window.location.reload();
  //     setCards(cards.filter((card) => card.id !== cardId));

  //     history.push('/');
  //   }
  // };

  const handleDelete = async () => {
    let confirmMessage;

    if (cardId) {
      confirmMessage =
        'Delete this card?\n\nYou will not be able to recover it.';
    } else {
      confirmMessage =
        'Delete this deck?\n\nYou will not be able to recover it.';
    }

    const confirm = window.confirm(confirmMessage);

    if (confirm) {
      if (cardId) {
        await deleteCard(cardId);
        setCards(cards.filter((card) => card.id !== cardId));
      } else {
        await deleteDeck(deckId);
        history.push('/');
      }
    }
  };

  return (
    <>
      <h1>DECK</h1>
      <div>
        <nav aria-label='breadcrumb'>
          <ol className='breadcrumb' style={{ lineHeight: 'inherit' }}>
            <li className='breadcrumb-item'>
              <Link to={'/decks'}>
                <span
                  className='oi oi-home mr-1'
                  style={{ color: '#0d6efd' }}
                ></span>
                Home
              </Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              {deck.name}
            </li>
          </ol>
        </nav>
      </div>

      <h3>{deck.name}</h3>

      <p>{deck.description}</p>
      <div className='container d-flex px-0'>
        <Link to={`/decks/${deckId}/edit`} className='btn btn-secondary mx-1'>
          <span className='oi oi-pencil mr-2'></span>
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className='btn btn-primary mx-1'>
          <span className='oi oi-book mr-2'></span>
          Study
        </Link>

        <Link to={`/decks/${deckId}/cards/new`} className='btn btn-primary'>
          <span>+</span> Add Card
        </Link>
        <Link
          to='#'
          className='btn btn-danger ml-auto'
          onClick={() => handleDelete(deckId)}
        >
          <span className='oi oi-trash mr-2'></span>
          button
        </Link>
      </div>

      <h2 className='mt-4'>Cards</h2>
      <div className='card-list'>
        {cards.map((card) => (
          <div className='card' key={card.id}>
            <div className='card-body'>
              <div className='row'>
                <div className='col'>
                  <h6>Your Question</h6>
                  <p className='card-text'>{card.front}</p>
                </div>
                <div className='col'>
                  <h6>Your Answer</h6>

                  <p className='card-text'>{card.back}</p>
                  <div className='d-flex justify-content-end'>
                    <div className='pr-2'>
                      <Link
                        to={`/decks/${deckId}/cards/${card.id}/edit`}
                        className='btn btn-secondary mx-1'
                      >
                        <span className='oi oi-pencil mr-2'></span>
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(card.id)}
                        className='btn btn-danger mx-1'
                      >
                        <span className='oi oi-trash mr-2'></span>
                      </button>
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
