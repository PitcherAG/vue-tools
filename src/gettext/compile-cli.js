#!/usr/bin/env node
const config = require('./config')
const {compileConfig} = require('./compile')

compileConfig(config)
