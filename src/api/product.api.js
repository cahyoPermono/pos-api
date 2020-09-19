const express = require("express");
const router = express.Router();

const query = require("../db/queries");

//get all product
router.get("/", (req, res) => {
  query
    .findAll("product")
    .then((listData) => {
      res.json(listData);
    })
    .catch((e) => {
      res.status(500).json("Error when getting the data product");
    });
});

//create a product
router.post("/", (req, res) => {
  query
    .save("product", req.body)
    .then((data) => res.json("success create product"))
    .catch((e) => {
      console.log(e);
      res.status(400).json("Failed To Create Product");
    });
});

//get product by id
router.get("/:id", (req, res) => {
  let { id } = req.params;

  query
    .findOne("product", id)
    .then((data) => {
      if (data.length() == 0) {
        res.status(404).json("There is no Product with id = " + id);
      } else {
        res.json(data[0]);
      }
    })
    .catch((e) => {
      res.status(500).json("Error when getting product with id = " + id);
    });
});

//for update
router.put("/:id", (req, res) => {
  //check is exist
  query.findOne("product", req.params.id).then((data) => {
    //fill id in body if not exist
    req.body.id = data[0].id;

    if (data.length > 0 || req.body.id) {
      query
        .save("product", req.body)
        .then((data) => {
          res.json("Successfully Update Product");
        })
        .catch((e) => {
          res.status(400).json("Failed Update Product");
        });
    } else {
      res
        .status(400)
        .json(
          `Product with id = ${req.params.id} is not exist in database or in request body`
        );
    }
  });
});

//for delete
router.delete("/:id", (req, res) => {
  query
    .delete("product", req.params.id)
    .then((data) => res.json("Success Delete Product"))
    .catch((e) => res.json("Fail Delete Product"));
});

module.exports = router;
