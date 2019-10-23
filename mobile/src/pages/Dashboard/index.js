import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';

import { parseISO, format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, List, DatePicker, Date } from './styles';

import Background from '../../components/Background';
import Meetings from '../../components/Meetings';
import Header from '../../components/Header';

export default function Dashboard() {
  const [meetings, setMeetings] = useState([]);
  const [date, setDate] = useState('2019-11-01');

  const dateFormatted = useMemo(
    () =>
      format(parseISO(date), "dd 'de' MMMM' de' yyyy'", {
        locale: pt
      }),
    [date]
  );

  function handlePrevDay() {
    setDate(format(subDays(parseISO(date), 1), 'yyyy-MM-dd'));
  }

  function handleNextDay() {
    setDate(format(addDays(parseISO(date), 1), 'yyyy-MM-dd'));
  }
  useEffect(() => {
    async function loadMeetings() {
      const response = await api.get(`subscribing?date=${date}&page=1`);

      setMeetings(response.data);
    }

    loadMeetings();
  }, [date, meetings, setMeetings]);

  return (
    <Background>
      <Header />
      <Container>
        <DatePicker>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Date>{dateFormatted}</Date>
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="chevron-right" size={24} color="#fff" />
          </TouchableOpacity>
        </DatePicker>
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
