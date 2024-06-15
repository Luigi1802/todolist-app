'use strict';

/**
 * task router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::task.task');

module.exports = createCoreRouter('api::task.task', {
    config: {
        update: {
            middlewares: ["api::task.is-owner"],
          },
        create: {
            middlewares: ["api::task.is-owner"],
          },
        delete: {
            middlewares: ["api::task.is-owner"],
          },
        find: {
            middlewares: ["api::task.is-owner"],
          },
        findOne: {
            middlewares: ["api::task.is-owner"],
          },
        read: {
            middlewares: ["api::task.is-owner"],
          },
    }
});
