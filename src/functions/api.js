import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'

const baseURL = '/api/v1'

const httpRequest = () => {
  const user = JSON.parse(sessionStorage.getItem('user')) ||
    JSON.parse(localStorage.getItem('user')) || {}
  const config = {
    baseURL,
    timeout: 1000000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  }
  return axios.create(config)
}

const handleError = (error) => {
  if (error.response.status === 401) {
    Message.error('登录已过期，请重新登录')
    store.dispatch('USER_LOGOUT')
    router.replace({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath },
    })
  }
  return Promise.reject(error)
}

const httpGet = async (url, config) => {
  try {
    const response = await httpRequest().get(url, config)
    return response
  } catch (error) {
    handleError(error)
    return Promise.reject(error)
  }
}

const httpPut = async (url, data, config = {}) => {
  try {
    const response = await httpRequest().put(url, JSON.stringify(data), config)
    return response
  } catch (error) {
    handleError(error)
    return Promise.reject(error)
  }
}

const httpPost = async (url, data, config = {}) => {
  try {
    const response = await httpRequest().post(url, JSON.stringify(data), config)
    return response
  } catch (error) {
    handleError(error)
    return Promise.reject(error)
  }
}

const httpDelete = async (url, config = {}) => {
  try {
    const response = await httpRequest().delete(url, config)
    return response
  } catch (error) {
    handleError(error)
    return Promise.reject(error)
  }
}

const httpUpload = async (url, file, name) => {
  try {
    const user = JSON.parse(sessionStorage.getItem('user')) ||
      JSON.parse(localStorage.getItem('user')) || {}
    const formData = new FormData()
    formData.append(name, file)
    const response = axios({
      url: `${baseURL}${url}`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${user.token}`,
      },
    })
    return response
  } catch (error) {
    handleError(error)
    return Promise.reject(error)
  }
}

export { baseURL, httpGet, httpPut, httpPost, httpDelete, httpUpload }

