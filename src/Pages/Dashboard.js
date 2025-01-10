import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Optional CSS for styling

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to the PTCW Dashboard</h1>
        <p>Select an option below to get started:</p>
        
      </header>

      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Messages</h2>
          <p>View and send messages between parents and teachers.</p>
          <Link to="/messages" className="dashboard-link">
            Go to Messages
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Student Progress</h2>
          <p>Track attendance and grades for students.</p>
          <Link to="/progress" className="dashboard-link">
            View Progress
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Schedule Meetings</h2>
          <p>Plan and schedule meetings with parents or teachers.</p>
          <Link to="/meetings" className="dashboard-link">
            Schedule a Meeting
          </Link>
        </div>
      </main>

      <footer className="dashboard-footer">
        <p>© 2024 PTCW. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
