import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Article } from "../types";

function ArticlePage({ darkMode }: { darkMode: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const transformed = {
          id: data.id,
          title: data.title,
          summary: data.description,
          url: data.url,
          publishedAt: new Date(data.published_at).toLocaleDateString(),
          tags: typeof data.tags === "string" ? data.tags.split(",").map((t: string) => t.trim()) : [],
          author: data.user.name,
          content: data.body_html,
        };
        setLoading(false);        
        setArticle(transformed);
      });
  }, [id]);

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading article...</p>;
  }
  if (!article) {
    return <p style={{ padding: "2rem" }}>Article not found.</p>;
  }

  return (
    <div style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#f5f5f5" : "#333",
        minHeight: "100vh",
      }}>
      <div
        style={{
            backgroundColor: darkMode ? "#1e1e1e" : "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 0 12px rgba(0,0,0,0.1)",
          }}
      >
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>{article.title}</h1>
        <p style={{ color: "#666", marginTop: "0.5rem" }}>
          <strong>By:</strong> {article.author} ·{" "}
          <small>{article.publishedAt}</small>
        </p>

        {article.tags && (
          <div style={{ margin: "1.5rem 0" }}>
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: "#e0f0ff",
                  color: "#0366d6",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "20px",
                  marginRight: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: "500",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginTop: "1.5rem",
          }}
        >
            {article.content && (
  <div dangerouslySetInnerHTML={{ __html: article.content }} />
)}
        </p>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            marginTop: "2rem",
            padding: "0.7rem 1.4rem",
            backgroundColor: darkMode ? "#80bfff" : "#007bff",
            color: darkMode ? "#000" : "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
                ? "#66aaff"
                : "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = darkMode
                ? "#80bfff"
                : "#007bff")
          }
        >
          Read Full Article ↗
        </a>

        <div style={{ marginTop: "2rem" }}>
          <a
            href="/"
            style={{
                color: darkMode ? "#ccc" : "#444",
                textDecoration: "none",
                fontWeight: "bold",
            }}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
export default ArticlePage;
