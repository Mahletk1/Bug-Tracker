const DOCUMENT = 'ARTICLE_';

const actions = {
  GET_TICKETS: 'GET_TICKETS',
  GET_TICKETS_SUCCESS: 'GET_TICKETS_SUCCESS',
  GET_TICKETS_ERROR: 'GET_TICKETS_ERROR',

  CREATE_TICKET:'CREATE_TICKET',
  CREATE_TICKET_ERROR:'CREATE_TICKET_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_HANDLE_MODAL_TICKET: 'TOGGLE_HANDLE_MODAL_TICKET',
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

  createTicket: (data, actionName = 'insert') => ({
    type: actions.CREATE_TICKET,
    payload: { data, actionName },
  }),

  toggleModalTicket: (data = null) => ({
    type: actions.TOGGLE_HANDLE_MODAL_TICKET,
    payload: { data },
  }),

  update: data => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  createTicketError: error => ({
    type: actions.CREATE_TICKET_ERROR,
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
