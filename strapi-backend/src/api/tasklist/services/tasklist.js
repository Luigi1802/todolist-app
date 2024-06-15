'use strict';

/**
 * tasklist service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tasklist.tasklist');
