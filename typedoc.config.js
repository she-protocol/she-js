module.exports = {
	entryPoints: ['packages/evm', 'packages/cosmjs', 'packages/cosmos', 'packages/create-she', 'packages/registry', 'packages/she-account', 'packages/ledger'],
	name: '@she-js',
	entryPointStrategy: 'packages',
	includeVersion: false,
	customCss: './typedoc.theme.css',
	readme: 'TYPEDOC-README.md',
	plugin: ['typedoc-material-theme'],
	themeColor: '#9d1f19',
	navigation: {
		includeCategories: true,
		includeGroups: true,
		includeFolders: true
	},
	categorizeByGroup: false,
	compilerOptions: {
		module: 'Node16',
		strict: true,
		composite: true,
		declaration: true,
		declarationMap: true
	}
};
