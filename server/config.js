'use strict'

const config = () => {
  return {
    "protocol": process.env.NODE_PROTOCOL || 'https',
    "hostname": process.env.NODE_HOSTNAME || 'peaceful-chamber-94125',
    "port": process.env.NODE_PORT || '80',
    "env" : process.env.NODE_ENV || 'develop',
    "mock": process.env.MOCK_FLAG || 'false'
  }
}

module.exports = config();