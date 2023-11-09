import { FiberNode } from './filber';
import internal from 'shared/internals';
import { Dispatcher } from 'react/src/currentDisoatcher';
import { Dispatch } from 'react';

let currentlyRenderingFiber: FiberNode | null = null;
// 当前正在处理的hook
let workInProgressHook: Hook | null = null;
const { currentDispatcher } = internal;
interface Hook {
	memoizeState: any;
	updateQueue: unknown;
	next: Hook | null;
}

export function renderWithHooks(wip: FiberNode) {
	// 复制
	currentlyRenderingFiber = wip;
	wip.memoizedState = null;

	const current = wip.alternate;
	if (current !== null) {
		// update
	} else {
		currentDispatcher.current = HooksDispatcherOnMount;
	}
	const Component = wip.type;
	const props = wip.pendingProps;
	const children = Component(props);
	// 重置
	currentlyRenderingFiber = null;
	return children;
}

const HooksDispatcherOnMount: Dispatcher = {
	useState: mountState
};
function mountState<State>(
	initialState: (() => State) | State
): [State, Dispatch<State>] {
	const hook = mountWorkInProgressHook();
	return [];
}

function mountWorkInProgressHook(): Hook {
	const hook: Hook = {
		memoizeState: null,
		updateQueue: null,
		next: null
	};
	if (workInProgressHook === null) {
		if (currentlyRenderingFiber === null) {
			throw new Error('请在函数内调用hook');
		}
	}
}
