class User {
     private static nextId = 1;
    public readonly id: number;
     public name: string;
    public email: string;

    constructor(name: string, email: string) {
        this.id = User.nextId++;
        this.name = name;
        this.email = email;
    }
}

class Task {
    private static nextId = 1;
     public readonly id: number;
    public title: string;
  public description: string;
    private _assignedUserId: number | null;

    constructor(title: string, description: string) {
    this.id = Task.nextId++;
        this.title = title;
         this.description = description;
    this._assignedUserId = null;
    }

    get assignedUserId(): number | null {
        return this._assignedUserId;
    }

    assignToUser(userId: number) {
        this._assignedUserId = userId;
    }

    unassignUser() {
        this._assignedUserId = null;
    }
}

class UserManager {
    private users: Map<number, User> = new Map();

    createUser(name: string, email: string): User {
        const user = new User(name, email);
        this.users.set(user.id, user);
        return user;
    }

    getUser(userId: number): User | undefined {
        return this.users.get(userId);
    }

    updateUser(userId: number, name?: string, email?: string): boolean {
        const user = this.users.get(userId);
        if (!user) {
            return false;
        }
        if (name !== undefined) user.name = name;
        if (email !== undefined) user.email = email;
        return true;
    }

    deleteUser(userId: number): boolean {
        return this.users.delete(userId);
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values());
    }
}

class TaskManager {
    private tasks: Map<number, Task> = new Map();

    createTask(title: string, description: string): Task {
        const task = new Task(title, description);
        this.tasks.set(task.id, task);
        return task;
    }

    getTask(taskId: number): Task | undefined {
        return this.tasks.get(taskId);
    }

updateTask(taskId: number, title?: string, description?: string): boolean {
        const task = this.tasks.get(taskId);
         if (!task) return false;
     if (title !== undefined) task.title = title;
     if  (description !== undefined) task.description = description;
      return true;
    }

    deleteTask(taskId: number): boolean {
        return this.tasks.delete(taskId);
    }

    assignTaskToUser(taskId: number, userId: number, userManager: UserManager): boolean {
     const task = this.tasks.get(taskId);
         const user = userManager.getUser(userId);
    if (!task || !user) return false;
     task.assignToUser(userId);
        return true;
    }

     unassignTask(taskId: number): boolean {
     const task = this.tasks.get(taskId);
      if (!task) return false;
        task.unassignUser();
        return true;
      }

    getTasksByUser(userId: number): Task[] {
        return Array.from(this.tasks.values()).filter(task => task.assignedUserId === userId);
    }

    getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }
}

// Sample usage demonstration

  function demo() {
     const userManager = new UserManager();
       const taskManager = new TaskManager();

 // Create users
      const Alex = userManager.createUser('Alex mods', 'alexmods@gmail.com');
  const bob = userManager.createUser('Bob', 'bobmods@gmail.com');

  // Create tasks
       const task1 = taskManager.createTask('Setup project', 'Setup the initial project repository and structure.');
     const task2 = taskManager.createTask('Write documentation', 'Write the documentation for the project.');

 const task3 = taskManager.createTask('Code review', 'Review the code for the new feature.');
   
    // Assign tasks
     taskManager.assignTaskToUser(task1.id, Alex.id, userManager);
       taskManager.assignTaskToUser(task2.id, Alex.id, userManager);
  taskManager.assignTaskToUser(task3.id, bob.id, userManager);

    // Display tasks by user
     console.log('Tasks assigned to Alex:');
    for (const task of taskManager.getTasksByUser(Alex.id)) {
        console.log(`- [${task.id}] ${task.title}: ${task.description}`);
    }

      console.log('Tasks assigned to Bob:');
    for (const task of taskManager.getTasksByUser(bob.id)) {
        console.log(`- [${task.id}] ${task.title}: ${task.description}`);
    }

      // Update a user
    userManager.updateUser(Alex.id, 'Alice Wonderland');

 // Update a task
    taskManager.updateTask(task3.id, 'Code review updated', 'Review the updated code for the new feature.');

    // Unassign a task
    taskManager.unassignTask(task2.id);

        // Show all tasks
      console.log('\nAll tasks:');
    for (const task of taskManager.getAllTasks()) {
        let assigned = task.assignedUserId ? `Assigned to User ID ${task.assignedUserId}` : 'Unassigned';
        console.log(`- [${task.id}] ${task.title}: ${assigned}`);
    }

    // Delete a user (should just remove; tasks remain)
    userManager.deleteUser(bob.id);

       // Display all users
     console.log('\nAll users:');
    for (const user of userManager.getAllUsers()) {
        console.log(`- [${user.id}] ${user.name} (${user.email})`);
    }
}

demo();

    export { User, Task, UserManager, TaskManager };

