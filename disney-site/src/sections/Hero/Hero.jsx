import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WaveDivider from '../../components/WaveDivider';
import styles from './Hero.module.css';

const sparkles = [
  { left: '10%', top: '20%', dur: '3.2s', delay: '0s' },
  { left: '25%', top: '60%', dur: '2.8s', delay: '0.5s' },
  { left: '40%', top: '30%', dur: '3.5s', delay: '1s' },
  { left: '55%', top: '70%', dur: '2.6s', delay: '0.3s' },
  { left: '70%', top: '25%', dur: '3.1s', delay: '0.8s' },
  { left: '85%', top: '55%', dur: '2.9s', delay: '1.2s' },
  { left: '15%', top: '80%', dur: '3.4s', delay: '0.7s' },
  { left: '60%', top: '15%', dur: '2.7s', delay: '1.5s' },
  { left: '35%', top: '85%', dur: '3s', delay: '0.2s' },
  { left: '80%', top: '40%', dur: '3.3s', delay: '1.1s' },
  { left: '50%', top: '50%', dur: '2.5s', delay: '0.6s' },
  { left: '5%', top: '45%', dur: '3.6s', delay: '1.3s' },
  { left: '92%', top: '75%', dur: '2.8s', delay: '0.4s' },
  { left: '45%', top: '10%', dur: '3.1s', delay: '0.9s' },
];

const ORLANDO = { lat: 28.38, lng: -81.56 };
const TRIP_DATE = new Date('2027-01-16T00:00:00');
const JAN_AVG = { high: 72, low: 50 };
const CACHE_KEY = 'disney-weather';
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

const WMO_CODES = {
  0: ['☀️', 'Clear'],
  1: ['🌤️', 'Mostly clear'],
  2: ['⛅', 'Partly cloudy'],
  3: ['☁️', 'Overcast'],
  45: ['🌫️', 'Foggy'],
  48: ['🌫️', 'Foggy'],
  51: ['🌦️', 'Light drizzle'],
  53: ['🌦️', 'Drizzle'],
  55: ['🌧️', 'Heavy drizzle'],
  61: ['🌧️', 'Light rain'],
  63: ['🌧️', 'Rain'],
  65: ['🌧️', 'Heavy rain'],
  80: ['🌦️', 'Light showers'],
  81: ['🌧️', 'Showers'],
  82: ['🌧️', 'Heavy showers'],
  95: ['⛈️', 'Thunderstorm'],
  96: ['⛈️', 'Thunderstorm'],
  99: ['⛈️', 'Severe storm'],
};

function getWeatherEmoji(code) {
  return WMO_CODES[code] || ['🌤️', 'Fair'];
}

async function fetchWeather() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < CACHE_TTL) return data;
    }
  } catch { /* ignore parse errors */ }

  const daysUntilTrip = Math.ceil((TRIP_DATE - new Date()) / (1000 * 60 * 60 * 24));
  const useForecast = daysUntilTrip <= 14 && daysUntilTrip > 0;

  let url = `https://api.open-meteo.com/v1/forecast?latitude=${ORLANDO.lat}&longitude=${ORLANDO.lng}&temperature_unit=fahrenheit&timezone=America/New_York`;

  if (useForecast) {
    url += '&daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=14';
  } else {
    url += '&current=temperature_2m,weather_code';
  }

  const res = await fetch(url);
  if (!res.ok) return null;
  const json = await res.json();

  let result;
  if (useForecast && json.daily) {
    const highs = json.daily.temperature_2m_max;
    const lows = json.daily.temperature_2m_min;
    const codes = json.daily.weather_code;
    result = {
      mode: 'forecast',
      high: Math.round(Math.max(...highs)),
      low: Math.round(Math.min(...lows)),
      code: codes[0],
    };
  } else if (json.current) {
    result = {
      mode: 'current',
      temp: Math.round(json.current.temperature_2m),
      code: json.current.weather_code,
    };
  } else {
    return null;
  }

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: result, ts: Date.now() }));
  } catch { /* storage full, ignore */ }

  return result;
}

function getCountdownText() {
  const tripDate = TRIP_DATE;
  const now = new Date();
  const diffMs = tripDate - now;
  if (diffMs <= 0) return 'Trip complete!';
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return <><span className={styles.countNumber}>{days}</span> days until the magic begins!</>;
}

export default function Hero() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather().then(setWeather).catch(() => {});
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.sparkles}>
        {sparkles.map((s, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{ left: s.left, top: s.top, '--dur': s.dur, '--delay': s.delay }}
          />
        ))}
      </div>
      <div className={styles.content}>
        <p className={styles.pre}>A Magical Family Trip</p>
        <h1 className={styles.title}>Our Disney Adventure</h1>
        <p className={styles.date}>January 16–23, 2027</p>
        <p className={styles.countdown}>{getCountdownText()}</p>
        <div className={styles.weather}>
          {weather ? (() => {
            const [emoji, label] = getWeatherEmoji(weather.code);
            return weather.mode === 'current' ? (
              <span>
                {emoji} Orlando right now: {weather.temp}°F &mdash; {label}
              </span>
            ) : (
              <span>
                {emoji} Trip week forecast: {weather.low}–{weather.high}°F
              </span>
            );
          })() : null}
          <span className={styles.weatherAvg}>
            Jan avg: High {JAN_AVG.high}° Low {JAN_AVG.low}°
          </span>
        </div>
        <p className={styles.tagline}>
          Everything you need to know about our week at Walt Disney World &mdash; parks, hotels, transportation, and more!
        </p>
        <div className={styles.parkLinks}>
          <Link to="/park/magic-kingdom" className={styles.parkLink} style={{ background: 'var(--coral)' }}>
            🏰 Magic Kingdom
          </Link>
          <Link to="/park/hollywood-studios" className={styles.parkLink} style={{ background: 'var(--purple)' }}>
            🎬 Hollywood Studios
          </Link>
          <Link to="/park/epcot" className={styles.parkLink} style={{ background: 'var(--yellow)', color: 'var(--text)' }}>
            🌍 EPCOT
          </Link>
          <Link to="/guide" className={styles.parkLink} style={{ background: 'var(--mint)' }}>
            📋 Planning Guide
          </Link>
          <Link to="/news" className={styles.parkLink} style={{ background: 'var(--blue)' }}>
            📰 Disney News
          </Link>
        </div>
      </div>
      <button
        className={styles.scrollIndicator}
        aria-label="Scroll to next section"
        onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <WaveDivider fill="var(--bg)" variant={1} />
    </section>
  );
}
