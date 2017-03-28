'use strict'

const reekoh = require('reekoh')
const plugin = new reekoh.plugins.Logger()
const isEmpty = require('lodash.isempty')

let splunkClient = null

plugin.on('log', (logData) => {
  if (isEmpty(logData)) {
    plugin.logException(new Error(`Invalid data received. Data must not be empty.`))
  } else {
    splunkClient.send({message: logData}, (error) => {
      if (error) {
        console.error('Error on Splunk', error)
        plugin.logException(error)
      }
    })
    plugin.log(JSON.stringify({
      title: 'Log sent to Splunk',
      data: logData
    }))
  }
})

plugin.once('ready', () => {
  const Splunk = require('splunk-logging').Logger
  splunkClient = new Splunk({token: plugin.config.token, url: plugin.config.url})

  plugin.log('Splunk Logger has been initialized.')
  plugin.emit('init')
})

module.exports = plugin
