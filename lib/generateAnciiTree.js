import chalk from "chalk"

let chanks = {
	more: `├`,
	gap: `│  `,
	last: `└`,
	label: `─ `,
}

export function generateAnciiTree (ast, options) {
	let isRoot = !options

	if (!options) options = {}

	if (!options.prefix) options.prefix = []

	let color = ast.color ? chalk[ast.color] : null
	let row = []

	if (color instanceof Function) ast.label = color(ast.label || ``)

	ast.label = `${options.prefix.join(``)}${chanks[options.chank] ? `${chanks[options.chank]}${chanks.label}` : ``}${ast.label}`

	row.push(ast.label)

	if (ast.nodes) {
		if (!isRoot) options.prefix.push(options.chank === `last` ? `   ` : chanks.gap)

		let lastNode = ast.nodes.at(ast.nodes.length - 1)

		for (let node of ast.nodes) {
			options.chank = node === lastNode ? `last` : `more`
			row.push(generateAnciiTree(node, options))
			options.prefix.pop()
		}
	}

	return row.join(`\n`)
}
