export type Flags = number;
export const NoFlags = 0b0000001;

export const Placement = 0b0000100;
// 更新属性
export const Update = 0b0001000;
// 删除子节点
export const ChildDeletion = 0b0010000;

export const PerformedWork = 0b0000010;
export const PlacementAndUpdate = 0b0001100;
export const Deletion = 0b0010000;
export const ContentReset = 0b0100000;
export const Callback = 0b1000000;
export const DidCapture = 0b10000000;
export const Ref = 0b100000000;
export const Snapshot = 0b1000000000;
