
import { request, gql } from 'graphql-request';
const LOGIN_ENDPOINT = 'https://assets.nectarit.com:444/api/graphql';
const loginQuery = gql`
  query login($credentials: JSON, $isDevMode: Boolean) {\n
    login(credentials: $credentials, isDevMode: $isDevMode\n) \n
  }
`;
export const login = async () => {
  const variables = {
    credentials: {
      userName: "riyas@nectarit",
      password: "HoneyBee@2025",
    },
    isDevMode: false,
  };

  try {
    console.log("here")
    const response = await request(LOGIN_ENDPOINT, loginQuery, variables);
    const accessToken = response.login.accessToken;
    const expiresIn = 3600;
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expirationTime', expirationTime.toString());

    console.log(accessToken);
    return { accessToken};
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
export const getAccessToken = async () => {
  const storedToken = localStorage.getItem('accessToken');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  if (!storedToken || Date.now() >= Number(storedExpirationTime)) {
    const tokenData = await login();
    return tokenData.accessToken;
  }

  return storedToken;
};


//get maintanance count

const ASSET_LIST_COUNT_QUERY = gql`
  query getAssetListCount($filter: AssetFilter!) {
    getAssetListCount(filter: $filter)
  }
`;

export const getAssetListCount = async (token ,searchLabel,clientDomain ,timeFilter) => {
  console.log(token,searchLabel,clientDomain,timeFilter)
  const variables = {
    filter: {
      searchLabel: searchLabel,
      clientDomain:clientDomain,
      timeFilter:timeFilter 
    },
  };

  try {
    const response = await request(
      LOGIN_ENDPOINT,
      ASSET_LIST_COUNT_QUERY,
      variables,
      {
        Authorization: `Bearer ${token}`, // Pass token in headers
      }
    );
    return response.getAssetListCount;
  } catch (error) {
    console.error('Error fetching asset list count:', error);
  }
};
