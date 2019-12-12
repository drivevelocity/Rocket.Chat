// eslint-disable-next-line import/no-unresolved
require('lock-verify')().then((result) => {
	if (result.status) {
		result.warnings.forEach((w) => console.warn('lockfile', w));
	} else {
		console.error(
			`${ 'Errors were found in your package-lock.json, run  npm install  to fix them.\n' }${
				result.warnings.map((w) => `    Warning: ${ w }`).join('\n    ') }\n${
				result.errors.map((e) => `    ${ e }`).join('\n') }\n`
		);
		process.exit(1);
	}
}).catch((err) => {
	throw err;
});
