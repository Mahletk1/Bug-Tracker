const DOCUMENT = 'ARTICLE_';

const actions = {
  GET_TICKETS: 'GET_TICKETS',
  GET_TICKETS_SUCCESS: 'GET_TICKETS_SUCCESS',
  GET_TICKETS_ERROR: 'GET_TICKETS_ERROR',

  SAVE_INTO_FIRESTORE: DOCUMENT + 'SAVE_INTO_FIRESTORE',
  SAVE_INTO_FIRESTORE_ERROR: DOCUMENT + 'SAVE_INTO_FIRESTORE_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  getTickets: () => {
    return { type: actions.GET_TICKETS };
  },

  getTicketsSuccess: data => ({
    type: actions.GET_TICKETS_SUCCESS,
    payload: { data },
  }),

  getTicketsError: error => ({
    type: actions.GET_TICKETS_ERROR,
    payload: { error },
  }),

  saveIntoFireStore: (data, actionName = 'insert') => ({
    type: actions.SAVE_INTO_FIRESTORE,
    payload: { data, actionName },
  }),

  toggleModal: (data = null) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
    payload: { data },
  }),

  update: data => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  saveIntoFireStoreError: error => ({
    type: actions.SAVE_INTO_FIRESTORE_ERROR,
    payload: { error },
  }),

  resetFireStoreDocuments: () => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS,
  }),

  resetFireStoreDocumentsError: error => ({
    type: actions.RESET_FIRESTORE_DOCUMENTS_ERROR,
    payload: { error },
  }),
};
export default actions;
