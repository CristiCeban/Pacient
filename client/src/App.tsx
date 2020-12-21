import React from 'react';
import {persistor, store} from "./redux/store";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {createBrowserHistory} from 'history';
import Navigation from "./navigation/Navigation";

const history = createBrowserHistory()

const App = () => {
  return(
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <Navigation history={history}/>
          </PersistGate>
      </Provider>
  )
}

export default App;
