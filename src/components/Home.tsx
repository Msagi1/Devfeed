import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import TagFilterBar from "./TagFilterBar";
import { Article } from "../types";
import { useNavigate } from "react-router-dom";

function Home({ darkMode }: { darkMode: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dev.to/api/articles?per_page=20")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((a: any) => ({
          id: a.id,
          title: a.title,
          summary: a.description,
          url: a.url,
          publishedAt: new Date(a.published_at).toLocaleDateString(),
          tags: a.tags || [],
          author: a.user.name,
        }));
        setArticles(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load articles", err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading articles...</p>;
  }
  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag ? article.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const allTags = [
    ...new Set(articles.flatMap((article) => article.tags || [])),
  ];

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          textAlign: "center",
          color: "#0366d6",
          letterSpacing: "-0.5px",
        }}
      >
        Dev<span style={{ color: "#e36209" }}>Feed</span>
        <p style={{ fontSize: "1rem", color: "#586069", marginTop: "0.5rem" }}>
          Curated developer news, blogs & tutorials 🚀
        </p>
      </h1>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="🔍 Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.7rem 1rem",
            width: "100%",
            maxWidth: "400px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            outline: "none",
          }}
        />
      </div>

      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
          justifyContent: "center",
        }}
      >
        <TagFilterBar
          tags={allTags}
          selectedTag={selectedTag}
          onTagClick={(tag) => setSelectedTag(tag || null)}
        />
      </div>

      {articles.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>
          Loading articles...
        </p>
      ) : filteredArticles.length > 0 ? (
        paginatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onReadMore={() => navigate(`/article/${article.id}`)}
            showReadMore={true}
            darkMode={darkMode}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>No results found</p>
      )}

      {selectedTag && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            onClick={() => setSelectedTag(null)}
            style={{
              padding: "0.5rem 1rem",
              border: "none",
              backgroundColor: "#e74c3c",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#c0392b")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#e74c3c")
            }
          >
            ✖ Clear Tag Filter
          </button>
        </div>
      )}
      <p style={{ textAlign: "center", color: "#666", marginBottom: "1rem" }}>
        Page {currentPage} of{" "}
        {Math.ceil(filteredArticles.length / articlesPerPage)}
      </p>
      <div
  style={{
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  }}
>
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((p) => p - 1)}
    style={{
      padding: "0.6rem 1.2rem",
      border: "none",
      borderRadius: "6px",
      backgroundColor: currentPage === 1 ? "#ccc" : "#0366d6",
      color: "#fff",
      cursor: currentPage === 1 ? "not-allowed" : "pointer",
      fontWeight: "bold",
      transition: "background 0.3s ease",
    }}
  >
    ← Previous
  </button>

  <button
    disabled={endIndex >= filteredArticles.length}
    onClick={() => setCurrentPage((p) => p + 1)}
    style={{
      padding: "0.6rem 1.2rem",
      border: "none",
      borderRadius: "6px",
      backgroundColor:
        endIndex >= filteredArticles.length ? "#ccc" : "#0366d6",
      color: "#fff",
      cursor: endIndex >= filteredArticles.length ? "not-allowed" : "pointer",
      fontWeight: "bold",
      transition: "background 0.3s ease",
    }}
  >
    Next →
  </button>
</div>

      <footer
        style={{
          textAlign: "center",
          fontSize: "0.9rem",
          padding: "1rem",
          marginTop: "2rem",
          color: darkMode ? "#aaa" : "#555",
        }}
      >
        Made by Manjusha Sagi · © 2025
      </footer>
    </div>
  );
}

export default Home;
