import { basename } from "node:path"

import PluginError from "plugin-error"
import through from "through2"

import { htmlBemlinterResult } from "./htmlBemLinters.js"

const PLUGIN_NAME = `gulp-html-bemlinter`

export default function () {
	return through.obj(function (file, encoding, callback) {
		if (file.isNull()) return callback(null, file)

		if (file.isStream()) {
			this.emit(`error`, new PluginError(PLUGIN_NAME, `Streams not supported!`))

			return callback(null)
		}

		htmlBemlinterResult({
			name: basename(file.path),
			content: String(file.contents),
		})

		callback(null, file)
	})
}
