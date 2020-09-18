const knex = require("./knex");

/*
    This file for frequently used query
*/

module.exports = {
  //get all from table
  findAll(table) {
    return knex(table);
  },

  findOne(table, id) {
    return knex(table).where("id", "=", id);
  },

  save(table, object) {
    if (object.id !== null) {
      //if there is id then do update
      return knex(table).where({ id: object.id }).update(object);
    } else {
      //if no id then create
      return knex(table).insert(object);
    }
  },

  delete(table, id) {
    return knex(table).where({ id: id }).del();
  },
};
