import React, { useEffect, useState } from 'react';

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found. Please log in.');
          return;
        }

        // Fetch profile data from backend
        const response = await fetch('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if the response is OK
        if (!response.ok) {
          console.error('Failed to fetch profile data');
          return;
        }

        // Parse the JSON response
        const data = await response.json();

        // Log the user profile data to the console
        console.log('User Profile Data:', data);

        // Set profile data to state
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  // Loading state
  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  // Render user profile details
  return (
    <div>
      <h1>Welcome, {profileData.name}</h1>
      <p>Email: {profileData.email}</p>
      <p>Role: {profileData.role}</p>

      {/* Properly log the entire profile object */}
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
}

export default Profile;
