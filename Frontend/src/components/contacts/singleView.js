import React, { Component } from 'react';
import { ContactCardWrapper } from './contactCard.style';

export default class extends Component {
  render() {
    console.log(this.props)
    const { contact, otherAttributes } = this.props;
    const name = contact.name ? contact.name : 'No Name';
    const extraInfos = [];
    otherAttributes.forEach(attribute => {
      const value = contact[attribute.value];
      if (value) {
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <p className="isoInfoDetails">{value}</p>
          </div>
        );
      }
    });
    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            {contact.profile_image ? <img alt="#" src={contact.profile_image} /> : ''}
          </div>
          <h1 className="isoPersonName">{name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{extraInfos}</div>
      </ContactCardWrapper>
    );
  }
}
