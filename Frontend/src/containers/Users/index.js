import React, { Component } from "react";
import { connect } from "react-redux";
import contactAction from "../../redux/users/actions";
import { Layout, Icon } from "antd";
import Button from "../../components/uielements/button";
import ContactList from "../../components/contacts/contactList";
import SingleContactView from "../../components/contacts/singleView";
import EditContactView from "../../components/contacts/editView";
import DeleteButton from "../../components/contacts/deleteButton";
import { otherAttributes } from "./fakeData";
import IntlMessages from "../../components/utility/intlMessages";
import { ContactsWrapper } from "./contacts.style";
import Scrollbar from "../../components/utility/customScrollBar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";


const { Content } = Layout;
class Contacts extends Component {
  state = {
    createView: false,
    editView: false
  }
  async componentDidMount() {
   await this.props.getUsers();
  }
  render() {
    
    const {
      contacts,
      createView,
      editView,
      seectedId,
      changeContact,
      editCreateView,
      editContact,
      createUser,
      editUser,
      deleteContact,
      viewChange,
      update,
      newUser
    } = this.props;

   
    let selectedContact = seectedId
      ? contacts.filter(contact => contact.id === seectedId)[0]
      : null;
      if(createView){ 
        selectedContact=null;
      }
  
    const onVIewChange = () => viewChange(!editView);
    const onCreateVIewChange = () => editCreateView(!createView);
    console.log(createView,editView,selectedContact)
    // const onPageLoad=()=>{
    //   console.log(Object.keys(contacts).length);
    //   const length=Object.keys(contacts).length-1;
    //   if (length>=0){return <SingleContactView
    //     contact={contacts[length]}
    //     editCreateView={editCreateView}
    //     createView={createView}
    //     otherAttributes={otherAttributes}
    //   />}
      
    // }
    return (
      <ContactsWrapper
        className="isomorphicContacts"
        style={{ background: "none" }}
      >
        <div className="isoContactListBar">
          <ContactList
            contacts={contacts}
            seectedId={seectedId}
            changeContact={changeContact}
            deleteContact={deleteContact}
          />
        </div>
        <Layout className="isoContactBoxWrapper">
         
         
              <div className="isoContactControl">
              
              {/* <FontAwesomeIcon icon={faCoffee} /> */}
                {createView||!selectedContact?"":( 
                <Button type="button" onClick={onVIewChange}>
                  {/* <DownOutlined /> */}
                  {editView ? <Icon type="left" /> :  <Icon type="edit" />}{" "}
                </Button>)}
  
              { selectedContact? <DeleteButton
                  deleteContact={deleteContact}
                  contact={selectedContact}
                />:("")}
                {editView? " ":  <Button
                  type="primary"
                  onClick={onCreateVIewChange}
                  className="isoAddContactBtn"
                >
                  <IntlMessages id="Add New User" />
                </Button>}
               
              </div>

              {selectedContact ? (
              
              <Scrollbar className="contactBoxScrollbar">
                {editView || createView ? (
                  <EditContactView
                    editView={editView}
                    createView={createView}
                    contact={selectedContact}
                    editedContact={newUser}
                    editUser={editUser} //Update user
                    update={update}
                    otherAttributes={otherAttributes}
                  />
                ) : (
                  <SingleContactView
                    contact={selectedContact}
                    editCreateView={editCreateView}
                    createView={createView}
                    otherAttributes={otherAttributes}
                  />
                )}
              </Scrollbar>
    
          ) : (
            <Content className="isoContactBox">

              <Scrollbar className="contactBoxScrollbar">
                {editView || createView ? (
                  <EditContactView
                    editView={editView}
                    createView={createView}
                    contact={newUser}
                    update={update}
                    createUser={createUser}
                    otherAttributes={otherAttributes}
                  />
                ) : (
                  <p style={{"margin":"50px"}}>No User Selected</p>
                  // onPageLoad()
                )}
              </Scrollbar>
           
            </Content>
            
            
          )}
        </Layout>
      </ContactsWrapper>
    );
  }
}
export default connect(

  state => ({
    ...state.Users,
  }),
  contactAction
)(Contacts);
