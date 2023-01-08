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
import { update } from "lodash";

const {
  changeContact,
  getUsers,
  createUser,
  editCreateView,
  editContact,
  deleteContact,
  viewChange
} = contactAction;

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

    
    const selectedContact = seectedId
      ? contacts.filter(contact => contact.id === seectedId)[0]
      : null;
    if (selectedContact) {
      if(Object.keys(newUser).length == 0){
        let names = Object.keys(selectedContact)
        names.forEach((attribute)=>
        newUser[attribute]=selectedContact[attribute]
          );
          console.log(newUser);
      }
        
      }    
    const onVIewChange = () => viewChange(!editView);
    const onCreateVIewChange = () => editCreateView(!createView);
    console.log(createView,editView,selectedContact)
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
         
            {/* <Content className="isoContactBox"> */}
              <div className="isoContactControl">
                <Button type="button" onClick={onVIewChange}>
                  {editView ? <Icon type="arrowleft" /> : createView? " ": <Icon type="edit" />}{" "}
                </Button>
                {/* <DeleteButton
                  deleteContact={deleteContact}
                  contact={selectedContact}
                /> */}
                {editView? " ":  <Button
                  type="primary"
                  onClick={onCreateVIewChange}
                  className="isoAddContactBtn"
                >
                  <IntlMessages id="Add New User" />
                </Button>}
               
              </div>
          {/* </Content> */}
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
              {/* <div className="isoContactControl">
              <Button
                type="primary"
                onClick={addContact}
                className="isoAddContactBtn"
              >
                <IntlMessages id="Add New User" />
              </Button>
              </div> */}
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
                  <p>No user selected</p>
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
// function mapStateToProps(state) {
//   const { contacts, seectedId, editView,createView } = state.Users;
//   return {
//     contacts,
//     seectedId,
//     editView,
//     createView
//   };
// }
// export default connect(mapStateToProps, {
//   changeContact,
//   addContact,
//   editContact,
//   deleteContact,
//   getUsers,
//   createUser,
//   viewChange
// })(Contacts);
