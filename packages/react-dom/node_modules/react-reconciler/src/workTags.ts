// 函数组件
export const FunctionComponent = 0;
// 类组件
export const ClassComponent = 1;
// 初始化不知道是函数组件还是类组件
export const IndeterminateComponent = 2;
// 根元素, 通过reactDom.render()产生的根元素
export const HostRoot = 3;
// ReactDOM.creatPortal产生的portal
export const HostPortal = 4;
// dom元素, 比如<div/>
export const HostComponent = 5;
// 文本节点
export const HostText = 6;
// Fragment
export const Fragment = 7;
// React.StrictMode
export const Mode = 8;
// Context.Consumer
export const ContextConsumer = 9;
//  Context.Provider
export const ContextProvider = 10;
// React.ForwardRef
export const ForwardRef = 11;
// <Profiler/>
export const Profiler = 12;
// <Suspense/>
export const SuspenseComponent = 13;
// React.memo返回的组件
export const MemoComponent = 14;
// React.memo没有定制比较方法,所返回的组件
export const SimpleMemoComponent = 15;
// <Lazy/>
export const LazyComponent = 16;
// 联合类型
export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;
