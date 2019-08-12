import axios from "axios";

export default axios.create({
  baseURL: `http://192.168.10.244:5004/v1/sbag/list_receipt/`,
  headers: {
    AccessControlAllowHeaders: "*",
    AccessControlAllowMethods: "*"
  },
  auth: {
    username: "it_ausiris",
    password: "itausiris@"
  }
});
