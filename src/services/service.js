import { API, cond, and } from 'space-api';
import { throws } from 'assert';

class Service {
  constructor(projectId, url) {
    this.api = new API(projectId, url);
    this.db = this.api.Mongo();
  }

  async login(username, pass) {
    // Fire the sign in request
    const res = await this.db.signIn(username, pass);

    // Check if login was successfull
    if (res.status !== 200) {
      return { ack: false };
    }

    // Set the token with the API object for authentication
    this.api.setToken(res.data.token);

    // Store the userId for further operation
    this.userId = res.data.user._id;

    return { ack: true };
  }

  async signUp(username, name, pass) {
    // Fire the sign up request
    const res = await this.db.signUp(username, name, pass, 'default');

    // Check if sign up was successfull
    if (res.status !== 200) {
      return { ack: false };
    }

    // Set the token with the API object for authentication
    this.api.setToken(res.data.token);

    // Store the userId for further operation
    this.userId = res.data.user._id;

    return { ack: true };
  }

  async getProfiles() {

    // Fire the query to get the todos
    const res = await this.db.profiles();

    const profiles = res.data.users.filter(profile => profile._id != this.userId)

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, profiles: profiles };
  }


  generateId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
}

export default Service