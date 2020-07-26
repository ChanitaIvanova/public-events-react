export class GameEvent {
    id: number = 0;
    name: string = "";
    game: string = "";
    city: string = "";
    address: string = "";
    user: string = "";
    slots: number = 0;
    freeSlots: number = 0;
    owner: number | undefined = undefined;

    constructor(userId: number | undefined = undefined) {
        this.owner = userId;
    }
}