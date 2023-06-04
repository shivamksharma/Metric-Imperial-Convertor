"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;
    if (
      input &&
      convertHandler.getUnit(input) &&
      convertHandler.getNum(input)
    ) {
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = Number(
        convertHandler.convert(initNum, initUnit)?.toFixed(5)
      );
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: string,
      });
    } else if (
      !convertHandler.getUnit(input) &&
      !convertHandler.getNum(input)
    ) {
      console.log(`1: ${input}`);
      res.send("invalid number and unit");
    } else if (!convertHandler.getUnit(input)) {
      console.log(`2: ${input}`);
      res.send("invalid unit");
    } else if (!convertHandler.getNum(input)) {
      console.log(`3: ${input}`);
      res.send("invalid number");
    }
  });
};

