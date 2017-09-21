# Collection count by subject area

Count CCA Libraries collection by the Library of Congress call number range(s) associated with our various topics.

## Workflow

1. run a Koha report to download all call numbers to a CSV file
    + this is a good stage to weed out numbers we don't need to count (lectures like "Lec20121010" etc.)
2. convert the CSV to JSON with search-and-replace operations and name it "callnums.json"
    + add opening/closing `[]` array brackets
    + add quote to start & end of each line if it's not already there
    + add comma to end of each line
3. run the app with `node index`
    + it outputs uncategorized call numbers to stderr
    + it outputs a tab-separated table of categories & their counts to stdout

**To do**: write a `sed` bash script for step 2 above.

## Structure

Call number ranges are described in map.json by objects like:

```js
{
    "letters": "AB",
    "min": 0,
    "max": 500,
    "whole_class": false
}
```

`letters` is case insensitive and can be any length. To capture all numbers for a subclass, specify the letters and then 0 for `min` and use the string "Infinity" for `max`. To capture an entire class, use a single letter and set `whole_class` to `true` (it can be omitted otherwise).

# LICENSE

[ECL Version 2.0](https://opensource.org/licenses/ECL-2.0)
