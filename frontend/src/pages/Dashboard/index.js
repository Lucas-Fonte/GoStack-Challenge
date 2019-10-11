/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
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
        title: meeting.title,
        date: meeting.date
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
        {meetings.map((time, index) => (
          <Time key={index}>
            <strong>{time.title}</strong>
            <aside>
              <span>{time.date}</span>
              <button type="button">
                <MdChevronRight size={24} color="#FFF" />
              </button>
            </aside>
          </Time>
        ))}
      </ul>
    </Container>
  );
}