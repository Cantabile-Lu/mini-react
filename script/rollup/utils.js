import path from 'path';
import fs from 'fs';

// 将ts打包成js插件
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
// 生产环境是否打印错误信息
import replace from '@rollup/plugin-replace';
// 包的路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包后的路径
const distPath = path.resolve(__dirname, '../../dist/node_modules');

/**
 * @description 获取包名的路径, 1: 源码路径,2: 打包后的路径
 */
export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}

/**
 * @description 获取package.json中的参数
 * @date: 2023-08-16
 */
export function getPackageJson(pkgName) {
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	// 引入fs模块
	const str = fs.readFileSync(path, 'utf8');
	return JSON.parse(str);
}

/**
 * @description 获取公用的plugins
 */
export function getBaseRollupPlugins({
	alias = {
		__DEV__: true,
		preventAssignment: true
	},
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
