// ============================================
// File Purpose: TaskTable component that lists tasks with search functionality,
// status tags, deadlines, and action buttons for onboarding tracking.
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

import { useState } from "react";
import Link from "next/link";

type TaskStatus = "Not Started" | "In Progress" | "Complete";

interface Task {
  name: string;
  description: string;
  deadline: string;
  status: TaskStatus;
  link: string;
}

const dummyTasks: Task[] = [
  {
    name: "Upload ID Proofs",
    description: "Upload the ID Proofs in Profile section.",
    deadline: "2024-04-21",
    status: "Not Started",
    link: "/tasks/upload-id-proofs",
  },
  {
    name: "Company Policies",
    description: "Acknowledge the attached documents.",
    deadline: "2024-04-25",
    status: "In Progress",
    link: "/tasks/company-policies",
  },
  {
    name: "Upload Experience Certificate",
    description: "Upload the experience certificates.",
    deadline: "2024-04-27",
    status: "Complete",
    link: "/tasks/experience-certificate",
  },
  {
    name: "Upload Release Documents",
    description: "Upload the release documents.",
    deadline: "2024-04-30",
    status: "Not Started",
    link: "/tasks/release-documents",
  },
];

export function TaskTable() {
  const [search, setSearch] = useState("");

  const filteredTasks = dummyTasks.filter((task) =>
    task.name.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
      <input
        type="text"
        placeholder="Search by Task Name or Description"
        className="w-full mb-4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-purple-400">Item No.</th>
              <th className="py-2 px-4 text-purple-400">Task Name</th>
              <th className="py-2 px-4 text-purple-400">Description</th>
              <th className="py-2 px-4 text-purple-400">Deadline</th>
              <th className="py-2 px-4 text-purple-400">Status</th>
              <th className="py-2 px-4 text-purple-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/60">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">{task.name}</td>
                <td className="py-2 px-4">{task.description}</td>
                <td className="py-2 px-4">{task.deadline}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                      ${
                        task.status === "Complete"
                          ? "bg-green-700 text-green-200"
                          : task.status === "In Progress"
                          ? "bg-yellow-700 text-yellow-200"
                          : "bg-gray-700 text-gray-300"
                      }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <Link
                    href={task.link}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-md"
                  >
                    {task.status === "Complete" ? "View" : "Complete"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
