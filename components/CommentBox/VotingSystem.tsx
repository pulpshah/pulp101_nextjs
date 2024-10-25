'use client';

import { debounce } from '@/lib/utils';
import { useState, useEffect } from 'react';

type VoteState = 'default' | 'invalid-1' | 'invalid-2' | 'invalid-3' | 'abstain' | 'valid-1' | 'valid-2' | 'valid-3';

export default function VotingSystem({ email, commentId }: { email: string | null, commentId: string }) {
  const [voteState, setVoteState] = useState<VoteState>('default');

  const getVoteLevel = (state: VoteState): number | null => {
    switch (state) {
      case 'valid-1': return 1;
      case 'valid-2': return 2;
      case 'valid-3': return 3;
      case 'invalid-1': return -1;
      case 'invalid-2': return -2;
      case 'invalid-3': return -3;
      case 'abstain': return 0;
      default: return null;
    }
  };

  const handleVoteChange = debounce(async (state: VoteState) => {
    if (!email) {
      alert('You need to be logged in to vote.');
      return;
    }

    const level = getVoteLevel(state);

    try {
      if (level === null) {
        // Remove vote if going back to "default"
        await fetch('/api/removeVote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, commentId }),
        });
      } else {
        // Otherwise, set the vote level, including abstain (0)
        await fetch('/api/vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, commentId, level }),
        });
      }
    } catch (error) {
      console.error('Failed to submit vote:', error);
    }
  }, 1000);

  // Use `useEffect` to trigger handleVoteChange with the latest voteState
  useEffect(() => {
    handleVoteChange(voteState);
  }, [voteState]);

  const handleValidClick = () => {
    setVoteState((prev) => {
      switch (prev) {
        case 'valid-1': return 'valid-2';
        case 'valid-2': return 'valid-3';
        case 'valid-3': return 'default';
        default: return 'valid-1';
      }
    });
  };

  const handleInvalidClick = () => {
    setVoteState((prev) => {
      switch (prev) {
        case 'invalid-1': return 'invalid-2';
        case 'invalid-2': return 'invalid-3';
        case 'invalid-3': return 'default';
        default: return 'invalid-1';
      }
    });
  };

  const handleAbstainClick = () => {
    setVoteState((prev) => (prev === 'abstain' ? 'default' : 'abstain'));
  };

  const getTopColor = () => (['valid-1', 'valid-2', 'valid-3'].includes(voteState) ? 'bg-green-300' : voteState === 'invalid-3' ? 'bg-red-700' : 'bg-gray-700');
  const getMiddleColor = () => (voteState === 'abstain' ? 'bg-gray-700 relative' : ['valid-2', 'valid-3'].includes(voteState) ? 'bg-green-500' : ['invalid-2', 'invalid-3'].includes(voteState) ? 'bg-red-500' : 'bg-gray-700');
  const getBottomColor = () => (voteState === 'valid-3' ? 'bg-green-700' : ['invalid-1', 'invalid-2', 'invalid-3'].includes(voteState) ? 'bg-red-300' : 'bg-gray-700');

  return (
    <div className="flex flex-col items-center space-y-0">
      {/* Top section */}
      <div className={`w-4 h-10 border border-gray-500 border-b-0 cursor-pointer ${getTopColor()} rounded-t`} onClick={handleValidClick}></div>

      {/* Middle section with only left and right borders */}
      <div className={`w-4 h-10 border-l border-r border-gray-500 cursor-pointer ${getMiddleColor()}`} onClick={handleAbstainClick}>
        {voteState === 'abstain' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        )}
      </div>

      {/* Bottom section */}
      <div className={`w-4 h-10 border border-gray-500 border-t-0 cursor-pointer ${getBottomColor()} rounded-b`} onClick={handleInvalidClick}></div>
    </div>
  );
}
