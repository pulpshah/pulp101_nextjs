// ============================================
// File Purpose: TaskTable component with dynamic tasks, search, status updates, and special redirect
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// This Update On: 04/27/2025
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Task {
  name: string;
  description: string;
  deadline: string;
  status: TaskStatus;
}

interface TaskTableProps {
  tasks: Task[];
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export function TaskTable({ tasks }: TaskTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<Task[]>(tasks);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const filteredTasks = useMemo(
    () =>
      rows.filter((task) => {
        const q = search.toLowerCase();
        return (
          task.name.toLowerCase().includes(q) ||
          task.description.toLowerCase().includes(q)
        );
      }),
    [search, rows]
  );

  const handleComplete = async (taskName: string) => {
    setLoadingMap((prev) => ({ ...prev, [taskName]: true }));
    try {
      const res = await fetch('/api/tasks/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, status: 'In Progress' }),
      });
      if (!res.ok) throw new Error(await res.text());

      // Update local state
      setRows((prev) =>
        prev.map((t) =>
          t.name === taskName ? { ...t, status: 'In Progress' } : t
        )
      );

      // Redirect for the personal info task
      if (taskName === 'Update Personal Information') {
        router.push('/account');
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
      alert('Failed to mark task in progress.');
    } finally {
      setLoadingMap((prev) => ({ ...prev, [taskName]: false }));
    }
  };

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
            {filteredTasks.map((task, i) => {
              const link = `/tasks/${slugify(task.name)}`;
              const isLoading = loadingMap[task.name];
              return (
                <tr
                  key={task.name}
                  className="border-b border-gray-800 hover:bg-gray-800/60"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{task.name}</td>
                  <td className="py-2 px-4">{task.description}</td>
                  <td className="py-2 px-4">{task.deadline}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          task.status === 'Completed'
                            ? 'bg-green-700 text-green-200'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-700 text-yellow-200'
                            : 'bg-gray-700 text-gray-300'
                        }`
                    }
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    {task.status !== 'Completed' ? (
                      <button
                        onClick={() => handleComplete(task.name)}
                        disabled={isLoading}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-md transition-all disabled:opacity-50"
                      >
                        {isLoading ? 'Updating...' : 'Complete'}
                      </button>
                    ) : (
                      <Link
                        href={link}
                        className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-md transition-all"
                      >
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
