#!/usr/bin/env node

/*
 * @parameter callnum String
 * @returns Object { letters, number, original }
 */
function parseLC (str) {
    return {
        letters: str.match(/(^[A-Z]{1,2})/i)[0],
        number: str.match(/([.0-9]+)/) ? parseFloat(str.match(/([.0-9]+)/)[0]) : null,
        original: str
    }
}

/*
 * @parameter callnum Object { letters, number, original }
 * @parameter range Object { letters, min, max }
 * @returns Boolean
 */
function check_against_range (callnum, range) {
    // whole class check
    if (range.whole_class && range.letters === callnum.letters.substr(0, 1)) {
        return true
    }

    // letters match
    if (range.letters === callnum.letters) {
        // number in between highest/lowest
        if (callnum.number >= range.min
            && (range.max === "Infinity" || callnum.number <= range.max)) {
            return true
        }
    }

    // fallback
    return false
}

/*
 * Check if call number looks like one of our local special collection codes
 *
 * @parameter callnum Object { letters, number, original }
 * @returns String | Null
 */
function is_special (callnum) {
    let specials = [
        'Alumni files',
        'Archive media',
        'California exhibition catalogs',
        'Coracle Press ephemera box',
        'Electronics',
        'Environment',
        'Fossils',
        'Faculty files',
        'Games collection',
        'IBDS', // what is this?
        'Natural History',
        'New Langton Arts collection box',
        'Optics',
        'Personal Copy -',
        'Physics',
        'Rocks',
        'Sinel Collection',
        'Small Press Traffic',
        'Wattis\/CCAC Institute collection',
        // lectures are like 'LecYYYYMMDD' with a date embedded but this catches them
        // do this last since it conflicts with others with "colLECtion" in name
        'Lec',
    ]
    for (let special of specials) {
        if (callnum.original.match(RegExp(special, 'i'))) {
            return special
        }
    }
    // fallback
    return null
}

/*
 * Check if call number is in the wide swath of "Humanities & Social Sciences"
 * which we define as "classes A through M excluding HT (goes in Architecture)"
 *
 * @parameter callnum Object { letters, number, original }
 * @returns Boolean
 */
function is_humanities (callnum) {
    if (callnum.letters.substr(0,1).match(/[A-M]/i) && callnum.letters !== 'HT') {
        return true
    }
    // fallback
    return false
}

// we're being run directly on the command line, execute script
if (require.main === module) {
    const map = require('./map.json')
    const call_numbers = require('./callnums.json')

    let count = {}

    // helper fn
    function addto (category) {
        if (count.hasOwnProperty(category)) {
            count[category]++
        } else {
            count[category] = 1
        }
    }

    // iterate over imported call numbers, categorizing into `count` hash
    for (let callnum of call_numbers) {
        let lc = parseLC(callnum)
        let categorized = false

        // first try all our regular call number mappings
        // structure: map = { "subject1": [range, range], "subject2": [range] }
        for (let subject in map) {
            if (categorized) break

            for (let range of map[subject]) {
                if (check_against_range(lc, range)) {
                    addto(subject)
                    categorized = true
                    break
                }
            }
        }

        // regular mappings didn't work, try some special exceptions
        if (!categorized) {
            if (is_special(lc)) {
                addto("Special Collections")
                // test for humanities _after_ special collections
                // otherwise strings like "Electronics 2.02" are put in Hum
            } else if (is_humanities(lc)) {
                addto('Humanities & Social Sciences')
            } else {
                addto('unknown/other')
                console.error(`${callnum} doesn't fall under any subject`)
            }
        }
    }

    // pretty output—sorted & fit for pasting in Google Spreadsheets
    let sorted_subjects = Object.keys(count).sort()
    console.log('CCA Subject\tNumber of items')
    for (let i = 0; i < sorted_subjects.length; i++) {
        let key = sorted_subjects[i]
        console.log(`${key}\t${count[key]}`)
    }
}

// used for importing into test cases
module.exports = {
    parseLC: parseLC,
    check_against_range: check_against_range,
    is_special: is_special,
    is_humanities: is_humanities,
}
