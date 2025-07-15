import React from "react";

interface TagFilterBarProps {
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string) => void;
}

const TagFilterBar: React.FC<TagFilterBarProps> = ({
  tags,
  selectedTag,
  onTagClick,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag === selectedTag ? "" : tag)}
          style={{
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "999px",
            border: "1px solid #ccc",
            backgroundColor: tag === selectedTag ? "#000" : "#f0f0f0",
            color: tag === selectedTag ? "#fff" : "#333",
            cursor: "pointer",
          }}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
};

export default TagFilterBar;
