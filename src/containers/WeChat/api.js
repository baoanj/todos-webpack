import axios from '@/utils/axios';

export function getData() {
  axios.get('/api/general/wechat')
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log('fail');
    });
}

export function postMsg(params) {
  axios.post('/api/general/wechat', params)
    .then((data) => {
      console.log(data);
    })
    .catch(() => {
      console.log('fail');
    });
}
