const readline = require("readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});
let counter = 0;
const CLI = () => {
  rl.question("What are we doing today?\n", (x) => {
    switch (x) {
      case "add":
        counter++;
        rl.write(`Counter is now ${counter}\n`);
        CLI();
        break;
      case "subtract":
        counter--;
        rl.write(`Counter is now ${counter}\n`);
        CLI();
        break;
    }
  });
};

CLI();
