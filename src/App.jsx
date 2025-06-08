// App.jsx

import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen  ">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
