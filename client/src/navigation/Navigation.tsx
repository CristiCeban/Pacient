import React from "react";
import {
    Router,
    Route,
    Redirect, Switch
} from 'react-router'
import {useSelector} from "react-redux";
import {ApplicationState} from "../redux/reducers";
import AuthScreen from "../screens/auth/AuthScreen";
import Main from "../screens/main/Main";
import RegisterScreen from "../screens/auth/RegisterScreen";
import PageNotFound from "../screens/pageNotFound/PageNotFound";

const Navigation = ({history} : any) => {
    const {isLogged} = useSelector((state:ApplicationState) => state.authReducer)
    return(
        <Router history={history}>
            <Switch>
                {isLogged ?
                <Switch>
                    <Route exact path={'/'} component={AuthScreen}/>
                    <Route exact path={'/signIn'} component={AuthScreen}/>
                    <Route exact path={'/signUp'} component={RegisterScreen}/>
                    <Route path={'/*'} component={() => <Redirect to={'/signIn'}/>}/>
                </Switch>
                :
                <Switch>
                    <Route exact path={'/'} render={() => (
                        <Route component={Main}/>
                    )}
                    />
                    <Route path={'/*'} component={PageNotFound}/>
                </Switch>}
            </Switch>
        </Router>
    )
}

export default Navigation
