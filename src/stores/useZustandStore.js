import {create} from 'zustand';

const useZustandStore = create((set) => ({
  tasks: [
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'NORMAL' },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'HIGH' },
    { id: 3, title: 'Task 3', description: 'Description 3', priority: 'DONE' },
  ],
  isModalOpen: false,
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  updateTaskPriority: (id, newPriority) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      ),
    })),
  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      ),
    })),
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: Date.now() }],
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));

export { useZustandStore };
