const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // pour le probleme de multi-word sur le component Home:  à améliorer
});
