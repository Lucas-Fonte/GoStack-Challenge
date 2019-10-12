/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import { Container } from './styles';

export default function Meeting({ match }) {
  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    async function loadMeeting() {
      const response = await api.get(`meetings?id=${match.params.meetingId}`);

      const { data } = response;
      setMeeting(data);
    }

    loadMeeting();
  });
  return (
    <Container>
      <h1>Meeting: {`${meeting.title} - ${meeting.description}`}</h1>
    </Container>
  );
}
