'use strict'

const reekoh = require('reekoh')
const _plugin = new reekoh.plugins.Logger()
const isEmpty = require('lodash.isempty')

let splunkClient = null

_plugin.on('log', (logData) => {
  if (isEmpty(logData)) {
    _plugin.logException(new Error(`Invalid data received. Data must not be empty.`))
  } else {
    splunkClient.send({message: logData}, (error) => {
      if (error) {
        console.error('Error on Splunk', error)
        _plugin.logException(error)
      }
    })
    _plugin.log(JSON.stringify({
      title: 'Log sent to Splunk',
      data: logData
    }))
  }
})

_plugin.once('ready', () => {
  const Splunk = require('splunk-logging').Logger
  splunkClient = new Splunk({token: _plugin.config.token, url: _plugin.config.url})

  _plugin.log('Splunk Logger has been initialized.')
  _plugin.emit('init')
})

module.exports = _plugin
