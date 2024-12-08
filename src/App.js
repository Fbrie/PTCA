import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup'; // Fix incorrect import
import Messaging from './Pages/Messaging';
import StudentProgress from './Pages/StudentProgress';
import Meeting from './Pages/Meeting';
import NavBar from './Components/NavBar';

const App = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    // Fetching sample progress data (replace with an API call if needed)
    const sampleProgressData = [
      { subject: 'Math', grade: 'A+' },
      { subject: 'Science', grade: 'B' },
      { subject: 'English', grade: 'A' },
    ];
    setProgressData(sampleProgressData);
  }, []);

  return (
    <Router>
      
      <div className="App">
        <h1>Parent Teacher Communication App</h1>
        {/* Routing Logic */}

        <NavBar />

        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/progress" element={<StudentProgress progressData={progressData} />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;




