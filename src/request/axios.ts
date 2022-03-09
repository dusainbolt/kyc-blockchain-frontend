// import axios from 'axios';

// export default axios.create({
//   baseURL: 'http://localhost:8080/api',
//   headers: {
//     'Content-type': 'application/json',
//   },
// });

import axios, { AxiosInstance } from 'axios';
// import { browserHistory } from '../utils/history';
// import { store } from '../redux/configStore';
// // import { actions } from "../pages/Layout/actions";
// import showNotification from '../components/Notification';
// import { ERROR_NETWORK, ERROR_AUTH } from '../common';
// // import { logoutSocket } from "../utils/socket";
// import { getI18n as i18 } from 'react-i18next';
// import crypto from 'crypto-js';
// import { actions } from '../pages/Login/actions';

class AxiosServer {
  public instance: AxiosInstance;

  constructor() {
    const instance = axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-type': 'application/json',
      },
    });
    // instance.interceptors.response.use(this.handelSuccess, this.handelError);
    this.instance = instance;
  }

  //   setUserRequest(token) {
  //     if (token) {
  //       this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //     } else {
  //       delete this.instance.defaults.headers.common['Authorization'];
  //     }
  //   }

  //   getFullUrl(url) {
  //     if (!url.startsWith('/')) {
  //       url = '/' + url;
  //     }
  //     const timeStamp = Date.now();
  //     let hash_key = `${process.env.REACT_APP_API_KEY}_${timeStamp}_${url}`;
  //     this.instance.defaults.headers.common['hash_key'] = crypto.MD5(hash_key).toString();
  //     this.instance.defaults.headers.common['timestamp'] = timeStamp;
  //     return `${process.env.REACT_APP_API_URL}` + url;
  //   }

  handelSuccess(response) {
    //   const {
    //     data: { data },
    //     config: { headers },
    //   } = response;
    //   let dataResult = null;
    //   if (process.env.REACT_APP_API_ENV === 'local') {
    //     dataResult = data;
    //   } else {
    //     const decrypted = crypto.AES.decrypt(data, headers.hash_key);
    //     dataResult = JSON.parse(crypto.enc.Utf8.stringify(decrypted));
    //   }
    //   if (!response.data.status) {
    //     showNotification(0, `error_code.title`, i18().t(`error_code.msg_${response.data.errorCode}`, dataResult));
    //   }
    //   return { ...response.data, data: dataResult };
  }

  handelError(error) {
    //   if (error.response && error.response.status === 401) {
    //     const promiseList = [];
    //     promiseList.push(localStorage.removeItem('persist:root'));
    //     promiseList.push(store.dispatch(actions.postLogoutSuccess()));
    //     // promiseList.push(logoutSocket());
    //     promiseList.push(browserHistory.push('/bautroixanh/login'));
    //     promiseList.push(showNotification(0, `notify.${ERROR_AUTH.TITLE}`, `notify.${ERROR_AUTH.CONTENT}`));
    //     Promise.all(promiseList)
    //       .then((resolvedList) => {})
    //       .catch((error) => {});
    //   }
    //   if (error.response && error.response.status === 400) {
    //     return error.response.data;
    //   }
    //   if (!error.response || error.response.status === 500) {
    //     showNotification(0, `error_code.title`, ERROR_NETWORK.CONTENT);
    //   }
    //   return Promise.reject(error);
  }

  get(endpoint, body = {}) {
    // this.instance.defaults.params = body;
    return this.instance.get(endpoint, { params: body });
  }

  post(endpoint, body) {
    return this.instance.post(endpoint, body);
  }
  //   put(endpoint, body) {
  //     return this.instance.put(this.getFullUrl(endpoint), body);
  //   }
  //   delete(endpoint) {
  //     return this.instance.delete(this.getFullUrl(endpoint));
  //   }
}

export default new AxiosServer();
