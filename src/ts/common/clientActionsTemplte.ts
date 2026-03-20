import { Method, SocketClient, Bin } from 'ag-sockets/dist/browser';
import {
	MapInfo, WorldState, PartyFlags, Action, NotificationFlags, LeaveReason,
	SayData, MapState, PonyData, FriendStatusData} from '../common/interfaces';
const BinEntityId = Bin.U32;
const BinEntityPlayerState = Bin.U8;
const BinNotificationId = Bin.U16;
const BinSayDatas = [BinEntityId, Bin.Str, Bin.U8];

export class ClientActionsTemplate implements SocketClient {

    @Method({ binary: [Bin.U32] })
	queue(_place: number) {}
    @Method({ binary: [Bin.Obj, Bin.Bool] })
    worldState(_state: WorldState, _initial: boolean) { }
    @Method({ binary: [Bin.Obj, Bin.Obj] })
    mapState(_info: MapInfo, _state: MapState) { }
    @Method({ binary: [Bin.Obj] })
    mapUpdate(_state: MapState) {}
    @Method({ binary: [] })
    mapSwitching() { }
    @Method({ binary: [Bin.I32, Bin.I32, Bin.U8Array] })
    mapTest(_width: number, _height: number, _buffer: Uint8Array) { }
    @Method({ binary: [BinEntityId, Bin.Str, Bin.Str, Bin.Str, Bin.U16] })
    myEntity(_id: number, _name: string, _info: string, _characterId: string, _crc: number) {}
    @Method({ binary: [[Bin.U8], [Bin.U8Array], Bin.U8Array, [Bin.U8Array], BinSayDatas] })
    update(_unsubscribes: number[], _subscribes: Uint8Array[], _updates: Uint8Array | null, _regions: Uint8Array[], _says: SayData[]) {}
    @Method({ binary: [Bin.F32, Bin.F32, Bin.Bool] })
    fixPosition(_x: number, _y: number, _safe: boolean) {}
    @Method({ binary: [BinEntityId, Bin.U8, Bin.Obj] })
    actionParam(_id: number, _action: Action, _param: any) {}
    @Method({ binary: [Bin.U8] })
    left(_reason: LeaveReason) {}
    @Method({ binary: [BinNotificationId, BinEntityId, Bin.Str, Bin.Str, Bin.Str, Bin.U8] })
    addNotification(_id: number, _entityId: number, _name: string, _message: string, _note: string, _flags: NotificationFlags) {}
        
    @Method({ binary: [BinNotificationId] })
    removeNotification(_id: number) { }
    @Method({ binary: [BinEntityId, BinEntityId] })
    updateSelection(_currentId: number, _newId: number) {}
    @Method({ binary: [[BinEntityId, Bin.U8]] })
    updateParty(_party: [number, PartyFlags][] | undefined) {}
    @Method({ binary: [[BinEntityId, Bin.Obj, Bin.U8Array, Bin.U8Array, BinEntityPlayerState, Bin.Bool]] })
    updatePonies(_ponies: PonyData[]) {}
    @Method({ binary: [Bin.Obj, Bin.Bool] })
    updateFriends(_friends: FriendStatusData[], _removeMissing: boolean) {}
    @Method({ binary: [BinEntityId, Bin.Str, Bin.U32, Bin.Bool] })
    entityInfo(_id: number, _name: string, _crc: number, _nameBad: boolean) {}
    @Method({ binary: [Bin.Obj] })
    entityList(_value: { name: string; x: number; y: number; }[]) {}
    @Method({ binary: [Bin.Obj] })
    testPositions(_data: { frame: number; x: number | undefined; y: number | undefined; moved: boolean; }[]) {}
}
