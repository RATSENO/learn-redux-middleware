import { handleActions } from "redux-actions";
import * as api from '../libs/api';

//API를 사용하여 데이터를 받아와 상태를 관리하는 리듀서

//액션 타입을 선언
//한 요청당 세 개
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_USERS_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

//thunk 함수를 생성
//thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치

export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST });//요청을 시작한 것을 알림
    try {
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        });//요청 성공
    } catch (error) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: error,
            error: true
        });//에러 발생
        throw error;
    }
};

export const getUsers = () => async dispatch => {
    dispatch({ type: GET_USERS });
    try {
        const response = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: error,
            error: true
        });
        throw error;
    }
};

//초기 상태를 선언
//요청의 로딩 중 상태 loading이라는 객체에서 관리
const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false
    },
    post: null,
    users: null
};

const sample = handleActions({
    [GET_POST]: state => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: true
        }
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false
        },
        post: action.payload
    }),
    [GET_POST_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_POST: false
        }
    }),
    [GET_USERS]: state => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: true
        }
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: false
        },
        users: action.payload
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
        ...state,
        loading: {
            ...state.loading,
            GET_USERS: false
        }
    })
}, initialState);

export default sample;

