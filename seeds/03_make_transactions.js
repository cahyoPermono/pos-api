exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("transaction_item")
    .del()
    .then(function () {
      knex("transaction")
        .del()
        .then(() => {
          //insert transaction and transaction item
          knex("transaction")
            .insert([
              {
                basePricetotal: 50000,
                sellingPricetotal: 60000,
                salesProfit: 10000,
                username: "dian",
              },
            ])
            .then((trans) => {
              knex("transaction_item").insert([
                {
                  transactionId: trans.id,
                  productId: 1,
                  productName: "Bohlam Philips",
                  basePrice: 5000,
                  sellingPrice: 6000,
                  amount: 10,
                },
              ]);
            });
        });
    });
};
