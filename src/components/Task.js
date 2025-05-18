import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import _ from "lodash";
import FormTask from "./FormTask";

import { taskStore } from "@/stores/dataStore";
import { modalStore } from "@/stores/providerStore";

const Task = (data) => {
  const updateTaskStore = taskStore((state) => state.updateTask);
  const openModal = modalStore((state) => state.show);

  const bgcolor = {
    normal: "#4098ea",
    high: "#fd6e41",
    done: "#02af3b",
  };

  const handleCheckClick = (e) => {
    e.stopPropagation();
    if (data.priority === "done") {
      updateTaskStore({
        ...data,
        priority: "normal",
      });
    } else {
      updateTaskStore({
        ...data,
        priority: "done",
      });
    }
  };

  const handleOpenModal = () => {
    openModal({
      title: "Edit Task",
      content: <FormTask mode="edit" taskData={data} onSubmit={() => modalStore.getState().hide()} />,
    });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: bgcolor[data.priority],
        }}
        className={`relative p-4 transition-colors duration-150 border border-gray-300 cursor-pointer hover:bg-gray-100 rounded-lg mb-2`}
        onClick={handleOpenModal}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <p className="text-xs text-white">{_.upperCase(data.priority)} PRIORITY</p>{" "}
            {/* Priority */}
            <p className="font-mono font-bold text-md text-white">{data.title}</p>{" "}
            {/* Title */}
            <p className="text-xs text-white">{data.description}</p>{" "}
            {/* Description */}
          </div>
          <div className="col-span-2 flex justify-end items-start mt-4 space-x-2">
            {data.priority === "done" ? (
              <button
                type="button"
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Mark task as done"
                onClick={handleCheckClick}
              >
                <IconCheck className="w-4 h-4 text-green-500" />
              </button>
            ) : (
              <button
                type="button"
                className="w-6 h-6 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Mark task as todo"
                onClick={handleCheckClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
