const readline = require("readline");
const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout,
});

const mapSize = { x: 5, y: 5 };
let map = [];
for (i = 0; i < mapSize.x; i++) {
  map.push([]);
}
let tile = 1;
for (i = 0; i < map.length; i++) {
  for (j = 0; j < mapSize.y; j++) {
    map[i].push({
      id: tile,
      key: false,
      door: false,
      look: "You're at some tile",
    });
    tile++;
  }
}
let key = {
  x: Math.floor(Math.random() * mapSize.x),
  y: Math.floor(Math.random() * mapSize.y),
};
let door = {
  x: Math.floor(Math.random() * mapSize.x),
  y: Math.floor(Math.random() * mapSize.y),
};
map[key.x][key.y].key = true;
map[key.x][key.y].look = "The key is here!";
map[door.x][door.y].door = true;
map[door.x][door.y].look = "The door is here!";

const output = {
  std: (str) => {
    return rl.write(`---------------\n\n${str}\n\n---------------\n\n`);
  },
  danger: (str) => {
    return rl.write(`!!!!!!!!!!!!!!!\n\n${str}\n\n!!!!!!!!!!!!!!!\n\n`);
  },
  special: (str) => {
    return rl.write(`***************\n\n${str}\n\n***************\n\n`);
  },
};

const gameStart = "Explore the map and find cool things I guess \n\n";
let state = {
  y: 0,
  x: 0,
  hasKey: false,
  gameWon: false,
};

const CLI = (question = "\n") => {
  rl.question(question, (x) => {
    switch (x.toUpperCase()) {
      case "UP":
      case "NORTH":
        if (state.y == 0) {
          output.danger("You cannot move further North");
        } else {
          output.std(`You move North `);
          state.y--;
        }
        break;
      case "DOWN":
      case "SOUTH":
        if (state.y == mapSize.y - 1) {
          output.danger("You cannot move further South");
        } else {
          output.std(`You move South `);
          state.y++;
        }
        break;
      case "LEFT":
      case "WEST":
        if (state.x == 0) {
          output.danger("You cannot move further West");
        } else {
          output.std("You move West ");
          state.x--;
        }
        break;
      case "RIGHT":
      case "EAST":
        if (state.x == mapSize.x - 1) {
          output.danger("You cannot move further East");
        } else {
          output.std("You move East ");
          state.x++;
        }
        break;
      case "LOCATION":
        output.std(`Location: [ ${state.x} , ${state.y} ] `);
        break;
      case "LOOK":
        output.special(map[state.y][state.x].look);
        if (map[state.y][state.x].key) {
          state.hasKey = true;
        }
        break;
      case "OPEN":
        if (state.hasKey && map[state.y][state.x].door) {
          state.gameWon = true;
          output.special("You opened the door!");
        } else {
          output.danger("You cannot do that");
        }
        break;
      default:
        output.danger(`No such command: '${x}'`);
    }
    if (state.gameWon) {
      return output.special("You Won!");
    } else {
      CLI();
    }
  });
};

CLI(gameStart);
