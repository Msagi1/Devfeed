import React from "react";

import { Article } from "../types";

interface Props {
    article: Article
}

const ArticleCard: React.FC<Props> = ({ article }) => {
    return (
      <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
        <h2>{article.title}</h2>
        <p>{article.summary}</p>
        <p><strong>By:</strong> {article.author}</p>
        <p><small>{article.publishedAt}</small></p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read More
        </a>
      </div>
    );
  };


export default ArticleCard;