const fs = require("fs");
const path = require("path");

module.exports = (config) => {
  config.addNunjucksShortcode("inject_svg", (filename) => {
    const filePath = path.join(__dirname, "../src", filename);
    const data = fs.readFileSync(filePath, (err, contents) => {
      if (err) return err;
      return contents;
    });

    return data.toString("utf8");
  });
};
