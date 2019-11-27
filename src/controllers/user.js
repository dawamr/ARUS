const sequelize = require("sequelize");
const model = require("../models");

const resp = require("../views/response");
const pagination = require("../utils/pagination");

const userModel = require("../models").user;
const familyModel = require("../models").family;

module.exports = {
  index(req, res) {
    let orderBy = "createdAt";
    let sortBy = "Asc";
    let page = 1;
    let perPage = 10;

    if (req.query.order_by != undefined && req.query.order_by.length > 0) {
      orderBy = req.query.order_by;
    }
    if (req.query.sort_by != undefined && req.query.sort_by.length > 0) {
      sortBy = req.query.sort_by;
    }
    if (req.query.page != undefined && req.query.page.length > 0) {
      page = req.query.page;
    }
    if (req.query.per_page != undefined && req.query.per_page.length > 0) {
      perPage = req.query.per_page;
    }

    let { offsetResult, perPageResult, showPageResult } = pagination.builder(
      perPage,
      page
    );

    userModel
      .findAndCountAll({
        order: [[orderBy, sortBy]],
        limit: perPageResult,
        offset: offsetResult
      })
      .then(result => {
        let totalPage = Math.ceil(result.count / perPage);
        let data = resp.paging(
          result.rows,
          parseInt(showPageResult),
          parseInt(perPageResult),
          totalPage,
          result.count
        );
        return resp.ok(true, "Success", data, res);
      })
      .catch(err => {
        resp.ok(false, "Failed", null, res.status(400));
        console.log(err);
      });
  },
  detail(req, res) {
    userModel
      .findByPk(req.params.id, {})
      .then(result => {
        return resp.ok(true, "Success", result, res);
      })
      .catch(err => {
        resp.ok(false, "Failed", null, res.status(400));
        console.log(err);
      });
  },
  update(req, res) {
    let obj = {
      name: req.body.name,
      nik: req.body.nik
    };
    try {
      userModel.update(obj, {
        where: {
          id: req.params.id
        }
      });
      return resp.ok(true, "Success", obj, res);
    } catch (err) {
      resp.ok(false, "Failed", null, res.status(400));
      console.log(err);
    }
  },
  create(req, res) {
    if (req.body.name == null || req.body.name.length == 0) {
      return resp.ok(false, "Name must be filled", null, res.status(400));
    }
    if (req.body.nik == null || req.body.nik.length == 0) {
      return resp.ok(false, "NIK must be filled", null, res.status(400));
    }
    let obj = {
      name: req.body.name,
      nik: req.body.nik
    };
    userModel
      .create(obj)
      .then(result => {
        return resp.ok(true, "Success", result, res);
      })
      .catch(err => {
        resp.ok(false, "Failed", null, res.status(400));
        console.log(err);
      });
  },
  delete(req, res) {
    userModel
      .findByPk(req.params.id)
      .then(result => {
        userModel.destroy({
          where: {
            id: req.params.id
          }
        });
        return resp.ok(true, `Deleted for user ${req.params.id}`, result, res);
      })
      .catch(err => {
        resp.ok(
          false,
          `Cannot find user ${req.params.id}`,
          null,
          res.status(400)
        );
        console.log(err);
      });
  }
};
