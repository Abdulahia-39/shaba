import Home from "./components/home/Home"
import Projects from "./components/projects/Projects.jsx"
import NotFound from "./components/notFound/NotFound.jsx"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
