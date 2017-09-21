const plc = require('../index').parseLC
const car = require('../index').check_against_range

exports["Works with fraction LC numbers"] = function (test) {
    test.ok( car(plc("PN1992.94.U6 B37 1985"), {
        "letters": "PN",
        "min": 1992.91,
        "max": 1999
    }) )
    test.ok( car(plc("NC 1765 W48 1988"), {
        "letters": "NC",
        "min": 1765,
        "max": 1766.5
    }) )
    test.done()
}

exports["Works for a whole class"] = function (test) {
    test.ok( car(plc("QM 23.2 G73 1989"), {
        "letters": "Q",
        "min": 0,
        "max": "Infinity",
        "whole_class": true
    }) )
    test.ok( car(plc("RC606.55.J67 S55 2007"), {
        "letters": "R",
        "min": 0,
        "max": "Infinity",
        "whole_class": true
    }) )
    test.done()
}

exports["Works for a full 0-Infinity subclass"] = function (test) {
    test.ok( car(plc("NA  387 A65 1989"), {
        "letters": "NA",
        "min": 0,
        "max": "Infinity"
    }) )
    test.ok( car(plc("TC781.B1 A29 2014"), { "letters": "TC", "min": 0, "max": "Infinity" }) )
    test.ok( car(plc("PZ7.D16945 Em 2014"), { "letters": "PZ", "min": 0, "max": "Infinity" }) )
    test.done()
}
