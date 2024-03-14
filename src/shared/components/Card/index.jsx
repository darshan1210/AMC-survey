import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Cards({ cardtext, cardtitle, cardIcon, className }) {
  return (
    <Card className={`dash-card ${className}`}>
      <Card.Body>
        <div className='cardIcon'>
          <FontAwesomeIcon icon={cardIcon} />
        </div>
        <div>
          <Card.Text>{cardtext}</Card.Text>
          <Card.Title>{cardtitle}</Card.Title>
        </div>

      </Card.Body>
    </Card>
  );
}

Cards.propTypes = {
  cardtext: PropTypes.string.isRequired,
  cardtitle: PropTypes.string.isRequired,
  cardIcon: PropTypes.object.isRequired, // Adjust the PropTypes based on the actual type of 'cardIcon'
  className: PropTypes.string,
};
