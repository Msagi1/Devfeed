import React from "react";
import ArticleCard from "./components/ArticleCard";
import { articles } from "./mockData";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article}/>
      ))}
    </div>
  );
}

export default App;
