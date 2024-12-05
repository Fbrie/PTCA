import React from 'react';

const ProgressView = ({ studentName, progressData }) => {
  return (
    <div className="progress-view">
      <h2>Progress for {studentName}</h2>
      <ul>
        {progressData.map((data, index) => (
          <li key={index}>
            <strong>{data.subject}:</strong> {data.grade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressView;
