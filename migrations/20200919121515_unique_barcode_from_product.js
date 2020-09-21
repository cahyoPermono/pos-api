exports.up = function (knex) {
  return knex.schema.alterTable("product", function (table) {
    table.unique("barcode");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("product", function (table) {
    table.dropUnique("barcode");
  });
};
