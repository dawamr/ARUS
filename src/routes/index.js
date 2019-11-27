const express = require("express");
const app = express.Router();

const resp = require("../views/response");
const userRouter = require("./user");
const familyRouter = require("./family");

module.exports = express => {
  app.use(express.static("public"));

  app.use("/api/user", userRouter);

  app.get("/", function(req, res, next) {
    resp.ok(true, "Success", "Hellow World", res.status(200));
  });

  app.use(function(req, res, next) {
    resp.ok(false, "Error 404 not found.", null, res.status(404));
  });

  app.use(function(err, req, res, next) {
    console.log(err);
    switch (err.status) {
      case 400: {
        console.log(err);
        resp.ok(false, "Error 400 : " + err.type, null, res.status(400));
        break;
      }
      case 401: {
        console.log(err);
        resp.ok(false, err.message, null, res.status(401));
        break;
      }
      case undefined: {
        console.log(err);
        resp.ok(false, err, null, res.status(500));
        break;
      }
    }
  });

  return app;
};

// module.exports = app;
