import request from '@/utils/request'

export function getSubject(movieId) {
  return request({
    url: '/douban/subject/' + movieId,
    method: 'get'
  })
}

export function getTitle(title) {
  return request({
    url: '/douban/title',
    method: 'get',
    params: { title: title }
  })
}

export function getLatest(limit) {
  return request({
    url: '/douban/latest',
    method: 'get',
    params: { limit: limit }
  })
}

