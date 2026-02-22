import React from "react";
import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import GoalSelection from "./pages/goal-selection";
import SkillLevelSelection from "./pages/skill-level-selection";
import LandingPage from "./pages/landing-page";
import AIGeneratedRoadmap from "./pages/ai-generated-roadmap";
import ModuleQuizInterface from "./pages/module-quiz-interface";
import SubjectSelection from "./pages/subject-selection";
import Solution from "./pages/solution";
import FeaturesPage from "./pages/features";
import ProfileModal from "pages/Profile";
import AuthPage from "./pages/auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function ModalSwitch() {
  const location = useLocation();
  const state = location.state;
  const background = state && state.background;

  return (
    <ErrorBoundary>
      <ScrollToTop />

      {/* Always render normal routes */}
      <RouterRoutes location={background || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/goal-selection" element={
          <ProtectedRoute>
            <GoalSelection />
          </ProtectedRoute>
        } />
        <Route
          path="/skill-level-selection"
          element={
            <ProtectedRoute>
              <SkillLevelSelection />
            </ProtectedRoute>
          }
        />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/ai-generated-roadmap" element={
          <ProtectedRoute>
            <AIGeneratedRoadmap />
          </ProtectedRoute>
        } />
        <Route
          path="/module-quiz-interface"
          element={
            <ProtectedRoute>
              <ModuleQuizInterface />
            </ProtectedRoute>
          }
        />
        <Route path="/subject-selection" element={
          <ProtectedRoute>
            <SubjectSelection />
          </ProtectedRoute>
        } />
        <Route path="/solution" element={<Solution />} />
        <Route path="/features" element={<FeaturesPage />} />

        {/* Direct access to /profile should show full page */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfileModal isOpen onClose={() => (window.location.href = "/")} />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>

      {/* If background exists, render modal on top */}
      {background && (
        <RouterRoutes>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileModal isOpen onClose={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
        </RouterRoutes>
      )}
    </ErrorBoundary>
  );
}

export default function Routes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalSwitch />
      </AuthProvider>
    </BrowserRouter>
  );
}
