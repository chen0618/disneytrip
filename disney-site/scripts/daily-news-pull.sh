#!/bin/bash
# Daily Disney news scraper + AI triage — runs via cron at 8 AM EST
# 1. Scrapes RSS feeds for new articles
# 2. If new articles found, runs Claude to triage & update site data
# 3. Builds and deploys
set -e

DIR="/home/andrew/Projects/DisneySite/disney-site"
LOG="$DIR/scripts/news-pull.log"
CLAUDE="/home/andrew/.local/bin/claude"

echo "=== $(date) ===" >> "$LOG"

cd "$DIR"

# Step 1: Scrape RSS feeds
/usr/bin/node scripts/scrape-news.js >> "$LOG" 2>&1

# Step 2: Check for new articles
NEW_COUNT=$(/usr/bin/node -e "
const a = JSON.parse(require('fs').readFileSync('src/data/newsArticles.json','utf-8'));
console.log(a.filter(x => x.status === 'new').length);
")

if [ "$NEW_COUNT" -eq 0 ]; then
  echo "No new articles. Skipping triage." >> "$LOG"
  echo "" >> "$LOG"
  exit 0
fi

echo "$NEW_COUNT new articles found. Running AI triage..." >> "$LOG"

# Step 3: Run Claude to process/triage articles
export XDG_RUNTIME_DIR=/run/user/1000
$CLAUDE -p "/processnews" \
  --permission-mode bypassPermissions \
  --verbose \
  >> "$LOG" 2>&1

# processnews skill handles build + deploy, but ensure service is restarted
systemctl --user restart disney-site >> "$LOG" 2>&1

echo "Triage + deploy complete." >> "$LOG"
echo "" >> "$LOG"
