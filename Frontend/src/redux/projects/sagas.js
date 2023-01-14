import { all, takeEvery, put, call } from 'redux-saga/effects';
import actions from './actions';
import FirebaseHelper from '../../helpers/firebase';
import omit from 'lodash/omit';
import fakeData from './fakeData';
import {requestGetProjects} from'../../helpers/projects/projects';

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

function* getProjects() {
  try {
    const response = yield call(requestGetProjects);
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      data.push({
        id: response.data[index].id,
        title: response.data[index].title,
        priority: response.data[index].priority,
        description: response.data[index].description,
        assignedUser: response.data[index].assignedUser,
        // uid: response.data[index].uid
      });
    }
    console.log(data)
    yield put(actions.getProjectsSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(actions.getProjectsError(error));
  }
}

function* storeIntoFirestore({ payload }) {
  const { data, actionName } = payload;
  try {
    switch (actionName) {
      case 'delete':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          deleted_at: new Date().getTime(),
        });
        break;
      case 'update':
        yield call(rsfFirestore.setDocument, `${COLLECTION_NAME}/${data.key}`, {
          ...omit(data, ['key']),
        });
        break;
      default:
        yield call(rsfFirestore.addDocument, COLLECTION_NAME, data);
        break;
    }
    yield put({ type: actions.GET_PROJECTS });
  } catch (error) {
    console.log(error);
    yield put(actions.saveIntoFireStoreError(error));
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

    yield put({ type: actions.GET_PROJECTS });
  } catch (error) {
    console.log(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.GET_PROJECTS, getProjects),
    takeEvery(actions.SAVE_INTO_FIRESTORE, storeIntoFirestore),
    takeEvery(actions.RESET_FIRESTORE_DOCUMENTS, resetFireStoreDocuments),
  ]);
}
