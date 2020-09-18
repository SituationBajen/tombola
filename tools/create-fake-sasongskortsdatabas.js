const fs = require("fs");
fs.writeFile(
  "sasongsplatar.js",
  `const pids = ${JSON.stringify(
    [...Array(16000)]
      .fill(0)
      .map((_, index) =>
        [...Array(10)]
          .fill(0)
          .map(() => Math.floor(Math.random() * 10))
          .join("")
      )
      .filter((v, i, a) => a.indexOf(v) === i),
    null,
    2
  )};\nexport default pids;\n`,
  () => {}
);
