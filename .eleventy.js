module.exports = (config) => {
  // Pass-through files
  config.addPassthroughCopy('src/assets');

  return {
    dir: { input: 'src', output: '_site', includes: 'includes' }
  }
}