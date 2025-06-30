import React from "react";

function ArticleCard({title, author, url}){
    return (
        <div style={styles.card}>
            <h3>{title}</h3>
            <p>By: {author}</p>
            <a href={url} target="_blank" rel="noopener noreferrer">Read More</a>
        </div>
    );
}

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#fafafa',
    }
}


export default ArticleCard;