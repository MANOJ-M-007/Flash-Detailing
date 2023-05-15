import { ThemeProvider } from "@mui/material/styles";
import theme from "./utility/CoustomTheme";
import AllRoutes from './routes/AllRoutes'
import './App.css'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AllRoutes/>
      </ThemeProvider>
    </div>
  );
}

export default App;
