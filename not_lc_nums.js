// CLI app, `node not_lc_nums`
// print call numbers that look like they aren't Library of Congress
const call_numbers = require('./callnums.json')

for (let callnum of call_numbers) {
    // LC call number is: one or two capital letters
    // followed by any number of spaces
    // followed by at least one digit
    if (!callnum.match(/[A-Z]{1,2} *[0-9]+/)) {
        console.log(callnum)
    }
}
