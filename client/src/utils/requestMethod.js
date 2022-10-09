const axios = require("axios");
const BASE_URL = "/";

exports.publicRequest = axios.create({
  baseURL: BASE_URL,
});

exports.privateRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
