import { all, takeEvery, fork, call,put } from 'redux-saga/effects';
import actions from './actions';
import { requestGetUsers} from '../../helpers/users/getUsers';

function* getUsers() {
  try {
    const response = yield call(requestGetUsers);
    console.log(response)
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      data.push({
        id: response.data[index].id,
        name: response.data[index].name,
        profile_image: response.data[index].profile_image,
        role: response.data[index].role,
      });
    }
    console.log(data)
    yield put(actions.getUsersSuccess(data))
  } catch (error) {
    console.log(error);
    yield put(actions.getUsersError(error));
  }
}
export function* addContact() {
  yield takeEvery(actions.ADD_CONTACT, function*() {});
}
export function* editContact() {
  yield takeEvery(actions.EDIT_CONTACT, function*() {});
}
export function* deleteContact() {
  yield takeEvery(actions.DELETE__CONTACT, function*() {});
}
export default function* rootSaga() {
  yield all([fork(addContact), fork(editContact), fork(deleteContact),fork(getUsers)]);
}
