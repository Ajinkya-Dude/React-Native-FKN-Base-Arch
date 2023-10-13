/* eslint-disable */
export default function urlParamsHelper(params:any) {
    return Object.keys(params)
      .map(function (key) {
        return key + '=' + params[key];
      })
      .join('&');
  }
  