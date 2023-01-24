import actions from './actions';

const initState = {
  isLoading: true,
  errorMessage: false,
  comments:{},
  comment:{key: null},
  attachments:[],
  ticket_detail: {},
  modalActive: false,
  ticket_edit: {
    key: null,
    status: 'draft', // publish
    description: '',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_TICKET:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.GET_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ticket_detail: payload.data,
        comments: payload.comments,
        errorMessage: false,
      };
    case actions.GET_TICKET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        ticket_edit: payload.data == null ? initState.ticket_edit : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        attachments: payload.data,
        
      };
    default:
      return state;
  }
}
