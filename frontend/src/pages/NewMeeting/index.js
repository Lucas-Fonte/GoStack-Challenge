/* eslint-disable react/prop-types */
import React from 'react';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
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

export default function NewMeeting() {
  async function handleSubmit(data) {
    if (data.date < new Date()) {
      toast.error('Data inválida, verifique seus dados');
    } else {
      toast.success('MeetUp Cadastrado');
      await api.post('meetings', data);
    }
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <BannerInput name="banner_id" />
        <Input name="title" placeholder="Titulo do Meetup" />
        <Input
          className="description"
          multiline
          type="text"
          name="description"
          placeholder="Descrição completa"
        />
        <Input name="date" type="datetime-local" placeholder="Data do meetup" />
        <Input name="location" placeholder="Localização" />

        <button type="submit">Cadastrar Meetup</button>
      </Form>
    </Container>
  );
}
