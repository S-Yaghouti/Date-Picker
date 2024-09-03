// --------------------------------------- >> convert fa to en <<
export function FaToEn(persianString) {
  // > perisan digigts
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const persianDigitRegex = /[۰-۹]/g;
  // > perisan digigts

  // > convertor
  return persianString.replace(persianDigitRegex, function (match) {
    const persianDigitIndex = persianDigits.indexOf(match);
    if (persianDigitIndex !== -1) {
      return persianDigitIndex.toString();
    } else {
      response.birthDate;
      return match;
    }
  });
  // > convertor
}
// --------------------------------------- >> convert fa to en <<

// --------------------------------------- >> convert en to fa <<
export function EnToFa(inputString) {
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  for (let i = 0; i < englishNumbers.length; i++) {
    const regex = new RegExp(englishNumbers[i], "g");
    inputString = inputString.replace(regex, persianNumbers[i]);
  }

  return inputString;
}

// --------------------------------------- >> convert en to fa <<
