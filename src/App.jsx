import { Routes, Route } from "react-router-dom";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetailPage from "./activities/ActivityDetailPage"; // you’ll create this
import Register from "./auth/Register";
import Login from "./auth/Login";
import Error404 from "./Error404";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ActivitiesPage />} />
      <Route path="/activities" element={<ActivitiesPage />} />
      <Route path="/activities/:activityId" element={<ActivityDetailPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
