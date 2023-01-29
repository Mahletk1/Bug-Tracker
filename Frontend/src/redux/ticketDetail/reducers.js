import actions from './actions';

const initState = {
  isLoading: true,
  errorMessage: false,
  comments:{},
  attachments:{},
  comment:{key: null},
  ticket_detail: {},
  modalActiveTicketDetail: false,
  ticket_edit: {
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
    case actions.GET_TICKET:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActiveTicketDetail: false,
      };
    case actions.GET_TICKET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ticket_detail: payload.data,
        comments: payload.comments,
        attachments:payload.attachment,
        errorMessage: false,
      };
    case actions.GET_TICKET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_HANDLE_MODAL_TICKET_DETAIL:
      return {
        ...state,
        modalActiveTicketDetail: !state.modalActiveTicketDetail,
        ticket_edit: payload.data == null ? initState.ticket_edit : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        ticket_edit: payload.data,
        
      };
    default:
      return state;
  }
}
