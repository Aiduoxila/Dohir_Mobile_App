import axios from 'axios';

export default class OdooService {
  constructor(baseURL, db, username, password) {
    this.baseURL = baseURL;
    this.db = db;
    this.username = username;
    this.password = password;
    this.uid = null;
  }

  async authenticate() {
    try {
      const response = await axios.post(`${this.baseURL}/web/session/authenticate`, {
        db: this.db,
        login: this.username,
        password: this.password,
      });
      
      this.uid = response.data.result.uid;
      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      return false;
    }
  }

  async execute_kw(model, method, args, kwargs = {}) {
    try {
      const response = await axios.post(`${this.baseURL}/web/dataset/call_kw`, {
        model,
        method,
        args,
        kwargs,
        context: {},
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `session_id=${this.sessionId}`
        }
      });

      return response.data.result;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
}