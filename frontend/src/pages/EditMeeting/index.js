/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../../services/api';

import { Container } from './styles';

import BannerInput from '../../components/BannerInput';

const schema = Yup.object().shape({
  banner_id: Yup.number(),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  date: Yup.date().required('Date is required'),
  location: Yup.string().required('Location is required')
});

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
    if (data.date < new Date()) {
      toast.error('Data inválida, verifique seus dados');
    }
    toast.success('MeetUp atualizado com sucesso');
    await api.put(`meetings?id=${match.params.meetingId}`, data);
  }
  return (
    <Container>
      <Form schema={schema} initialData={meeting} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input
          multiline
          className="description"
          type="text"
          name="description"
          placeholder="Descrição completa"
        />
        <Input name="date" type="datetime-local" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">Atualizar Meetup</button>
      </Form>
    </Container>
  );
}
