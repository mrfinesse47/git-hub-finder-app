import React from "react";
import { useEffect, useState } from "react";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}users`);
    const data = await response.json();
    setLoading(false);
    setUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <h3>loading....</h3>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <h3 key={user.id}>{user.login}</h3>
      ))}
    </div>
  );
};

export default UserResults;
