import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppDataProvider } from "./context/AppDataContext";
import { ToastProvider } from "./context/ToastContext";
import { ModalProvider } from "./context/ModalContext";
import { Layout } from "./components/Layout";
import { OpportunityDetailModal } from "./components/OpportunityDetailModal";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Internships from "./pages/Internships";
import Hackathons from "./pages/Hackathons";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import About from "./pages/About";

export default function App() {
  return (
    <AppDataProvider>
      <ToastProvider>
        <ModalProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/hackathons" element={<Hackathons />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Layout>
            <OpportunityDetailModal />
          </BrowserRouter>
        </ModalProvider>
      </ToastProvider>
    </AppDataProvider>
  );
}
