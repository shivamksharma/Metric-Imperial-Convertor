const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", () => {
    assert.strictEqual(convertHandler.getNum("4224sdfwfs"), 4224);
  });

  test("convertHandler should correctly read a decimal number input.", () => {
    assert.strictEqual(convertHandler.getNum("422.4sdfwfs"), 422.4);
  });

  test("convertHandler should correctly read a fractional input.", () => {
    assert.strictEqual(convertHandler.getNum("42/4sdfwfs"), 10.5);
  });

  test("convertHandler should correctly read a fractional input with a decimal.", () => {
    assert.strictEqual(convertHandler.getNum("4.5/4sdfwfs"), 1.125);
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
    assert.isNotOk(convertHandler.getNum("3/2/3"));
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.strictEqual(convertHandler.getNum("sdfsf"), 1);
  });

  test("convertHandler should correctly read each valid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("13122gal"), "gal");
    assert.strictEqual(convertHandler.getUnit("13122l"), "L");
    assert.strictEqual(convertHandler.getUnit("13122kG"), "kg");
    assert.strictEqual(convertHandler.getUnit("13122lBs"), "lbs");
    assert.strictEqual(convertHandler.getUnit("KM"), "km");
    assert.strictEqual(convertHandler.getUnit("mi"), "mi");
  });

  test("convertHandler should correctly return an error for an invalid input unit.", () => {
    assert.isNotOk(convertHandler.getUnit("fsdf"));
    assert.isNotOk(convertHandler.getUnit("lbs32424mi"));
    assert.isNotOk(convertHandler.getUnit("132km4234mi"));
    assert.isNotOk(convertHandler.getUnit("sfddsF"));
    assert.isNotOk(convertHandler.getUnit("2312sdfg"));
    assert.isNotOk(convertHandler.getUnit("dafd56456"));
  });

  test("convertHandler should return the correct return unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.getReturnUnit("gal"), "L");
    assert.strictEqual(convertHandler.getReturnUnit("l"), "gal");
    assert.strictEqual(convertHandler.getReturnUnit("MI"), "km");
    assert.strictEqual(convertHandler.getReturnUnit("kM"), "mi");
    assert.strictEqual(convertHandler.getReturnUnit("lBs"), "kg");
    assert.strictEqual(convertHandler.getReturnUnit("Kg"), "lbs");
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
    assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
    assert.strictEqual(convertHandler.spellOutUnit("kM"), "kilometers");
    assert.strictEqual(convertHandler.spellOutUnit("MI"), "miles");
    assert.strictEqual(convertHandler.spellOutUnit("kG"), "kilograms");
    assert.strictEqual(convertHandler.spellOutUnit("lBS"), "pounds");
  });

  test("convertHandler should correctly convert gal to L.", () => {
    assert.approximately(convertHandler.convert(10.5, "gal"), 39.74682, 0.0001);
  });

  test("convertHandler should correctly convert L to gal.", () => {
    assert.approximately(convertHandler.convert(2.9, "l"), 0.766098, 0.0001);
  });

  test("convertHandler should correctly convert mi to km.", () => {
    assert.approximately(convertHandler.convert(10.5, "mi"), 16.89811, 0.0001);
  });

  test("convertHandler should correctly convert km to mi.", () => {
    assert.approximately(
      convertHandler.convert(8.237415, "km"),
      5.118492,
      0.0001
    );
  });

  test("convertHandler should correctly convert lbs to kg.", () => {
    assert.approximately(convertHandler.convert(22, "lbs"), 9.97903214, 0.0001);
  });

  test("convertHandler should correctly convert kg to lbs..", () => {
    assert.approximately(
      convertHandler.convert(191612, "kg"),
      422432.24352,
      0.5
    );
  });
});

