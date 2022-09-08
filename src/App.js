import "./App.css";
import Users from "./layouts/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./layouts/Profile/profile";
import KpiPage from "./layouts/KPI/kpi-page";
import Notification from "./layouts/System/notification";
import Permissions from "./layouts/System/notification";
import News from "./layouts/News/news";
import Meeting from "./layouts/Meeting";
import Dashboard from "./layouts/dashboard";
import HomePage from "./layouts/home-page";
import UserCreate from "./layouts/Users/create-edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/create" element={<UserCreate />} />
        <Route path="/user/:id" element={<UserCreate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kpi" element={<KpiPage />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/news" element={<News />} />
        <Route path="/meeting" element={<Meeting />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<HomePage />} />
      </Switch>
    </Router>
  );
}

export default App;
