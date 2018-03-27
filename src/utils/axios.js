import axios from 'axios';

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, params)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, params)
        .then((res) => {
          console.log(res);
          resolve(res.data);
        })
        .catch((error) => {
          console.log(error);
          reject();
        });
    });
  },
};
