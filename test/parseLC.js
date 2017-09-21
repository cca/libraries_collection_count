const plc = require('../index').parseLC

exports["Resiliant: don\'t throw errors on weird/local call numbers"] = function (test) {
    plc("Optics 3.10")
    plc("Personal Copy - Le Sueur")
    plc("N")
    test.done()
}

exports["Parse single letter superclass from call number"] = function (test) {
    test.ok( plc("N 1234").letters === "N" )
    test.ok( plc("P37 .P 1997").letters === "P" )
    test.done()
}

exports["Parse double letter subclass from call number"] = function (test) {
    test.ok( plc("HT   65 H85 1992").letters === "HT")
    test.ok( plc("NA 1085 B47 1987").letters === "NA")
    test.ok( plc("NA1010.G7 G69 2003").letters === "NA")
    test.done()
}

exports["Parse numeric component of call number"] = function (test) {
    test.ok( plc("HT123 .H337 1998").number === 123)
    test.ok( plc("PR 6069 T6 R6 1967").number === 6069)
    // parse floats as well, not just integers
    test.ok( plc("Z 118.5").number === 118.5)
    test.done()
}

exports["Retain complete, original call number string in output"] = function (test) {
    test.ok( plc("NA 1085 B47 1987").original === "NA 1085 B47 1987")
    test.ok( plc("Faculty files").original === "Faculty files")
    test.done()
}
