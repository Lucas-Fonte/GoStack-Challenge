/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import api from '../../services/api';

import { Container } from './styles';

import BannerInput from '../../components/BannerInput';

export default function EditMeeting({ match }) {
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
      <Form initialData={meeting}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input
          className="description"
          type="text"
          name="description"
          placeholder="Descrição completa"
        />
        <Input name="date" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">Atualizar Meetup</button>
      </Form>
    </Container>
  );
}
