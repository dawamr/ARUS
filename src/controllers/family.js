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

    familyModel
      .findAndCountAll({
        attributes: ["id", "name", "nik", "user_id", "createdAt", "updatedAt"],
        where: {
          user_id: req.params.id
        }
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
    familyModel
      .findByPk(req.params.family_id, {
        attributes: [
          "id",
          "name",
          "user_id",
          "nik",
          "gender",
          "dateOfBirth",
          "placeOfBirth",
          "createdAt",
          "updatedAt"
        ],
        where: {
          user_id: req.params.id
        }
      })
      .then(result => {
        return resp.ok(true, "Success", result, res);
      })
      .catch(err => {
        resp.ok(false, "Failed", null, res.status(400));
        console.log(err);
      });
  },
  create(req, res) {
    // let data = ;
    familyModel
      .create({
        name: req.body.name,
        user_id: req.params.id,
        nik: req.body.nik,
        gender: req.body.gender,
        age: req.body.age,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth
      })
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
      user_id: req.params.id,
      nik: req.body.nik,
      gender: req.body.gender,
      age: req.body.age,
      dateOfBirth: req.body.dateOfBirth,
      placeOfBirth: req.body.placeOfBirth
    };
    try {
      familyModel.update(obj, {
        where: {
          id: req.params.family_id,
          user_id: req.params.id
        }
      });
      return resp.ok(true, "Success", obj, res);
    } catch (err) {
      resp.ok(false, "Failed", null, res.status(400));
      console.log(err);
    }
  },
  delete(req, res) {
    familyModel
      .findByPk(req.params.family_id, {
        attributes: [
          "id",
          "name",
          "user_id",
          "nik",
          "gender",
          "dateOfBirth",
          "placeOfBirth",
          "createdAt",
          "updatedAt"
        ],
        where: {
          user_id: req.params.id
        }
      })
      .then(result => {
        familyModel.destroy({
          where: {
            id: req.params.family_id,
            user_id: req.params.id
          }
        });
        return resp.ok(
          true,
          `Deleted for family ${req.params.family_id}`,
          result,
          res
        );
      })
      .catch(err => {
        resp.ok(
          false,
          `Cannot find family ${req.params.family_id}`,
          null,
          res.status(400)
        );
        console.log(err);
      });
  }
};
