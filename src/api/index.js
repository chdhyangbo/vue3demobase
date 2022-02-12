import instance from "../utils/axios";
// post 方法
export const post = (url, data) => {
    return instance({
        url,
        method: 'post',
        data,
    })
}

export const get = (url, data) => {
    return instance({
        url,
        method: 'get',
        data,
    })
}
export const uploadFile = (path,params) => {
    return instance.post(path, params, {
        headers: {
            'Content-Type':'multipart/form-data',// 配置成这种格式就不会因为axiosm默认的json格式导致提交变成option请求了
        }
    })
}