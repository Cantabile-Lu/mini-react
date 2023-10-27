/**
 * @description 当前环境是否支持Symbol
 * @date: 2023-08-16
 */
const supportsSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportsSymbol
	? Symbol.for('react.element')
	: 0xeac7;
