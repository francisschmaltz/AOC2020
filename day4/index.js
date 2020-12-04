// Load in the Data
const passportData = require("./data");

/**
 * Takes array of data and array for move
 * and returns INT of number of
 * passports that are valid
 * @param {Array} array of objects
 * @return {Number} INT of valid passports
 */
const checkPassports = (arr) => {
  // Count valid passwords
  var validPassports = 0;

  for (var i = 0; i < arr.length; i++) {
    // Create passport object
    let p = arr[i];

    // Check to see if object has
    // the requested fields
    let byr = p.hasOwnProperty("byr");
    let iyr = p.hasOwnProperty("iyr");
    let eyr = p.hasOwnProperty("eyr");
    let hgt = p.hasOwnProperty("hgt");
    let hcl = p.hasOwnProperty("hcl");
    let ecl = p.hasOwnProperty("ecl");
    let pid = p.hasOwnProperty("pid");

    // Do not check this yet
    let cid = p.hasOwnProperty("cid");

    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
      validPassports += 1;
    }
  }

  return validPassports;
};

console.log(`Number of valid passports: ${checkPassports(passportData)}`);

/**
 * Takes array of data and array for move
 * and returns INT of number of
 * passports that are valid
 * @param {Array} array of objects
 * @return {Number} INT of valid passports
 */
const checkPassportData = (arr) => {
  // Count valid passwords
  var validPassports = 0;

  for (var i = 0; i < arr.length; i++) {
    // Create passport object
    let p = arr[i];

    // Check to see if object has
    // the requested fields
    let byr = p.hasOwnProperty("byr");
    let iyr = p.hasOwnProperty("iyr");
    let eyr = p.hasOwnProperty("eyr");
    let hgt = p.hasOwnProperty("hgt");
    let hcl = p.hasOwnProperty("hcl");
    let ecl = p.hasOwnProperty("ecl");
    let pid = p.hasOwnProperty("pid");

    // Do not check this yet
    let cid = p.hasOwnProperty("cid");

    // Check if passport has all the valid fields
    if (byr && iyr && eyr && hgt && hcl && ecl && pid) {
      // Keep track of validation checks that pass
      let checksPassed = 0;

      // Check birth year
      if (Number(p.byr) >= 1920 && Number(p.byr) <= 2002) {
        checksPassed++;
      }

      // Check issue year
      if (Number(p.iyr) >= 2010 && Number(p.iyr) <= 2020) {
        checksPassed++;
      }

      // Check experation year
      if (Number(p.eyr) >= 2020 && Number(p.eyr) <= 2030) {
        checksPassed++;
      }

      // Check height valiation
      // Split height into an array by numbers
      let heightNbrs = Number(p.hgt.split(/\D/)[0]);
      let heightUnit = p.hgt.replace(/[0-9]/g, "");

      if (heightUnit === "cm") {
        if (heightNbrs >= 150 && heightNbrs <= 193) {
          checksPassed++;
        }
      } else if (heightUnit === "in") {
        if (heightNbrs >= 59 && heightNbrs <= 76) {
          checksPassed++;
        }
      } else {
        // Unit is wrong so skip
      }

      // Check hair color is valid
      // Must be a 6 digit hex code (so 7 total char)
      let hairRegex = new RegExp("^#([a-fA-F0-9]{6})$");
      if (hairRegex.test(p.hcl)) {
        checksPassed++;
      }

      // Check eye color is valid
      // Must be one of these colors
      // amb blu brn gry grn hzl oth
      if (
        p.ecl === "amb" ||
        p.ecl === "blu" ||
        p.ecl === "brn" ||
        p.ecl === "gry" ||
        p.ecl === "grn" ||
        p.ecl === "hzl" ||
        p.ecl === "oth"
      ) {
        checksPassed++;
      }

      // Check passport numer
      // Must be a a nine-digit number, including leading zeroes
      let passNumRegex = /^\d{9}$/;
      if (passNumRegex.test(p.pid)) {
        checksPassed++;
      }

      if (checksPassed === 7) {
        validPassports += 1;
      }
    }
  }

  return validPassports;
};

console.log(
  `Number of valid passports with valid data: ${checkPassportData(
    passportData
  )}`
);
