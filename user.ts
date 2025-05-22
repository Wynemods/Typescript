
import { Task } from "./Task";

export class User {
    private static idCounter = 0;
    public id: number;
    public name: string;
    public email: string;
    public tasks: Task[];

    constructor(name: string, email: string) {
        this.id = User.idCounter++;
        this.name = name;
        this.email = email;
        this.tasks = [];
    }

    assignTask(task: Task): void {
        this.tasks.push(task);
        task.assignTo(this);
    }

    unassignTask(task: Task): void {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        task.unassign();
    }
}
   