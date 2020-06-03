module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!src/index.js' // No need to cover bootstrap file
    ],
    setupFiles: ['./tests/setup.js']
}
