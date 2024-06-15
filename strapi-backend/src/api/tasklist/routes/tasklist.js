'use strict';

/**
 * tasklist router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::tasklist.tasklist', {
    config: {
        update: {
            middlewares: ["api::tasklist.is-owner"],
          },
        create: {
            middlewares: ["api::tasklist.is-owner"],
          },
        delete: {
            middlewares: ["api::tasklist.is-owner"],
          },
        find: {
            middlewares: ["api::tasklist.is-owner"],
          },
        findOne: {
            middlewares: ["api::tasklist.is-owner"],
          },
        read: {
            middlewares: ["api::tasklist.is-owner"],
          },
    }
});
