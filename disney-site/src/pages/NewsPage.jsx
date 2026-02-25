import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import articles from '../data/newsArticles.json';
import styles from './NewsPage.module.css';

const STATUS_FILTERS = ['all', 'new', 'dismissed', 'incorporated'];
const SOURCE_FILTERS = ['all', 'DFB', 'AllEars', 'BlogMickey', 'DTB', 'TouringPlans'];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function NewsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() =>
    articles.filter(a =>
      (statusFilter === 'all' || a.status === statusFilter) &&
      (sourceFilter === 'all' || a.source === sourceFilter)
    ), [statusFilter, sourceFilter]);

  const counts = useMemo(() => {
    const c = { all: articles.length, new: 0, dismissed: 0, incorporated: 0 };
    articles.forEach(a => { if (c[a.status] !== undefined) c[a.status]++; });
    return c;
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <Link to="/" className={styles.backLink}>&larr; Back to Home</Link>

        <div className={styles.header}>
          <h1>Disney News Staging</h1>
          <p>{articles.length} articles from {SOURCE_FILTERS.length - 1} sources</p>
        </div>

        <div className={styles.filters}>
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${statusFilter === s ? styles.filterBtnActive : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
              <span className={styles.countBadge}>({counts[s]})</span>
            </button>
          ))}
          <div className={styles.filterSep} />
          {SOURCE_FILTERS.map(s => (
            <button
              key={s}
              className={`${styles.filterBtn} ${styles.sourceBtn} ${sourceFilter === s ? styles.sourceBtnActive : ''}`}
              onClick={() => setSourceFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className={styles.articles}>
          {filtered.length === 0 && (
            <div className={styles.emptyState}>No articles match this filter.</div>
          )}
          {filtered.map(article => {
            const isExpanded = expandedId === article.id;
            return (
              <div
                key={article.id}
                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                onClick={() => setExpandedId(isExpanded ? null : article.id)}
              >
                {article.imageUrl && (
                  <img
                    className={styles.cardImage}
                    src={article.imageUrl}
                    alt=""
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={`${styles.sourceBadge} ${styles['source' + article.source] || ''}`}>
                      {article.source}
                    </span>
                    <span className={`${styles.statusDot} ${styles['status' + article.status.charAt(0).toUpperCase() + article.status.slice(1)]}`} />
                    <span className={styles.cardDate}>{formatDate(article.pubDate)}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{article.title}</h3>
                  {!isExpanded && <p className={styles.cardDesc}>{article.description}</p>}
                  {isExpanded && (
                    <div className={styles.expandedContent}>
                      <p className={styles.snippet}>
                        {article.contentSnippet || article.description}
                      </p>
                      {article.categories.length > 0 && (
                        <div className={styles.cardCategories}>
                          {article.categories.map(cat => (
                            <span key={cat} className={styles.catTag}>{cat}</span>
                          ))}
                        </div>
                      )}
                      <a
                        className={styles.openLink}
                        href={article.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                      >
                        Read Full Article &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
