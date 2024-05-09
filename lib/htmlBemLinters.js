import process from "node:process"

import chalk from "chalk"
import htmlParser from "node-html-parser"

import { generateAsciiTree } from "./generateAsciiTree.js"

let countBemWarning = 0

/**
 * Generates a label tree based on the given element.
 *
 * @param {Object} element - The element to generate the label tree from.
 * @return {string} The label tree generated from the element.
 */
function createLabelTree (element) {
	let label = element.tagName

	if (element.id) {
		label += `#${element.id.split(` `).join(`#`)}`
	}
	if (element.classList.length) {
		label += `.${element.classList.value.join(`.`)}`
	}

	return label
}

/**
 * Generates a formatted abstract syntax tree (AST) from an HTML tree.
 *
 * @param {HTMLElement} htmlTree - The HTML tree to convert to an AST.
 * @return {Object} ast - The formatted abstract syntax tree.
 */
function htmlTreeFormatAst (htmlTree) {
	let ast = { nodes: [] }

	for (let element of htmlTree.childNodes) {
		if (element.nodeType !== 1) continue

		ast.label = createLabelTree(element)

		element.parentElement = null

		element.classList.value.forEach((name) => {
			if (name.split(`__`).length === 1 && name.split(`--`).length === 1) {
				if (!element.customDataSet) {
					element.customDataSet = {
						prefixes: {},
						parentElement: null,
					}
				}
				element.customDataSet.prefixes[name] = name
			}
		})

		formatTree({
			htmlNodes: element.childNodes,
			astNodes: ast.nodes,
			parent: element,
		})
	}

	return ast
}

/**
 * Copies the prefixes from the custom data set of the parent element to the custom data set of the given element.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.element - The element to copy the prefixes to.
 * @param {Object} options.parent - The parent element from which to copy the prefixes.
 */
function copyParentPrefixes ({ element, parent }) {
	if (!parent || !parent.customDataSet) return

	for (let prefix in parent.customDataSet.prefixes) {
		if (!Object.hasOwn(parent.customDataSet.prefixes, prefix)) continue

		element.customDataSet.prefixes[prefix] = prefix
	}
}

/**
 * Adds classes as prefixes to the given element, based on the class names in the parent element.
 *
 * @param {Object} element - The element to add prefixes to.
 * @param {Object} parent - The parent element to get class names from.
 */
function addClassesAsPrefixes ({ element, parent }) {
	copyParentPrefixes({ element, parent })

	element.classList.value.forEach((name) => {
		if (name.split(`__`).length === 1 && name.split(`--`).length === 1) {
			element.customDataSet.prefixes[name] = name
		}
	})
}

/**
 * Generates a formatted tree structure from a collection of HTML and AST nodes.
 *
 * @param {Object} options - The options object.
 * @param {Array} options.htmlNodes - An array of HTML nodes.
 * @param {Array} options.astNodes - An array of AST nodes.
 * @param {HTMLElement} options.parent - The parent element.
 */
function formatTree ({ htmlNodes, astNodes, parent }) {
	for (let element of htmlNodes) {
		if (element.nodeType !== 1) continue

		if (!element.customDataSet) {
			element.customDataSet = {
				prefixes: {},
				parentElement: parent,
			}
		}

		addClassesAsPrefixes({ element, parent })
		checkBemElement(element)
		checkBemModifier(element)

		let ast = {
			label: `${createLabelTree(element)}${element.customDataSet.hasError ? ` ❌ ${chalk.bold(element.customDataSet.errorMessage)}` : ``}`,
			nodes: [],
		}

		astNodes.push(ast)

		if (element.childNodes.length) {
			formatTree({
				htmlNodes: element.childNodes,
				astNodes: ast.nodes,
				parent: element,
			})
		}
	}
}

/**
 * Checks if the given element is a BEM element.
 *
 * @param {HTMLElement} element - The element to check.
 */
function checkBemElement (element) {
	if (element.classList.value.join().indexOf(`__`) < 0) return

	element.classList.value.forEach((classItem) => {
		element.customDataSet.errorMessage ||= ``

		if (classItem.split(`__`).length > 2) {
			setError(element.customDataSet, `Element of element!`)
		} else if (classItem.split(`__`).length > 1) {
			let prefix = classItem.split(`__`)[0]

			if (!element.customDataSet.prefixes[prefix]) {
				setError(element.customDataSet, `Element outside his block!`)
			} else if (element.classList.contains(prefix)) {
				setError(element.customDataSet, `Element mixed with his block!`)
			}
		}
	})
}

/**
 * Checks if the given element has a BEM modifier.
 *
 * @param {HTMLElement} element - The element to check.
 */
function checkBemModifier (element) {
	if (element.classList.value.join().indexOf(`--`) < 0) return

	element.classList.value.forEach((classItem) => {
		element.customDataSet.errorMessage ||= ``

		if (classItem.split(`--`).length > 1) {
			let modifierPrefix = classItem.split(`--`)[0]

			if (!~element.classList.value.indexOf(modifierPrefix)) {
				setError(element.customDataSet, `Modifier without modifiable!`)
			}
		}
	})
}

/**
 * Sets an error in the provided custom data set.
 *
 * @param {object} customDataSet - The custom data set to set the error in.
 * @param {string} errorMessage - The error message to set.
 */
function setError (customDataSet, errorMessage) {
	countBemWarning++
	customDataSet.hasError = true

	if (!customDataSet.errorMessage.includes(errorMessage)) {
		customDataSet.errorMessage += errorMessage
	}
}

/**
 * Generates a function comment for the given function body.
 *
 * @param {object} options - The options object.
 * @param {string} options.content - The content to be processed.
 * @return {object} The result object.
 * @property {number} result.warningCount - The number of warnings.
 * @property {object} result.treeAst - The AST of the tree.
 */
export function htmlBemlinter ({ content }) {
	let htmlThree = htmlParser.parse(content)
	let treeAst = htmlTreeFormatAst(htmlThree)
	let warningCount = countBemWarning

	countBemWarning = 0

	return {
		warningCount,
		treeAst,
	}
}

/**
 * Generates the HTML BEM linter result for the given name and content.
 *
 * @param {Object} parameters - The parameters for the function.
 * @param {string} parameters.name - The name of the HTML file.
 * @param {string} parameters.content - The content of the HTML file.
 */
export function htmlBemlinterResult ({ name, content }) {
	let { warningCount, treeAst } = htmlBemlinter({ name, content })

	if (warningCount) {
		process.env.FORCE_COLOR = true
		console.error(generateAsciiTree(treeAst), chalk.red.bold(`\nBEM linting: ${warningCount} issue${warningCount > 1 ? `s` : ``} found in ${name}`))
		process.exitCode = 1
	}
}
