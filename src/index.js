'use strict'

// flexibleStringReplace :: (Pattern, Replacement, String) -> [ * ]
// Pattern = RegExp | String
// Replacement = String | (* -> *)
function flexibleStringReplace(pattern, replacement, str) {
  var result = []
  var position = 0

  str.replace(pattern, function() {
    var args = Array.prototype.slice.call(arguments)
    var argsN = args.length
    var match = args[0]
    var originalStr = args[argsN - 1]
    var charOffset = args[argsN - 2]
    var prevChars = originalStr.slice(position, charOffset)
    var replaced = typeof replacement === 'function'
      ? replacement.apply(null, args)
      : replacement

    result.push(prevChars, replaced)
    position = charOffset + match.length
  })

  result.push(str.slice(position))

  return result
}

module.exports = flexibleStringReplace
