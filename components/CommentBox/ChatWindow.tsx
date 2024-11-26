// ChatWindow.tsx
'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommentsTab from './CommentsTab';
import AIAssistantTab from './AIAssistantTab';
import FactCheckerTab from './FactCheckerTab';

enum Tab {
  COMMENTS = 'COMMENTS',
  AI_ASSISTANT = 'AI_ASSISTANT',
  FACT_CHECKER = 'FACT_CHECKER',
}

export default function ChatWindow({ slug, email }: { slug: string; email: string | null }) {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.COMMENTS);

  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 max-w-lg mx-auto rounded-lg shadow-lg">
      <ToastContainer />

      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleTabChange(Tab.COMMENTS)}
          className={`px-4 py-2 ${selectedTab === Tab.COMMENTS ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg mx-1`}
        >
          Comments
        </button>
        <button
          onClick={() => handleTabChange(Tab.AI_ASSISTANT)}
          className={`px-4 py-2 ${selectedTab === Tab.AI_ASSISTANT ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg mx-1`}
        >
          AI Assistant
        </button>
        <button
          onClick={() => handleTabChange(Tab.FACT_CHECKER)}
          className={`px-4 py-2 ${selectedTab === Tab.FACT_CHECKER ? 'bg-blue-500' : 'bg-gray-700'} text-white rounded-lg mx-1`}
        >
          Fact Checker
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedTab === Tab.COMMENTS && <CommentsTab slug={slug} email={email} />}
        {selectedTab === Tab.AI_ASSISTANT && <AIAssistantTab />}
        {selectedTab === Tab.FACT_CHECKER && <FactCheckerTab />}
      </div>
    </div>
  );
}
