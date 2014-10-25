'use strict';

module.exports = function(config) {
  config.set({
    autoWatch : false,

    frameworks: ['jasmine'],

    plugins : [
        'karma-jasmine'
    ]
  });
};