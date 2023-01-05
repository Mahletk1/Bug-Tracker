import { initState } from "./reducer";

function ascendingSort(contact1, contact2) {
  const name1 = contact1.name ? contact1.name.toUpperCase() : "~";
  const name2 = contact2.name ? contact2.name.toUpperCase() : "~";
  return name1 > name2 ? 1 : name1 === name2 ? 0 : -1;
}

const contactActions = {
  GET_USER:"GET_USER",
  GET_USER_SUCCESS:"GET_USER_SUCCESS",
  GET_USER_ERROR:"GET_USER_ERROR",
  CREATE_USER:"CREATE_USER",
  ADD_CONTACT: "ADD_CONTACT",
  EDIT_CONTACT: "EDIT_CONTACT",
  DELETE__CONTACT: "DELETE__CONTACT",
  CHANGE_CONTACT: "CHANGE_CONTACT",
  EDIT_VIEW: "EDIT_VIEW",
  getUsers: () => {
    return { type: contactActions.GET_USER };
  },
  getUsersSuccess: data => ({
    type: contactActions.GET_USER_SUCCESS,
    payload: { data },
  }),

  getUsersError: error => ({
    type: contactActions.GET_USER_ERROR,
    payload: { error },
  }),
  // createUser: (data) => ({
  //   type: contactActions.CREATE_USER,
  //   payload: { data },
  // }),
  changeContact: id => ({
    type: contactActions.CHANGE_CONTACT,
    id
  }),
  addContact: () => {
    const newContact = {
      id: new Date(), 
    };
    return (dispatch, getState) => {
      console.log(...getState().Users.contacts)
      dispatch({
        type: contactActions.ADD_CONTACT,
        contacts: [...getState().Users.contacts, newContact],
        selectedId: newContact.id
      });
    };
  },
   createUser: newContact => {
    console.log(newContact)
    return (dispatch, getState) => {
      const contacts = getState().Users.contacts;
      const newContacts = [];
      contacts.forEach(contact => {
        if (contact.id === newContact.id) {
          newContacts.push(newContact);
        } else {
          newContacts.push(contact);
        }
      });
      dispatch({
        type: contactActions.CREATE_USER,
        contacts: newContacts.sort(ascendingSort)
      });
    };
  },
  editContact: newContact => {
    console.log(newContact)
    return (dispatch, getState) => {
      const contacts = getState().Users.contacts;
      const newContacts = [];
      contacts.forEach(contact => {
        if (contact.id === newContact.id) {
          newContacts.push(newContact);
        } else {
          newContacts.push(contact);
        }
      });
      dispatch({
        type: contactActions.EDIT_CONTACT,
        contacts: newContacts.sort(ascendingSort)
      });
    };
  },
  // deleteContact: id => {
  //   return (dispatch, getState) => {
  //     const contacts = getState().Users.contacts;
  //     const seectedId = getState().Users.seectedId;
  //     const newContacts = [];
  //     contacts.forEach(contact => {
  //       if (contact.id === id) {
  //       } else {
  //         newContacts.push(contact);
  //       }
  //     });
  //     dispatch({
  //       type: contactActions.DELETE__CONTACT,
  //       contacts: newContacts,
  //       seectedId: id === seectedId ? undefined : seectedId
  //     });
  //   };
  // },
  viewChange: view => ({
    type: contactActions.EDIT_VIEW,
    view
  })
};
export default contactActions;
