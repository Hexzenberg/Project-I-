import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, CircularProgress, Typography, Grid } from '@mui/material';
import NewsCard from './NewsCard';
import './NewsFetcher.css';

const NewsFetcher = () => {
    const [query, setQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    // Fetch news from Flask API
    const fetchNews = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://projectiapi-production.up.railway.app/get_news_with_sentiment',
                { query },
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Filter out articles with '[Removed]' in title or description
            const filteredNews = response.data.filter(article =>
                !article.title.includes('[Removed]') ||
                !article.description.includes('[Removed]')
            );

            setNews(filteredNews);
            setCurrentPage(1); // Reset to page 1 when new search is made
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Failed to fetch news.');
        } finally {
            setLoading(false);
        }
    };

    // Calculate pagination
    const totalPages = Math.ceil(news.length / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <Container className="container">
            <Typography variant="h3" align="center" gutterBottom className="news-fetcher">
                Search For a Topic
            </Typography>
            <div className='same-level'>
                <TextField
                    variant="outlined"
                    label="Enter news topic"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    fullWidth
                    className="input-field"
                    style={{ width: '50%' }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={fetchNews}
                    className="fetch-button"
                >
                    Get News
                </Button>
            </div>

            {loading && <CircularProgress style={{ display: 'block', margin: '20px auto' }} />}
            {error && <Typography color="error" align="center">{error}</Typography>}

            <Grid container spacing={3} style={{ marginTop: '20px' }}>
                {currentArticles.map((article, index) => (
                    <NewsCard key={index} article={article} />
                ))}
            </Grid>

            {/* Pagination controls */}
            {news.length > articlesPerPage && (
                <div className="pagination">
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </Button>

                    <Typography variant="body2" component="span" style={{ margin: '0 10px' }}>
                        Page {currentPage} of {totalPages}
                    </Typography>

                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default NewsFetcher;
