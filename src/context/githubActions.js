const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const getUsers = async (text) => {
  const params = new URLSearchParams({ q: text });

  const response = await fetch(`${GITHUB_URL}search/users?${params}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  const { items } = await response.json();

  return items;
};

const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}users/${login}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const user = await response.json();
    return user;
  }
};

const getUserRepos = async (login) => {
  //   setLoading();
  const params = new URLSearchParams({ sort: "created", per_page: 10 });
  const response = await fetch(`${GITHUB_URL}users/${login}/repos?${params}`, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  const repos = await response.json();
  return repos;

  //in the course he called the type: GET_REPOS
  //   dispatch({ type: "SET_REPOS", payload: data });
};

// export const getUserAndRepos = async (login) => {
//   const user = await getUser(login);
//   const repos = await getUserRepos(login);

//   console.log(user, repos);

//   return { user, repos };
// };

export const getUserAndRepos = (login) => {
  return Promise.all([getUser(login), getUserRepos(login)]).then((values) => {
    const [user, repos] = values;
    return { user, repos };
  });
};
