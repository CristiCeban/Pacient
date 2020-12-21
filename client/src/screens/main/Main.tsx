import React from 'react'
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {onLogout} from "../../redux/actions/generalActions";

const Main = () => {
    const dispatch = useDispatch();

    const logout = async () => {
        dispatch(onLogout());
    }
    return(
        <div>
            <h1>Main</h1>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Main
