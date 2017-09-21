const plc = require('../index').parseLC
const is = require('../index').is_humanities

// our definition of humanities subject is
// "classes A through M excluding HT (goes in Architecture)"

exports["catches A-M call numbers"] = function (test) {
    test.ok( is(plc("BF81 .M35 2009")) )
    test.ok( is(plc("LD7501.B6083 E35 2001")) )
    test.ok( is(plc("HM621 .S655 2006")) )
    test.done()
}

exports["skips HT call numbers"] = function (test) {
    test.ok( !is(plc("HT166 .A27 2008")) )
    test.ok( !is(plc("HT352.U6 F64 2005")) )
    test.done()
}

exports["doesn't include N-Z call numbers"] = function (test) {
    test.ok( !is(plc("NA 7235 C2 B48 1989")) )
    test.ok( !is(plc("PN1995.9.E96 S28 2004")) )
    test.ok( !is(plc("Z1003 .R97 2001")) )
    test.done()
}
