// ============================================
// File Purpose: TaskTable component with dynamic tasks, search, status updates, special redirects, and NDA preview modal
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { FiLoader, FiDownload } from 'react-icons/fi';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ndaFileUrl, setNdaFileUrl] = useState<string | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

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

      setRows((prev) =>
        prev.map((t) =>
          t.name === taskName ? { ...t, status: 'In Progress' } : t
        )
      );

      if (taskName === 'Update Personal Information') {
        router.push('/account');
        return;
      }

      if (taskName === 'Upload NDA Agreement') {
        router.push('/NDAForm');
        return;
      }
    } catch (error) {
      console.error('Failed to update task status:', error);
      alert('Failed to mark task in progress.');
    } finally {
      setLoadingMap((prev) => ({ ...prev, [taskName]: false }));
    }
  };

  const handleView = async (taskName: string) => {
    if (taskName === 'Upload NDA Agreement') {
      setIsPreviewLoading(true);
      setIsModalOpen(true);
      try {
        const res = await fetch('/api/account/profile');
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (data?.ndaFileUrl) {
          setNdaFileUrl(data.ndaFileUrl);
        } else {
          setNdaFileUrl(null);
        }
      } catch (error) {
        console.error('Failed to fetch NDA document:', error);
        setNdaFileUrl(null);
      } finally {
        setIsPreviewLoading(false);
      }
    } else {
      const link = `/tasks/${slugify(taskName)}`;
      router.push(link);
    }
  };

  return (
    <>
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
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'Completed'
                            ? 'bg-green-700 text-green-200'
                            : task.status === 'In Progress'
                            ? 'bg-yellow-700 text-yellow-200'
                            : 'bg-gray-700 text-gray-300'
                        }`}
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
                        <button
                          onClick={() => handleView(task.name)}
                          className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-md transition-all"
                        >
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-4xl">
            <Dialog.Title className="text-white text-xl font-semibold mb-4">
              NDA Preview
            </Dialog.Title>
            <div className="bg-gray-800 rounded-lg p-4 min-h-[500px] flex items-center justify-center">
              {isPreviewLoading ? (
                <FiLoader className="animate-spin text-purple-400 text-4xl" />
              ) : ndaFileUrl ? (
                <iframe
                  src={ndaFileUrl}
                  className="w-full h-[600px] rounded-md"
                />
              ) : (
                <p className="text-gray-400">No NDA document found.</p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              {ndaFileUrl && (
                <a
                  href={ndaFileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2 transition-all"
                >
                  <FiDownload /> Download NDA
                </a>
              )}
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-md text-sm transition-all"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}