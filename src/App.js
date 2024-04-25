import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./scenes/homepage";
import Loginpage from "./scenes/loginpage";
import ProfilePage from "./scenes/profilepage";
import { useMemo,useEffect } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Editpage from "scenes/Editpage";

function App() {
  useEffect(() => {
    document.title = `Student's Hub`;
  }, []);
  
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth=Boolean(useSelector((state)=>state.token))
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<Loginpage />} />
            <Route path="/home" element={isAuth ? <Homepage /> : <Navigate to="/"/>} />
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/"/>} />
            <Route path="/home/edit/:postId" element={isAuth ? <Editpage/> : <Navigate to="/"/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
