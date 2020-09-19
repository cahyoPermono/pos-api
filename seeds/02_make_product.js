const uom = require("../src/enum/unitOfMeasure.enum");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("product")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("product").insert([
        {
          nama: "Bohlam Philips",
          barcode: "1234",
          basePrice: "5000",
          sellingPrice: "6000",
          quantity: "1",
          unitOfMeasure: uom.pcs,
        },
      ]);
    });
};
