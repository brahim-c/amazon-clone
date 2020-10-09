import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/e-7e629/us-central1/api", //THE API URL (cloudfuctions)
});

export default instance;
