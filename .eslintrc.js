module.exports = {
  extends: ['tui', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 3
  },
  env: {
    browser: true,
    jasmine: true,
    jquery: true,
    commonjs: true
  },
  globals: {
    tui: true,
    loadFixtures: true,
    loadStyleFixtures: true
  }
};
