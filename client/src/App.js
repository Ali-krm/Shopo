import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ChangeTitle } from "./utils/GenralFunctions";
function App() {
  ChangeTitle("Shopo | Shop Online");
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
