   
import { User } from "./user";
import { Task } from "./Task";

export class TaskManager {
    private users: User[];
    private tasks: Task[];

    constructor() {
        this.users = [];
        this.tasks = [];
    }

    createUser(name: string, email: string): User {
        const user = new User(name, email);
        this.users.push(user);
        return user;
    }

    createTask(title: string, description: string): Task {
        const task = new Task(title, description);
        this.tasks.push(task);
        return task;
    }

    getUserById(userId: number): User | undefined {
        return this.users.find(user => user.id === userId);
    }

    getTaskById(taskId: number): Task | undefined {
        return this.tasks.find(task => task.id === taskId);
    }

    updateUser(userId: number, name?: string, email?: string): void {
        const user = this.getUserById(userId);
        if (user) {
            if (name) user.name = name;
            if (email) user.email = email;
        }
    }

    updateTask(taskId: number, title?: string, description?: string): void {
        const task = this.getTaskById(taskId);
        if (task) {
            if (title) task.title = title;
            if (description) task.description = description;
        }
    }

    deleteUser(userId: number): void {
        this.users = this.users.filter(user => user.id !== userId);
        this.tasks.forEach(task => {
            if (task.assignedUser && task.assignedUser.id === userId) {
                task.unassign();
            }
        });
    }

    deleteTask(taskId: number): void {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    getTasksForUser(userId: number): Task[] {
        const user = this.getUserById(userId);
        return user ? user.tasks : [];
    }
}
   