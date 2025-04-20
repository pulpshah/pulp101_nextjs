// ============================================
// File Purpose: Render a list of styled tags (used for interests/personality)
// Original Author: Mohammed Ihtisham
// Last Updated By: Mohammed Ihtisham
// Last Updated On: 04/20/2025
// ============================================

'use client';

interface TagListProps {
  tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-orange-100 text-orange-700 text-xs font-medium px-3 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default TagList;
