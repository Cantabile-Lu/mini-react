//  递归中的递阶段
import { FiberNode } from './filber';
import {
	FunctionComponent,
	HostComponent,
	HostRoot,
	HostText
} from './workTags';
import { processUpdateQueue, UpdateQueue } from './updateQueue';
import { ReactElement } from 'shared/ReactTypes';
import { mountChildFibers, reconcileChildFibers } from './childFibers';
import { renderWithHooks } from './fiberHooks';

/**
 * @description beginWork是整个流程的开始
 * @params current: 在视图层渲染的树
 * @params workInProgress: 整个内存中所构建的fiber树
 * @params renderLanes: 优先级
 */
export const beginWork = (wip: FiberNode) => {
	// 比较, 然后返回子fiberNode
	switch (wip.tag) {
		case HostRoot:
			return updateHostRoot(wip);
		case HostComponent:
			return updateHostComponent(wip);
		case HostText:
			return null;
		case FunctionComponent:
			return updateFunctionComponent(wip);
		default:
			if (__DEV__) {
				console.log(`🚀🚀🚀🚀🚀-> in beginWork.ts on 18`, 'beginWork未实现');
			}
			break;
	}
	return null;
};
function updateFunctionComponent(wip: FiberNode) {
	const nextChild = renderWithHooks(wip);
	reconileChildren(wip, nextChild);
	return wip.child;
}
// 计算状态的最新值
function updateHostRoot(wip: FiberNode) {
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memorizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memorizedState;

	const nextChildren = wip.memoizedState;

	reconileChildren(wip, nextChildren);

	return wip.child;
}

// 创建子fiberNode
function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconileChildren(wip, nextChildren);
	return wip.child;
}

function reconileChildren(wip: FiberNode, children?: ReactElement | null) {
	const current = wip.alternate;
	if (current !== null) {
		wip.child = reconcileChildFibers(wip, current?.child, children);
	} else {
		// mount
		wip.child = mountChildFibers(wip, null, children);
	}
}
