import { handleActions } from "redux-actions";
import * as api from '../libs/api';
import createRequestThunk from "../libs/createRequestThunk";

//API를 사용하여 데이터를 받아와 상태를 관리하는 리듀서

//액션 타입을 선언
//한 요청당 세 개
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';

//thunk 함수를 생성
//thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치
export const getPost = createRequestThunk(GET_POST, api.getPost);

export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

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

