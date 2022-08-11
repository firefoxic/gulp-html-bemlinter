import htmlParser from 'node-html-parser'
import CAT from 'classic-ancii-tree'
import chalk from 'chalk'

const SUCCESS_COLOR = 'green'
const ERROR_COLOR = 'red'

let countBemWarning = 0

function createNode({ label, color }) {
	return {
		label,
		color,
		nodes: []
	}
}

function createLabelTree(element) {
	let label = element.tagName
	if (element.id) label += `#${element.id.split(' ').join('#')}`
	if (element.classList.length) label += `.${element.classList.value.join('.')}`

	return label
}

function htmlThreeFormatAst(htmlTree) {
	let ast = {}
	for (const element of htmlTree.childNodes) {
		if (element.nodeType !== 1) continue
		ast = createNode({ label: createLabelTree(element), color: SUCCESS_COLOR })

		element.parentElement = null

		element.classList.value.forEach(name => {
			if (name.split('__').length === 1 && name.split('--').length === 1) {

				if (!element.customDataSet) {
					element.customDataSet = {
						prefixes: {},
						parentElement: null
					}
				}
				element.customDataSet.prefixes[name] = name
			}
		})

		formatTree({
			htmlNodes: element.childNodes,
			astNodes: ast.nodes,
			parent: element
		})
	}

	return ast
}


/**
 * Function copies classes to a child element from parent!
 * @param {Object} elements - The element of a node-html-parse three.
 * @param {Object} elements.element - The element of a node-html-parse three.
 * @param {Object} elements.parent - The parent of a element node-html-parse three.
 */
function copyParentPrefixes({ element, parent }) {
	if (!parent || !parent.customDataSet) {
		return
	}

	for (const prefix in parent.customDataSet.prefixes) {
		element.customDataSet.prefixes[prefix] = prefix
	}
}

/**
 * Function copies and split classes.
 * @param {Object} elements - The element of a node-html-parse three.
 * @param {Object} elements.element - The element of a node-html-parse three.
 * @param {Object} elements.parent - The parent of a element node-html-parse three.
 */
function addClassesAsPrefixes({ element, parent }) {
	copyParentPrefixes({ element, parent })

	element.classList.value.forEach(name => {
		if (name.split('__').length === 1 && name.split('--').length === 1) {
			element.customDataSet.prefixes[name] = name
		}
	})
}

/**
 * Function formats a ast tree. This function is recursive!
 * @param {Object} nodes - The trees what are  for the project.
 * @param {Object} nodes.htmlNodes[] - The html tree of node-html-parse.
 * @param {Object} nodes.astNodes[] - The ast tree classic-ancii-tree.
 * @param {Object} nodes.parent - The parent element of htmlNodes.
 */
function formatTree({ htmlNodes, astNodes, parent }) {
	for (const element of htmlNodes) {
		if (element.nodeType !== 1) continue

		if (!element.customDataSet) {
			element.customDataSet = {
				prefixes: {},
				parentElement: parent
			}
		}

		addClassesAsPrefixes({ element, parent })
		checkBemElement(element)

		const node = createNode({
			label: createLabelTree(element),
			color: element.customDataSet.hasError ? ERROR_COLOR : SUCCESS_COLOR
		})
		astNodes.push(node)


		if (element.childNodes.length) {
			formatTree({ htmlNodes: element.childNodes, astNodes: node.nodes, parent: element })
		}
	}
}

function checkBemElement(element) {
	if (element.classList.value.join().indexOf('__') < 0 &&
		element.classList.value.join().indexOf('--') < 0) {
		return false
	}

	element.classList.value.forEach(classItem => {
		let prefixCorrect = false
		if (classItem.split('__').length > 2) {
			countBemWarning++
			element.customDataSet.hasError = true
		} else {
			if (classItem.split('__').length > 1) {
				const prefix = classItem.split('__')[0]

				if (element.customDataSet.prefixes[prefix]) {
					prefixCorrect = true
				}

				if (!prefixCorrect) {
					countBemWarning++

					element.customDataSet.hasError = true
				}
			}
		}

		// modifier
		if (classItem.split('--').length > 1) {
			let modifierPrefixCorrect = false
			const modifierPrefix = classItem.split('--')[0]

			if (~element.classList.value.indexOf(modifierPrefix)) modifierPrefixCorrect = true

			if (!modifierPrefixCorrect) {
				countBemWarning++

				element.customDataSet.hasError = true
			}
		}
	})
}

export function htmlBemlinter({ content }) {
	const htmlThree = htmlParser.parse(content)
	const treeAst = htmlThreeFormatAst(htmlThree)

	const result = {
		countBemWarning,
		treeAst
	}
	countBemWarning = 0

	return result
}

export function htmlBemlinterResult({ name, content }) {
	const { countBemWarning, treeAst } = htmlBemlinter({ name, content })

	if (countBemWarning) {
		console.log(CAT(treeAst))
		console.log(chalk.white.bgRed.bold(`           BEM linting: ${countBemWarning} issue${countBemWarning > 1 ? 's' : ''} found in ${name}`))
	} else {
		console.log(chalk.bgBlack.green(`           BEM linting: No issues found in ${name}`))
	}
}
