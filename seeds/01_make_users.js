//import crypto for password
const bcrypt = require("bcryptjs");
const saltRounds = 8;

//import and initialize knex for querry builder
const knex = require("../db/knex");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'cahyo', password: bcrypt.hashSync('12345', saltRounds)},
        {username: 'widhi', password: bcrypt.hashSync('12345', saltRounds)},
        {username: 'dian', password: bcrypt.hashSync('12345', saltRounds)},
      ]);
    });
};
