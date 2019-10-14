/* eslint-disable react/prop-types */
import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '../../services/api';

import { Container } from './styles';

import BannerInput from '../../components/BannerInput';

export default function NewMeeting() {
  async function handleSubmit(data) {
    toast.success('MeetUp Cadastrado');
    await api.post('meetings', data);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
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

        <button type="submit">Cadastrar Meetup</button>
      </Form>
    </Container>
  );
}
