export default function flexibleStringReplace(
  pattern: string | RegExp,
  replacer: string | ((...args: any[]) => any), // eslint-disable-line @typescript-eslint/no-explicit-any
  str: string
): string[] {
  const result = []
  let position = 0

  str.replace(pattern, function(...args): string {
    const argsN = args.length
    const match = args[0]
    const originalStr = args[argsN - 1]
    const charOffset = args[argsN - 2]
    const prevChars = originalStr.slice(position, charOffset)
    const replaced =
      typeof replacer === 'function' ? replacer(...args) : replacer

    result.push(prevChars, replaced)
    position = charOffset + match.length

    return '' // no-op
  })

  result.push(str.slice(position))

  return result
}
