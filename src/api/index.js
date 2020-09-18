const router = require("express").Router();
const auth = require("./auth.api");
const product = require("./product.api");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Connected!" });
});

router.use("/auth", auth);
router.use("/product", product);
module.exports = router;
