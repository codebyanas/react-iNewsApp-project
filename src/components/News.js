import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import LoadingBar from 'react-top-loading-bar';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const pageSize = 6;
  const newsapikey = process.env.REACT_APP_NEWS_API_KEY;

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setLoading(true);
    setLoadingProgress(0);

    const fetchArticles = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${newsapikey}&page=${page}&pageSize=${pageSize}`;
      document.title = `${category ? capitalizedLetter(category) : 'Home'} - iNews App`;

      try {
        setLoadingProgress(50);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('API error');
        }

        const parsedData = await response.json();
        setArticles(parsedData.articles || []);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      } finally {
        setLoadingProgress(100);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchArticles();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [category, newsapikey]); 

  const capitalizedLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const fetchMoreData = async () => {
    setLoadingProgress(50);
    setLoading(true);

    setTimeout(async () => {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${newsapikey}&page=${nextPage}&pageSize=${pageSize}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('API error');
        }

        const parsedData = await response.json();
        setArticles((prevArticles) => [...prevArticles, ...(parsedData.articles || [])]);
        setPage(nextPage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      } finally {
        setLoadingProgress(100);
      }
    }, 1500);
  };

  return (
    <>
      <LoadingBar color="#f11946" progress={loadingProgress} onLoaderFinished={() => setLoadingProgress(0)} />
      <h2 className="container text-center my-4">
        Top {category ? capitalizedLetter(category) : 'News'} Headlines
      </h2>
      <div className="container">
        {loading && <Spinner />}
        {!loading && articles.length === 0 && <div>No articles available.</div>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={loading ? <Spinner /> : null}
        >
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-4" key={article.url}>
                <NewsItem
                  $sourceName={article.source?.name || 'No source name'}
                  $title={article.title?.slice(0, 52) || 'No title available. Click "Read more" to see the full news'}
                  $description={article.description?.slice(0, 110) || 'No description currently available at this time. Click "Read more" to see the full news'}
                  $imageUrl={article.urlToImage || 'https://placehold.co/395x220?text=No+image+to+preview'}
                  $date={article.publishedAt ? new Date(article.publishedAt).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A'}
                  $url={article.url}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
