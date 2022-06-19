module.exports = (config) => {
  // Pass-through files
  config.addPassthroughCopy('src/assets/img/');
  config.addPassthroughCopy('src/assets/css/');
  config.addPassthroughCopy('src/assets/js/');

  // watch
  config.addWatchTarget("./src/assets/scss/");

  return {
    dir: { input: 'src', output: 'site', includes: 'includes' }
  }
}