# API Documentation

## Installation
```
$ npm i @rpearce/flexible-string-replace
```

## Usage
`flexible-string-replace` mirrors the functionality of
[`String.prototype.replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
with the following exceptions:
* you can transform your match however you see fit
* the return value is `[ * ]` – an Array of whatever type your `Replacement` is
  or returns. For example, if you pass it a function, then you'll get back a
  list of strings as well as your match transformations, whereas if you pass a
  string, you'll get back simply a list of strings with your replacement applied
* the argument order is `(Pattern, Replacement, String)` so that if you'd like
  to [`curry`](https://ramdajs.com/docs/#curry) the function and partially apply
  the first two arguments, you can then reuse those over and over again with
  different strings

Note: while these examples use some JSX, your matching function can return
whatever you like.

```js
import flexibleStringReplace from '@rpearce/flexible-string-replace'

const str = 'The rain in Spain falls mainly on the plain. Spain is nice.'
const searchText = 'spain'
const replacement = (match, offset) => <mark key={offset}>{match}</mark>


// usage with RegExp pattern
const pattern = new RegExp(searchText, 'igm')
flexibleStringReplace(pattern, replacement, str)
// [
//   'The rain in ',
//   <mark>Spain</mark>,
//   ' falls mainly on the plain. ',
//   <mark>Spain</mark>,
//   ' is nice.'
// ]


// usage with RegExp pattern and string Replacement
const pattern = 'Spain'
flexibleStringReplace(pattern, 'foobar', str)
// [
//   'The rain in ',
//   'foobar',
//   ' falls mainly on the plain. ',
//   'foobar',
//   ' is nice.'
// ]


// usage with String pattern (no match)
const pattern = 'spain'
flexibleStringReplace(pattern, replacement, str)
// ["The rain in Spain falls mainly on the plain. Spain is nice."]


// usage with String pattern (match)
const pattern = 'Spain'
flexibleStringReplace(pattern, replacement, str)
// [
//   'The rain in ',
//   <mark>Spain</mark>,
//   ' falls mainly on the plain. Spain is nice.',
// ]
```
