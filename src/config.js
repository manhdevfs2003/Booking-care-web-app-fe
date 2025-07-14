const config = {
  api: {
    API_BASE_URL: process.env.NODE_ENV === 'production' 
      ? process.env.REACT_APP_BACKEND_URL_PRODUCTION || "https://your-backend-domain.com/"
      : process.env.REACT_APP_BACKEND_URL || "http://localhost:8080/",
    ROUTER_BASE_NAME: null,
  },
  app: {
    /**
     * The base URL for all locations. If your app is served from a sub-directory on your server, you'll want to set
     * this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.
     */
    ROUTER_BASE_NAME: process.env.REACT_APP_ROUTER_BASE_NAME || null,
  },
};

export default config;
