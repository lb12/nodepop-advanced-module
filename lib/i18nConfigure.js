'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function() {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true, // Reload languages files if change
    syncFiles: true, // Create literals in locals
    cookie: 'nodepop-locale'
  });

  // If we use i18n in scripts
  i18n.setLocale('en');

  return i18n;
};