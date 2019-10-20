import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 }
})``;

export const DatePicker = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Date = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
`;
