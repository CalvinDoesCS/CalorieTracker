const createAxiosConfig = (accessToken : string | null) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    return {
      headers: headers,
      withCredentials: true, // Set the 'withCredentials' option here
    };
  };
  
  export default createAxiosConfig;