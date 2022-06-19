module.exports = (config) => {
  // Pass-through files
  config.addPassthroughCopy('src/assets/img/');
  config.addPassthroughCopy('src/assets/css/');
  config.addPassthroughCopy('src/assets/js/');

  // watch
  config.addWatchTarget("./src/assets/scss/");

  // nunjucks settings
  config.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false, // warning: don’t do this!
  });

  return {
    dir: { input: 'src', output: 'site', includes: '_includes' }
  }
}