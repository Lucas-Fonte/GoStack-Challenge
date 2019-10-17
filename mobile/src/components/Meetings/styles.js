import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: column;
`;

export const Left = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
export const Banner = styled.Image`
  border-radius: 4px;
  width: 100%;
  height: 200px;
`;

export const Info = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
`;
export const Details = styled.Text`
  margin-left: 8px;
  color: #666;
  font-size: 14px;
`;
