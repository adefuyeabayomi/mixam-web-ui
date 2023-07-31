const removeConsolePlugin = [];
if (process.env.NODE_ENV === "production") {
  removeConsolePlugin.push("transform-remove-console");
} 
else {
  removeConsolePlugin.push([0])
}
module.exports = {
  presets: ["@vue/app"],
  plugins: [/*removeConsolePlugin*/]
};
