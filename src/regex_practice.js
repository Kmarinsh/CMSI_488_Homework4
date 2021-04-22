const regexes = {
    canadianPostalCode: /^[^DFIOQUZW]\d[^DFIOQU] \d[^DFIOQU]\d\b$/,
    visa: /^[4](\d{12}|\d{15})\b$/,
    masterCard: /^[5][1-5]\d{14}\b|[2]([2][2][1-9]|[2][3-9][0-9]|[3-6]\d\d|[7][0-1]\d|[7][2][0])\d{12}\b$/,
    adaFloat: /^(([0-9][_]?)+#((([0-9]|[aA-fF])[_]?)+)([.](([0-9]|[aA-fF])[_]?)+)?#([eE][+-]?([0-9][_]?)+)?)$|^([0-9]([_]?[0-9])*([.]([0-9][_]?)+)?([eE][+-]?([0-9][_]?)+)?)$/,
    notThreeEndingInOO: /^(?![A-Za-z]oo\b)[A-Za-z]*$/i,
    divisibleBy64: /^(0+|[0-1]+000000)\b$/,
    eightThroughTwentyNine: /^([89]|[12]\d)\b$/,
    mLComment: /^[(][*]([*](?![)])|[^*]|\n)*[*][)]$/,
    notDogDoorDenNoLookAround: /^\b(([a-ce-zA-Z][A-Za-z]*)|(d([oe]\b|[oe][^ngo]|[^eo]|\b|(og|oor|en)[A-Za-z]+|oo[^r]|oo\b)|[^d])*)\b$|^$/,
    notDogDoorDenWithLookAround: /^(?!dog\b|den\b|door\b)[A-Za-z]*$/,
  }
  
  export function matches(name, string) {
    return regexes[name].test(string)
  }



  