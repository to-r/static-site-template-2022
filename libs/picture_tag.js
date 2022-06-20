/**
 * picture要素のショートコード
 * usage:
 * {% picture_tag '/assets/img/hoge.png' %}
 * {% picture_tag '/assets/img/hoge.png', 'ダミー画像', true %}
 */

module.exports = (config) => {
  config.addNunjucksShortcode(
    "picture_tag",
    (filename, alt = "", useRetina = false) => {
      const basename = filename.substring(0, filename.lastIndexOf("."));
      const ext = filename.substring(filename.lastIndexOf("."));
      const pcFileNames = [filename].concat(
        useRetina ? [`${basename}_@2x${ext}`] : []
      );

      const spFileName = `${basename}_sp${ext}`;

      return `
      <picture>
        <source media="(min-width: 751px)" srcset="${pcFileNames.join(",")}">
        <source media="(max-width: 750px)" srcset="${spFileName}">
        <img src="${pcFileNames[0]}" alt="${alt}">
      </picture>`;
    }
  );
};
