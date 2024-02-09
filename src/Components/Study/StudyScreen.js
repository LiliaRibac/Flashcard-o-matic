import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import NotEnoughCards from './NotEnoughCards';

// Thsi component provides an interface for studying flashcards within a specific deck.
// It allows users to flip between cards, move to the next card,
// and navigate back to the home page if desired
export default function StudyScreen() {
  const { deckId } = useParams();
  const history = useHistory();
  const [study, setStudy] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const ac = new AbortController();
    const loadStudy = async () => {
      try {
        const loadedStudy = await readDeck(deckId, ac.signal);
        setStudy(loadedStudy);
      } catch (error) {
        console.log('Here is an error', error);
      }
    };
    loadStudy();

    return () => ac.abort(); // Cleanup function
  }, [deckId]);

  function handleFlip() {
    setFlipped(!flipped);
  }

  const clickHandler = () => {
    if (currentIndex < study.cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const restartConfirm = window.confirm(
        'Restart cards?\n\n Click "cancel" to return to the home page.'
      );
      if (restartConfirm) {
        setCurrentIndex(0);
        setFlipped(false);
      } else {
        history.push('/');
      }
    }
  };

  if (!study) {
    return null;
  }

  if (study.cards.length <= 2) {
    return (
      <NotEnoughCards
        deckId={deckId}
        deck={study}
        numberOfCards={study.cards.length}
      />
    );
  }

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
            <Link to='/'>{study.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Study
          </li>
        </ol>
      </nav>
      <h3 className='my-4'>Study: {study.name}</h3>
      <div className='card '>
        <div className='card-body'>
          <h5 className='card-title'>
            Card {currentIndex + 1} of {study.cards.length}
          </h5>
          <p className='card-text'>
            {flipped
              ? study.cards[currentIndex].back
              : study.cards[currentIndex].front}
          </p>
          <button className='btn btn-secondary' onClick={handleFlip}>
            Flip
          </button>
          {flipped && (
            <button className='btn btn-primary mx-2' onClick={clickHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
}
