exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.unique("username");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropUnique("username");
  });
};
