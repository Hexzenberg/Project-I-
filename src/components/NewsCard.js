import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';
import './NewsCard.css';

const NewsCard = ({ article }) => {
    return (
        <Card className="news-card">
            <CardContent>
                <Typography variant="h6" component="h3">
                    <Link href={article.url} target="_blank" rel="noopener" color="primary">
                        {article.title}
                    </Link>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {article.description}
                </Typography>
                <Typography variant="body1" className="sentiment">
                    <strong>Sentiment:</strong> {article.sentiment}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NewsCard;
