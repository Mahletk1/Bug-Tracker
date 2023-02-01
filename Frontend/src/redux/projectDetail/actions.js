const DOCUMENT = 'ARTICLE_';

const actions = {
  GET_PROJECT: 'GET_PROJECT',
  GET_PROJECT_SUCCESS: 'GET_PROJECT_SUCCESS',
  GET_PROJECT_ERROR: 'GET_PROJECT_ERROR',

  CREATE_PROJECT:'CREATE_PROJECT',
  CREATE_PROJECT_ERROR:'CREATE_PROJECT_ERROR',

  CREATE_COMMENT:'CREATE_COMMENT',
  CREATE_COMMENT_ERROR:'CREATE_COMMENT_ERROR',

  UPLOAD_ATTACHMENT:'UPLOAD_ATTACHMENT',
  UPLOAD_ATTACHMENT_ERROR:'UPLOAD_ATTACHMENT_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_HANDLE_MODAL_PROJECT_DETAIL: DOCUMENT + 'TOGGLE_HANDLE_MODAL_PROJECT_DETAIL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  getProject: (id) => ({
    type: actions.GET_PROJECT,
    payload: {id}
  }),

  getProjectSuccess: (data) => ({
    type: actions.GET_PROJECT_SUCCESS,
    payload: {  data},
  }),

  getProjectError: error => ({
    type: actions.GET_PROJECT_ERROR,
    payload: { error },
  }),

  createProject: (data, actionName = 'insert') => ({
    type: actions.CREATE_PROJECT,
    payload: { data, actionName },
  }),

  createComment: (data,actionName = 'insert') => ({
    type: actions.CREATE_COMMENT,
    payload: { data,actionName},
  }),
  uploadAttachment: (data,actionName = 'insert') => ({
    type: actions.UPLOAD_ATTACHMENT,
    payload: { data,actionName},
  }),
  toggleModal: (data = null) => ({
    type: actions.TOGGLE_HANDLE_MODAL_PROJECT_DETAIL,
    payload: { data },
  }),

  update: data => ({
    type: actions.FIRESTORE_UPDATE,
    payload: { data },
  }),

  createProjectError: error => ({
    type: actions.CREATE_PROJECT_ERROR,
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
