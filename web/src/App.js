import React from "react";
import AppNavigator from "./util/Navigator";
import AppContextProvider from "./util/AppContext";
function App() {
  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  )
}

export default App;
