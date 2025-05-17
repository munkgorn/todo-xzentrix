import { Grid, Title, Divider } from "@mantine/core";
import Task from "./Task";
import _ from "lodash";
import { useZustandStore } from "../stores/useZustandStore";

const Tasks = ({ title, priorities }) => {
  const tasks = useZustandStore((state) => state.tasks);

  const filteredTasks = _.orderBy(
    _.filter(tasks, (task) => _.includes(priorities, task.priority)),
    ["priority"],
    ["asc"]
  );

  return (
    <div className="mb-4">
      <div className="flex justify-center">
        <h3 className="text-lg font-semibold mb-0">{title || "TASKS"}</h3>
      </div>
      <div className="px-4">
        {_.map(filteredTasks, (task) => (
          <Task key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
