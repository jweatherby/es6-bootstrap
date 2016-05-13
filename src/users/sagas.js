import axios from 'axios';
import {takeEvery, takeLatest} from 'redux-saga';
import {call, put, fork} from 'redux-saga/effects';

import bows from 'bows';

const logger = bows('users.sagas');

/**
    Simple api connection 'adding a user'. Basic set of tests for
    sagas.
*/
export function* doRegister(action) {
    try {
        var resp = yield call(axios.post, '/api/users/register', action);
        if(!resp.data || resp.data.errors)
            yield put({type: 'REGISTER_FAIL', errors: resp.data.errors});
        else{
            yield put({type: 'REGISTER_SUCCESS', msg: resp.data.msg});
            yield put({type: 'ADD_USER', user: resp.data});
        }
    } catch(error) {
        yield put({type: 'REGISTER_FAIL', error});
    }
}

export function* doLogin(action){
    try {
        logger('in doLogin', action);
        var resp = yield call(axios.post, '/api/users/login', action);
        if(resp.data.errors)
            yield put({type: 'LOGIN_FAIL', errors: resp.data.errors});
        else
            yield put({type: 'LOGIN_SUCCESS', username: resp.data.user.username});
    } catch(error) {
        yield put({type: 'LOGIN_FAIL', error});
    }
}

export function* watchLogin(){
    yield* takeEvery('LOGIN', doLogin)
}
export function* watchRegister(){
    yield* takeEvery('REGISTER', doRegister);
}

export default function* root(){
    yield [
        fork(watchRegister),
        fork(watchLogin),
    ]
}