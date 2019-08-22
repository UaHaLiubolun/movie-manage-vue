import request from '@/utils/request'

export function getAll(data) {
  return request({
    url: '/movie',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/movie',
    method: 'post',
    data
  })
}

export function query(data) {
  return request({
    url: '/movie/query',
    method: 'post',
    data
  })
}

export function addSpider(data) {
  return request({
    url: '/spider/add',
    method: 'post',
    data
  })
}

export function getList(data) {
  return request({
    url: '/movie/root',
    method: 'get',
    params: data
  })
}

export function searchMovie(data) {
  return request({
    url: '/movie/search',
    method: 'get',
    params: data
  })
}

