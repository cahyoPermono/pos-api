exports.up = function (knex) {
  return knex.schema.createTable("transaction", function (table) {
    table.increments("id").primary();
    table.integer("basePricetotal").notNullable();
    table.integer("sellingPricetotal").notNullable();
    table.integer("totalDiscountProduct").defaultTo(0);
    table.integer("otherDiscount").defaultTo(0);
    table.integer("tax").defaultTo(0);
    table.integer("salesProfit").notNullable();
    table.string("username");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transaction");
};
