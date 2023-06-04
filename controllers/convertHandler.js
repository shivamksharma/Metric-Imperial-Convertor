function ConvertHandler() {
  this.standardUnit = {
    gal: "gal",
    l: "L",
    lbs: "lbs",
    kg: "kg",
    mi: "mi",
    km: "km",
  };

  this.alternateUnits = {
    gal: "L",
    l: "gal",
    lbs: "kg",
    kg: "lbs",
    mi: "km",
    km: "mi",
  };

  this.spellOutUnits = {
    gal: "gallons",
    l: "liters",
    lbs: "pounds",
    kg: "kilograms",
    mi: "miles",
    km: "kilometers",
  };

  this.getNum = function (input) {
    const matches = input.match(/[^a-zA-Z]+/g);
    if (!matches) return 1;
    if (matches.length != 1) return null;
    const num_parts = matches[0].split("/");
    if (num_parts.length == 1) {
      const num = Number(num_parts[0]);
      return num >= 0 ? num : null;
    }
    if (num_parts.length == 2) {
      const [numerator, denominator] = [
        Number(num_parts[0]),
        Number(num_parts[1]),
      ];
      if (
        Number.isNaN(numerator) ||
        Number.isNaN(denominator) ||
        denominator == 0
      )
        return null;
      const num = numerator / denominator;
      return num >= 0 ? num : null;
    }
    return null;
  };

  this.getUnit = function (input) {
    const matches = input.match(/[a-zA-Z]+/g);
    if (matches.length != 1) return null;
    return this.standardUnit[matches[0].toLocaleLowerCase()] || null;
  };

  this.getReturnUnit = function (initUnit) {
    return this.alternateUnits[initUnit.toLocaleLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    return this.spellOutUnits[unit.toLocaleLowerCase()];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit.toLocaleLowerCase()) {
      case "gal":
        return initNum * galToL;
      case "l":
        return initNum / galToL;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;

