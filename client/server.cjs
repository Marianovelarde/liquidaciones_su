const { exec } = require("child_process");

exec(
  "npx serve -s dist -l 5173",
  (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log(stdout);

    if (stderr) {
      console.error(stderr);
    }
  }
);