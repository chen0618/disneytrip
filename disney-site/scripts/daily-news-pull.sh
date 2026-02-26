#!/bin/bash
# Daily Disney news scraper — runs via cron
# Scrapes RSS feeds, rebuilds site, restarts service
set -e

DIR="/home/andrew/Projects/DisneySite/disney-site"
LOG="$DIR/scripts/news-pull.log"

echo "=== $(date) ===" >> "$LOG"

cd "$DIR"
/usr/bin/node scripts/scrape-news.js >> "$LOG" 2>&1
/usr/bin/npm run build >> "$LOG" 2>&1

export XDG_RUNTIME_DIR=/run/user/1000
systemctl --user restart disney-site >> "$LOG" 2>&1

echo "Deploy complete." >> "$LOG"
echo "" >> "$LOG"
