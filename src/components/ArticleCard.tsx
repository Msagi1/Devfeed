import React from "react";
import { Article } from "../types";

interface Props {
  article: Article;
  onTagClick?: (tag: string) => void;
  onReadMore?: () => void;
  showReadMore?: boolean;
  darkMode?: boolean;
}

const ArticleCard: React.FC<Props> = ({
  article,
  onTagClick,
  onReadMore,
  showReadMore,
  darkMode = false,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e1e4e8",
        borderRadius: "8px",
        padding: "1.2rem",
        marginBottom: "1.5rem",
        backgroundColor: darkMode ? "#1e1e1e" : "#fff",
        color: darkMode ? "#f5f5f5" : "#000",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      <h2
        style={{ marginBottom: "0.5rem", fontSize: "1.5rem", color: "#0366d6" }}
      >
        {article.title}
      </h2>
      <p
        style={{
          color: "#586069",
          fontSize: "0.95rem",
          marginBottom: "0.5rem",
        }}
      >
        <strong>By:</strong> {article.author}
      </p>
      <p style={{ fontSize: "1rem" }}>{article.summary}</p>
      <p style={{ fontSize: "0.85rem", color: "#6a737d" }}>
        {article.publishedAt}
      </p>

      {Array.isArray(article.tags) && article.tags.length > 0 &&(
        <div style={{ margin: "0.8rem 0 0.2rem" }}>
          {article.tags.map((tag) => (
            <span
              key={tag}
              onClick={() => onTagClick?.(tag)}
              style={{
                backgroundColor: "#f1f8ff",
                borderRadius: "20px",
                padding: "0.3rem 0.75rem",
                marginRight: "0.4rem",
                fontSize: "0.8rem",
                cursor: "pointer",
                color: "#0366d6",
                fontWeight: 500,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {showReadMore && onReadMore ? (
        <button
          onClick={onReadMore}
          style={{
            marginTop: "0.8rem",
            padding: "0.5rem 1rem",
            backgroundColor: darkMode ? "#4a90e2" : "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
              ? "#357ab8"
              : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
              ? "#4a90e2"
              : "#007bff")
          }
        >
          Read More
        </button>
      ) : showReadMore && article.url ? (
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: "0.8rem",
            display: "inline-block",
            padding: "0.5rem 1rem",
            backgroundColor: darkMode ? "#4a90e2" : "#007bff",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
              ? "#357ab8"
              : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
              ? "#4a90e2"
              : "#007bff")
          }
        >
          Read More
        </a>
      ) : null}
    </div>
  );
};

export default ArticleCard;
