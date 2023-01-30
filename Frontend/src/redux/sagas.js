import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './users/saga';
import invoicesSagas from './invoice/saga';
import mailSagas from './mail/saga';
import notesSagas from './notes/saga';
import todosSagas from './todos/saga';
import ecommerceSaga from './ecommerce/saga';
import cardsSagas from './card/saga';
import chatSagas from './chat/sagas';
import youtubeSearchSagas from './youtubeSearch/sagas';
import devSagas from '../customApp/redux/sagas';
import articles from './articles/sagas';
import tickets from './tickets/sagas';
import ticketDetail from './ticketDetail/sagas';
import projectDetail from './projectDetail/sagas';
import projects from './projects/sagas';
import investors from './investors/sagas';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    userSagas(),
    mailSagas(),
    notesSagas(),
    todosSagas(),
    ecommerceSaga(),
    cardsSagas(),
    invoicesSagas(),
    chatSagas(),
    youtubeSearchSagas(),
    devSagas(),
    articles(),
    investors(),
    projects(),
    tickets(),
    ticketDetail(),
    projectDetail(),
  ]);
}
