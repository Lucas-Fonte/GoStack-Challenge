import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Meetings from '../../components/Meetings';

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    async function loadMeetings() {
      const response = await api.get('meetings');

      setMeetings(response.data);
    }

    loadMeetings();
  }, []);
  return (
    <Background>
      <Container>
        <Title>Inscrições</Title>

        <List
          data={meetings}
          keyExtractor={item => String(item)}
          renderItem={({ item }) => <Meetings data={item} />}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  )
};
