import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import fakeData from './fakeData';
import {requestGetTickets,postTicket,deleteTicket,updateTicket} from '../../helpers/tickets/tickets';

const {
  database,
  createBatch,
  rsfFirestore,
  createNewRef,
  processFireStoreCollection,
} = FirebaseHelper;

const fakeDataList = new fakeData(5).getAll();

/**
 * DOC: https://redux-saga-firebase.js.org/reference/dev/firestore
 */

const COLLECTION_NAME = 'articles'; // change your collection
const ORDER_BY = 'id';
const ORDER = 'desc';

function* getTickets() {
  try {
    const response = yield call(requestGetTickets);
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      data.push({
        id: response.data[index].id,
        title: response.data[index].title,
        priority: response.data[index].priority,
        description: response.data[index].description,
        assignedUser: response.data[index].assignedUser,
        status: response.data[index].status,
        project: response.data[index].project,
       
        // uid: response.data[index].uid
      });
    }
    console.log(data)
    yield put(actions.getTicketsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.getTicketsError(error));
  }
}

function* createTicket({ payload }) {
  const { data, actionName } = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(deleteTicket, data.id);
        break;
      case 'update':
        console.log(data)
        let form_data1 = new FormData();
        form_data1.append("title", data.title);
        form_data1.append("description", data.description);
        form_data1.append("priority", data.priority);
        form_data1.append("project", data.project[1]);
        form_data1.append("status", data.status)
        if(data.assignedUser != null){
          form_data1.append("assignedUser", data.assignedUser[1]);
        }
        const response1 = yield call(updateTicket, form_data1);
        break;
      default:
        let form_data = new FormData();
        form_data.append("title", data.title);
        form_data.append("description", data.description);
        form_data.append("priority", data.priority);
        form_data.append("project", data.project[1]);
        form_data.append("status", data.status)
        if(data.assignedUser != null){
          form_data.append("assignedUser", data.assignedUser[1]);
        }
        const response = yield call(postTicket, form_data);
        break;
    }
    yield put({ type: actions.GET_TICKETS });
  } catch (error) {
    console.log(error);
    yield put(actions.createTicketError(error));
  }
}

const readAllFirestoreDocuments = async () =>
  await database
    .collection(COLLECTION_NAME)
    .get()
    .then(querySnapshot => {
      const documents = [];
      try {
        querySnapshot.forEach(doc => {
          documents.push(doc.id);
        });
      } catch (e) {}
      return documents;
    });

function* resetFireStoreDocuments() {
  try {
    const docsKey = yield call(readAllFirestoreDocuments);

    let batch = createBatch();
    docsKey.forEach(key => {
      batch.delete(database.collection(COLLECTION_NAME).doc(key));
      batch.commit();
      batch = createBatch();
    });

    batch = createBatch();
    fakeDataList.forEach(article => {
      const doc = database.collection(COLLECTION_NAME).doc(createNewRef());
      batch.set(doc, article);
    });
    batch.commit();

    yield put({ type: actions.GET_TICKETS });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TICKETS, getTickets),
    takeEvery(actions.CREATE_TICKET, createTicket),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
