export function TaskChecklist({
    tasks,
  }: {
    tasks: { label: string; completed: boolean }[];
  }) {
    return (
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
        <h3 className="text-xl font-bold mb-4">Task Checklist</h3>
        <ul className="space-y-3">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="form-checkbox h-4 w-4 text-purple-600"
              />
              <span className={`ml-3 text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  