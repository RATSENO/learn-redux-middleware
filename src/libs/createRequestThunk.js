import { startLoading, finishLoading } from "../modules/loading";

export default function createRequestThunk(type, request) {
    //성공 및 실패 액션 타입을 정의
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return params => async dispatch => {
        dispatch({ type });//시작됨
        dispatch(startLoading(type));
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            });//성공
            dispatch(finishLoading(type));
        } catch (error) {
            dispatch({
                type: FAILURE,
                payload: error,
                error: true
            })
            dispatch(startLoading(type));
            throw error;
        }
    };
};