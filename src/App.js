import React from "react";
import ArticleCard from "./components/ArticleCard";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>DevFeed</h1>
      <p>Welcome to your first React app!</p>
      <ArticleCard
        title="10 React Tricks You Didn't Know"
        author="Jane Doe"
        url="https://dev.to/janedoe/react-tricks"
      />
      <ArticleCard
        title="How to Use useEffect Properly"
        author="John Smith"
        url="https://dev.to/johnsmith/useeffect-guide"
      />
    </div>
  );
}

export default App;
