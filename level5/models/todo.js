
"use strict";
const { Sequelize, Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
 
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      const overdue = await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.lt]: new Date(),
          },
        },
      });
      const dueToday = await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.eq]: new Date(),
          },
        },
      });
      const dueLater = await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.gt]: new Date(),
          },
        },
      });
      console.log("My Todo-list \n");
      console.log("Overdue");
      overdue.forEach((todo) => {
        console.log(
          `${todo.id}. [${todo.completed ? "x" : " "}] ${todo.title} ${
            todo.dueDate
          }`,
        );
      });
      console.log("\n");
      console.log("Due Today");
      dueToday.forEach((todo) => {
        console.log(
          `${todo.id}. [${todo.completed ? "x" : " "}] ${todo.title} ${
            todo.dueDate
          }`,
        );
      });
      console.log("\n");
      console.log("Due Later");
      dueLater.forEach((todo) => {
        console.log(
          `${todo.id}. [${todo.completed ? "x" : " "}] ${todo.title} ${
            todo.dueDate
          }`,
        );
      });
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.lt]: new Date(),
          },
        },
      });
    }

    static async dueToday() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.eq]: new Date(),
          },
        },
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Sequelize.Op.gt]: new Date(),
          },
        },
      });
    }

    static async markComplete(id) {
      const todo = await Todo.findByPk(id);
      todo.completed = true;
      await todo.save();
    }

    static associate(models) {
      // define association here
    }

    displayableString() {
      const checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};