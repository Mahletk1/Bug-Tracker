const DOCUMENT = 'ARTICLE_';

const actions = {
  GET_PROJECTS:'GET_PROJECTS',
  GET_PROJECTS_SUCCESS:'GET_PROJECTS_SUCCESS',
  GET_PROJECTS_ERROR:'GET_PROJECTS_ERROR',

  CREATE_PROJECT: 'CREATE_PROJECT',
  CREATE_PROJECT_ERROR: 'CREATE_PROJECT_ERROR',

  RESET_FIRESTORE_DOCUMENTS: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS',
  RESET_FIRESTORE_DOCUMENTS_ERROR: DOCUMENT + 'RESET_FIRESTORE_DOCUMENTS_ERROR',

  TOGGLE_FIRESTORE_HANDLE_MODAL: DOCUMENT + 'TOGGLE_FIRESTORE_HANDLE_MODAL',
  FIRESTORE_UPDATE: DOCUMENT + 'FIRESTORE_UPDATE',

  getProjects: () => {
    return { type: actions.GET_PROJECTS };
  },

  getProjectsSuccess: data => ({
    type: actions.GET_PROJECTS_SUCCESS,
    payload: { data },
  }),

  getProjectsError: error => ({
    type: actions.GET_PROJECTS_ERROR,
    payload: { error },
  }),

  createProject: (data, actionName = 'insert') => ({
    type: actions.CREATE_PROJECT,
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

  createProjectError: error => ({
    type: actions.CREATE_PROJECT_ERROR,
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
