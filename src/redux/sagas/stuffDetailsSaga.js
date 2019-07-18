import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchPD() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const response = yield axios.get('/api/stuff/pd', config);
    
    yield put({ type: 'SET_PD', payload: response.data });
  } catch (error) {
    console.log('Stuff get request failed', error);
  }
}

function* fetchStatus() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const response = yield axios.get('/api/stuff/status', config);
    
    yield put({ type: 'SET_STATUS', payload: response.data });
  } catch (error) {
    console.log('Stuff get request failed', error);
  }
}

function* fetchType() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    
    const response = yield axios.get('/api/stuff/type', config);
    
    yield put({ type: 'SET_TYPE', payload: response.data });
  } catch (error) {
    console.log('Stuff get request failed', error);
  }
}

function* stuffDetailsSaga() {
  yield takeLatest('FETCH_PD', fetchPD);
  yield takeLatest('FETCH_STATUS', fetchStatus);
  yield takeLatest('FETCH_TYPE', fetchType);
}

export default stuffDetailsSaga;
