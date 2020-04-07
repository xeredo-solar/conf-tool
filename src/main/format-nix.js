'use strict'

const fmt = data => {
  switch (true) {
    case data && data._literal: return data._value
    case Array.isArray(data): return format.array(data)
    case typeof data === 'object': return format.object(data)
    case typeof data === 'boolean': return format.boolean(data)
    case typeof data === 'number': return format.number(data)
    case typeof data === 'string': return format.string(data)
    default: {
      throw new Error(`Cannot convert ${typeof data} ${JSON.stringify(data)}`)
    }
  }
}

function nixEscape (str) {
  return '"' + str.replace(/''/gmi, "\\''").replace(/\$\{/gmi, "''${") + '"'
}

const format = {
  array: data => {
    return `[ ${data.map(fmt).join(' ')} ]`
  },
  object: data => {
    const out = ['{']

    for (const key in data) { // eslint-disable-line guard-for-in
      out.push(`${key} = ${fmt(data[key])};`)
    }

    if (out.length === 1) return '{ }'

    out.push('}')

    return out.join('\n')
  },
  boolean: JSON.stringify,
  number: JSON.stringify,
  string: nixEscape
}

module.exports = data => {
  return fmt(data)
}
