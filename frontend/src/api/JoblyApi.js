import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all companies  */

  static async getCompanies(search) {
    let res = await this.request("companies", { search });
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all jobs  */

  static async getJobs(search) {
    let res = await this.request(`jobs`, { search });
    return res.jobs;
  }

  static async applyToJob(username, id) {
    console.log(username, id);
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res.message;
  }

  /** Login a user */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    console.log(res.token);
    return res.token;
  }
  /** Register a user */
  static async register(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Get the current user */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Save a user profile */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
