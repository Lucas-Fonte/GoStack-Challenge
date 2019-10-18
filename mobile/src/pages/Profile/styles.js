import styled from 'styled-components/native';
import { darken } from 'polished';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.View`
  padding: 20px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogOffButton = styled(Button)`
  margin-top: 15px;
  height: 38px;
  background: ${darken(0.06, '#ff5c5c')};
`;
