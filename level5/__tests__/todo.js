const db = require("../models");

describe("Todolist Test Suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  test("Should add new todo", async () => {
    const todoItemsCount = await db.Todo.count();
    await db.Todo.addTask({
      title: "Buy groceries",
      dueDate: new Date(),
      completed: false,
    });
    const newTodoItemsCount = await db.Todo.count();
    expect(newTodoItemsCount).toBe(todoItemsCount + 1);
  });

  test("Should list all todos", async () => {
    const todos = await db.Todo.count();
    expect(todos).toBe(1);
  });

  test("Should list overdue todos", async () => {
    const todos = await db.Todo.overdue();
    expect(todos.length).toBe(0);
  });

  test("Should list due today todos", async () => {
    const todos = await db.Todo.dueToday();
    expect(todos.length).toBe(1);
  });

  test("Should list due later todos", async () => {
    const todos = await db.Todo.dueLater();
    expect(todos.length).toBe(0);
  });

  test("Should mark todo as complete", async () => {
    await db.Todo.markComplete(1);
    const completedTodo = await db.Todo.findByPk(1);
    expect(completedTodo.completed).toBe(true);
  });
});