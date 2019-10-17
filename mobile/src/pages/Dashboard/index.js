import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Title, List } from './styles';

import Background from '../../components/Background';
import Meetings from '../../components/Meetings';

const data = [1, 2, 3, 4, 5];
export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Title>Inscrições</Title>

        <List
          data={data}
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
