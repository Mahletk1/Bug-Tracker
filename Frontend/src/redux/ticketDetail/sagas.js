import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import fakeData from './fakeData';
import {requestGetTicket,updateTicket,requestGetComment,requestCreateComment} from '../../helpers/ticketsDetail/ticket';

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

function* getTicket({payload}) {
  try {
    const response = yield call(requestGetTicket, payload.id);
    const response2 = yield call(requestGetComment, payload.id);

    const commentData=[];
    for(let i=0 ; i<response2.data.length ; i++){
      console.log(response2.data[i])
      commentData.push({
        created_at: response2.data[i].created_at,
        message:response2.data[i].message,
        commenter:response2.data[i].commenter
      })
    }
    commentData.reverse();
    const data = [];
      data.push({
        id: response.data.id,
        title: response.data.title,
        priority: response.data.priority,
        description: response.data.description,
        assignedUser: response.data.assignedUser,
        status: response.data.status,
        project: response.data.project,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
       
        // uid: response.data[index].uid
      });
    
    console.log(data)
    yield put(actions.getTicketSuccess(data,commentData));
  } catch (error) {
    console.log(error);
    yield put(actions.getTicketError(error));
  }
}
function* createComment({ payload }) {
  const { data } = payload;
  console.log(data.message)
  let id = data.ticketId;
  try {
        let form_data = new FormData();
        // form_data1.append("id", data.id);
        form_data.append("message", data.message);
        form_data.append("ticket", data.ticketId);
        form_data.append("commenter", 'TestUser');

        const response1 = yield call(requestCreateComment, form_data);
        console.log(response1)
        yield put({ type: actions.GET_TICKET,
                    payload: {id} });
    }
  catch (error) {
        console.log(error);
        yield put(actions.createCommentError(error));
  }
}
function* createTicket({ payload }) {
  const { data, actionName } = payload;
  console.log(data)
  const id = data.id
  try {
    switch (actionName) {
      // case 'delete':
      //   yield call(deleteTicket, data.id);
      //   break;
      case 'update':
        console.log(data)
        let form_data1 = new FormData();
        // form_data1.append("id", data.id);
        form_data1.append("title", data.title);
        form_data1.append("description", data.description);
        form_data1.append("priority", data.priority);
        form_data1.append("status", data.status)
        if(data.project[1] != null){
          form_data1.append("project", data.project[1]);
        }
        else{
          form_data1.append("project", data.project['id']);
        }
        if(data.assignedUser[1] != null){
          form_data1.append("assignedUser", data.assignedUser[1]);
        }
        else{
          form_data1.append("assignedUser", data.assignedUser['id']);
        }
        const response1 = yield call(updateTicket,data.id, form_data1);
        break;
      // default:
      //   let form_data = new FormData();
      //   form_data.append("title", data.title);
      //   form_data.append("description", data.description);
      //   form_data.append("priority", data.priority);
      //   form_data.append("project", data.project[1]);
      //   form_data.append("status", data.status)
      //   if(data.assignedUser != null){
      //     form_data.append("assignedUser", data.assignedUser[1]);
      //   }
      //   const response = yield call(postTicket, form_data);
      //   break;
    }
    yield put({ type: actions.GET_TICKET,
                payload: {id} 
              });
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

    yield put({ type: actions.GET_TICKET });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_TICKET, getTicket),
    takeEvery(actions.CREATE_TICKET, createTicket),
    takeEvery(actions.CREATE_COMMENT, createComment),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
