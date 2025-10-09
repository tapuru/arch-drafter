export const ROOMS_ACTIONS = {
  JOIN: 'rooms.join',
  LEAVE: 'rooms.leave',
  GET_BY_ID: 'rooms.getById',
  // UPDATE_CANVAS: 'rooms.updateCanvas',
  // SYNC_CANVAS: 'rooms.syncCanvas',
  // UPDATE_CURSOR: 'rooms.updateCursor',
} as const;

export type RoomsAction = (typeof ROOMS_ACTIONS)[keyof typeof ROOMS_ACTIONS];
