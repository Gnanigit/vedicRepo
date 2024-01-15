const todoList=require('../index');
const {all,markAsCompleted,add}=todoList();
describe("TodoList Test Suite",()=>{
    beforeAll(()=>{
        add({
            title:"Test todo",
            completed:false,
            dueDate:new Date().toLocaleDateString("en-CA")
        })   
    })
    test("Should add new todo",()=>{
        const todoItemsCount=all.length;
        add({
            title:"Test todo",
            completed:false,
            dueDate:new Date().toLocaleDateString("en-CA")
        })
        expect(all.length).toBe(todoItemsCount+1);
    })
    test("Should mark a todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsCompleted(0);
        expect(all[0].completed).toBe(true);
    })
})

describe("TodoList retrieval Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Finish Project",
      completed: false,
      dueDate: new Date("11-08-23"),
    });
    add({
      title: "Complete Assignment",
      completed: true,
      dueDate: new Date("11-08-23"),
    });
    add({
      title: "Test 21",
      completed: false,
      dueDate: new Date(),
    });
    add({
      title: "Test 22",
      completed: true,
      dueDate: new Date(),
    });
    add({
      title: "Test 31",
      completed: false,
      dueDate: new Date("11-08-24"),
    });
    add({
      title: "Test 32",
      completed: true,
      dueDate: new Date("11-08-24"),
    });
  });
  test("Test retrieval of overdue items", () => {
    const length = overdue().length;
    console.log(overdue());
    expect(length).toBe(2);
  });
  test("Test retrieval of due today items", () => {
    console.log(dueToday());
    expect(dueToday().length).toBe(1);
  });
  test("Test retrieval of due later items", () => {
    console.log(dueLater());
    expect(dueLater().length).toBe(1);
  });
});
