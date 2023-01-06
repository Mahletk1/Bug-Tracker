import React, { Component } from 'react';
import { Icon } from 'antd';
import Input, { Textarea } from '../uielements/input';
import Upload from '../uielements/upload';
import notification from '../notification';
import { ContactCardWrapper } from './contactCard.style';
import './upload.css';
import IntlMessages from "../../components/utility/intlMessages";
import Button from "../../components/uielements/button";
import clone from 'clone';

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
  onRecordChange = (key, event) => {
    let { contact } = clone(this.props);

    if (key) contact[key] = event.target.value;
    this.props.update(contact);
  };

   onImageChange = (key,event) => {
    console.log(event.fileList[0].originFileObj)
    var reader = new FileReader();
    let file =event.fileList[0].originFileObj;
    reader.readAsDataURL(file);
    let { contact } = clone(this.props);
    const {update} = this.props
    reader.onload = function () { 
      contact[key] = reader.result;
      update(contact);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };  
  render() {
    const { contact, otherAttributes,createView,editView,createUser } = this.props;
    console.log(this.props)
    const extraInfos = [];
  

    if(createView){   
    [...otherAttributes].forEach(attribute => {
      // console.log(contact.attribute.value)
      console.log(attribute)
        extraInfos.push(
          <div className="isoContactCardInfos" key={attribute.value}>
            <p className="isoInfoLabel">{`${attribute.title}`}</p>
            <Input
              placeholder={`${attribute.title}`}
              // value={contact.attribute.value}
              onChange={this.onRecordChange.bind(this, `${attribute.value}`)}
            />
          </div>
        );
      
    });
    extraInfos.push(
      <Button
          type="primary"
          className="isoAddContactBtn"
          onClick={this.handleRecord.bind(this, contact)}
      >
          <IntlMessages id="Submit" />
      </Button>
    )
  }
    else{
     
      [...otherAttributes].forEach(attribute => {
        // const value = contact[attribute.value];
        // const createUser = event => {
        //   contact[attribute.value] = event.target.value;
        //   this.props.createUser(contact);
        // };
          extraInfos.push(
            <div className="isoContactCardInfos" key={attribute.value}>
              <p className="isoInfoLabel">{`${attribute.title}`}</p>
              <Input
                placeholder={`${attribute.title}`}
                // value={value}
                onChange={this.onRecordChange.bind(this, `${attribute.value}`)}
              />
            </div>
          );
        
      });
      extraInfos.push(
        <Button
            type="primary"
            className="isoAddContactBtn"
            // onClick={this.handleRecord.bind(this, contact)}//create a function to handle update
        >
            <IntlMessages id="Submit" />
        </Button>
      )
      
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
                onChange={this.onImageChange.bind(this, 'profile_image')}
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
          <h1 className="isoPersonName">{contact.name}</h1>
        </div>
        <div className="isoContactInfoWrapper">{extraInfos}
        </div>
       
      </ContactCardWrapper>
    );
  }
}
