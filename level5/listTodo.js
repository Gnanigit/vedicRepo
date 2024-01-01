// ListTodos.js

const db =require("./models/index");

const listTodo =async () => {

try {

await db.Todo.showList(db.sequelize);

} catch (error) {

console.error(error);

}

};

(async () => {

await listTodo();

})();