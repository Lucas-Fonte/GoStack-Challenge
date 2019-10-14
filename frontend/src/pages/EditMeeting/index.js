/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
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

  async function handleSubmit(data) {
    toast.success('MeetUp atualizado com sucesso');
    await api.put(`meetings?id=${match.params.meetingId}`, data);
  }
  return (
    <Container>
      <Form initialData={meeting} onSubmit={handleSubmit}>
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
