'use client';

import { useEffect, useState } from 'react';

// Define the type for each comment
type Comment = {
  id: number;
  author: string;
  text: string;
  createdAt: string;
  replies: Comment[];
};

// Function to format the date object into a human-readable string
const formatDate = (createdAt: any): string => {
  const { day, month, year, hour, minute, second } = createdAt;
  return `${year.low}-${month.low}-${day.low} ${hour.low}:${minute.low}:${second.low}`;
};

// Recursive function to build the comment structure
const convertComments = (array: any[]): Comment[] => {
  const commentMap: { [key: string]: Comment } = {};
  const topLevelComments: Comment[] = [];

  array.forEach((item, index) => {
    const comment: Comment = {
      id: item.id,
      author: item.author,
      text: item.text,
      createdAt: formatDate(item.createdAt),
      replies: []
    };

    commentMap[item.id] = comment;

    if (item.parentId) {
      // This is a reply, push it to the parent comment's replies
      commentMap[item.parentId]?.replies.push(comment);
    } else {
      // Top-level comment
      topLevelComments.push(comment);
    }
  });

  return topLevelComments;
};



// Truncate text to show only the first 3-4 words
const truncateText = (text: string, wordLimit: number = 3) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
};

const initialComments: Comment[] = [
  {
    id: 1,
    author: 'User 1',
    text: 'Olive Garden isn’t authentic, and it’s also not what a lot of us grew up eating. So we don’t like it. Would I eat Gordon Ramsey’s carbonara? Absolutely!',
    createdAt: '5d ago',
    replies: [
      {
        id: 11,
        author: 'User 2',
        text: 'I agree! There’s a difference between what we ate growing up and “authentic” food.',
        createdAt: '4d ago',
        replies: [
          {
            id: 12,
            author: 'User 3',
            text: 'Authentic is subjective. It depends on how you define it.',
            createdAt: '3d ago',
            replies: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    author: 'User 5',
    text: 'Here’s another comment I made! What do you think about Taco Bell’s Mexican food?',
    createdAt: '2d ago',
    replies: [
      {
        id: 21,
        author: 'User 4',
        text: 'I think Taco Bell is great for what it is. Not authentic but tasty.',
        createdAt: '1d ago',
        replies: [],
      },
      {
        id: 22,
        author: 'User 5',
        text: 'Taco Bell is fast food. Comparing it to “authentic” Mexican food isn’t fair.',
        createdAt: '1d ago',
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: 'User 6',
    text: 'I think food authenticity is overrated. Eat what you enjoy!',
    createdAt: '1d ago',
    replies: [],
  },
];

export default function ChatWindow({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyView, setReplyView] = useState<Comment | null>(null); // Track if a reply view is open
  const [breadcrumb, setBreadcrumb] = useState<Comment[]>([]);
  const [isParentCollapsed, setIsParentCollapsed] = useState<boolean>(true); // Track if the parent comment is collapsed
  const [loading, setLoading] = useState(true); // Loading state for the data

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true); // Start loading
        const response = await fetch(`/api/comments/${slug}`); // Fetch data from API route
        const data = await response.json();
        if (response.ok) {
          setComments(convertComments(data)); // Set the fetched comments
        } else {
          console.error('Error fetching comments:', data.error);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    }

    fetchData();
  }, [slug]);


  // Handle opening replies for a comment
  const handleViewReplies = (comment: Comment) => {
    setBreadcrumb([...breadcrumb, comment]); // Add the clicked comment to the breadcrumb
    setReplyView(comment); // Show replies for the clicked comment
    setIsParentCollapsed(true); // Default to collapsed when a reply is opened
  };

  // Handle breadcrumb click to navigate back to a specific level
  const handleBreadcrumbClick = (index: number) => {
    const updatedBreadcrumbs = breadcrumb.slice(0, index); // Only keep the breadcrumbs up to the clicked level
    if (index === 0) {
      setReplyView(null); // Go back to the top-level comments if the first breadcrumb is clicked
      setBreadcrumb([]);  // Remove the entire breadcrumb since it's the top layer
    } else {
      const selectedComment = updatedBreadcrumbs[index-1];
      console.log(selectedComment)
      setBreadcrumb(updatedBreadcrumbs); // Update the breadcrumb state
      setReplyView(selectedComment); // Show replies for the selected breadcrumb
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 max-w-lg mx-auto rounded-lg shadow-lg">
      {/* Chat window with fixed height */}
      <div className="flex flex-col h-[500px]"> {/* Fixed height of 500px */}
        
        {/* Breadcrumb Navigation */}
        {breadcrumb.length > 0 && (
          <div className="p-2 bg-gray-800 text-gray-300 rounded-md mb-4">
            {breadcrumb.map((crumb, idx) => (
              <span
                key={crumb.id}
                onClick={() => handleBreadcrumbClick(idx)}
                className="text-blue-500 cursor-pointer"
              >
                {truncateText(crumb.text)} {idx < breadcrumb.length - 1 && '>'} {/* Breadcrumb separator */}
              </span>
            ))}
          </div>
        )}

        {/* Show parent comment at the top when viewing replies */}
        {replyView && (
          <div className="mb-4 p-2 bg-gray-800 text-gray-300 rounded-lg shadow-lg text-sm">
            <div className="flex justify-between items-center">
              <div className="font-bold">{replyView.author}</div>
              <button
                className="text-xs text-blue-400"
                onClick={() => setIsParentCollapsed(!isParentCollapsed)}
              >
                {isParentCollapsed ? 'Expand' : 'Collapse'}
              </button>
            </div>
            <div className="text-xs text-gray-500">{replyView.createdAt}</div>

            {/* Collapsible comment text */}
            <div className="my-2">
              {isParentCollapsed
                ? truncateText(replyView.text, 10) // Show only first 10 words when collapsed
                : replyView.text}
            </div>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {(replyView ? replyView.replies : comments).map((comment) => (
            <div
              key={comment.id}
              className={`mb-4 p-4 rounded-lg shadow-lg ${'bg-gray-800 text-gray-300'}`}
              >
              {replyView && (
                <div className="text-sm text-gray-400 mb-2">
                  Replying to: {replyView.author}
                </div>
              )}
              <div className="font-bold mb-1">{comment.author}</div>
              <div className="text-sm text-gray-500">{comment.createdAt}</div>
              <div className="my-2">{comment.text}</div>
              
              {/* Show the number of replies */}
              {comment.replies.length > 0 && (
                <button onClick={() => handleViewReplies(comment)} className="text-blue-400 text-sm">
                  {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add new comment or reply */}
        <div className="border-t border-gray-700 p-2 flex bg-gray-800 rounded-lg mt-4">
          <input
            type="text"
            className="flex-1 bg-gray-900 text-white border-none rounded p-2 outline-none"
            placeholder={replyView ? 'Reply to comment...' : 'Add a comment...'}
          />
          <button className="bg-blue-500 text-white rounded px-4 ml-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
