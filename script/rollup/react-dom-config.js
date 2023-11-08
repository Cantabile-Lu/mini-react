/**
 * @description 打包配置
 * @date: 2023-08-16
 */
import { getBaseRollupPlugins, getPackageJson, resolvePkgPath } from './utils';
import rollupPluginGeneratePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';
const { name, module } = getPackageJson('react-dom');
// react-dom包的路径
const pkgPath = resolvePkgPath(name);
// react-dom产物路径
const pkgDistPath = resolvePkgPath(name, true);
console.log(
	`🚀🚀🚀🚀🚀-> in react-dom-config.js on 13`,
	`${pkgPath}/${module}`
);
export default [
	// react
	{
		input: `${pkgPath}/${module}`,
		output: [
			{
				file: `${pkgDistPath}/index.js`,
				name: 'index.js',
				format: 'umd'
			},
			{
				file: `${pkgDistPath}/client.js`,
				name: 'client.js',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			// 生成package.json文件

			alias({
				entries: {
					hostConfig: `${pkgPath}/src/hostConfig.ts`
				}
			}),
			rollupPluginGeneratePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
	// jsx-runtime
	// {
	// 	input: `${pkgPath}/src/jsx.ts`,
	// 	output: [
	// 		{
	// 			file: `${pkgDistPath}/jsx-runtime.js`,
	// 			name: 'jsx-runtime.js',
	// 			format: 'umd'
	// 		},
	// 		{
	// 			file: `${pkgDistPath}/jsx-dev-runtime.js`,
	// 			name: 'jsx-dev-runtime.js',
	// 			format: 'umd'
	// 		}
	// 	],
	// 	plugins: getBaseRollupPlugins()
	// }
];
