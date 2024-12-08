// src/pages/StudentProgress.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProgress = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchProgressData = async () => {
      const response = await axios.get('/api/progress/'); // Replace with your Django progress API endpoint
      setProgressData(response.data);
    };
    fetchProgressData();
  }, []);

  return (
    <div>
      <h2>Student Progress</h2>
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map((data, index) => (
            <tr key={index}>
              <td>{data.student_name}</td>
              <td>{data.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentProgress;
