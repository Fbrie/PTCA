
import React, { useState } from 'react';

function TestApi() {
  const [apiResponse, setApiResponse] = useState('');
  const [testData, setTestData] = useState({
    email: '',
    password: '',
  });

  const handleApiTest = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      if (response.ok) {
        setApiResponse(JSON.stringify(data, null, 2));
      } else {
        setApiResponse(`Error: ${data.message || 'Request failed.'}`);
      }
    } catch (err) {
      console.error('API Test Error:', err);
      setApiResponse('An error occurred while testing the API.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData({ ...testData, [name]: value });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Test API Routes</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={testData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={testData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </label>
        <br />
        <button type="button" onClick={() => handleApiTest('login')}>
          Test Login
        </button>
        <button type="button" onClick={() => handleApiTest('register')}>
          Test Register
        </button>
      </form>
      <h3>API Response:</h3>
      <pre style={{ background: '#f4f4f4', padding: '10px' }}>{apiResponse}</pre>
    </div>
  );
}

export default TestApi;
