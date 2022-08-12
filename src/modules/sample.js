import { createAction, handleActions } from "redux-actions";
import * as api from '../libs/api';
import createRequestThunk from "../libs/createRequestThunk";
import {call, put, takeLatest} from 'redux-saga/effects'
import { finishLoading, startLoading } from "./loading";

//API를 사용하여 데이터를 받아와 상태를 관리하는 리듀서

//액션 타입을 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id=>id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action){
    //로딩시작
    yield put(startLoading(GET_POST));

    //파라미터로 action을 받아오면 액션의 정보를 조회할 수 있다.
    try {
        //call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다.
        //첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const post = yield call(api.getPost, action.payload);
        yield put({
            type : GET_POST_SUCCESS,
            payload : post.data
        });
    } catch (error) {
        yield put({
            type : GET_POST_FAILURE,
            payload : error,
            error : true
        })
    }
    yield put(finishLoading(GET_POST));
};

function* getUsersSaga(){
    //로딩시작
    yield put(startLoading(GET_USERS));

    //파라미터로 action을 받아오면 액션의 정보를 조회할 수 있다.
    try {
        //call을 사용하면 Promise를 반환하는 함수를 호출하고, 기다릴 수 있다.
        //첫번째 파라미터는 함수, 나머지 파라미터는 해당 함수에 넣을 인수
        const users = yield call(api.getUsers);
        yield put({
            type : GET_USERS_SUCCESS,
            payload : users.data
        });
    } catch (error) {
        yield put({
            type : GET_USERS_FAILURE,
            payload : error,
            error : true
        })
    }
    yield put(finishLoading(GET_USERS));
};

export function* sampleSaga(){
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
};


//초기 상태를 선언
//요청의 로딩 중 상태 loading이라는 객체에서 관리
const initialState = {
    post: null,
    users: null
};

const sample = handleActions({
    [GET_POST_SUCCESS]: (state, action) => ({
        ...state,
        post: action.payload
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
        ...state,
        users: action.payload
    })
}, initialState);

export default sample;

