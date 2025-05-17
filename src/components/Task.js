import { useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";
import _ from "lodash";
import FormTask from "./FormTask";

import { useZustandStore } from "../stores/useZustandStore";
import { useModalStore } from "../stores/useModalStore";

const Task = (data) => {
  const updateTaskPriority = useZustandStore((state) => state.updateTaskPriority);
  const openModal = useModalStore((state) => state.show);

  const bgcolor = {
    NORMAL: "#4098ea",
    HIGH: "#fd6e41",
    DONE: "#02af3b",
  };

  const handleCheckClick = (e) => {
    e.stopPropagation();
    if (data.priority === "DONE") {
      updateTaskPriority(data.id, "NORMAL");
    } else {
      updateTaskPriority(data.id, "DONE");
    }
  };

  const handleOpenModal = () => {
    openModal({
      title: "Edit Task",
      content: <FormTask mode="edit" taskData={data} onSubmit={() => useModalStore.getState().hide()} />,
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
            <p className="text-xs text-white">{data.priority}</p>{" "}
            {/* Priority */}
            <p className="font-mono font-bold text-md text-white">{data.title}</p>{" "}
            {/* Title */}
            <p className="text-xs text-white">{data.description}</p>{" "}
            {/* Description */}
          </div>
          <div className="col-span-2 flex justify-end items-start mt-4 space-x-2">
            {data.priority === "DONE" ? (
              <button
                type="button"
                className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-label="Mark task as done"
                onClick={handleCheckClick}
              >
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
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
