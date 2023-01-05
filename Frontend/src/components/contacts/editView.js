import React, { Component } from 'react';
import { Icon } from 'antd';
import Input, { Textarea } from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { ContactCardWrapper } from './contactCard.style';
import './upload.css';
import IntlMessages from "../../components/utility/intlMessages";
import Button from "../../components/uielements/button";

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    notification('error', 'You can only upload JPG file!', '');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    notification('error', 'Image must smaller than 2MB!', '');
    return false;
  }
  notification('success', 'Image uploaded successfully!', '');
  return true;
}
export default class extends Component {

  handleRecord = async (contact) => {
    await this.props.createUser(contact);
  };
  render() {
    const { contact, otherAttributes,createView,editView,editContact,createUser } = this.props;
    console.log(this.props)
    const name = contact.name ? contact.name : 'No Name';
    const extraInfos = [];

    const onImageChange = event => {
      console.log(event.fileList[0].originFileObj)
      var reader = new FileReader();
      let file =event.fileList[0].originFileObj;
      reader.readAsDataURL(file);
      reader.onload = function () { 
        contact['profile_image'] = reader.result;
        // editContact(contact);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    };  

   


    if(createView){   
    [...otherAttributes].forEach(attribute => {
      const value = contact[attribute.value];
      const editContact = event => {
        contact[attribute.value] = event.target.value;
        // this.props.editContact(contact);
      };
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              value={value}
              onChange={event => editContact(event)}
            />
          </div>
        );
      
    });
    extraInfos.push(
      <Button
          type="primary"
          className="isoAddContactBtn"
          onClick={this.props.createUser(contact)}
      >
          <IntlMessages id="Submit" />
      </Button>
    )
  }
    else{
     
      [...otherAttributes].forEach(attribute => {
        const value = contact[attribute.value];
        const createUser = event => {
          contact[attribute.value] = event.target.value;
          this.props.createUser(contact);
        };
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input
                placeholder={`${attribute.title}`}
                value={value}
                onChange={event => createUser(event)}
              />
            </div>
          );
        
      });
      
    }

    return (
      <ContactCardWrapper className="isoContactCard">
        <div className="isoContactCardHead">
          <div className="isoPersonImage">
            
            <Upload
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                beforeUpload={() => false}
                onChange={onImageChange}
                action=""
            >
              {contact.profile_image ? (
                <img src={contact.profile_image} alt="" className="avatar" />
              ) : (
                ''
              )}
              <Icon type="plus" className="avatar-uploader-trigger" />
            </Upload>
          </div>
          <h1 className="isoPersonName">{name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{extraInfos}
        </div>
       
      </ContactCardWrapper>
    );
  }
}
