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
  addContact,
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
      addContact,
      editContact,
      createUser,
      deleteContact,
      viewChange,
      update,
      newUser
    } = this.props;
    const contactLength = Object.keys(contacts).length
    const onPageLoad =()=> {
      if (contactLength==0){
         return <p>Loading...</p>
      }
      else{
        return   <SingleContactView
        contact={contacts[contactLength-1]}
        otherAttributes={otherAttributes}
      />
      }
    }
    console.log(contactLength)

    const selectedContact = seectedId
      ? contacts.filter(contact => contact.id === seectedId)[0]
      : null;
    const onVIewChange = () => viewChange(!editView);
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
                  {editView ? <Icon type="check" /> : <Icon type="edit" />}{" "}
                </Button>
                {/* <DeleteButton
                  deleteContact={deleteContact}
                  contact={selectedContact}
                /> */}
                <Button
                  type="primary"
                  onClick={addContact}
                  className="isoAddContactBtn"
                >
                  <IntlMessages id="Add New User" />
                </Button>
              </div>
          {/* </Content> */}
              {selectedContact ? (
              <Scrollbar className="contactBoxScrollbar">
                {editView || createView ? (
                  <EditContactView
                    editView={editView}
                    createView={createView}
                    contact={selectedContact}
                    // createUser={createUser} //Update user
                    otherAttributes={otherAttributes}
                  />
                ) : (
                  <SingleContactView
                    contact={selectedContact}
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
                  onPageLoad()
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
