import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1000px;
  padding: 15px;
  margin: 30px auto;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      display: block;
      color: #fff;
      font-size: 30px;
    }

    aside {
      display: flex;
      align-items: center;

      .edit {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 4px;
        margin-right: 10px;
        border: 0;
        background: #33d6ff;
        transition: background 0.2s;

        :hover {
          background: ${darken(0.25, '#33d6ff')};
        }
        span {
          display: block;
          font-weight: bold;
          margin-left: 8px;
          color: #fff;
        }
      }

      .cancel {
        display: flex;
        align-items: center;
        padding: 12px;
        border-radius: 4px;
        border: 0;
        background: #ff5c5c;
        transition: background 0.2s;

        :hover {
          background: ${darken(0.07, '#ff5c5c')};
        }
        span {
          display: block;
          font-weight: bold;
          margin-left: 8px;
          color: #fff;
        }
      }
    }
  }
`;

export const Content = styled.div`
  margin-top: 10px;
  max-width: 980px;
  font-size: 18px;
  color: #fff;

  display: flex;
  flex-direction: column;

  img {
    margin-top: 10px;
    max-height: 350px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.6);
  }
  span {
    margin-top: 20px;
    line-height: 2em;
    display: flex;
    align-items: left;
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: left;

  div {
    display: flex;
    align-items: center;

    & + div {
      margin-left: 10%;
    }
    span {
      font-size: 18px;
      margin-left: 8px;
      line-height: 1em;
      margin-bottom: 14px;
      color: #666;
    }
  }
`;
