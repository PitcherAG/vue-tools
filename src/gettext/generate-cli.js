#!/usr/bin/env node
const config = require('./config')
const { translateConfig } = require('./translate')

translateConfig(config, true).catch(console.error)
