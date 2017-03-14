import { createApiFactory } from '../utils'

export const fetch = () => createApiFactory ({
  url: '/api/user/',
  method: 'GET'
}) 