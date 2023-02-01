import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import fakeData from './fakeData';
import {requestGetProject,updateProject} from '../../helpers/projectsDetail/projects';


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

function* getProject({payload}) {
  console.log(payload)
  try {
    const response = yield call(requestGetProject, payload.id);
    console.log(response);
    const data = [];
      data.push({
        id: response.data.id,
        assignedUser:[response.data.assignedUser['name'],response.data.assignedUser['id']],
        priority: response.data.priority,
        description: response.data.description,
        tickets: response.data.tickets,
        title: response.data.title,
        created_at: response.data.created_at,
        updated_at: response.data.updated_at,
       
        // uid: response.data[index].uid
      });
    // let date = new Date(`${data[0].created_at}`)
    // console.log(date.toLocaleString())
    yield put(actions.getProjectSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.getProjectError(error));
  }
}
function* createProject({ payload }) {
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
        form_data1.append("assignedUser", data.assignedUser[1]);
        const response1 = yield call(updateProject,data.id, form_data1);
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
    yield put({ type: actions.GET_PROJECT,
                payload: {id} 
              });
  } catch (error) {
    console.log(error);
    yield put(actions.createProjectError(error));
  }
}

// function* createProject({ payload }) {
//   const { data, actionName } = payload;
//   console.log(data)
//   const id = data.ticketId
//   try {
//     switch (actionName) {
//       // case 'delete':
//       //   yield call(deleteTicket, data.id);
//       //   break;
//       case 'update':
//         console.log(data)
//         let form_data1 = new FormData();
//         // form_data1.append("id", data.id);
//         if(data.title){
//           form_data1.append("title", data.title);
//         }
//         else if (data.description){
//           form_data1.append("description", data.description);
//         }
//         else if(data.priority){
//           form_data1.append("priority", data.priority);
//         }
//         else if(data.status){
//           console.log(data.status)
//           form_data1.append("status", data.status)
//         }
//         else if(data.project){
//           console.log(data.project[1])
//           form_data1.append("project", data.project[1]);
//         }
//         else if(data.assignedUser){
//           console.log(data.assignedUser[1])
//           form_data1.append("assignedUser", data.assignedUser[1]);
//         }
        
//         // if(data.project[1] != null){
//         //   form_data1.append("project", data.project[1]);
//         // }
//         // else{
//         //   form_data1.append("project", data.project['id']);
//         // }
//         // if(data.assignedUser[1] != null){
//         //   form_data1.append("assignedUser", data.assignedUser[1]);
//         // }
//         // else{
//         //   form_data1.append("assignedUser", data.assignedUser['id']);
//         // }
//         const response1 = yield call(updateTicket,data.ticketId, form_data1);
//         console.log(response1)
//         break;
//       // default:
//       //   let form_data = new FormData();
//       //   form_data.append("title", data.title);
//       //   form_data.append("description", data.description);
//       //   form_data.append("priority", data.priority);
//       //   form_data.append("project", data.project[1]);
//       //   form_data.append("status", data.status)
//       //   if(data.assignedUser != null){
//       //     form_data.append("assignedUser", data.assignedUser[1]);
//       //   }
//       //   const response = yield call(postTicket, form_data);
//       //   break;
//     }
//     yield put({ type: actions.GET_TICKET,
//                 payload: {id} 
//               });
//   } catch (error) {
//     console.log(error);
//     yield put(actions.createProjectError(error));
//   }
// }

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

    yield put({ type: actions.GET_PROJECT });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PROJECT, getProject),
    takeEvery(actions.CREATE_PROJECT, createProject),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
