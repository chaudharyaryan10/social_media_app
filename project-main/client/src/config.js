let BASE_URL = "https://social-media-app-x2xo.onrender.com/";

if (process.env.NODE_ENV !== "production") {
  BASE_URL = "http://localhost:4000";
}
export { BASE_URL };
