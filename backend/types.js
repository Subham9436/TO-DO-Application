const z = require("zod");

const TODOCheck = z.object({
  task: z.string(),
});

module.exports = { TODOCheck };
