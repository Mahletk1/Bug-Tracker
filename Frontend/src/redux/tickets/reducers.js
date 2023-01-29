import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  tickets: {},
  modalActiveTicket: false,
  ticket: {
    key: null,
    status: 'New', // publish
    description: '',
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.GET_TICKETS:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActiveTicket: false,
      };
    case actions.GET_TICKETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tickets: payload.data,
        errorMessage: false,
      };
    case actions.GET_TICKETS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_HANDLE_MODAL_TICKET:
      return {
        ...state,
        modalActiveTicket: !state.modalActiveTicket,
        ticket: payload.data == null ? initState.ticket : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        ticket: payload.data,
      };
    default:
      return state;
  }
}
