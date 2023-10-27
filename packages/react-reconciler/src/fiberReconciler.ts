// 在执行React.createRoot的时候，会调用createContainer方法，
// 这个方法会返回一个RootFiber对象，这个对象就是我们所说的RootFiber根节点。
import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './filber';
import { HostRoot } from './workTags';
import {
	createUpdate,
	createUpdateQueue,
	enqueueUpdate,
	UpdateQueue
} from './updateQueue';
import { ReactElement } from 'shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';

export function createContainer(container: Container) {
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}
// 执行ReactDOM.render的时候，会调用updateContainer方法，这个方法会返回一个Update对象，这个对象就是我们所说的Update更新对象。
export function updateContainer(
	element: ReactElement | null,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	// 首屏渲染触发更新
	const update = createUpdate<ReactElement | null>(element);
	// 插入到hostRootFiber.updateQueue
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElement | null>,
		update
	);

	// 与 renderRoot 链接
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
