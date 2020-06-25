import React, { useState, useEffect } from "react";

function Profile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/7")
    .then(res => res.json())
    .then(
      (data) => {
        setProfile(data);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    )
  },[]);

  if (error) return <div>Error: {error.message}</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <h1>The Profile Page</h1>
      <div>{profile.name} - {profile.email}</div>
    </>
  );
}

export default Profile;