exports.up = function (knex) {
  return knex.schema.createTable("product", function (table) {
    table.increments("id").primary();
    table.string("nama").notNullable();
    table.string("barcode").defaultTo('-');
    table.integer("basePrice").notNullable();
    table.integer("sellingPrice").notNullable();
    table.decimal("quantity").notNullable().defaultTo(0);
    table.string("unitOfMeasure").notNullable().defaultTo('pcs');
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
    return knex.schema.dropTable("product");
};
