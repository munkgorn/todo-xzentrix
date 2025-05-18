import { create } from "zustand";
import { fetchTasks, addTask as apiAddTask, updateTask as apiUpdateTask, deleteTask as apiDeleteTask } from "../graphql/task";
import _ from "lodash";

const userStore = create((set) => ({
  token: null,
  user: {
    id: 2
  },
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ user: null, token: null }),
}));

const taskStore = create((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  fetchTasks: async () => {
    const tasks = await fetchTasks(userStore.getState().user.id);
    set({ tasks });
  },
  addTask: async (task) => {
    // Add User id from userStore
    _.update(task, "user_id", (value) => {
      return userStore.getState().user.id;
    });
    _.update(task, "priority", (value) => {
      return _.lowerCase(task.priority);
    });
    
    const newTask = await apiAddTask(task);
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: async (updatedTask) => {
    const task = await apiUpdateTask(updatedTask);
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)),
    }));
  },
  deleteTask: async (id) => {
    await apiDeleteTask(id);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
}));

export { userStore, taskStore };
