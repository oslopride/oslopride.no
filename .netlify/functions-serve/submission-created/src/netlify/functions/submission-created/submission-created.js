var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// netlify/functions/submission-created/submission-created.ts
__export(exports, {
  handler: () => handler
});
var handler = async (event, context) => {
  const { name = "stranger" } = event.queryStringParameters;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=submission-created.js.map
