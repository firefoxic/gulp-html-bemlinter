# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
  
## [2.0.0] — 2022–08–12

### Added

- Eslint.

### Changed

- All project dependencies have been updated to the latest versions.
- To upgrade Chalk to v5+, the project was transferred from cjs to esm.

### Fixed

- JS files fixed to match eslint settings.
  
## [1.2.3] — 2022–07–27

### Added

- Editorconfig.

### Changed

- Improved formatting project files.
- The project name has been updated in all files.
- Updated report styling.

### Removed

- One optional dependency.

## [1.2.0] — 2022–07–26

### Fixed

- `page` block elements on the `html` tag are no longer treated as “element outside of its block” errors.

## [1.1.0] — 2022–07–26

### Fixed

- The elements of the elements, such as `block__elem1__elem2`, are now also flagged as a bem naming error (thanks to [@SampetovaN](https://github.com/SampetovaN)).

## [1.0.0] — 2022–07–26

### Added

- Basic functionality via a fork of the [gulp-html-bem-validator](https://github.com/dDenysS/gulp-html-bem-validator/) project.
