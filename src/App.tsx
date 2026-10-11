import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Pokemon,
  PokemonTeam,
  PokemonTypeName,
  TypeMatchup,
  BattleSimulationResult,
} from './types';
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonMatchup,
  fetchTypes,
  fetchTeams,
  createTeam,
  deleteTeam,
  simulateBattle,
  fetchHealth,
} from './services/api';

type Tab = 'pokedex' | 'teams' | 'battle';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('pokedex');
  const [healthStatus, setHealthStatus] = useState<{ status: string; uptime: number } | null>(
    null
  );

  // Explorer State
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [typesList, setTypesList] = useState<PokemonTypeName[]>([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState('id');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Detail Modal State
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemonMatchup, setPokemonMatchup] = useState<TypeMatchup | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  // Team Builder State
  const [currentTeamDraft, setCurrentTeamDraft] = useState<
    Array<{ pokemon: Pokemon; nickname: string }>
  >([]);
  const [teamNameInput, setTeamNameInput] = useState('My Dream Team');
  const [teamDescInput, setTeamDescInput] = useState('');
  const [savedTeams, setSavedTeams] = useState<PokemonTeam[]>([]);
  const [teamFeedback, setTeamFeedback] = useState<string | null>(null);

  // Battle Simulator State
  const [fighter1Id, setFighter1Id] = useState<number>(6); // Charizard
  const [fighter2Id, setFighter2Id] = useState<number>(9); // Blastoise
  const [battleResult, setBattleResult] = useState<BattleSimulationResult | null>(null);
  const [battleLoading, setBattleLoading] = useState(false);

  // Initial Data Load
  useEffect(() => {
    checkBackendHealth();
    loadTypes();
    loadSavedTeams();
  }, []);

  // Fetch Pokemon when filters change
  useEffect(() => {
    loadPokemonList();
  }, [page, search, selectedType, sortBy]);

  const checkBackendHealth = async () => {
    try {
      const data = await fetchHealth();
      setHealthStatus({ status: data.status, uptime: Math.floor(data.uptime) });
    } catch {
      setHealthStatus(null);
    }
  };

  const loadTypes = async () => {
    try {
      const types = await fetchTypes();
      setTypesList(types);
    } catch (err) {
      console.error(err);
    }
  };

  const loadSavedTeams = async () => {
    try {
      const teams = await fetchTeams();
      setSavedTeams(teams);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPokemonList = async () => {
    setLoading(true);
    try {
      const res = await fetchPokemonList({
        page,
        limit: 12,
        search: search.trim() || undefined,
        type: selectedType || undefined,
        sortBy,
      });
      setPokemonList(res.data);
      setTotalPages(res.pagination.totalPages);
      setTotalCount(res.pagination.totalCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDetail = async (p: Pokemon) => {
    setSelectedPokemon(p);
    setPokemonMatchup(null);
    setLoadingModal(true);
    try {
      const detail = await fetchPokemonDetail(p.id);
      const matchupRes = await fetchPokemonMatchup(p.id);
      setSelectedPokemon(detail);
      setPokemonMatchup(matchupRes.matchup);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingModal(false);
    }
  };

  const handleAddToTeam = (pokemon: Pokemon) => {
    if (currentTeamDraft.length >= 6) {
      alert('Your team is full! Max 6 Pokémon allowed.');
      return;
    }
    setCurrentTeamDraft((prev) => [...prev, { pokemon, nickname: pokemon.formattedName }]);
    setTeamFeedback(`Added ${pokemon.formattedName} to draft team!`);
    setTimeout(() => setTeamFeedback(null), 3000);
  };

  const handleRemoveFromTeam = (index: number) => {
    setCurrentTeamDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveTeam = async () => {
    if (currentTeamDraft.length === 0) {
      alert('Add at least 1 Pokémon to save the team!');
      return;
    }
    try {
      await createTeam({
        name: teamNameInput.trim() || 'Untitled Team',
        description: teamDescInput.trim() || undefined,
        members: currentTeamDraft.map((item) => ({
          pokemonId: item.pokemon.id,
          nickname: item.nickname,
        })),
      });
      setCurrentTeamDraft([]);
      loadSavedTeams();
      alert('Team saved successfully to the backend!');
    } catch (err: any) {
      alert(err.message || 'Error saving team');
    }
  };

  const handleDeleteSavedTeam = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team?')) return;
    try {
      await deleteTeam(id);
      loadSavedTeams();
    } catch (err: any) {
      alert(err.message || 'Error deleting team');
    }
  };

  const handleSimulateBattle = async () => {
    setBattleLoading(true);
    setBattleResult(null);
    try {
      const res = await simulateBattle({
        pokemon1Id: fighter1Id,
        pokemon2Id: fighter2Id,
      });
      setBattleResult(res);
    } catch (err: any) {
      alert(err.message || 'Battle simulation failed');
    } finally {
      setBattleLoading(false);
    }
  };

  return (
    <div className="app-root">
      {/* Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <div className="brand-icon" />
            <div>
              <span className="brand-title">Pokémon Master</span>
              <span className="badge-version">API v1.0</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav-tabs">
            <button
              className={`nav-tab ${currentTab === 'pokedex' ? 'active' : ''}`}
              onClick={() => setCurrentTab('pokedex')}
            >
              📖 Pokédex
            </button>
            <button
              className={`nav-tab ${currentTab === 'teams' ? 'active' : ''}`}
              onClick={() => setCurrentTab('teams')}
            >
              🛡️ Team Builder {currentTeamDraft.length > 0 && `(${currentTeamDraft.length}/6)`}
            </button>
            <button
              className={`nav-tab ${currentTab === 'battle' ? 'active' : ''}`}
              onClick={() => setCurrentTab('battle')}
            >
              ⚔️ Battle Arena
            </button>
            <a
              href="http://localhost:3001/api/docs"
              target="_blank"
              rel="noreferrer"
              className="nav-tab"
              title="Open Swagger OpenAPI Documentation"
            >
              📜 Swagger Docs ↗
            </a>
          </nav>

          {/* Health Indicator */}
          <div className="health-badge">
            <span className="health-dot" />
            {healthStatus ? (
              <span>Backend Online ({healthStatus.uptime}s)</span>
            ) : (
              <span style={{ color: '#f87171' }}>Backend Offline</span>
            )}
          </div>
        </div>
      </header>

      {/* Floating feedback alert */}
      {teamFeedback && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#10b981',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            fontWeight: '600',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            zIndex: 99,
          }}
        >
          {teamFeedback}
        </div>
      )}

      {/* Main Content Area */}
      <main className="container main-content">
        {/* TAB 1: POKEDEX EXPLORER */}
        {currentTab === 'pokedex' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="glass-panel filter-bar">
              <div className="search-row">
                <div className="search-input-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Pokémon name or number (e.g. Pikachu, 25)..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>

                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="id">Sort by: Pokédex Number</option>
                  <option value="name">Sort by: Name (A-Z)</option>
                  <option value="total">Sort by: Total Stats</option>
                  <option value="attack">Sort by: Attack</option>
                  <option value="defense">Sort by: Defense</option>
                  <option value="speed">Sort by: Speed</option>
                  <option value="hp">Sort by: HP</option>
                </select>
              </div>

              {/* Type Filter Chips */}
              <div className="type-filter-chips">
                <button
                  className={`type-chip ${selectedType === '' ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedType('');
                    setPage(1);
                  }}
                >
                  All Types ({totalCount})
                </button>
                {typesList.map((type) => (
                  <button
                    key={type}
                    className={`type-chip ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedType(selectedType === type ? '' : type);
                      setPage(1);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                ⚡ Loading Pokémon from API...
              </div>
            ) : pokemonList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h3>No Pokémon matched your search.</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Try another name, number or type filter.
                </p>
              </div>
            ) : (
              <div className="pokemon-grid">
                {pokemonList.map((p) => (
                  <div key={p.id} className="glass-panel pokemon-card">
                    <div className="card-top">
                      <span className="pokemon-id">#{String(p.id).padStart(3, '0')}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        BST {p.stats.total}
                      </span>
                    </div>

                    <div className="card-sprite-wrap">
                      <div className="card-sprite-bg" />
                      <img
                        src={p.sprites.officialArtwork || p.sprites.frontDefault}
                        alt={p.name}
                        className="card-sprite float-hover"
                        loading="lazy"
                      />
                    </div>

                    <div className="card-info">
                      <h3 className="pokemon-name">{p.formattedName}</h3>
                      <div className="card-types">
                        {p.types.map((t) => (
                          <span key={t} className={`type-pill badge-${t}`}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="stat-preview-row">
                        <span>HP {p.stats.hp}</span>
                        <span>ATK {p.stats.attack}</span>
                        <span>DEF {p.stats.defense}</span>
                        <span>SPD {p.stats.speed}</span>
                      </div>

                      <div className="card-actions">
                        <button className="btn-detail" onClick={() => handleOpenDetail(p)}>
                          Details
                        </button>
                        <button
                          className="btn-add-team"
                          onClick={() => handleAddToTeam(p)}
                          title="Add to current team bench"
                        >
                          + Team
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '2.5rem',
                }}
              >
                <button
                  className="btn-detail"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  style={{ opacity: page <= 1 ? 0.4 : 1 }}
                >
                  ← Previous
                </button>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="btn-detail"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  style={{ opacity: page >= totalPages ? 0.4 : 1 }}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TEAM BUILDER */}
        {currentTab === 'teams' && (
          <div className="team-builder-wrap">
            {/* Draft Team Panel */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                    Create Team ({currentTeamDraft.length}/6 Pokémon)
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    Select up to 6 Pokémon from the Pokédex to build your strategic lineup.
                  </p>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleSaveTeam}
                  disabled={currentTeamDraft.length === 0}
                >
                  💾 Save Team to API
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1.25rem',
                  flexWrap: 'wrap',
                }}
              >
                <input
                  type="text"
                  className="search-input"
                  style={{ maxWidth: '300px' }}
                  placeholder="Team Name..."
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                />
                <input
                  type="text"
                  className="search-input"
                  style={{ flex: 1 }}
                  placeholder="Team Strategy Description (optional)..."
                  value={teamDescInput}
                  onChange={(e) => setTeamDescInput(e.target.value)}
                />
              </div>

              {/* 6 Bench Slots */}
              <div className="team-bench">
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const member = currentTeamDraft[index];
                  return (
                    <div
                      key={index}
                      className={`team-slot ${member ? 'filled' : ''}`}
                    >
                      {member ? (
                        <>
                          <button
                            className="slot-remove"
                            onClick={() => handleRemoveFromTeam(index)}
                            title="Remove Pokémon"
                          >
                            ✕
                          </button>
                          <img
                            src={member.pokemon.sprites.frontDefault}
                            alt={member.pokemon.name}
                            style={{ height: '70px', objectFit: 'contain' }}
                          />
                          <span
                            style={{
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              textTransform: 'capitalize',
                            }}
                          >
                            {member.nickname || member.pokemon.formattedName}
                          </span>
                          <div style={{ display: 'flex', gap: '3px', marginTop: '4px' }}>
                            {member.pokemon.types.map((t) => (
                              <span
                                key={t}
                                className={`type-pill badge-${t}`}
                                style={{ fontSize: '0.6rem', padding: '1px 5px' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                          <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>
                            +
                          </span>
                          Slot {index + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Saved Teams from Backend */}
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                Saved Teams in Database ({savedTeams.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {savedTeams.map((team) => (
                  <div key={team.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{team.name}</h4>
                        {team.description && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {team.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteSavedTeam(team.id)}
                        style={{
                          background: 'rgba(239, 68, 68, 0.2)',
                          border: 'none',
                          color: '#f87171',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>

                    {/* Member sprites */}
                    <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0' }}>
                      {team.members.map((m) => (
                        <img
                          key={m.order}
                          src={m.pokemon.sprites.frontDefault}
                          alt={m.pokemon.name}
                          style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                          }}
                          title={`${m.nickname || m.pokemon.formattedName} (${m.pokemon.types.join('/')})`}
                        />
                      ))}
                    </div>

                    {/* Type Coverage */}
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Elemental Coverage:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
                        {team.typeCoverage.map((t) => (
                          <span
                            key={t}
                            className={`type-pill badge-${t}`}
                            style={{ fontSize: '0.65rem', padding: '2px 6px' }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BATTLE ARENA */}
        {currentTab === 'battle' && (
          <div className="battle-arena-container">
            <div className="glass-panel" style={{ padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>⚔️ Pokémon Battle Arena</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Select two combatants. The backend simulation engine calculates speed, type advantages, damage formulas, and critical hits!
                </p>
              </div>

              {/* Matchup Selector */}
              <div className="combatants-row">
                {/* Fighter 1 */}
                <div style={{ textAlign: 'center' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Challenger 1
                  </label>
                  <select
                    className="sort-select"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    value={fighter1Id}
                    onChange={(e) => setFighter1Id(Number(e.target.value))}
                  >
                    {pokemonList.map((p) => (
                      <option key={p.id} value={p.id}>
                        #{p.id} {p.formattedName} ({p.types.join('/')})
                      </option>
                    ))}
                  </select>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fighter1Id}.png`}
                    alt="Fighter 1"
                    style={{ height: '140px', objectFit: 'contain' }}
                  />
                </div>

                <div className="vs-badge">VS</div>

                {/* Fighter 2 */}
                <div style={{ textAlign: 'center' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    Challenger 2
                  </label>
                  <select
                    className="sort-select"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    value={fighter2Id}
                    onChange={(e) => setFighter2Id(Number(e.target.value))}
                  >
                    {pokemonList.map((p) => (
                      <option key={p.id} value={p.id}>
                        #{p.id} {p.formattedName} ({p.types.join('/')})
                      </option>
                    ))}
                  </select>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${fighter2Id}.png`}
                    alt="Fighter 2"
                    style={{ height: '140px', objectFit: 'contain' }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button
                  className="btn-primary"
                  onClick={handleSimulateBattle}
                  disabled={battleLoading || fighter1Id === fighter2Id}
                  style={{ fontSize: '1rem', padding: '0.85rem 2.5rem' }}
                >
                  {battleLoading ? 'Simulating Combat...' : '🔥 Start Battle Simulation'}
                </button>
              </div>
            </div>

            {/* Battle Result Presentation */}
            {battleResult && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '12px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>
                    🏆
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    Winner: {battleResult.winner.name}!
                  </h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Concluded in {battleResult.totalTurns} turns with {battleResult.winner.remainingHp} HP remaining.
                  </p>
                </div>

                <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Battle Commentary Log:</h4>
                <div className="battle-log-box">
                  {battleResult.log.map((line, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '4px 0',
                        color: line.includes('super effective')
                          ? '#f59e0b'
                          : line.includes('won the battle')
                          ? '#10b981'
                          : line.includes('fainted')
                          ? '#ef4444'
                          : '#cbd5e1',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* DETAIL MODAL */}
      {selectedPokemon && (
        <div className="modal-overlay" onClick={() => setSelectedPokemon(null)}>
          <div
            className="glass-panel modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedPokemon(null)}>
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span className="pokemon-id" style={{ fontSize: '1rem' }}>
                #{String(selectedPokemon.id).padStart(3, '0')}
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
                {selectedPokemon.formattedName}
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                {selectedPokemon.types.map((t) => (
                  <span key={t} className={`type-pill badge-${t}`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Artwork / Animated Sprite display */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={
                  selectedPokemon.sprites.animatedFront ||
                  selectedPokemon.sprites.officialArtwork ||
                  selectedPokemon.sprites.frontDefault
                }
                alt={selectedPokemon.name}
                style={{ maxHeight: '180px', objectFit: 'contain' }}
              />
            </div>

            {/* Flavor Text */}
            {selectedPokemon.flavorText && (
              <p
                style={{
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                }}
              >
                "{selectedPokemon.flavorText}"
              </p>
            )}

            {/* Height, Weight, Abilities */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                background: 'rgba(15, 23, 42, 0.6)',
                padding: '1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Height</span>
                <p style={{ fontWeight: 700 }}>{selectedPokemon.height} m</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Weight</span>
                <p style={{ fontWeight: 700 }}>{selectedPokemon.weight} kg</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Abilities</span>
                <p style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  {selectedPokemon.abilities.map((a) => a.name).join(', ')}
                </p>
              </div>
            </div>

            {/* Base Stats */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontWeight: 700 }}>
                Base Stats (Total: {selectedPokemon.stats.total})
              </h4>
              {[
                { label: 'HP', val: selectedPokemon.stats.hp, max: 255 },
                { label: 'Attack', val: selectedPokemon.stats.attack, max: 190 },
                { label: 'Defense', val: selectedPokemon.stats.defense, max: 230 },
                { label: 'Sp. Atk', val: selectedPokemon.stats.specialAttack, max: 194 },
                { label: 'Sp. Def', val: selectedPokemon.stats.specialDefense, max: 230 },
                { label: 'Speed', val: selectedPokemon.stats.speed, max: 200 },
              ].map((s) => (
                <div key={s.label} className="stat-bar-container">
                  <div className="stat-label-row">
                    <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                    <span>{s.val}</span>
                  </div>
                  <div className="stat-track">
                    <div
                      className="stat-fill"
                      style={{ width: `${Math.min(100, (s.val / s.max) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Matchups: Weaknesses & Resistances */}
            {loadingModal ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Calculating matchup advantages...</p>
            ) : pokemonMatchup ? (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontWeight: 700 }}>Type Matchup Analysis</h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600 }}>
                    Weak Against (takes 2x/4x damage):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {pokemonMatchup.weaknesses.length > 0 ? (
                      pokemonMatchup.weaknesses.map((t) => (
                        <span key={t} className={`type-pill badge-${t}`} style={{ fontSize: '0.65rem' }}>
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None</span>
                    )}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                    Resistant To (takes 0.5x/0.25x damage):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {pokemonMatchup.resistances.length > 0 ? (
                      pokemonMatchup.resistances.map((t) => (
                        <span key={t} className={`type-pill badge-${t}`} style={{ fontSize: '0.65rem' }}>
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>None</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  handleAddToTeam(selectedPokemon);
                  setSelectedPokemon(null);
                }}
              >
                + Add {selectedPokemon.formattedName} to Team Bench
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
