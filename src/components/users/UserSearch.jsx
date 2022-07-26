import React from "react";
import { useState, useContext } from "react";
import GithubContext from "../../context/githubContext";
import AlertContext from "../../context/alertContext";
import { getUsers } from "../../context/githubActions";

const UserSearch = () => {
  const [text, setText] = useState("");
  const { users, clearUsers, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("please enter something", "error");
      //alert("please enter something");
    } else {
      //search users
      dispatch({ type: "SET_LOADING" });

      const users = await getUsers(text);

      dispatch({ type: "SET_USERS", payload: users });
      setText("");
    }
  };
  const handleClear = () => {
    if (users.length > 0) {
      dispatch({ type: "SET_USERS", payload: [] });
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={(e) => handleChange(e)}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
          {users.length > 0 && (
            <div>
              <button onClick={handleClear} className="btn btn-ghost btn-lg">
                Clear
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UserSearch;
