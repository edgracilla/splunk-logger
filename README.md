# Splunk Logger
[![Build Status](https://travis-ci.org/Reekoh/splunk-logger.svg)](https://travis-ci.org/Reekoh/splunk-logger)
![Dependencies](https://img.shields.io/david/Reekoh/splunk-logger.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/splunk-logger.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Splunk Logger Plugin for the Reekoh IoT Platform. Integrates a Reekoh Instance with Splunk to synchronize topology log data.

## Description
This plugin saves all log data from the Reekoh Instance to Splunk for easier access to the application's logs.

## Configuration
To configure this plugin a Splunk account and enabled HTTP Event Collector are needed to provide the following:

1. Token - The HTTP Event collector token to use.
2. URL - The Splunk instance URL.

These parameters are then injected to the plugin from the platform.