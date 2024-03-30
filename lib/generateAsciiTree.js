/**
 * Generates an ASCII tree representation of the given abstract syntax tree (AST).
 *
 * @param {object} ast - The abstract syntax tree.
 * @param {object} [options={}] - The options for generating the ASCII tree.
 * @param {string} [options.prefix=``] - The prefix string to be added to each node in the tree.
 * @param {string} [options.suffix=``] - The suffix string to be added between nodes in the tree.
 * @param {string} [options.postfix=``] - The postfix string to be added to each node in the tree.
 * @return {string} The ASCII tree representation of the AST.
 */
export function generateAsciiTree (ast, { prefix = ``, suffix = ``, postfix = `` } = {}) {
	let { label = ``, nodes } = ast
	let ansiTree = `${prefix}${postfix}${label}`

	if (!nodes) return ansiTree

	prefix += suffix

	nodes.forEach((node, index) => {
		let isLastNode = index === nodes.length - 1

		suffix = isLastNode ? `   ` : `│  `
		postfix = isLastNode ? `└─ ` : `├─ `

		let ansiSubTree = generateAsciiTree(node, { prefix, suffix, postfix })

		ansiTree += `\n${ansiSubTree}`
	})

	return ansiTree
}
