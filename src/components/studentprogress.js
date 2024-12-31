import React, { useEffect, useState } from 'react';
import { getStudentProgress } from '../services/api';

const Progress = () => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await getStudentProgress();
        setProgress(response.data);
      } catch (error) {
        console.error('Progress fetch error:', error.response?.data || error.message);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <h2>Student Progress</h2>
      <ul>
        {progress.map((record) => (
          <li key={record.id}>
            {record.student_name}: Attendance {record.attendance}%, Grades: {record.grades}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Progress;
