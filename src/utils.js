export const factoryQueryAll = (modelName) => (_, __, ctx) => ctx.models[modelName].find({});
export const idResolver = (root) => root._id;