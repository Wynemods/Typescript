 //This TypeScript code using oop implements a simple task management system. 
 // It defines three classes: User, Task, and TaskManager.
 //  The TaskManager class manages collections of users and tasks, allowing creation, updating, deletion, and retrieval.
 //  Users can be assigned tasks, and tasks keep track of their assigned user. The main script creates two users and two tasks, assigns each task to a user, and performs updates and deletions.
 //  The output shows the tasks assigned to each user, confirming that the system correctly manages task assignments and user-task relationships.
import { TaskManager } from "./TaskManager";

const taskManager = new TaskManager();

// Create users
 const user1 = taskManager.createUser("Alex", "Alexmods@gmail.com");
const user2 = taskManager.createUser("Kelvin", "Kelvin@gmail.com");

// Create tasks
const task1 = taskManager.createTask("Task1", "Build a website For Buying and Selling Maize");
const task2 = taskManager.createTask("Task2", "Build for me a website for waking me up early in the morning");

// Assign tasks to users
  user1.assignTask(task1);
user2.assignTask(task2);

 //  Show tasks for user1
     console.log("Tasks for user1 before update and delete:", taskManager.getTasksForUser(user1.id));

// Update user1's name
taskManager.updateUser(user1.id, "King Alex");
 console.log("Updated user1's name:", user1.name);

// Update task1's title and description
    taskManager.updateTask(task1.id, "Write a Simple code", "Updated description for Task 1");
console.log("Updated task1:", task1);

  // Delete task2
taskManager.deleteTask(task1.id);
console.log("Deleted task1. Tasks for user2 now:", taskManager.getTasksForUser(user2.id));

  // Delete user1
    taskManager.deleteUser(user1.id);
     console.log("Deleted user1. Remaining users:", taskManager['users']);
   
//The src/index.ts file is the main entry point of the application, and uses the TaskManager class to manage users and tasks.
//To run this code, you need to compile Ts files to javascript using the TypeScript compiler (tsc) and then run the resulting JavaScript files using Node.js.
// so in my tsconfig.json file, I have set the target to es6 and module to commonjs., which also specifies the output directory as ./dist.
//tsc
//node dist/index.js
