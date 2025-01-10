import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please login to access your profile');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
        setIsAdmin(data.user.role === 'admin'); // Set isAdmin based on role
      } else {
        alert(data.message || 'Failed to fetch profile');
        console.log(err)
        window.location.href = '/login';
      }
    }

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>Welcome to Your Profile</h1>
      <p id="profile-info">Hello, {profile.username}!</p>
      {isAdmin && (
        <div id="admin-section">
          <h2>Admin Dashboard</h2>
          <p>Only visible to admins.</p>
        </div>
      )}
      <button id="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
