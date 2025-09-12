import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AISummary from "./pages/AISummary";
import AITranslate from "./pages/AITranslate";
import AIQuickQuestion from "./pages/AIQuickQuestion";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<AISummary />} />
          <Route path="/translate" element={<AITranslate />} />
          <Route path="/question" element={<AIQuickQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
