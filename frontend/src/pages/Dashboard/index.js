/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Link } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

import { Container, Time } from './styles';
import api from '../../services/api';

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function loadMeetings() {
      const response = await api.get('meetings');

      const { data } = response;
      const meetups = data.map(meeting => ({
        id: meeting.id,
        title: meeting.title,
        date: format(parseISO(meeting.date), "dd 'de' MMMM', às' hh'h'", {
          locale: pt
        })
      }));

      setMeetings(meetups);
    }

    loadMeetings();
  });

  return (
    <Container>
      <header>
        <strong>Meus Meetups</strong>
        <aside>
          <Link to="/newmeeting">
            <div>
              <FaPlus size={12} color="#fff" />
              <span>Novo Meetup</span>
            </div>
          </Link>
        </aside>
      </header>

      <ul>
        {meetings.map(time => (
          <Time key={time.id}>
            <strong>{time.title}</strong>
            <aside>
              <span>{time.date}</span>
              <Link to={`/meeting/${time.id}`}>
                <MdChevronRight size={24} color="#FFF" />
              </Link>
            </aside>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
