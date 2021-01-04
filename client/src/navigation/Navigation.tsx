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
import NavBar from "../components/navBar/NavBar";
import Patient from "../screens/patient/Patient";
import Recipe from "../screens/recipe/Recipe";
import Treatment from "../screens/treatment/Treatment";
import Diagnostic from "../screens/diagnostic/Diagnostic";
import Pills from "../screens/Pills/Pills";

const Navigation = ({history} : any) => {
    const {isLogged} = useSelector((state:ApplicationState) => state.authReducer)
    return(
        <Router history={history}>
            <Switch>
                {!isLogged ?
                <Switch>
                    <Route exact path={'/'} component={AuthScreen}/>
                    <Route exact path={'/signIn'} component={AuthScreen}/>
                    <Route exact path={'/signUp'} component={RegisterScreen}/>
                    <Route path={'/*'} component={AuthScreen}/>
                </Switch>
                :
                <Switch>
                    <Route exact path={'/'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Main}/>
                        </>
                    )}
                    />
                    <Route exact path={'/signIn'} render={() =>(
                        !isLogged ?
                            <Route component={AuthScreen} />
                            :
                            <Redirect to={'/'}/>
                    )
                    }/>
                    <Route exact path={'/signUp'} render={()=>(
                        !isLogged ?
                            <Route component={RegisterScreen} />
                            :
                            <Redirect to={'/'}/>
                    )
                    }/>
                    <Route exact path={'/patient'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Patient}/>
                        </>
                    )}
                    />
                    <Route exact path={'/recipe'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Recipe}/>
                        </>
                    )}
                    />
                    <Route exact path={'/treatment'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Treatment}/>
                        </>
                    )}
                    />
                    <Route exact path={'/diagnostic'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Diagnostic}/>
                        </>
                    )}
                    />
                    <Route exact path={'/pills'} render={() => (
                        <>
                            <NavBar/>
                            <Route component={Pills}/>
                        </>
                    )}
                    />

                    <Route path={'/*'} component={PageNotFound}/>
                </Switch>}
            </Switch>
        </Router>
    )
}

export default Navigation
