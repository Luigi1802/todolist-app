"use strict";

/**
  * `isOwner` middleware
*/

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const taskId = ctx.params.id ? ctx.params.id : undefined;
    const taskBodyUserId = ctx.request.body.data ? (ctx.request.body.data.user ? ctx.request.body.data.user : undefined) : undefined;
    let taskOwnerId = undefined;
        
    // Contrôle en cas d'accès à une task par id
    if (taskId) {
      let task = {};
      task = await strapi.entityService.findOne(
        "api::task.task",
        taskId,
        { populate: "*" }
      );
      // task non trouvée
      if (task === null) {
        return ctx.notFound();
      }
      taskOwnerId = task.user.id;
      if (user.id !== taskOwnerId || (taskBodyUserId !== undefined && user.id !== taskBodyUserId)) {
        return ctx.unauthorized("This action is unauthorized.");
      } else {
        return next();
      }
    } else {
      // Contrôle en cas de création de tasklist
      if (taskBodyUserId !== undefined && user.id !== taskBodyUserId) {
        return ctx.unauthorized("This action is unauthorized.");
      } 
      // Contrôle en cas d'accès à toutes les tasks
      let tasks = [];
      tasks = await strapi.entityService.findMany(
        "api::task.task",
        { populate: "user" }
      );
      // filtre : on retourne uniquement les tasks du user
      tasks = tasks.filter(item => item.user.id === user.id).map(item => {
        // suppression des infos sensibles
        delete item.user.password;
        delete item.user.resetPasswordToken;
        delete item.user.confirmationToken;
        return item;
      });
      ctx.body = tasks;
      return next();
    }
  };
};

