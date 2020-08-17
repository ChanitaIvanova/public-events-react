/**
 * Class that describes one event
 */
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

    /**
     * Constructs a GameEvent with provided author
     * @param {number} userId the is of the owner(author) of the event
     */
    constructor(userId: number | undefined = undefined) {
        this.owner = userId;
    }
}
