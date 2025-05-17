import dayjs from "dayjs";
import { IconCirclePlusFilled } from "@tabler/icons-react";
import FormTask from "./FormTask";

import { useModalStore } from "../stores/useModalStore";

const Header = () => {
  const openModal = useModalStore((state) => state.show);

  const handleNewTaskClick = () => {
    openModal({
      title: "New Task",
      content: <FormTask mode="add" onSubmit={() => useModalStore.getState().hide()} />,
    });
  };

  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-2">
        <h1 className="text-3xl font-bold">{dayjs().format("D")}</h1>
        <div>
          <p className="text-xs">
            {dayjs().format("dddd")}
            <br />
            {dayjs().format("MMM YYYY")}
          </p>
        </div>
      </div>
      <button
        className="flex items-center text-black text-sm p-0 mr-2 bg-transparent cursor-pointer"
        onClick={handleNewTaskClick}
      >
        <IconCirclePlusFilled size={24} className="mr-1 text-[#e346ef]" />
        <span className="font-bold">NEW TASK</span>
      </button>
    </div>
  );
};

export default Header;
