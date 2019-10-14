/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaMapMarked } from 'react-icons/fa';
import api from '../../services/api';
import photoCamera from '../../assets/photoCamera.svg';

import { Container, Content, Footer } from './styles';

export default function Meeting({ match }) {
  const [meeting, setMeeting] = useState([]);
  const [image, setImage] = useState([]);
  useEffect(() => {
    async function loadMeeting() {
      const response = await api.get(`meetings?id=${match.params.meetingId}`);

      const { data } = response;

      setMeeting(data);

      if (data.banner !== null) {
        setImage(data.banner.url);
      } else {
        setImage(photoCamera);
      }
    }

    loadMeeting();
  });
  return (
    <Container>
      <header>
        <strong>{meeting.title}</strong>
        <aside>
          <Link to={`/edit/${meeting.id}`}>
            <div className="edit">
              <FaPlus size={12} color="#fff" />
              <span>Editar</span>
            </div>
          </Link>
          <Link to="/newmeeting">
            <div className="cancel">
              <FaPlus size={12} color="#fff" />
              <span>Cancelar</span>
            </div>
          </Link>
        </aside>
      </header>

      <Content>
        <img src={image} alt="" />
        <span>{meeting.description}</span>
        <Footer>
          <div>
            <FaCalendarAlt size={18} color="#666" />
            <span>{meeting.date}</span>
          </div>
          <div>
            <FaMapMarked size={18} color="#666" />
            <span>{meeting.location}</span>
          </div>
        </Footer>
      </Content>
    </Container>
  );
}
