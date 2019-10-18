import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, List } from './styles';

import Background from '../../components/Background';
import Meetings from '../../components/Meetings';
import Header from '../../components/Header';

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function loadMeetings() {
      const response = await api.get('subscribing');

      setMeetings(response.data);
    }

    loadMeetings();
  }, [setMeetings]);

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={meetings}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => (
            <Meetings data={item} buttonText="Inscrever-se" />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="list" size={20} color={tintColor} />
  )
};
