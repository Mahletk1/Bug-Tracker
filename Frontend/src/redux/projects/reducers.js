import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  projects: {},
  modalActiveProject: false,
  project: {
    key: null,
 // soft delete
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_PROJECTS:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActiveProject: false,
      };
    case actions.GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: payload.data,
        errorMessage: false,
      };
    case actions.GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_HANDLE_MODAL_PROJECT:
      return {
        ...state,
        modalActiveProject: !state.modalActiveProject,
        project: payload.data == null ? initState.project : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        project: payload.data,
      };
    default:
      return state;
  }
}
