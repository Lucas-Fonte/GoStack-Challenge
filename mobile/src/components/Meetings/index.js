/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import { Container, Left, Banner, Info, Details, Title } from './styles';
import Button from '../Button';

export default function Meetings({ data, buttonText }) {
  const dateParsed = useMemo(() => {
    return format(parseISO(data.date), "dd 'de' MMMM', às' hh'h'", {
      locale: pt
    });
  }, [data.date]);

  async function handleButtonAction() {
    if (buttonText === 'Inscrever-se') {
      await api.post('subscriptions', {
        meeting_id: data.id
      });
    }

    if (buttonText === 'Cancelar inscrição') {
      await api.delete('subscriptions', {
        meetingId: data.id
      });
    }
  }
  return (
    <Container>
      <Banner
        source={{
          url: data.banner
            ? data.banner.url
            : 'https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg'
        }}
      />
      <Left>
        <Title>{data.title}</Title>
        <Info>
          <Icon name="event" size={20} color="#666" />
          <Details>{dateParsed}</Details>
        </Info>
        <Info>
          <Icon name="room" size={20} color="#666" />
          <Details>{data.location}</Details>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#666" />
          <Details>Organizador: {data.user.name}</Details>
        </Info>
        <Button onPress={handleButtonAction}>{buttonText}</Button>
      </Left>
    </Container>
  );
}
