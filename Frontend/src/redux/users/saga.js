import { all, takeEvery, fork, call,put } from 'redux-saga/effects';
import actions from './actions';
import { requestGetUsers,
        requestPostUser,
        firebaseUser,
        urlToObject,
        requestPutUser,
        editFirebaseUser } from '../../helpers/users/getUsers';

function* getUsers() {
  try {
    const response = yield call(requestGetUsers);
    const data = [];
    for (let index = 0; index < response.data.length; index++) {
      data.push({
        id: response.data[index].id,
        name: response.data[index].name,
        profile_image: response.data[index].profile_image,
        role: response.data[index].role,
        email: response.data[index].email,
      });
    }
    yield put(actions.getUsersSuccess(data))
  } catch (error) {
    console.log(error);
    yield put(actions.getUsersError(error));
  }
}
export function* editCreateView() {
  yield takeEvery(actions.EDIT_CREATE_VIEW, function*() {});
}
export function* createUser({ payload }) {

  const { contact } = payload;

    try {
      const file = yield call(urlToObject, contact.profile_image);

      let form_data = new FormData();
      form_data.append("password", contact.password);
      form_data.append("name", contact.name);
      form_data.append("email", contact.email);
      form_data.append("role", contact.role);
      form_data.append("profile_image", file);

      const response1 = yield call(firebaseUser, form_data);
      console.log(response1)
      const response = yield call(requestPostUser, form_data);
      
      yield put({ type: actions.GET_USER });
    }
    catch (error) {
      console.log(error);
      yield put(actions.getUsers());
    }
  }

  export function* editUser({ payload }) {

    const { contact } = payload;
    console.log(contact)
    // let attributes = Object.keys(contact)
      try {
        const file = yield call(urlToObject, contact.profile_image);

        let form_data = new FormData();  
        form_data.append("id", contact.id);
        form_data.append("password", contact.password);
        form_data.append("name", contact.name);
        form_data.append("email", contact.email);
        form_data.append("role", contact.role);
        form_data.append("profile_image", file);

       
        // attributes.forEach((attribute)=>
        // console.log(`${attribute}`, contact[attribute])
        // )

        const response1 = yield call(editFirebaseUser, form_data);
        const response = yield call(requestPutUser, form_data);
        console.log(response)
        yield put({ type: actions.GET_USER });
      }
      catch (error) {
        console.log(error);
        yield put(actions.getUsers());
      }
    }

export function* editContact() {
  yield takeEvery(actions.EDIT_CONTACT, function*() {});
}
export function* deleteContact() {
  yield takeEvery(actions.DELETE__CONTACT, function*() {});
}
export default function* rootSaga() {
  yield all([fork(editCreateView),
    fork(editContact),
    fork(deleteContact),
    takeEvery(actions.GET_USER,getUsers),
    takeEvery(actions.CREATE_USER,createUser),
    takeEvery(actions.EDIT_USER,editUser)]);
}
