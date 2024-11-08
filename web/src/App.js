import React from "react";
import AppNavigator from "./util/Navigator";
import AppContextProvider from "./util/AppContext";
import './util/translator';
function App() {
  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  )
}

export default App;
