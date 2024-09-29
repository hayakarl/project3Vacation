import './Home.css';

export function Home(): JSX.Element {
  return (
    <div className="Home">
      {/* Fixed image */}
      <img src="/images/bicycle.jpg" alt="Fixed Bicycle" className="fixed-image" />

      <h1>גלה את היעדים המובילים לרכיבות אופניים בחו"ל</h1>
      <h2>רוצה להצטרף לחוויה ועדיין לא נרשמת?</h2>
      <h2>הירשם עכשיו כדי לראות את כל האפשרויות לרכיבה מושלמת</h2>

      {/* SVG with Path Animation */}
      <svg className="bicycle-path" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        {/* Define the path (the bike will follow this line) */}
        <path id="path" d="M 490,100 C 350,190 150,10 10,100" stroke="#acc235" strokeWidth="4" fill="transparent" />

        {/* Multiple Bicycle Icons with Animation */}
        <g>
          {/* First Rider */}
          <text fontSize="40" x="0" y="0">
            🚴‍♂️
          </text>
          <animateMotion repeatCount="indefinite" dur="8s">
            <mpath href="#path" />
          </animateMotion>
        </g>

        <g>
          {/* Second Rider */}
          <text fontSize="40" x="0" y="0">
            🚴‍♀️
          </text>
          <animateMotion repeatCount="indefinite" dur="10s" begin="2s">
            <mpath href="#path" />
          </animateMotion>
        </g>

        <g>
          {/* Third Rider */}
          <text fontSize="40" x="0" y="0">
            🚴‍♂️
          </text>
          <animateMotion repeatCount="indefinite" dur="12s" begin="4s">
            <mpath href="#path" />
          </animateMotion>
        </g>

        <g>
          {/* Fourth Rider */}
          <text fontSize="40" x="0" y="0">
            🚴‍♀️
          </text>
          <animateMotion repeatCount="indefinite" dur="14s" begin="6s">
            <mpath href="#path" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}
