exports.up = function (knex) {
  return knex.schema.createTable("transaction_item", function (table) {
    table.increments("id").primary();
    table.integer("transactionId").references("id").inTable("transaction");
    table.integer("productId").notNullable();
    table.string("productName").notNullable();
    table.integer("basePrice").notNullable();
    table.integer("sellingPrice").notNullable();
    table.integer("discount").defaultTo(0);
    table.integer("amount").defaultTo(1).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transaction_item");
};
