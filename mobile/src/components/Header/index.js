import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Logo } from './styles';
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <Container>
      <TouchableOpacity onPress={() => {}}>
        <Logo source={logo} />
      </TouchableOpacity>
    </Container>
  );
}
