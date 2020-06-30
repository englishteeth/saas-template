import React, { useState, useEffect } from "react";
import Greeting from "../components/greeting";

function Profile() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users/7")
    fetch("http://localhost:9000/user", {
      credentials: 'include' // fetch won't send cookies unless you set credentials
    })
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
      <Greeting  name={profile.username} />
    </>
  );
}

export default Profile;