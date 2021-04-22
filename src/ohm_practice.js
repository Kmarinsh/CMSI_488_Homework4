import ohm from "ohm-js"

const grammars = {
  //neds fix
  canadianPostalCode: 
    `
      canadianPostalCode = firstGroup space secondGroup
      
      firstGroup = firstLetter d allowedLetters
      secondGroup = d allowedLetters d
      
      firstLetter  = "A" | "B" | "C" | "E" | "G" | "H" | "J" | "K" | "L" | "M" | "N" 
                      | "P" | "R" | "S" | "T" | "V" | "X" | "Y"
      allowedLetters = firstLetter | "W" | "Z"
      d = digit
      space := " "
    `,
  visa: 
    `
      visa = "4" d d d d d d d d d d d d (d d d)?
      d = digit
    `,
  masterCard: 
    `
      Mastercard  = "5" ("1".."5") d d d d d d d d d d d d d d    --fifty
                  | TwoThousand d d d d d d d d d d d d           --two_tousand
      TwoThousand = "222" ("1".."9")                              --two22
                  | "22" ("3".."9") digit                         --two2
                  | "2" ("3".."6") digit digit                    --two
                  | "2720"                                        --two270
                  | "27" ("0".."1") digit                         --two7
      d = digit
    `,
  adaFloat: 
    `
      NumericLiteral = BaseLiteral | DecimalLiteral
      
      BaseLiteral =  Base "#" BasedNumeral ("." BasedNumeral)? "#" Exponent?
      Base = Numeral
      BasedNumeral = ExtendedDigit ("_"? ExtendedDigit)*
      ExtendedDigit = digit | "A" | "B" | "C" | "D" | "E" | "F" | "a" | "b" | "c" | "d" | "e" | "f"
      
      DecimalLiteral = Numeral ("." Numeral)? Exponent?
      
      Numeral = digit ("_"? digit)*
      Exponent = (("E"|"e") "+"? Numeral) | (("E"|"e") "-" Numeral)
    `,
  notThreeEndingInOO: 
    `
      Not = ~(letter ("oo"|"oO"|"Oo"|"OO") end) letter*
    `,
  divisibleBy64: 
    `
      Divisible = (~("000000" end) "0".."1")* "000000" 	  --long
                | "0" "0"? "0"? "0"? "0"?							            --justZeros
    `,
  eightThroughTwentyNine: 
    `
      Numerals  = "8".."9"					--single
                | ("1".."2") digit			  --ten_29
    `,
  mLComment: 
  `
    comment = "(" "*" (~"*)" any)* "*" ")"
  `,
  notDogDoorDenNoLookAround: 
    `
      WithoutLookAround = "dog" letter+
                        | "den" letter+
                        | "door" letter+
                        | "do" startsWithdo
                        | "de" startsWithde
                        | "d" startsWithd
                        | ("A".."Z" | "a".."c" | "e".."z"| end) ("A".."Z" | "a".."z")*
      startsWithdo  = ("A".."Z" |  "a".."f" | "h".."n" | "p".."z") letter*
      startsWithde  = ("A".."Z" |  "a".."m" | "o".."z") letter*
      startsWithd   = ("A".."Z" |  "a".."d" | "f".."n"| "p".."z") letter*
    `,
  notDogDoorDenWithLookAround: 
    `
      WithLookAround = ~(("dog"|"den"|"door") end) ("A".."Z" | "a".."z")* end
    `,
}

export function matches(name, string) {
  const grammar = `G {${grammars[name]}}`
  return ohm.grammar(grammar).match(string).succeeded()
}
