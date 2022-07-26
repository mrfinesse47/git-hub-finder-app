import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

export const getUsers = async (text) => {
  const params = new URLSearchParams({ q: text });
  const response = await github.get(`search/users?${params}`);
  return response.data.items;
};

const getUser = async (login) => {
  try {
    const response = await github.get(`users/${login}`);
    return response.data;
  } catch (e) {
    window.location = "/notfound";
  }
};

const getUserRepos = async (login) => {
  const params = new URLSearchParams({ sort: "created", per_page: 10 });

  const response = await github.get(`users/${login}/repos?${params}`);

  return response.data;
};

// the async await way
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
