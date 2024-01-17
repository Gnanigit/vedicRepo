/* eslint-disable semi */
const argv = require("minimist")(process.argv.slice(2));
const db = require("./models/index");

const markAsComplete = async (id) => {
  try {
    await db.Todo.markComplete(id);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  const { id } = argv;
  if (!id) {
    throw new Error("Need to pass an id");
  }
  if (!Number.isInteger(Number(id))) {
    throw new Error("The id needs to be an integer");
  }
  await markAsComplete(id);
  await db.Todo.showList();
})();