"use strict";

/**
  * `isOwner` middleware
*/

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;
    const tasklistId = ctx.params.id ? ctx.params.id : undefined;
    const tasklistBodyUserId = ctx.request.body.data ? (ctx.request.body.data.user ? ctx.request.body.data.user : undefined) : undefined;
    let tasklistOwnerId;
    
    // Contrôle en cas d'accès/modif à une tasklist par id
    if (tasklistId) {
      let tasklist = {};
      tasklist = await strapi.entityService.findOne(
        "api::tasklist.tasklist",
        tasklistId,
        { populate: "*" }
      );
      // tasklist non trouvée
      if (tasklist === null) {
        return ctx.notFound();
      }
      tasklistOwnerId = tasklist.user.id;
      if (user.id !== tasklistOwnerId || (tasklistBodyUserId !== undefined && user.id !== tasklistBodyUserId)) {
        return ctx.unauthorized("This action is unauthorized.");
      } else {
        return next();
      }
    } else {
      // Contrôle en cas de création de tasklist
      if (tasklistBodyUserId !== undefined && user.id !== tasklistBodyUserId) {
        return ctx.unauthorized("This action is unauthorized.");
      } 
      // Contrôle en cas d'accès à toutes les tasklists
      let tasklists = [];
      tasklists = await strapi.entityService.findMany(
        "api::tasklist.tasklist",
        { populate: ["user", "tasks"] }
      );
      // filtre : on retourne uniquement les tasklists du user
      tasklists = tasklists.filter(item => item.user.id === user.id).map(item => {
        // suppression des infos sensibles
        delete item.user.password;
        delete item.user.resetPasswordToken;
        delete item.user.confirmationToken;
        return item;
      });
      ctx.body = tasklists;
      return next();
    }
  };
};

