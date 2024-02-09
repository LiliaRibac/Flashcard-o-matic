import React from 'react';
import CreateDeck from './CreateDeckButton';
import ShowListDeck from './ShowListDeck';
import CreateDeckButton from './CreateDeckButton';

export default function Home() {
  return (
    <div>
      <CreateDeckButton />
      <ShowListDeck />
    </div>
  );
}
