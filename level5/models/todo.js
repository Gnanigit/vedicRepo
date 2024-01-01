// models/todo.js

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overdueItems = await Todo.overdue();
      console.log(overdueItems.map(item => item.displayableString()).join('\n'));

      console.log("\n");

      console.log("Due Today");
      const dueTodayItems = await Todo.dueToday();
      console.log(dueTodayItems.map(item => item.displayableString()).join('\n'));

      console.log("\n");

      console.log("Due Later");
      const dueLaterItems = await Todo.dueLater();
      console.log(dueLaterItems.map(item => item.displayableString()).join('\n'));
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: { [Todo.sequelize.Op.lt]: new Date() }, // Use Todo.sequelize.Op
          completed: false
        }
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().split('T')[0];
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false
        }
      });
    }

    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: { [sequelize.Op.gt]: new Date() },
          completed: false
        }
      });
    }

    static async markAsComplete(id) {
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
        return todo;
      }
      return null;
    }

    static associate(models) {
      // define association here
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'Todo'
    }
  );

  return Todo;
};
