exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.increments("id").primary();
    table.string("nama").notNullable();
    table.string("barcode").notNullable();
    table.integer("basePrice").notNullable();
    table.integer("sellingPrice").notNullable();
    table.integer("quantity").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable("product");
};