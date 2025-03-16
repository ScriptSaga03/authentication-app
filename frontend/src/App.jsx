import React from "react";
import {ThemeProvider} from "./component/context/themeContext"
import { AuthProvider } from "./component/context/AuthProvider";
import RoutesComponent from "./component/routes/RoutesComponent";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./component/context/UserContext";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <UserProvider>
            <RoutesComponent />
          </UserProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
