import { API, cond, or } from 'space-api';

class Service {
  constructor(projectId, url) {
    this.api = new API(projectId, url);
    this.db = this.api.Mongo();
    this.name = '';
    this.isLoggedIn = false
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
    this.name = res.data.user.name;
    this.isLoggedIn = true;

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
    this.isLoggedIn = true;

    return { ack: true };
  }

  async getProfiles() {

    // Fire the query to get the todos
    const res = await this.db.profiles();

    const profiles = res.data.users.filter(profile => profile._id !== this.userId)

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, profiles: profiles };
  }

  getMessages(cb) {
    const condition = or(cond('to', '==', this.userId), cond('from', '==', this.userId));

    // Callback for data changes:
    const onSnapshot = (docs, type, changedDoc) => {
      cb(null, docs);
    }

    // Callback for error while subscribing
    const onError = (err) => {
      console.log('Live query error', err)
      cb(err)
    }

    // Subscribe to any changes in posts of 'frontend' category
    return this.db.liveQuery('messages').where(condition).subscribe(onSnapshot, onError)
  }

  async sendMessage(id, value) {
    const obj = { _id: this.generateId(), to: id, from: this.userId, message: value, time: new Date().getDate() }

    // Fire the insert query
    const res = await this.db.insert('messages').doc(obj).apply();

    // Return -ve ack is status code isn't 200
    if (res.status !== 200) {
      return { ack: false };
    }

    return { ack: true, doc: obj };
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