
import { request, gql } from 'graphql-request';
const loginQuery = gql`
  query login($credentials: JSON, $isDevMode: Boolean) {\n
    login(credentials: $credentials, isDevMode: $isDevMode\n) \n
  }
`;
export const login = async (url ,username , password) => {
  const variables = {
    credentials: {
      userName: username,
      password: password,
    },
    isDevMode: false,
  };

  try {
    console.log("<----------------------started fetching token ------------------------------------------------>")
    const response = await request(url, loginQuery, variables);
    const accessToken = response.login.accessToken;
    const expiresIn = 3600;
    const expirationTime = Date.now() + expiresIn * 1000;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expirationTime', expirationTime.toString());
    console.log("<----------------------completed fetching token ------------------------------------------------>")
    return { accessToken};
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
export const getAccessToken = async (url ,username , password) => {
  console.log(url  , "---------------------------------------->")
  const tokenData = await login(url ,username , password);
  return tokenData.accessToken;
};


//get maintanance count

const ASSET_LIST_COUNT_QUERY = gql`
  query getAssetListCount($filter: AssetFilter!) {
    getAssetListCount(filter: $filter)
  }
`;

export const getAssetListCount = async (url,token ,searchLabel,clientDomain ,timeFilter,types,make) => {
  const variables = {
    filter: {
      searchLabel: searchLabel,
      clientDomain:clientDomain,
      timeFilter:timeFilter,
      type:types,
      make:make
    },
  };

  try {
    const response = await request(
      url,
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

