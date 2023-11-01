const createAxiosConfig = (accessToken?: string | null) => {
  if (accessToken == null) {
    return {
      withCredentials: true, // Set the 'withCredentials' option here
    };
  }
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return {
    headers: headers,
    withCredentials: true, // Set the 'withCredentials' option here
  };
};

export default createAxiosConfig;
