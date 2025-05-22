   
import { User } from "./user";

export class Task {
    private static idCounter = 0;
    public id: number;
    public title: string;
    public description: string;
    public assignedUser: User | null;

    constructor(title: string, description: string) {
        this.id = Task.idCounter++;
        this.title = title;
        this.description = description;
        this.assignedUser = null;
    }

    assignTo(user: User): void {
        this.assignedUser = user;
    }

    unassign(): void {
        this.assignedUser = null;
    }
}
   