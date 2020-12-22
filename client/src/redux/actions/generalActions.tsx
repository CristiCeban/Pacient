import {Dispatch} from "react";

export interface LogoutReset {
    readonly type : 'USER_LOGOUT_RESET',
    payload : undefined,
}

export type generalActions =
    | LogoutReset


export const onLogout = () => {
    return async(dispatch : Dispatch<generalActions>) => {
        dispatch({type:'USER_LOGOUT_RESET',payload:undefined})
    }
}
