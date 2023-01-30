import actions from './actions';

const initState = {
  isLoading: true,
  errorMessage: false,
  project_detail: {},
  modalActive: false,
  project_edit: {
    key: null,
    attachments:[],
    // status: 'draft', // publish
    // description: '',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_PROJECT:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.GET_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project_detail: payload.data,
        comments: payload.comments,
        attachments:payload.attachment,
        errorMessage: false,
      };
    case actions.GET_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        project_edit: payload.data == null ? initState.project_edit : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        project_edit: payload.data,
        
      };
    default:
      return state;
  }
}
