const plc = require('../index').parseLC
const is = require('../index').is_special

exports['catches major cases (fac files, SPT, etc.)'] = function (test) {
    test.ok( is(plc("Alumni files")) === "Alumni files" )
    test.ok( is(plc("Faculty files")) === "Faculty files" )
    test.ok( is(plc("Small Press Traffic")) === "Small Press Traffic" )
    test.ok( is(plc("Wattis/CCAC Institute collection")) === "Wattis/CCAC Institute collection" )
    test.done()
}

exports['case insensitive'] = function (test) {
    test.ok( is(plc("Faculty Files")) === "Faculty files" )
    test.ok( is(plc("ibds")) === "IBDS" )
    test.done()
}
