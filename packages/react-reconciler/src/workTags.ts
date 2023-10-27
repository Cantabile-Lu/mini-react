// 函数类型节点
export const FunctionComponent = 0;

// 项目挂载的根节点: ReactDOM.render()
export const HostRoot = 3;
// 项目根组件 <div>...</div>
export const HostComponent = 5;
// 文本节点
export const HostText = 6;
// 联合类型
export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;
