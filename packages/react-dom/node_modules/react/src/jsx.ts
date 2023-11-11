// ReactElement
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Ref,
	Props,
	ElementType,
	ReactElement
} from 'shared/ReactTypes';
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props) {
	const element: ReactElement = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'Cantabile'
	};
	return element;
};
export function isValidElement(object: any) {
	return (
		typeof object === 'object' &&
		object !== null &&
		object.$$typeof === REACT_ELEMENT_TYPE
	);
}
export const jsx = (type: ElementType, config: any, ...children: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		// 如果prop是key，则赋值给key
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		// 如果prop是ref，则赋值给ref
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}
		// 如果在config上有prop属性, 复制给props
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const childrenLength = children.length;
	if (childrenLength) {
		// 如果children只有一个元素，那么直接赋值给props.children
		if (childrenLength === 1) {
			props.children = children.at(0);
		} else {
			props.children = children;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = (type: ElementType, config: any) => {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
			continue;
		}

		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	return ReactElement(type, key, ref, props);
};
