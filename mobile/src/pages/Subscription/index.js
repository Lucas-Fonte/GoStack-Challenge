import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, List } from './styles';

import Background from '../../components/Background';
import Meetings from '../../components/Meetings';
import Header from '../../components/Header';

export default function Meetups() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function loadMeetings() {
      const response = await api.get('subscriptions');

      const subscriptions = response.data.map(sub => sub.meeting);

      setMeetings(subscriptions);
    }

    loadMeetings();
  }, [meetings, setMeetings]);
  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetings}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Meetings data={item} buttonText="Cancelar inscrição" />
          )}
        />
      </Container>
    </Background>
  );
}

Meetups.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  )
};
