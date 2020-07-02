#!/usr/bin/env node
const config = require('./config')
const {translateConfig} = require('./translate')

translateConfig(config).catch(console.error)
