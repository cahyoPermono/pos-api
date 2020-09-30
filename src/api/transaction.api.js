// =================Transaction Route =====================

const express = require("express");
const router = express.Router();

const query = require("../db/queries");
const knex = require("../db/knex");

//get all Transactions
router.get("/", (req, res) => {
  query
    .findAll("transaction")
    .then((listData) => {
      res.json(listData);
    })
    .catch((e) => {
      res.status(500).json("Error when getting the data product");
    });
});

//get all Transactions detail from id transaction
router.get("/item/transId/:id", (req, res) => {
  query
    .findAll("transaction_item").where("transactionId", "=", req.params.id)
    .then((listData) => {
      res.json(listData);
    })
    .catch((e) => {
      res.status(500).json("Error when getting the data product");
    });
});

//create transactions from list transactions item
router.post("/", (req, res) => {
  let { listItem, otherDiscount, tax, username } = req.body;

  //initiate the transaction
  let transaction = {
    basePriceTotal: 0,
    sellingPriceTotal: 0,
    totalDiscountProduct: 0,
    otherDiscount: otherDiscount,
    tax: tax ? tax : 0,
    salesProfit: 0,
    username: username,
  };

  // looping all the product list
  listItem.forEach((data) => {
    transaction.basePriceTotal =
      transaction.basePriceTotal + data.basePrice * data.amount;
    transaction.sellingPriceTotal =
      transaction.sellingPriceTotal + data.sellingPrice * data.amount;
    transaction.totalDiscountProduct =
      transaction.totalDiscountProduct +
      (data.discount / 100) * (data.sellingPrice * data.amount);
  });

  //after calculations loop, calculate sales profit
  //sales profit = selling price total - (baseprice + discount)
  transaction.salesProfit =
    transaction.sellingPriceTotal -
    (transaction.basePriceTotal +
      transaction.totalDiscountProduct +
      transaction.otherDiscount);

  //save it to db using transaction
  knex
    .transaction((trx) => {
      trx
        .insert(transaction)
        .into("transaction")
        .returning("id")
        .then(async (data) => {
          console.log("data", data);
          listItem.map((item) => {
            return (item.transactionId = data);
          });
          console.log(listItem);

          try {
            const itemTrans = await trx
              .insert(listItem)
              .into("transaction_item")
              .returning("id");
            res.json(itemTrans);
          } catch (e) {
            return console.log('err', e);
          }
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(() => console.log("it worked"))
    .catch((e) => console.log(e));
});

module.exports = router;
