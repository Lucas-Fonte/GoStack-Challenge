import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Banner, Info, Details } from './styles';
import Button from '../Button';

export default function Meetings() {
  return (
    <Container>
      <Banner
        source={{
          url:
            'https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg'
        }}
      />
      <Left>
        <Info>
          <Icon name="event" size={20} color="#666" />
          <Details>24 de Junho, às 20h</Details>
        </Info>
        <Info>
          <Icon name="map" size={20} color="#666" />
          <Details>Av. Teste 123</Details>
        </Info>
        <Info>
          <Icon name="person" size={20} color="#666" />
          <Details>Organizador: Lucas Fonte</Details>
        </Info>
        <Button>Cancelar Inscrição</Button>
      </Left>
    </Container>
  );
}
