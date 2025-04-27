// ============================================
// File Purpose: Admin Student Table to view student deliverables (NDA, ICA, Resume)
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/27/2025
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FiDownload, FiLoader } from 'react-icons/fi';

interface Student {
  name: string;
  email: string;
  ndaFileUrl: string | null;
  icaFileUrl: string | null;
  resumeFileUrl: string | null;
}

export function AdminStudentTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState('');
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/students');
        const data = await res.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error('Failed to load students:', error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (url: string) => {
    setModalUrl(url);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md">
        <input
          type="text"
          placeholder="Search students by name or email..."
          className="w-full mb-4 px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-purple-400">Name</th>
                <th className="py-2 px-4 text-purple-400">Email</th>
                <th className="py-2 px-4 text-purple-400">NDA</th>
                <th className="py-2 px-4 text-purple-400">ICA</th>
                <th className="py-2 px-4 text-purple-400">Resume</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.email} className="border-b border-gray-800 hover:bg-gray-800/60">
                  <td className="py-2 px-4">{student.name}</td>
                  <td className="py-2 px-4">{student.email}</td>
                  {/* NDA */}
                  <td className="py-2 px-4">
                    {student.ndaFileUrl ? (
                      <button
                        onClick={() => handleView(student.ndaFileUrl!)}
                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-md transition-all"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Not Uploaded</span>
                    )}
                  </td>
                  {/* ICA */}
                  <td className="py-2 px-4">
                    {student.icaFileUrl ? (
                      <button
                        onClick={() => handleView(student.icaFileUrl!)}
                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-md transition-all"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Not Uploaded</span>
                    )}
                  </td>
                  {/* Resume */}
                  <td className="py-2 px-4">
                    {student.resumeFileUrl ? (
                      <button
                        onClick={() => handleView(student.resumeFileUrl!)}
                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded-md transition-all"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Not Uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Panel className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-4xl">
            <Dialog.Title className="text-white text-xl font-semibold mb-4">
              Document Preview
            </Dialog.Title>
            <div className="bg-gray-800 rounded-lg p-4 min-h-[500px] flex items-center justify-center">
              {isLoading ? (
                <FiLoader className="animate-spin text-purple-400 text-4xl" />
              ) : modalUrl ? (
                <iframe
                  src={modalUrl}
                  className="w-full h-[600px] rounded-md"
                />
              ) : (
                <p className="text-gray-400">No document found.</p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              {modalUrl && (
                <a
                  href={modalUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-md text-sm flex items-center gap-2 transition-all"
                >
                  <FiDownload /> Download Document
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
