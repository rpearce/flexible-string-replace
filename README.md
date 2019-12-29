# flexible-string-replace
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)
[![npm version](https://img.shields.io/npm/v/@rpearce/flexible-string-replace.svg)](https://www.npmjs.com/package/@rpearce/flexible-string-replace) [![npm downloads](https://img.shields.io/npm/dm/@rpearce/flexible-string-replace.svg)](https://www.npmjs.com/package/@rpearce/flexible-string-replace) [![Build Status](https://travis-ci.org/rpearce/flexible-string-replace.svg?branch=master)](https://travis-ci.org/rpearce/flexible-string-replace) [![Coverage Status](https://coveralls.io/repos/github/rpearce/flexible-string-replace/badge.svg?branch=master)](https://coveralls.io/github/rpearce/flexible-string-replace?branch=master) [![Maintainability](https://api.codeclimate.com/v1/badges/ca092c1e9dfe10b455d7/maintainability)](https://codeclimate.com/github/rpearce/flexible-string-replace/maintainability)

## Links
* [Installation](#installation)
* [Usage](#usage)
* [All Contributors](#contributors)
* [Authors](./AUTHORS)
* [Changelog](./CHANGELOG.md)
* [Contributing](./CONTRIBUTING.md)
* [Code of Conduct](./CODE_OF_CONDUCT.md)

## Installation
```
$ npm i @rpearce/flexible-string-replace
```
or
```
$ yarn add @rpearce/flexible-string-replace
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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://robertwpearce.com"><img src="https://avatars2.githubusercontent.com/u/592876?v=4" width="100px;" alt=""/><br /><sub><b>Robert Pearce</b></sub></a><br /><a href="https://github.com/rpearce/flexible-string-replace/commits?author=rpearce" title="Code">💻</a> <a href="#ideas-rpearce" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rpearce/flexible-string-replace/commits?author=rpearce" title="Tests">⚠️</a> <a href="#example-rpearce" title="Examples">💡</a> <a href="https://github.com/rpearce/flexible-string-replace/commits?author=rpearce" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
