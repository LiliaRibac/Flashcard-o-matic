import React from 'react';
import CreateDeck from './CreateDeck';
import ShowListDeck from './ShowListDeck';

export default function Home() {
  return (
    <div>
      <CreateDeck />
      <ShowListDeck />
    </div>
  );
}
