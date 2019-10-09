import React from 'react';

import { MdChevronRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

import { Container, Time } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <strong>Meus Meetups</strong>
        <aside>
          <button type="button">
            <FaPlus size={12} color="#fff" />
            <span>Novo Meetup</span>
          </button>
        </aside>
      </header>

      <ul>
        <Time>
          <strong>NodeJS Meetup</strong>
          <aside>
            <span>17 de Junho, às 15h</span>
            <button type="button">
              <MdChevronRight size={24} color="#FFF" />
            </button>
          </aside>
        </Time>
      </ul>
    </Container>
  );
}
