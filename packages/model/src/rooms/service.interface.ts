import { ServiceFromActions } from '@/shared';
import { ROOMS_ACTIONS } from './actions.const';
import { UserId } from '../../build/index.cjs';
import { RoomId, type Room } from './schemas/room.schema';

type GetById = (payload: { userId: UserId; roomId: RoomId }) => Promise<Room>;
type Join = (payload: { userId: UserId; roomId: RoomId }) => Promise<Room>;
type Leave = (payload: { userId: UserId; roomId: RoomId }) => Promise<Room>;

export interface RoomsService
  extends ServiceFromActions<
    typeof ROOMS_ACTIONS,
    {
      [ROOMS_ACTIONS.JOIN]: Join;
      [ROOMS_ACTIONS.LEAVE]: Leave;
      [ROOMS_ACTIONS.GET_BY_ID]: GetById;
    }
  > {}
