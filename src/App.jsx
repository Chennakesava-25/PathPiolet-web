import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import ForgotPassword from './screens/ForgotPassword';
import VerifyOtp from './screens/VerifyOtp';
import ResetPassword from './screens/ResetPassword';
import Home from './screens/Home';
import AiFinder from './screens/AiFinder';
import Roadmap from './screens/Roadmap';
import DetailedRoadmap from './screens/DetailedRoadmap';
import Colleges from './screens/Colleges';
import CollegeDetails from './screens/CollegeDetails';
import AiProcessing from './screens/AiProcessing';
import Calendar from './screens/Calendar';
import AddEvent from './screens/AddEvent';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Settings from './screens/Settings';
import ChangePassword from './screens/ChangePassword';
import Legal from './screens/Legal';
import Qna from './screens/Qna';
import History from './screens/History';
import NotificationSettings from './screens/NotificationSettings';
import About from './screens/About';
import Contact from './screens/Contact';
import SplashScreen from './screens/SplashScreen';
import CheckEmail from './screens/CheckEmail';
import CareerPaths from './screens/CareerPaths';
import ExamDetails from './screens/ExamDetails';
import SubjectDetails from './screens/SubjectDetails';
// Career Roles
import SoftwareDeveloper from './screens/roles/SoftwareDeveloper';
import WebDeveloper from './screens/roles/WebDeveloper';
import DataScientist from './screens/roles/DataScientist';
import AppDeveloper from './screens/roles/AppDeveloper';
import DevOpsEngineer from './screens/roles/DevOpsEngineer';
import CloudEngineer from './screens/roles/CloudEngineer';
import SoftwareDeveloperBsc from './screens/roles/SoftwareDeveloperBsc';
import WebDeveloperBsc from './screens/roles/WebDeveloperBsc';
import DataAnalyst from './screens/roles/DataAnalyst';
import SystemAnalyst from './screens/roles/SystemAnalyst';
import ITSupport from './screens/roles/ITSupport';
import ResearchAssistant from './screens/roles/ResearchAssistant';
import Layout from './components/Layout';

// Simple Auth Guard with Outlet
const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Debug Logger Component
const RouteLogger = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("Current Path:", location.pathname);
  }, [location.pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <RouteLogger />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/splash" replace />} />
          <Route path="/splash" element={<SplashScreen />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />

          {/* Protected Area wrapped in Layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/ai-finder" element={<AiFinder />} />
            <Route path="/ai-processing" element={<AiProcessing />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/roadmap/:stage" element={<DetailedRoadmap />} />
            <Route path="/career-paths" element={<CareerPaths />} />
            <Route path="/exam-details/:examName" element={<ExamDetails />} />
            <Route path="/subject-details/:subjectName" element={<SubjectDetails />} />

            {/* Career Role Routes */}
            <Route path="/career-paths/software-developer" element={<SoftwareDeveloper />} />
            <Route path="/career-paths/web-developer" element={<WebDeveloper />} />
            <Route path="/career-paths/data-scientist" element={<DataScientist />} />
            <Route path="/career-paths/app-developer" element={<AppDeveloper />} />
            <Route path="/career-paths/devops-engineer" element={<DevOpsEngineer />} />
            <Route path="/career-paths/cloud-engineer" element={<CloudEngineer />} />
            <Route path="/career-paths/software-developer-bsc" element={<SoftwareDeveloperBsc />} />
            <Route path="/career-paths/web-developer-bsc" element={<WebDeveloperBsc />} />
            <Route path="/career-paths/data-analyst" element={<DataAnalyst />} />
            <Route path="/career-paths/system-analyst" element={<SystemAnalyst />} />
            <Route path="/career-paths/it-support" element={<ITSupport />} />
            <Route path="/career-paths/research-assistant" element={<ResearchAssistant />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetails />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/calendar/add" element={<AddEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />

            {/* Settings Nested Group */}
            <Route path="/settings">
              <Route index element={<Settings />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="notifications" element={<NotificationSettings />} />
            </Route>

            <Route path="/qna" element={<Qna />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
