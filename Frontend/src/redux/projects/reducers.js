import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  projects: {},
  modalActive: false,
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
        modalActive: false,
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
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
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
