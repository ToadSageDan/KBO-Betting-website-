// KBO Betting Site - Main Application Logic

(function () {
  'use strict';

  /* ──────────────────────────────────────────
     STATE
  ────────────────────────────────────────── */
  const state = {
    activePage: 'dashboard',
    showLast10: false,
    selectedPitcher: null,
    selectedMatchupPitcher: 'p001',
    selectedMatchupTeam: 'LG',
    pitcherFilter: '',
    teamFilter: '',
    eraFilter: 6.0,
    lightTheme: false
  };

  /* ──────────────────────────────────────────
     HELPERS
  ────────────────────────────────────────── */
  function getTeam(id)    { return KBO_DATA.teams.find(t => t.id === id); }
  function getPitcher(id) { return KBO_DATA.pitchers.find(p => p.id === id); }
  function getBatter(id)  { return KBO_DATA.batters.find(b => b.id === id); }

  function eraClass(era) {
    if (era < 2.50) return 'era-elite';
    if (era < 3.25) return 'era-good';
    if (era < 4.00) return 'era-avg';
    return 'era-bad';
  }

  function oddsSign(n) { return n > 0 ? '+' + n : n; }
  function oddsClass(n) { return n > 0 ? 'positive' : 'negative'; }

  function weatherIcon(condition) {
    const c = condition.toLowerCase();
    if (c.includes('indoor') || c.includes('dome')) return '🏟️';
    if (c.includes('rain') || c.includes('precip')) return '🌧️';
    if (c.includes('cloud')) return '⛅';
    if (c.includes('clear')) return '☀️';
    if (c.includes('humid') || c.includes('muggy') || c.includes('hot')) return '🌡️';
    if (c.includes('hazy')) return '🌫️';
    return '🌤️';
  }

  function precipClass(pct) {
    if (pct <= 10) return 'precip-low';
    if (pct <= 25) return 'precip-med';
    return 'precip-high';
  }

  function calcLast5Era(games) {
    const ip  = games.reduce((s,g) => s + parseIP(g.ip), 0);
    const er  = games.reduce((s,g) => s + g.er, 0);
    return ip > 0 ? ((er * 9) / ip).toFixed(2) : '--';
  }

  function parseIP(ip) {
    const [inn, outs = 0] = String(ip).split('.').map(Number);
    return inn + outs / 3;
  }

  function calcRecord(games) {
    const w = games.filter(g => g.result === 'W').length;
    const l = games.filter(g => g.result === 'L').length;
    return `${w}-${l}`;
  }

  function progressColor(era) {
    if (era < 2.50) return 'progress-good';
    if (era < 3.25) return 'progress-good';
    if (era < 4.00) return 'progress-warn';
    return 'progress-bad';
  }

  function eraToWidth(era) {
    // 0 ERA = 100%, 6 ERA = 0%
    return Math.max(0, Math.min(100, ((6 - era) / 6) * 100)).toFixed(0);
  }

  /* ──────────────────────────────────────────
     NAVIGATION
  ────────────────────────────────────────── */
  function navigate(page) {
    state.activePage = page;
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
    const pg = document.getElementById('page-' + page);
    if (pg) pg.classList.add('active');
    const btn = document.querySelector(`nav button[data-page="${page}"]`);
    if (btn) btn.classList.add('active');
    renderPage(page);
  }

  function renderPage(page) {
    switch (page) {
      case 'dashboard':   renderDashboard();   break;
      case 'matchup':     renderMatchup();     break;
      case 'pitchers':    renderPitchers();    break;
      case 'teams':       renderTeams();       break;
      case 'weather':     renderWeather();     break;
      case 'runs':        renderRuns();        break;
      case 'standings':   renderStandings();   break;
      case 'tools':       renderTools();       break;
    }
  }

  /* ──────────────────────────────────────────
     DASHBOARD
  ────────────────────────────────────────── */
  function renderDashboard() {
    const gamesEl = document.getElementById('dashboard-games');
    if (gamesEl) gamesEl.innerHTML = KBO_DATA.todaysGames.map(renderGameCard).join('');

    const hotEl = document.getElementById('hot-pitchers');
    if (hotEl) {
      const pitchersWithEra = KBO_DATA.pitchers.map(p => ({
        p,
        era: parseFloat(calcLast5Era(p.last5))
      })).sort((a,b) => a.era - b.era).slice(0, 4);

      hotEl.innerHTML = pitchersWithEra.map(({p, era}) => `
        <div class="card fade-in" style="cursor:pointer" onclick="App.goToMatchup('${p.id}')">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
            <div class="pitcher-avatar" style="width:40px;height:40px;font-size:14px">${p.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <div>
              <div style="font-weight:700;font-size:14px">${p.name}</div>
              <div style="font-size:11px;color:var(--text-secondary)">${getTeam(p.team).name}</div>
            </div>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-end">
            <div class="stat-box" style="flex:1"><div class="val ${eraClass(era)}">${era}</div><div class="lbl">L5 ERA</div></div>
            <div class="stat-box" style="flex:1"><div class="val">${calcRecord(p.last5)}</div><div class="lbl">L5 Rec</div></div>
          </div>
          <div class="progress-bar" style="margin-top:8px">
            <div class="progress-fill ${progressColor(era)}" style="width:${eraToWidth(era)}%"></div>
          </div>
        </div>`).join('');
    }
  }

  function renderGameCard(game) {
    const home  = getTeam(game.homeTeam);
    const away  = getTeam(game.awayTeam);
    const homeSP = game.homePitcher ? getPitcher(game.homePitcher) : null;
    const awaySP = game.awayPitcher ? getPitcher(game.awayPitcher) : null;
    const weather = KBO_DATA.weather[game.stadium] || {};
    const precip = weather.precip || 0;

    return `
    <div class="game-card fade-in" onclick="App.openMatchup('${game.gameId}')">
      <div class="game-header">
        <span class="game-time">⏰ ${game.time} KST</span>
        <span class="badge badge-blue" style="font-size:10px">${game.stadium.split(' ').slice(-2).join(' ')}</span>
      </div>
      <div class="game-teams">
        <div class="team-side">
          <div class="team-abbr" style="color:${away.color || 'var(--text-primary)'}">${away.id}</div>
          <div class="team-name">${away.name}</div>
          <div class="team-pitcher">${awaySP ? awaySP.name : 'TBD'}</div>
        </div>
        <div class="vs-divider">@</div>
        <div class="team-side">
          <div class="team-abbr" style="color:${home.color || 'var(--text-primary)'}">${home.id}</div>
          <div class="team-name">${home.name}</div>
          <div class="team-pitcher">${homeSP ? homeSP.name : 'TBD'}</div>
        </div>
      </div>
      <div class="game-odds">
        <div class="odds-item">
          <div class="odds-label">ML Away</div>
          <div class="odds-value ${oddsClass(game.moneylineAway)}">${oddsSign(game.moneylineAway)}</div>
        </div>
        <div class="odds-item">
          <div class="odds-label">O/U ${game.overUnder}</div>
          <div class="odds-value neutral">${oddsSign(game.overOdds)} / ${oddsSign(game.underOdds)}</div>
        </div>
        <div class="odds-item">
          <div class="odds-label">ML Home</div>
          <div class="odds-value ${oddsClass(game.moneylineHome)}">${oddsSign(game.moneylineHome)}</div>
        </div>
      </div>
      <div class="game-weather">
        <span class="weather-icon">${weatherIcon(weather.condition || '')}</span>
        <span>${weather.temp ? weather.temp + '°C' : 'N/A'} · ${weather.condition || 'N/A'} · ${weather.wind || 'N/A'}</span>
        <span class="${precipClass(precip)}" style="margin-left:auto">💧${precip}%</span>
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────
     MATCHUP ANALYZER
  ────────────────────────────────────────── */
  function renderMatchup() {
    const container = document.getElementById('matchup-content');
    if (!container) return;

    const pitcherOpts = KBO_DATA.pitchers.map(p =>
      `<option value="${p.id}" ${p.id === state.selectedMatchupPitcher ? 'selected' : ''}>${p.name} (${p.team})</option>`
    ).join('');

    const otherTeams = KBO_DATA.teams.filter(t => {
      const pitcher = getPitcher(state.selectedMatchupPitcher);
      return pitcher ? t.id !== pitcher.team : true;
    });
    const teamOpts = otherTeams.map(t =>
      `<option value="${t.id}" ${t.id === state.selectedMatchupTeam ? 'selected' : ''}>${t.name}</option>`
    ).join('');

    const pitcher = getPitcher(state.selectedMatchupPitcher);
    const teamId  = state.selectedMatchupTeam;
    const team    = getTeam(teamId);
    const ts      = KBO_DATA.teamStats[teamId];
    const vsStats = pitcher && pitcher.vsTeams[teamId];
    const games   = state.showLast10 ? pitcher?.last10 : pitcher?.last5;

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">⚔️</span> Pitcher vs Team Matchup Analyzer</div>
    </div>

    <div class="filters-panel">
      <div class="selector-group">
        <label>Starting Pitcher</label>
        <select id="matchup-pitcher">${pitcherOpts}</select>
      </div>
      <div class="selector-group">
        <label>Opposing Team</label>
        <select id="matchup-team">${teamOpts}</select>
      </div>
      <div class="toggle-group">
        <label class="toggle">
          <input type="checkbox" id="last10-toggle" ${state.showLast10 ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Show Last ${state.showLast10 ? '10' : '5'} Games</span>
      </div>
      <button class="btn" onclick="App.runMatchup()">🔍 Analyze</button>
    </div>

    ${pitcher && team ? renderMatchupResults(pitcher, team, ts, vsStats, games) : '<div class="card"><p style="color:var(--text-muted)">Select a pitcher and team to analyze.</p></div>'}
    `;

    document.getElementById('matchup-pitcher')?.addEventListener('change', e => {
      state.selectedMatchupPitcher = e.target.value;
    });
    document.getElementById('matchup-team')?.addEventListener('change', e => {
      state.selectedMatchupTeam = e.target.value;
    });
    document.getElementById('last10-toggle')?.addEventListener('change', e => {
      state.showLast10 = e.target.checked;
      renderMatchup();
    });
  }

  function renderMatchupResults(pitcher, team, ts, vsStats, games) {
    const last5Era = games ? calcLast5Era(games.slice(0, 5)) : '--';
    const lastNEra = games ? calcLast5Era(games) : '--';
    const lastNRecord = games ? calcRecord(games) : '--';
    const gamesLabel = state.showLast10 ? 'Last 10' : 'Last 5';

    return `
    <div class="grid-2" style="margin-bottom:16px">
      <!-- PITCHER CARD -->
      <div class="card">
        <div class="pitcher-card-header" style="background:linear-gradient(135deg,#1e3a5f,#1a2235);padding:14px;display:flex;align-items:center;gap:14px;margin:-16px -16px 16px;">
          <div class="pitcher-avatar">${pitcher.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
          <div class="pitcher-info">
            <div class="pitcher-name">${pitcher.name}</div>
            <div class="pitcher-meta">
              <span class="meta-badge">${getTeam(pitcher.team).name}</span>
              <span class="meta-badge ${pitcher.throws === 'L' ? 'left' : 'right'}">${pitcher.throws}HP</span>
            </div>
          </div>
        </div>
        <div class="card-title">2026 Season Stats</div>
        <div class="pitcher-stats-grid">
          <div class="stat-box"><div class="val ${eraClass(pitcher.stats2026.era)}">${pitcher.stats2026.era}</div><div class="lbl">ERA</div></div>
          <div class="stat-box"><div class="val">${pitcher.stats2026.wins}-${pitcher.stats2026.losses}</div><div class="lbl">W-L</div></div>
          <div class="stat-box"><div class="val">${pitcher.stats2026.k}</div><div class="lbl">K</div></div>
          <div class="stat-box"><div class="val">${pitcher.stats2026.whip}</div><div class="lbl">WHIP</div></div>
        </div>
        <div class="progress-bar"><div class="progress-fill ${progressColor(pitcher.stats2026.era)}" style="width:${eraToWidth(pitcher.stats2026.era)}%"></div></div>

        <div class="stat-row"><span class="stat-label">IP</span><span class="stat-value">${pitcher.stats2026.ip}</span></div>
        <div class="stat-row"><span class="stat-label">BB</span><span class="stat-value">${pitcher.stats2026.bb}</span></div>
        <div class="stat-row"><span class="stat-label">ERA+</span><span class="stat-value" data-tooltip="100=average, higher=better">${pitcher.stats2026.era_plus}</span></div>
        <div class="stat-row"><span class="stat-label">${gamesLabel} ERA</span><span class="stat-value ${eraClass(parseFloat(lastNEra))}">${lastNEra}</span></div>
        <div class="stat-row"><span class="stat-label">${gamesLabel} Record</span><span class="stat-value">${lastNRecord}</span></div>

        <div class="edge-meter">
          <span class="edge-label">Form</span>
          <div class="edge-bar"><div class="edge-fill" style="width:${eraToWidth(parseFloat(lastNEra) || 4)}%;background:var(--accent-secondary)"></div></div>
          <span class="edge-value" style="color:var(--accent-secondary)">${lastNEra}</span>
        </div>
      </div>

      <!-- VS TEAM -->
      <div class="card">
        <div class="card-title">🆚 vs ${team.name} — Career Splits</div>
        ${vsStats ? `
        <div class="pitcher-stats-grid">
          <div class="stat-box"><div class="val ${eraClass(vsStats.era)}">${vsStats.era}</div><div class="lbl">ERA vs</div></div>
          <div class="stat-box"><div class="val">${vsStats.record}</div><div class="lbl">Record</div></div>
          <div class="stat-box"><div class="val">${vsStats.k}</div><div class="lbl">K</div></div>
          <div class="stat-box"><div class="val">${vsStats.ip}</div><div class="lbl">IP</div></div>
        </div>
        <div class="progress-bar"><div class="progress-fill ${progressColor(vsStats.era)}" style="width:${eraToWidth(vsStats.era)}%"></div></div>
        <div class="stat-row"><span class="stat-label">BB vs</span><span class="stat-value">${vsStats.bb}</span></div>
        <div class="stat-row"><span class="stat-label">K/9 vs</span><span class="stat-value">${(vsStats.k / parseIP(vsStats.ip) * 9).toFixed(1)}</span></div>
        ` : '<p style="color:var(--text-muted)">No matchup data available.</p>'}

        <div class="card-title" style="margin-top:14px">📊 ${team.name} Offense</div>
        ${ts ? `
        <div class="stat-row"><span class="stat-label">Runs/Game</span><span class="stat-value">${ts.runsPerGame}</span></div>
        <div class="stat-row"><span class="stat-label">Season R/RA</span><span class="stat-value">${ts.runsScored} / ${ts.runsAllowed}</span></div>
        <div class="stat-row"><span class="stat-label">Last 5</span><span class="stat-value">${ts.last5}</span></div>
        <div class="stat-row"><span class="stat-label">Last 10</span><span class="stat-value">${ts.last10}</span></div>
        ` : ''}

        ${vsStats ? `
        <div class="edge-meter">
          <span class="edge-label">Pitcher Edge</span>
          <div class="edge-bar"><div class="edge-fill" style="width:${eraToWidth(vsStats.era)}%;background:var(--accent-primary)"></div></div>
          <span class="edge-value" style="color:var(--accent-primary)">${vsStats.era}</span>
        </div>` : ''}
      </div>
    </div>

    <!-- LAST N GAMES TABLE -->
    <div class="card" style="margin-bottom:16px">
      <div class="card-title">📅 ${gamesLabel} Starts — ${pitcher.name}</div>
      <table class="games-table">
        <thead>
          <tr><th>Date</th><th>Opp</th><th>Result</th><th>IP</th><th>ER</th><th>K</th><th>BB</th><th>ERA</th></tr>
        </thead>
        <tbody>
          ${(games || []).map(g => {
            const gEra = parseIP(g.ip) > 0 ? ((g.er * 9) / parseIP(g.ip)).toFixed(2) : '--';
            return `<tr>
              <td>${g.date}</td>
              <td><span class="badge badge-blue">${g.opp}</span></td>
              <td><span class="result-badge result-${g.result}">${g.result}</span></td>
              <td>${g.ip}</td>
              <td style="color:${g.er > 3 ? 'var(--accent-danger)' : g.er <= 1 ? 'var(--accent-secondary)' : 'inherit'}">${g.er}</td>
              <td style="color:${g.k >= 10 ? 'var(--accent-secondary)' : 'inherit'}">${g.k}</td>
              <td style="color:${g.bb >= 4 ? 'var(--accent-danger)' : 'inherit'}">${g.bb}</td>
              <td class="${eraClass(parseFloat(gEra))}">${gEra}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>

    <!-- SITUATIONAL SPLITS -->
    <div class="card">
      <div class="card-title">🔀 Situational Splits — ${pitcher.name}</div>
      <div class="splits-grid">
        ${Object.entries(pitcher.situational).map(([key, s]) => `
          <div class="split-item">
            <div class="slbl">${key.charAt(0).toUpperCase() + key.slice(1)}</div>
            <div class="sera ${eraClass(s.era)}">${s.era}</div>
            <div class="srec">${s.record} · ${s.ip} IP</div>
          </div>`).join('')}
      </div>
    </div>
    `;
  }

  /* ──────────────────────────────────────────
     PITCHERS PAGE
  ────────────────────────────────────────── */
  function renderPitchers() {
    const container = document.getElementById('pitchers-content');
    if (!container) return;

    const filtered = KBO_DATA.pitchers.filter(p => {
      const matchName = !state.pitcherFilter || p.name.toLowerCase().includes(state.pitcherFilter.toLowerCase());
      const matchTeam = !state.teamFilter || p.team === state.teamFilter;
      const matchEra  = p.stats2026.era <= state.eraFilter;
      return matchName && matchTeam && matchEra;
    });

    const teamOpts = ['', ...KBO_DATA.teams.map(t => t.id)].map(id =>
      `<option value="${id}" ${id === state.teamFilter ? 'selected' : ''}>${id || 'All Teams'}</option>`
    ).join('');

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">⚾</span> Pitcher Cards</div>
    </div>
    <div class="filters-panel">
      <div class="selector-group">
        <label>Search Pitcher</label>
        <input type="text" placeholder="Name..." value="${state.pitcherFilter}" oninput="App.setPitcherFilter(this.value)">
      </div>
      <div class="selector-group">
        <label>Team</label>
        <select onchange="App.setTeamFilter(this.value)">${teamOpts}</select>
      </div>
      <div class="slider-group" style="min-width:200px">
        <div class="slider-header">
          <span class="slider-label">Max ERA Filter</span>
          <span class="slider-value" id="era-slider-val">${state.eraFilter.toFixed(1)}</span>
        </div>
        <input type="range" min="1.5" max="6" step="0.1" value="${state.eraFilter}"
          oninput="App.setEraFilter(this.value)">
      </div>
      <div class="toggle-group">
        <label class="toggle">
          <input type="checkbox" ${state.showLast10 ? 'checked' : ''} onchange="App.toggleLast10(this.checked)">
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Last ${state.showLast10 ? '10' : '5'}</span>
      </div>
    </div>
    <div class="grid-3">
      ${filtered.map(p => renderFullPitcherCard(p)).join('')}
    </div>
    ${filtered.length === 0 ? '<div class="card"><p style="color:var(--text-muted)">No pitchers match your filters.</p></div>' : ''}
    `;
  }

  function renderFullPitcherCard(pitcher) {
    const games   = state.showLast10 ? pitcher.last10 : pitcher.last5;
    const lastEra = calcLast5Era(games);
    const team    = getTeam(pitcher.team);

    return `
    <div class="pitcher-card fade-in">
      <div class="pitcher-card-header">
        <div class="pitcher-avatar">${pitcher.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div class="pitcher-info">
          <div class="pitcher-name">${pitcher.name}</div>
          <div class="pitcher-meta">
            <span class="meta-badge">${team.name}</span>
            <span class="meta-badge ${pitcher.throws === 'L' ? 'left' : 'right'}">${pitcher.throws}HP</span>
          </div>
        </div>
        <button class="btn btn-secondary" style="font-size:11px;padding:4px 10px"
          onclick="App.goToMatchup('${pitcher.id}')">Analyze ▶</button>
      </div>
      <div class="pitcher-card-body">
        <div class="season-tabs" id="tabs-${pitcher.id}">
          <button class="season-tab active" onclick="App.switchSeason('${pitcher.id}','2026')">2026</button>
          <button class="season-tab" onclick="App.switchSeason('${pitcher.id}','2025')">2025</button>
          <button class="season-tab" onclick="App.switchSeason('${pitcher.id}','2024')">2024</button>
          <button class="season-tab" onclick="App.switchSeason('${pitcher.id}','2023')">2023</button>
        </div>
        <div id="season-stats-${pitcher.id}">
          ${renderSeasonStats(pitcher, '2026')}
        </div>

        <div class="card-title" style="margin-top:12px">Last ${state.showLast10 ? '10' : '5'} Starts</div>
        <table class="games-table">
          <thead><tr><th>Date</th><th>Opp</th><th>Res</th><th>IP</th><th>ER</th><th>K</th><th>BB</th></tr></thead>
          <tbody>
            ${games.map(g => `<tr>
              <td>${g.date.slice(5)}</td>
              <td>${g.opp}</td>
              <td><span class="result-badge result-${g.result}">${g.result}</span></td>
              <td>${g.ip}</td>
              <td style="color:${g.er > 3 ? 'var(--accent-danger)' : g.er <= 1 ? 'var(--accent-secondary)' : 'inherit'}">${g.er}</td>
              <td>${g.k}</td>
              <td>${g.bb}</td>
            </tr>`).join('')}
          </tbody>
        </table>

        <div style="margin-top:10px;font-size:12px;color:var(--text-secondary)">
          ${state.showLast10 ? 'Last 10' : 'Last 5'} ERA:
          <strong class="${eraClass(parseFloat(lastEra))}">${lastEra}</strong>
          &nbsp;|&nbsp; Record: <strong>${calcRecord(games)}</strong>
        </div>

        <!-- VS TEAMS DROPDOWN -->
        <details style="margin-top:12px">
          <summary style="cursor:pointer;color:var(--accent-primary);font-size:13px;font-weight:600">▼ Career vs Team Splits</summary>
          <table class="vs-table" style="margin-top:8px">
            <thead><tr><th>Team</th><th>ERA</th><th>IP</th><th>K</th><th>BB</th><th>Rec</th></tr></thead>
            <tbody>
              ${Object.entries(pitcher.vsTeams).map(([tid,v]) => `<tr>
                <td>${tid}</td>
                <td class="${eraClass(v.era)}">${v.era}</td>
                <td>${v.ip}</td>
                <td>${v.k}</td>
                <td>${v.bb}</td>
                <td>${v.record}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </details>

        <!-- SITUATIONAL SPLITS DROPDOWN -->
        <details style="margin-top:8px">
          <summary style="cursor:pointer;color:var(--accent-primary);font-size:13px;font-weight:600">▼ Situational Splits</summary>
          <div class="splits-grid" style="margin-top:8px">
            ${Object.entries(pitcher.situational).map(([k,s]) => `
              <div class="split-item">
                <div class="slbl">${k.charAt(0).toUpperCase() + k.slice(1)}</div>
                <div class="sera ${eraClass(s.era)}">${s.era}</div>
                <div class="srec">${s.record}</div>
              </div>`).join('')}
          </div>
        </details>
      </div>
    </div>`;
  }

  function renderSeasonStats(pitcher, year) {
    const s = pitcher['stats' + year];
    if (!s) return `<p style="color:var(--text-muted);font-size:12px">No data for ${year}.</p>`;
    return `
    <div class="pitcher-stats-grid">
      <div class="stat-box"><div class="val ${eraClass(s.era)}">${s.era}</div><div class="lbl">ERA</div></div>
      <div class="stat-box"><div class="val">${s.wins}-${s.losses}</div><div class="lbl">W-L</div></div>
      <div class="stat-box"><div class="val">${s.k}</div><div class="lbl">K</div></div>
      <div class="stat-box"><div class="val">${s.ip}</div><div class="lbl">IP</div></div>
    </div>
    <div class="progress-bar"><div class="progress-fill ${progressColor(s.era)}" style="width:${eraToWidth(s.era)}%"></div></div>
    <div style="display:flex;gap:10px;font-size:12px;color:var(--text-secondary);margin-top:6px">
      <span>BB: <strong>${s.bb}</strong></span>
      ${s.whip ? `<span>WHIP: <strong>${s.whip}</strong></span>` : ''}
      ${s.era_plus ? `<span>ERA+: <strong>${s.era_plus}</strong></span>` : ''}
    </div>`;
  }

  /* ──────────────────────────────────────────
     TEAMS PAGE
  ────────────────────────────────────────── */
  function renderTeams() {
    const container = document.getElementById('teams-content');
    if (!container) return;

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">🏆</span> Team Stats & Trends</div>
    </div>
    <div class="grid-2">
      ${KBO_DATA.teams.map(t => renderTeamCard(t)).join('')}
    </div>`;
  }

  function renderTeamCard(team) {
    const ts = KBO_DATA.teamStats[team.id];
    if (!ts) return '';
    const maxRuns = Math.max(...ts.runsByInning);

    return `
    <div class="card fade-in">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <div style="width:40px;height:40px;border-radius:50%;background:${team.color || '#333'};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;color:#fff">${team.id}</div>
        <div>
          <div style="font-size:16px;font-weight:700">${team.name}</div>
          <div style="font-size:12px;color:var(--text-secondary)">${team.city} · ${team.stadium}</div>
        </div>
        <div style="margin-left:auto;text-align:right">
          <div style="font-size:18px;font-weight:800">${ts.wins}-${ts.losses}</div>
          <div style="font-size:11px;color:var(--text-muted)">W-L</div>
        </div>
      </div>
      <div class="grid-4" style="margin-bottom:12px">
        <div class="stat-box"><div class="val">${ts.runsPerGame}</div><div class="lbl">R/G</div></div>
        <div class="stat-box"><div class="val">${ts.last5}</div><div class="lbl">Last 5</div></div>
        <div class="stat-box"><div class="val">${ts.last10}</div><div class="lbl">Last 10</div></div>
        <div class="stat-box"><div class="val ${eraClass(ts.teamEra)}">${ts.teamEra}</div><div class="lbl">ERA</div></div>
      </div>
      <div class="stat-row"><span class="stat-label">Home</span><span class="stat-value">${ts.homeRecord}</span></div>
      <div class="stat-row"><span class="stat-label">Away</span><span class="stat-value">${ts.awayRecord}</span></div>
      <div class="stat-row"><span class="stat-label">RS / RA</span><span class="stat-value">${ts.runsScored} / ${ts.runsAllowed}</span></div>
      <div class="stat-row"><span class="stat-label">Bullpen ERA</span><span class="stat-value ${eraClass(ts.bullpenEra)}">${ts.bullpenEra}</span></div>

      <div class="card-title" style="margin-top:12px">Avg Runs by Inning (2026)</div>
      <div class="inning-map">
        ${ts.runsByInning.map((r, i) => {
          const h = Math.max(8, Math.round((r / maxRuns) * 80));
          return `<div class="inning-bar">
            <div class="inning-val">${r}</div>
            <div class="inning-fill" style="height:${h}px;background:${r === maxRuns ? 'var(--accent-secondary)' : 'var(--accent-primary)'}"></div>
            <div class="inning-label">${i + 1}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  /* ──────────────────────────────────────────
     WEATHER PAGE
  ────────────────────────────────────────── */
  function renderWeather() {
    const container = document.getElementById('weather-content');
    if (!container) return;

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">🌤️</span> Stadium Weather Conditions</div>
      <span style="font-size:12px;color:var(--text-muted)">Updated: ${new Date().toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'})}</span>
    </div>
    <div class="grid-3">
      ${Object.entries(KBO_DATA.weather).map(([stadium, w]) => renderWeatherCard(stadium, w)).join('')}
    </div>`;
  }

  function renderWeatherCard(stadium, w) {
    const precipCls = precipClass(w.precip);
    const icon = weatherIcon(w.condition);
    return `
    <div class="card fade-in weather-card">
      <div class="card-title">${stadium}</div>
      <div class="weather-main">
        <div class="weather-big-icon">${icon}</div>
        <div>
          <div class="weather-temp">${w.temp}°C</div>
          <div class="weather-detail">${w.condition}</div>
        </div>
      </div>
      <div class="weather-stats">
        <div class="weather-stat">
          <div class="lbl">Wind</div>
          <div class="val">🌬️ ${w.wind}</div>
        </div>
        <div class="weather-stat">
          <div class="lbl">Humidity</div>
          <div class="val">💧 ${w.humidity}%</div>
        </div>
        <div class="weather-stat">
          <div class="lbl">Precip %</div>
          <div class="val ${precipCls}">☔ ${w.precip}%</div>
        </div>
        <div class="weather-stat">
          <div class="lbl">Feel</div>
          <div class="val">${w.temp > 30 ? '🥵 Hot' : w.temp < 15 ? '🥶 Cool' : '😊 Mild'}</div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill ${w.precip > 25 ? 'progress-bad' : w.precip > 10 ? 'progress-warn' : 'progress-good'}"
          style="width:${w.precip}%"></div>
      </div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Rain probability: ${w.precip}%</div>
    </div>`;
  }

  /* ──────────────────────────────────────────
     RUNS TRACKER
  ────────────────────────────────────────── */
  function renderRuns() {
    const container = document.getElementById('runs-content');
    if (!container) return;

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">🏃</span> Runs Scored / Allowed Tracker</div>
    </div>
    <div class="grid-2" style="margin-bottom:16px">
      ${renderRunsOffense()}
      ${renderRunsDefense()}
    </div>
    <div class="card" style="margin-bottom:16px">
      <div class="card-title">📊 Runs by Inning — All Teams 2026</div>
      <div class="runs-tracker">
        ${renderRunsInningTable()}
      </div>
    </div>
    ${renderBatterCards()}
    `;
  }

  function renderRunsOffense() {
    const sorted = KBO_DATA.teams.map(t => ({ team: t, ts: KBO_DATA.teamStats[t.id] }))
      .sort((a,b) => b.ts.runsScored - a.ts.runsScored);
    const max = sorted[0].ts.runsScored;
    return `
    <div class="card">
      <div class="card-title">⚡ Offense — Runs Scored (Ranked)</div>
      ${sorted.map(({team,ts}) => `
        <div class="stat-row">
          <span class="stat-label"><span style="color:${team.color};font-weight:700">${team.id}</span> ${team.name}</span>
          <div style="flex:1;margin:0 12px">
            <div class="progress-bar"><div class="progress-fill progress-blue" style="width:${(ts.runsScored/max*100).toFixed(0)}%"></div></div>
          </div>
          <span class="stat-value">${ts.runsScored}</span>
        </div>`).join('')}
    </div>`;
  }

  function renderRunsDefense() {
    const sorted = KBO_DATA.teams.map(t => ({ team: t, ts: KBO_DATA.teamStats[t.id] }))
      .sort((a,b) => a.ts.runsAllowed - b.ts.runsAllowed);
    const max = sorted[sorted.length - 1].ts.runsAllowed;
    return `
    <div class="card">
      <div class="card-title">🛡️ Defense — Runs Allowed (Ranked)</div>
      ${sorted.map(({team,ts}) => `
        <div class="stat-row">
          <span class="stat-label"><span style="color:${team.color};font-weight:700">${team.id}</span> ${team.name}</span>
          <div style="flex:1;margin:0 12px">
            <div class="progress-bar"><div class="progress-fill ${ts.runsAllowed > 480 ? 'progress-bad' : 'progress-good'}" style="width:${(ts.runsAllowed/max*100).toFixed(0)}%"></div></div>
          </div>
          <span class="stat-value ${ts.runsAllowed > 490 ? 'bad' : ts.runsAllowed < 450 ? 'good' : ''}">${ts.runsAllowed}</span>
        </div>`).join('')}
    </div>`;
  }

  function renderRunsInningTable() {
    const innings = [1,2,3,4,5,6,7,8,9];
    return `
    <table class="runs-table">
      <thead>
        <tr>
          <th>Team</th>
          ${innings.map(i => `<th>Inn ${i}</th>`).join('')}
          <th>Total</th>
          <th>R/G</th>
        </tr>
      </thead>
      <tbody>
        ${KBO_DATA.teams.map(team => {
          const ts = KBO_DATA.teamStats[team.id];
          const maxInning = Math.max(...ts.runsByInning);
          const minInning = Math.min(...ts.runsByInning);
          return `<tr>
            <td><span style="color:${team.color};font-weight:700">${team.id}</span></td>
            ${ts.runsByInning.map(r => {
              const cls = r === maxInning ? 'runs-cell-hot' : r === minInning ? 'runs-cell-cold' : '';
              return `<td class="inning-cell"><span class="${cls}" style="padding:2px 6px;border-radius:4px">${r}</span></td>`;
            }).join('')}
            <td class="total-cell">${ts.runsScored}</td>
            <td>${ts.runsPerGame}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;
  }

  function renderBatterCards() {
    return `
    <div class="section-header" style="margin-top:8px">
      <div class="section-title"><span class="icon">🥎</span> Key Batters</div>
    </div>
    <div class="grid-3">
      ${KBO_DATA.batters.map(b => renderBatterCard(b)).join('')}
    </div>`;
  }

  function renderBatterCard(batter) {
    const team = getTeam(batter.team);
    const s = batter.stats2026;
    return `
    <div class="card fade-in">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        <div class="pitcher-avatar" style="background:linear-gradient(135deg,${team.color || '#333'},#333)">${batter.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
        <div>
          <div style="font-size:15px;font-weight:700">${batter.name}</div>
          <div style="font-size:12px;color:var(--text-secondary)">${team.name} · ${batter.bats === 'L' ? 'LHB' : 'RHB'}</div>
        </div>
      </div>
      <div class="pitcher-stats-grid">
        <div class="stat-box"><div class="val">${s.avg.toFixed(3)}</div><div class="lbl">AVG</div></div>
        <div class="stat-box"><div class="val">${s.ops.toFixed(3)}</div><div class="lbl">OPS</div></div>
        <div class="stat-box"><div class="val">${s.hr}</div><div class="lbl">HR</div></div>
        <div class="stat-box"><div class="val">${s.rbi}</div><div class="lbl">RBI</div></div>
      </div>
      <div class="stat-row"><span class="stat-label">OBP / SLG</span><span class="stat-value">${s.obp.toFixed(3)} / ${s.slg.toFixed(3)}</span></div>
      <div class="stat-row"><span class="stat-label">H / AB</span><span class="stat-value">${s.h} / ${s.ab}</span></div>
      <div class="stat-row"><span class="stat-label">SB</span><span class="stat-value">${s.sb}</span></div>

      <details style="margin-top:10px">
        <summary style="cursor:pointer;color:var(--accent-primary);font-size:13px;font-weight:600">▼ Last 5 Games</summary>
        <table class="games-table" style="margin-top:8px">
          <thead><tr><th>Date</th><th>Opp</th><th>Line</th></tr></thead>
          <tbody>
            ${batter.last5.map(g => `<tr>
              <td>${g.date.slice(5)}</td>
              <td>${g.opp}</td>
              <td>${g.result}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </details>

      <details style="margin-top:6px">
        <summary style="cursor:pointer;color:var(--accent-primary);font-size:13px;font-weight:600">▼ Historical Stats</summary>
        <table class="games-table" style="margin-top:8px">
          <thead><tr><th>Year</th><th>AVG</th><th>OPS</th><th>HR</th><th>RBI</th></tr></thead>
          <tbody>
            ${['2026','2025','2024','2023'].map(yr => {
              const ys = batter['stats' + yr];
              return ys ? `<tr>
                <td>${yr}</td>
                <td>${ys.avg.toFixed(3)}</td>
                <td>${ys.ops.toFixed(3)}</td>
                <td>${ys.hr}</td>
                <td>${ys.rbi}</td>
              </tr>` : '';
            }).join('')}
          </tbody>
        </table>
      </details>
    </div>`;
  }

  /* ──────────────────────────────────────────
     STANDINGS
  ────────────────────────────────────────── */
  function renderStandings() {
    const container = document.getElementById('standings-content');
    if (!container) return;

    const sorted = KBO_DATA.teams.map(t => ({
      team: t,
      ts: KBO_DATA.teamStats[t.id]
    })).sort((a,b) => b.ts.wins - a.ts.wins);

    const leader = sorted[0].ts;
    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">📋</span> 2026 KBO Standings</div>
    </div>
    <div class="card">
      <div style="overflow-x:auto">
        <table class="standings-table">
          <thead>
            <tr>
              <th>Rank</th><th>Team</th><th>W</th><th>L</th><th>GB</th>
              <th>Pct</th><th>RS</th><th>RA</th><th>Diff</th>
              <th>L5</th><th>L10</th><th>Home</th><th>Away</th>
              <th>ERA</th><th>R/G</th>
            </tr>
          </thead>
          <tbody>
            ${sorted.map(({team,ts},i) => {
              const gb = i === 0 ? '--' : (((leader.wins - ts.wins) + (ts.losses - leader.losses)) / 2).toFixed(1);
              const pct = (ts.wins / (ts.wins + ts.losses)).toFixed(3);
              const diff = ts.runsScored - ts.runsAllowed;
              const diffStr = diff > 0 ? '+'+diff : diff;
              return `<tr class="${i === 0 ? 'highlight' : ''}">
                <td><span class="rank-num">${i+1}</span></td>
                <td>
                  <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${team.color};margin-right:6px;vertical-align:middle"></span>
                  <strong>${team.id}</strong> <span class="hide-mobile" style="color:var(--text-secondary)">${team.name}</span>
                </td>
                <td>${ts.wins}</td>
                <td>${ts.losses}</td>
                <td>${gb}</td>
                <td>${pct}</td>
                <td>${ts.runsScored}</td>
                <td>${ts.runsAllowed}</td>
                <td style="color:${diff > 0 ? 'var(--accent-secondary)' : 'var(--accent-danger)'}">${diffStr}</td>
                <td><span class="badge ${getBadgeClass(ts.last5)}">${ts.last5}</span></td>
                <td><span class="badge ${getBadgeClass(ts.last10)}">${ts.last10}</span></td>
                <td>${ts.homeRecord}</td>
                <td>${ts.awayRecord}</td>
                <td class="${eraClass(ts.teamEra)}">${ts.teamEra}</td>
                <td>${ts.runsPerGame}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  }

  function getBadgeClass(record) {
    const [w,l] = record.split('-').map(Number);
    if (w > l) return 'badge-green';
    if (w < l) return 'badge-red';
    return 'badge-yellow';
  }

  /* ──────────────────────────────────────────
     BETTING TOOLS
  ────────────────────────────────────────── */
  function renderTools() {
    const container = document.getElementById('tools-content');
    if (!container) return;

    container.innerHTML = `
    <div class="section-header">
      <div class="section-title"><span class="icon">🎰</span> Betting Tools & Calculators</div>
    </div>
    <div class="grid-2">
      <!-- ODDS CONVERTER -->
      <div class="card">
        <div class="card-title">💱 Odds Converter</div>
        <div class="selector-group" style="margin-bottom:10px">
          <label>American Odds (e.g. -110, +150)</label>
          <input type="text" id="american-odds-input" placeholder="-110" style="width:100%">
        </div>
        <button class="btn btn-success" onclick="App.convertOdds()" style="width:100%;margin-bottom:10px">Convert</button>
        <div id="odds-result" style="font-size:13px;color:var(--text-secondary)">Enter odds above and click Convert.</div>
      </div>

      <!-- KELLY CRITERION -->
      <div class="card">
        <div class="card-title">📐 Kelly Criterion (Bet Size)</div>
        <div class="selector-group" style="margin-bottom:8px">
          <label>Win Probability (0–100%)</label>
          <input type="text" id="kelly-win" placeholder="55" style="width:100%">
        </div>
        <div class="selector-group" style="margin-bottom:10px">
          <label>American Odds (e.g. -110)</label>
          <input type="text" id="kelly-odds" placeholder="-110" style="width:100%">
        </div>
        <div class="slider-group" style="margin-bottom:10px">
          <div class="slider-header">
            <span class="slider-label">Bankroll ($)</span>
            <span class="slider-value" id="bankroll-val">1000</span>
          </div>
          <input type="range" min="100" max="10000" step="50" value="1000"
            oninput="document.getElementById('bankroll-val').textContent=this.value;App.calcKelly()">
        </div>
        <button class="btn btn-success" onclick="App.calcKelly()" style="width:100%;margin-bottom:10px">Calculate</button>
        <div id="kelly-result" style="font-size:13px;color:var(--text-secondary)">Enter win % and odds above.</div>
      </div>

      <!-- IMPLIED PROBABILITY -->
      <div class="card">
        <div class="card-title">🎯 Game Implied Probability</div>
        <div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">From today's odds</div>
        ${KBO_DATA.todaysGames.map(g => {
          const homeImplied = oddsToProb(g.moneylineHome);
          const awayImplied = oddsToProb(g.moneylineAway);
          const vig = homeImplied + awayImplied - 100;
          return `
          <div style="padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="font-size:13px;font-weight:600;margin-bottom:4px">${g.awayTeam} @ ${g.homeTeam}</div>
            <div style="display:flex;gap:10px;font-size:12px">
              <span>${g.awayTeam}: <strong class="badge badge-blue">${awayImplied.toFixed(1)}%</strong></span>
              <span>${g.homeTeam}: <strong class="badge badge-blue">${homeImplied.toFixed(1)}%</strong></span>
              <span style="color:var(--text-muted)">Vig: ${vig.toFixed(1)}%</span>
            </div>
            <div class="progress-bar" style="margin-top:6px">
              <div class="progress-fill progress-blue" style="width:${homeImplied.toFixed(0)}%"></div>
            </div>
          </div>`;
        }).join('')}
      </div>

      <!-- OVER UNDER ANALYZER -->
      <div class="card">
        <div class="card-title">📈 Over/Under Quick Analyzer</div>
        ${KBO_DATA.todaysGames.map(g => {
          const home = getTeam(g.homeTeam);
          const away = getTeam(g.awayTeam);
          const homeTS = KBO_DATA.teamStats[g.homeTeam];
          const awayTS = KBO_DATA.teamStats[g.awayTeam];
          const combinedRpg = (homeTS.runsPerGame + awayTS.runsPerGame).toFixed(1);
          const edge = combinedRpg > g.overUnder ? 'OVER' : 'UNDER';
          const edgeCls = edge === 'OVER' ? 'badge-yellow' : 'badge-blue';
          return `
          <div style="padding:8px 0;border-bottom:1px solid var(--border)">
            <div style="font-size:13px;font-weight:600;margin-bottom:4px">${away.id} @ ${home.id}</div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-size:12px">
              <span>Line: <strong>${g.overUnder}</strong></span>
              <span>Avg Comb R/G: <strong>${combinedRpg}</strong></span>
              <span class="badge ${edgeCls}">Leans ${edge}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }

  function oddsToProb(odds) {
    if (odds < 0) return (-odds / (-odds + 100)) * 100;
    return (100 / (odds + 100)) * 100;
  }

  /* ──────────────────────────────────────────
     PUBLIC API (window.App)
  ────────────────────────────────────────── */
  window.App = {
    navigate,
    openMatchup(gameId) {
      const game = KBO_DATA.todaysGames.find(g => g.gameId === gameId);
      if (!game || !game.homePitcher) { navigate('matchup'); return; }
      state.selectedMatchupPitcher = game.homePitcher;
      state.selectedMatchupTeam = game.awayTeam;
      navigate('matchup');
    },
    runMatchup() {
      const pSel = document.getElementById('matchup-pitcher');
      const tSel = document.getElementById('matchup-team');
      if (pSel) state.selectedMatchupPitcher = pSel.value;
      if (tSel) state.selectedMatchupTeam = tSel.value;
      renderMatchup();
    },
    goToMatchup(pitcherId) {
      state.selectedMatchupPitcher = pitcherId;
      navigate('matchup');
    },
    setPitcherFilter(v) {
      state.pitcherFilter = v;
      renderPitchers();
    },
    setTeamFilter(v) {
      state.teamFilter = v;
      renderPitchers();
    },
    setEraFilter(v) {
      state.eraFilter = parseFloat(v);
      const lbl = document.getElementById('era-slider-val');
      if (lbl) lbl.textContent = parseFloat(v).toFixed(1);
      renderPitchers();
    },
    toggleLast10(val) {
      state.showLast10 = val;
      renderPitchers();
    },
    switchSeason(pitcherId, year) {
      const statsEl = document.getElementById('season-stats-' + pitcherId);
      const tabsEl  = document.getElementById('tabs-' + pitcherId);
      const pitcher = getPitcher(pitcherId);
      if (!statsEl || !pitcher) return;
      statsEl.innerHTML = renderSeasonStats(pitcher, year);
      tabsEl.querySelectorAll('.season-tab').forEach(t => {
        t.classList.toggle('active', t.textContent === year);
      });
    },
    toggleTheme() {
      state.lightTheme = !state.lightTheme;
      document.body.classList.toggle('light-theme', state.lightTheme);
      const btn = document.getElementById('theme-btn');
      if (btn) btn.textContent = state.lightTheme ? '🌙 Dark' : '☀️ Light';
    },
    convertOdds() {
      const rawVal = document.getElementById('american-odds-input').value;
      const odds   = parseInt(rawVal);
      const result = document.getElementById('odds-result');
      if (isNaN(odds)) { result.innerHTML = '<span style="color:var(--accent-danger)">Invalid input.</span>'; return; }
      const imp  = oddsToProb(odds).toFixed(2);
      const dec  = odds < 0 ? (1 - 100/odds).toFixed(3) : (odds/100 + 1).toFixed(3);
      const frac = odds < 0 ? `100/${-odds}` : `${odds}/100`;
      result.innerHTML = `
        <div class="stat-row"><span class="stat-label">Implied Prob</span><span class="stat-value">${imp}%</span></div>
        <div class="stat-row"><span class="stat-label">Decimal</span><span class="stat-value">${dec}</span></div>
        <div class="stat-row"><span class="stat-label">Fractional</span><span class="stat-value">${frac}</span></div>`;
    },
    calcKelly() {
      const winPct  = parseFloat(document.getElementById('kelly-win').value) / 100;
      const odds    = parseInt(document.getElementById('kelly-odds').value);
      const bankroll = parseInt(document.querySelector('input[type="range"]').value);
      const result   = document.getElementById('kelly-result');
      if (isNaN(winPct) || isNaN(odds) || isNaN(bankroll)) {
        result.innerHTML = '<span style="color:var(--accent-danger)">Fill all fields.</span>'; return;
      }
      const dec = odds < 0 ? (1 - 100/odds) : (odds/100 + 1);
      const b = dec - 1;
      const q = 1 - winPct;
      const kelly = ((b * winPct - q) / b);
      const halfKelly = kelly / 2;
      const betAmt = (halfKelly * bankroll).toFixed(2);
      result.innerHTML = `
        <div class="stat-row"><span class="stat-label">Full Kelly %</span><span class="stat-value">${(kelly*100).toFixed(1)}%</span></div>
        <div class="stat-row"><span class="stat-label">Half Kelly %</span><span class="stat-value">${(halfKelly*100).toFixed(1)}%</span></div>
        <div class="stat-row"><span class="stat-label">Bet Size (½K)</span><span class="stat-value" style="color:var(--accent-secondary)">$${betAmt}</span></div>
        ${kelly <= 0 ? '<div style="color:var(--accent-danger);font-size:12px;margin-top:6px">⚠️ Negative edge — skip this bet.</div>' : ''}`;
    }
  };

  /* ──────────────────────────────────────────
     BOOT
  ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav button').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.page));
    });
    document.getElementById('theme-btn')?.addEventListener('click', App.toggleTheme);
    navigate('dashboard');
  });

})();
