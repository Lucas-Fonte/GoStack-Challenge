import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  padding: 15px;
  max-width: 1000px;
  align-self: center;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      max-width: 1000px;
      max-height: 300px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.6);
    }

    input {
      display: none;
    }
  }
`;
