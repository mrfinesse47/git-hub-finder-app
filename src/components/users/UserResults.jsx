import React from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import { useEffect, useContext } from "react";
import GithubContext from "../../context/githubContext";

const UserResults = () => {
  const { loading, users, fetchUsers } = useContext(GithubContext); //this would noramlly be local state
  //but by using context its global
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        //<h3 key={user.id}>{user.login}</h3>
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserResults;
