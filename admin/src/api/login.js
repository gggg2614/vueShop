import request from "@/utils/request";

export function loginByUsername(username, password) {
    const data = {username,password}
    return request({
        url:'/login',
        method:'post',
        data
    })
}