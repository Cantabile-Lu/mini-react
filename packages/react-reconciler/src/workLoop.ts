/**
 * @description 完整的工作流程
 */
import { createWorkInProgress, FiberNode, FiberRootNode } from './filber';
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { HostRoot } from './workTags';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}

// 在fiber中调度renderRoot
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	//
	const root = markUpdateFormFiberToRoot(fiber);

	renderRoot(root);
}

function markUpdateFormFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	// 保存父fiber
	let parent = node.return;
	// 如果父fiber存在
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}

	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 执行初始化操作
	prepareFreshStack(root);
	// 执行递归的流程
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn(e);
			}
			// 如果有错误, 则重置workInProgress
			workInProgress = null;
		}
	} while (true);

	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;
	// fiberNode 树
	commitRoot(root);
}

function workLoop() {
	while (workInProgress !== null) {
		preformUnitOfWork(workInProgress);
	}
}

function preformUnitOfWork(fiber: FiberNode) {
	// fiber的子fiber || null
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	// 没有子fiber
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

/**
 * @description 如果有子节点遍历子节点, 没有子节点遍历兄弟节点
 */
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		// 是否存在子fiberNode
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		// 往上继续递归
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
