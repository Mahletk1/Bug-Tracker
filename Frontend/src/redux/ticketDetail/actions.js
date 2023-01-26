const DOCUMENT = 'ARTICLE_';

const actions = {
  GET_TICKET: 'GET_TICKET',
  GET_TICKET_SUCCESS: 'GET_TICKET_SUCCESS',
  GET_TICKET_ERROR: 'GET_TICKET_ERROR',

  CREATE_TICKET:'CREATE_TICKET',
  CREATE_TICKET_ERROR:'CREATE_TICKET_ERROR',

  CREATE_COMMENT:'CREATE_COMMENT',
  CREATE_COMMENT_ERROR:'CREATE_COMMENT_ERROR',

  UPLOAD_ATTACHMENT:'UPLOAD_ATTACHMENT',
  UPLOAD_ATTACHMENT_ERROR:'UPLOAD_ATTACHMENT_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  getTicket: (id) => ({
    type: actions.GET_TICKET,
    payload: {id}
  }),

  getTicketSuccess: (data,comments,attachment) => ({
    type: actions.GET_TICKET_SUCCESS,
    payload: {  data,
                comments,
                attachment },
  }),

  getTicketError: error => ({
    type: actions.GET_TICKET_ERROR,
    payload: { error },
  }),

  createTicket: (data, actionName = 'insert') => ({
    type: actions.CREATE_TICKET,
    payload: { data, actionName },
  }),

  createComment: (data) => ({
    type: actions.CREATE_COMMENT,
    payload: { data,},
  }),
  uploadAttachment: (data) => ({
    type: actions.UPLOAD_ATTACHMENT,
    payload: { data,},
  }),
  toggleModal: (data = null) => ({
    type: actions.TOGGLE_FIRESTORE_HANDLE_MODAL,
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

  createCommentError: error => ({
    type: actions.CREATE_COMMENT_ERROR,
    payload: { error },
  }),

  uploadAttachmentError: error => ({
    type: actions.UPLOAD_ATTACHMENT_ERROR,
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
