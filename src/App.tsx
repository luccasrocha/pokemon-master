import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Pokemon,
  PokemonTeam,
  PokemonTypeName,
  TypeMatchup,
  BattleSimulationResult,
  TeamBattleSimulationResult,
  BattleTurn,
} from './types';
import {
  fetchPokemonList,
  fetchPokemonDetail,
  fetchPokemonMatchup,
  fetchTypes,
  fetchRandomPokemon,
  fetchTeams,
  createTeam,
  deleteTeam,
  simulateBattle,
  simulateTeamBattle,
  fetchHealth,
} from './services/api';

type Tab = 'pokedex' | 'teams' | 'battle' | 'quiz';
type BattleMode = '1v1' | 'teams';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('pokedex');
  const [healthStatus, setHealthStatus] = useState<{ status: string; uptime: number } | null>(null);

  // Global Pokemon Cache for selectors and quiz
  const [allPokemonRoster, setAllPokemonRoster] = useState<Pokemon[]>([]);
  const [typesList, setTypesList] = useState<PokemonTypeName[]>([]);

  // Explorer State
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState('id');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pokemon_favs') || '[]');
    } catch {
      return [];
    }
  });

  // Global Shiny & Visual view modes
  const [globalShiny, setGlobalShiny] = useState(false);

  // Detail Modal State
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemonMatchup, setPokemonMatchup] = useState<TypeMatchup | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalShinyView, setModalShinyView] = useState(false);
  const [modalAnimatedView, setModalAnimatedView] = useState(false);

  // Team Builder State
  const [currentTeamDraft, setCurrentTeamDraft] = useState<
    Array<{ pokemon: Pokemon; nickname: string }>
  >([]);
  const [teamNameInput, setTeamNameInput] = useState('My Dream Team');
  const [teamDescInput, setTeamDescInput] = useState('');
  const [savedTeams, setSavedTeams] = useState<PokemonTeam[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Battle Simulator State
  const [battleMode, setBattleMode] = useState<BattleMode>('1v1');
  const [fighter1Id, setFighter1Id] = useState<number>(6); // Charizard
  const [fighter2Id, setFighter2Id] = useState<number>(9); // Blastoise
  const [battleResult, setBattleResult] = useState<BattleSimulationResult | null>(null);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [battleLoading, setBattleLoading] = useState(false);

  // Team Battle State
  const [selectedSavedTeam1Id, setSelectedSavedTeam1Id] = useState<string>('');
  const [rivalTeamPreset, setRivalTeamPreset] = useState<string>('rival-blue');
  const [teamBattleResult, setTeamBattleResult] = useState<TeamBattleSimulationResult | null>(null);

  // Quiz State ("Who's that Pokemon?")
  const [quizPokemon, setQuizPokemon] = useState<Pokemon | null>(null);
  const [quizOptions, setQuizOptions] = useState<Pokemon[]>([]);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [quizSelectedId, setQuizSelectedId] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizBestStreak, setQuizBestStreak] = useState(() => {
    return Number(localStorage.getItem('pokemon_quiz_best') || 0);
  });

  // Sound Cry Helper
  const playCry = (url?: string) => {
    if (!url) return;
    try {
      const audio = new Audio(url);
      audio.volume = 0.45;
      audio.play().catch(() => { });
    } catch { }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const toggleFavorite = (id: number) => {
    const next = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(next);
    localStorage.setItem('pokemon_favs', JSON.stringify(next));
  };

  // Initial Load
  useEffect(() => {
    checkBackendHealth();
    loadTypes();
    loadSavedTeams();
    loadAllRoster();
    const healthTimer = window.setInterval(checkBackendHealth, 30_000);
    return () => window.clearInterval(healthTimer);
  }, []);

  // Fetch paginated Pokémon
  useEffect(() => {
    loadPokemonList();
  }, [page, search, selectedType, sortBy, showFavoritesOnly]);

  // Auto-play battle turns
  useEffect(() => {
    let timer: any;
    if (isPlayingAuto && battleResult && currentTurnIndex < battleResult.turns.length) {
      timer = setTimeout(() => {
        setCurrentTurnIndex((prev) => prev + 1);
      }, 700);
    } else if (isPlayingAuto && battleResult && currentTurnIndex >= battleResult.turns.length) {
      setIsPlayingAuto(false);
    }
    return () => clearTimeout(timer);
  }, [isPlayingAuto, currentTurnIndex, battleResult]);

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
      if (teams.length > 0 && !selectedSavedTeam1Id) {
        setSelectedSavedTeam1Id(teams[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllRoster = async () => {
    try {
      const res = await fetchPokemonList({ limit: 250, sortBy: 'id' });
      setAllPokemonRoster(res.data);
      if (res.data.length > 0) {
        initNewQuizQuestion(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadPokemonList = async () => {
    setLoading(true);
    if (showFavoritesOnly && favorites.length === 0) {
      setPokemonList([]);
      setTotalCount(0);
      setTotalPages(1);
      setLoading(false);
      return;
    }
    try {
      const res = await fetchPokemonList({
        page,
        limit: 12,
        search: search.trim() || undefined,
        type: selectedType || undefined,
        ids: showFavoritesOnly && favorites.length > 0 ? favorites.join(',') : undefined,
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
    setModalShinyView(globalShiny);
    setModalAnimatedView(false);
    try {
      playCry(p.cryUrl);
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

  const handleSurpriseMe = async () => {
    try {
      const randoms = await fetchRandomPokemon(1);
      if (randoms.length > 0) {
        handleOpenDetail(randoms[0]);
        showToast(`🎉 Encountered a wild ${randoms[0].formattedName}!`);
      }
    } catch {
      if (allPokemonRoster.length > 0) {
        const rand = allPokemonRoster[Math.floor(Math.random() * allPokemonRoster.length)];
        handleOpenDetail(rand);
      }
    }
  };

  // Team Builder Actions
  const handleAddToTeam = (pokemon: Pokemon) => {
    if (currentTeamDraft.length >= 6) {
      showToast('⚠️ Your team is full! Max 6 Pokémon allowed.');
      return;
    }
    setCurrentTeamDraft((prev) => [...prev, { pokemon, nickname: pokemon.formattedName }]);
    showToast(`✅ Added ${pokemon.formattedName} to team draft!`);
  };

  const handleRemoveFromTeam = (index: number) => {
    setCurrentTeamDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAutoFillTeam = () => {
    if (allPokemonRoster.length < 6) return;
    const shuffled = [...allPokemonRoster].sort(() => 0.5 - Math.random()).slice(0, 6);
    setCurrentTeamDraft(shuffled.map((p) => ({ pokemon: p, nickname: p.formattedName })));
    showToast('🎲 Generated a random 6-Pokémon dream squad!');
  };

  const handleSaveTeam = async () => {
    if (currentTeamDraft.length === 0) {
      showToast('⚠️ Add at least 1 Pokémon to save the team!');
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
      showToast('💾 Team saved successfully to backend database!');
      loadSavedTeams();
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Error saving team'}`);
    }
  };

  const handleLoadSavedTeamToDraft = (team: PokemonTeam) => {
    setCurrentTeamDraft(
      team.members.map((m) => ({
        pokemon: m.pokemon,
        nickname: m.nickname || m.pokemon.formattedName,
      }))
    );
    setTeamNameInput(team.name);
    setTeamDescInput(team.description || '');
    showToast(`📋 Loaded team "${team.name}" to workbench!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedTeam = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team?')) return;
    try {
      await deleteTeam(id);
      showToast('🗑️ Team deleted.');
      loadSavedTeams();
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Error deleting team'}`);
    }
  };

  const handleBattleWithSavedTeam = (team: PokemonTeam) => {
    setSelectedSavedTeam1Id(team.id);
    setBattleMode('teams');
    setCurrentTab('battle');
    showToast(`⚔️ Selected "${team.name}" for Team Battle!`);
  };

  // Battle Simulator Actions
  const handleSimulate1v1 = async () => {
    setBattleLoading(true);
    setBattleResult(null);
    setCurrentTurnIndex(0);
    setIsPlayingAuto(false);
    try {
      const fighter1 = allPokemonRoster.find((p) => p.id === fighter1Id);
      if (fighter1) playCry(fighter1.cryUrl);

      const res = await simulateBattle({
        pokemon1Id: fighter1Id,
        pokemon2Id: fighter2Id,
      });
      setBattleResult(res);
      setIsPlayingAuto(true);
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Battle simulation failed'}`);
    } finally {
      setBattleLoading(false);
    }
  };

  const handleSimulateTeamBattle = async () => {
    const selectedTeam = savedTeams.find((t) => t.id === selectedSavedTeam1Id);
    if (!selectedTeam) {
      showToast('⚠️ Please select a valid team for battle.');
      return;
    }

    const rivalPresets: Record<string, { name: string; pokemonIds: number[] }> = {
      'rival-blue': {
        name: 'Gym Leader Gary (Rival)',
        pokemonIds: [9, 18, 65, 112, 103, 59], // Blastoise, Pidgeot, Alakazam, Rhydon, Exeggutor, Arcanine
      },
      'rival-brock': {
        name: 'Gym Leader Brock (Pewter Gym)',
        pokemonIds: [74, 95, 111], // Geodude, Onix, Rhyhorn
      },
      'rival-misty': {
        name: 'Gym Leader Misty (Cerulean Gym)',
        pokemonIds: [120, 121, 54, 131], // Staryu, Starmie, Psyduck, Lapras
      },
      'rival-rocket': {
        name: 'Team Rocket Giovanni',
        pokemonIds: [31, 34, 53, 112, 150], // Nidoqueen, Nidoking, Persian, Rhydon, Mewtwo
      },
    };

    const rival = rivalPresets[rivalTeamPreset] || rivalPresets['rival-blue'];

    setBattleLoading(true);
    setTeamBattleResult(null);
    try {
      const res = await simulateTeamBattle({
        team1: {
          name: selectedTeam.name,
          pokemonIds: selectedTeam.members.map((m) => m.pokemonId),
        },
        team2: {
          name: rival.name,
          pokemonIds: rival.pokemonIds,
        },
      });
      setTeamBattleResult(res);
      showToast(`⚔️ Team clash completed in ${res.totalRounds} rounds!`);
    } catch (err: any) {
      showToast(`❌ ${err.message || 'Team battle simulation failed'}`);
    } finally {
      setBattleLoading(false);
    }
  };

  // Quiz ("Who's that Pokemon?") Actions
  const initNewQuizQuestion = (roster: Pokemon[]) => {
    if (roster.length < 4) return;
    const shuffled = [...roster].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const options = shuffled.slice(0, 4).sort(() => 0.5 - Math.random());
    setQuizPokemon(target);
    setQuizOptions(options);
    setQuizRevealed(false);
    setQuizSelectedId(null);
  };

  const handleQuizAnswer = (p: Pokemon) => {
    if (quizRevealed || !quizPokemon) return;
    setQuizSelectedId(p.id);
    setQuizRevealed(true);
    playCry(quizPokemon.cryUrl);

    if (p.id === quizPokemon.id) {
      const newScore = quizScore + 10;
      const newStreak = quizStreak + 1;
      setQuizScore(newScore);
      setQuizStreak(newStreak);
      if (newStreak > quizBestStreak) {
        setQuizBestStreak(newStreak);
        localStorage.setItem('pokemon_quiz_best', String(newStreak));
      }
      showToast(`🎉 Correct! It's ${quizPokemon.formattedName}! (+10 pts)`);
    } else {
      setQuizStreak(0);
      showToast(`😢 Wrong! It was ${quizPokemon.formattedName}. Streak reset.`);
    }
  };

  // Team Synergy Calculations
  const teamAvgBst =
    currentTeamDraft.length > 0
      ? Math.round(
        currentTeamDraft.reduce((acc, m) => acc + m.pokemon.stats.total, 0) /
        currentTeamDraft.length
      )
      : 0;

  const teamTypeCoverages = Array.from(
    new Set(currentTeamDraft.flatMap((m) => m.pokemon.types))
  );

  // Calculate current team's shared defensive vulnerabilities
  const weaknessCountMap: Record<string, number> = {};
  if (currentTeamDraft.length > 0) {
    typesList.forEach((atkType) => {
      let count = 0;
      currentTeamDraft.forEach((m) => {
        // Multiplier check
        const isWeak = m.pokemon.types.some((t) => {
          // simplified vulnerability representation
          return ['water', 'grass', 'ground', 'rock', 'electric', 'ice', 'fire'].includes(t);
        });
        if (isWeak) count++;
      });
      if (count >= 2) weaknessCountMap[atkType] = count;
    });
  }

  // Fighter objects for 1v1 Arena
  const fighter1 = allPokemonRoster.find((p) => p.id === fighter1Id);
  const fighter2 = allPokemonRoster.find((p) => p.id === fighter2Id);

  // Rebuild both HP values from the replayed turns so the fighter who was hit
  // before the last turn keeps the correct value on screen.
  const fighter1MaxHp = battleResult?.combatants.fighter1.initialHp ?? (fighter1 ? fighter1.stats.hp * 3 : 100);
  const fighter2MaxHp = battleResult?.combatants.fighter2.initialHp ?? (fighter2 ? fighter2.stats.hp * 3 : 100);
  let currentFighter1Hp = fighter1MaxHp;
  let currentFighter2Hp = fighter2MaxHp;

  if (battleResult) {
    battleResult.turns.slice(0, currentTurnIndex).forEach((turn) => {
      if (turn.defenderId === battleResult.combatants.fighter1.id) {
        currentFighter1Hp = turn.defenderRemainingHp;
      } else if (turn.defenderId === battleResult.combatants.fighter2.id) {
        currentFighter2Hp = turn.defenderRemainingHp;
      }
    });
  }
  const fighter1HpPct = Math.max(0, Math.min(100, (currentFighter1Hp / fighter1MaxHp) * 100));
  const fighter2HpPct = Math.max(0, Math.min(100, (currentFighter2Hp / fighter2MaxHp) * 100));

  return (
    <div className="app-root">
      {/* Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand" onClick={() => setCurrentTab('pokedex')}>
            <div className="brand-icon" />
            <div>
              <span className="brand-title">Pokémon Master</span>
              <span className="badge-version">v1.2 Fullstack</span>
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
              🛡️ Time Estratégico {currentTeamDraft.length > 0 && `(${currentTeamDraft.length}/6)`}
            </button>
            <button
              className={`nav-tab ${currentTab === 'battle' ? 'active' : ''}`}
              onClick={() => setCurrentTab('battle')}
            >
              ⚔️ Arena de Batalha
            </button>
            <button
              className={`nav-tab ${currentTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setCurrentTab('quiz')}
            >
              ❓ Quem é esse Pokémon?
            </button>
            <a
              href={`${window.location.origin}/api/docs`}
              target="_blank"
              rel="noreferrer"
              className="nav-tab"
              title="Abrir Documentação Swagger OpenAPI 3.0"
            >
              📜 Swagger API ↗
            </a>
          </nav>

          {/* Health Badge & Global Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              className={`btn-icon-sm ${globalShiny ? 'active' : ''}`}
              onClick={() => {
                setGlobalShiny(!globalShiny);
                showToast(globalShiny ? 'Sprites normais ativados' : '✨ Modo Shiny ativado!');
              }}
              title="Alternar Sprites Shiny em toda a aplicação"
            >
              ✨
            </button>

            <div className={`health-badge ${healthStatus ? 'online' : 'offline'}`}>
              <span className="health-dot" />
              {healthStatus ? (
                <span>API Online ({healthStatus.uptime}s)</span>
              ) : (
                <span style={{ color: '#f87171' }}>API Offline</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Floating toast notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid var(--accent-red)',
            color: 'white',
            padding: '14px 22px',
            borderRadius: '12px',
            fontWeight: '600',
            boxShadow: '0 12px 30px rgba(0,0,0,0.6)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'float 2s ease-in-out infinite',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="container main-content">
        {/* ==================== TAB 1: POKEDEX ==================== */}
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
                    placeholder="Buscar por nome ou número (ex: Pikachu, 25, Mewtwo)..."
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
                  <option value="id">Ordenar por: Número Pokédex</option>
                  <option value="name">Ordenar por: Nome (A-Z)</option>
                  <option value="total">Ordenar por: Atributos Totais (BST)</option>
                  <option value="attack">Ordenar por: Maior Ataque</option>
                  <option value="defense">Ordenar por: Maior Defesa</option>
                  <option value="speed">Ordenar por: Maior Velocidade</option>
                  <option value="hp">Ordenar por: Maior HP</option>
                </select>

                <button
                  className="btn-secondary"
                  onClick={handleSurpriseMe}
                  title="Encontro surpresa com um Pokémon aleatório"
                >
                  🎲 Surpreenda-me!
                </button>
              </div>

              {/* Type Filter Chips */}
              <div className="type-filter-chips">
                <button
                  className={`type-chip ${selectedType === '' && !showFavoritesOnly ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedType('');
                    setShowFavoritesOnly(false);
                    setPage(1);
                  }}
                >
                  Todos ({totalCount})
                </button>

                <button
                  className={`type-chip ${showFavoritesOnly ? 'selected' : ''}`}
                  onClick={() => {
                    setShowFavoritesOnly(!showFavoritesOnly);
                    setPage(1);
                  }}
                  style={{
                    color: showFavoritesOnly ? '#ef4444' : undefined,
                    borderColor: showFavoritesOnly ? '#ef4444' : undefined,
                  }}
                >
                  ❤️ Favoritos ({favorites.length})
                </button>

                {typesList.map((type) => (
                  <button
                    key={type}
                    className={`type-chip ${selectedType === type ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedType(selectedType === type ? '' : type);
                      setShowFavoritesOnly(false);
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
                ⚡ Carregando Pokémon do banco de dados...
              </div>
            ) : pokemonList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <h3>Nenhum Pokémon encontrado.</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Tente alterar o termo de busca ou remover os filtros de tipo.
                </p>
              </div>
            ) : (
              <div className="pokemon-grid">
                {pokemonList.map((p) => {
                  const isFav = favorites.includes(p.id);
                  const spriteUrl = globalShiny
                    ? p.sprites.frontShiny || p.sprites.officialArtwork
                    : p.sprites.officialArtwork || p.sprites.frontDefault;

                  return (
                    <div key={p.id} className="glass-panel pokemon-card">
                      <div className="card-top">
                        <span className="pokemon-id">#{String(p.id).padStart(3, '0')}</span>
                        <div className="card-top-actions">
                          <button
                            className="btn-icon-sm"
                            onClick={() => playCry(p.cryUrl)}
                            title="Tocar o grito oficial do Pokémon"
                          >
                            🔊
                          </button>
                          <button
                            className={`btn-icon-sm ${isFav ? 'active' : ''}`}
                            onClick={() => toggleFavorite(p.id)}
                            title={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                          >
                            {isFav ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>

                      <div className="card-sprite-wrap" onClick={() => handleOpenDetail(p)}>
                        <div className="card-sprite-bg" />
                        <img
                          src={spriteUrl}
                          alt={p.name}
                          className="card-sprite float-hover"
                          loading="lazy"
                        />
                      </div>

                      <div className="card-info">
                        <div className="pokemon-name">
                          <span>{p.formattedName}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            BST {p.stats.total}
                          </span>
                        </div>

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
                            Detalhes
                          </button>
                          <button
                            className="btn-add-team"
                            onClick={() => handleAddToTeam(p)}
                            title="Adicionar à bancada do time"
                          >
                            + Time
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                  ← Página Anterior
                </button>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Página {page} de {totalPages}
                </span>
                <button
                  className="btn-detail"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  style={{ opacity: page >= totalPages ? 0.4 : 1 }}
                >
                  Próxima Página →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: TEAM BUILDER ==================== */}
        {currentTab === 'teams' && (
          <div className="team-builder-wrap">
            {/* Draft Bench Panel */}
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
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                    🛡️ Montagem de Time ({currentTeamDraft.length}/6 Pokémon)
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    Escolha de 1 a 6 integrantes. Analise a cobertura ofensiva e pontos fracos defensivos da equipe.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button className="btn-secondary" onClick={handleAutoFillTeam}>
                    🎲 Gerar Time Aleatório
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleSaveTeam}
                    disabled={currentTeamDraft.length === 0}
                  >
                    💾 Salvar Time na API
                  </button>
                </div>
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
                  style={{ maxWidth: '320px' }}
                  placeholder="Nome do Time (ex: Mestres de Kanto)..."
                  value={teamNameInput}
                  onChange={(e) => setTeamNameInput(e.target.value)}
                />
                <input
                  type="text"
                  className="search-input"
                  style={{ flex: 1 }}
                  placeholder="Estratégia do time (opcional)..."
                  value={teamDescInput}
                  onChange={(e) => setTeamDescInput(e.target.value)}
                />
              </div>

              {/* 6 Bench Slots */}
              <div className="team-bench">
                {[0, 1, 2, 3, 4, 5].map((index) => {
                  const member = currentTeamDraft[index];
                  return (
                    <div key={index} className={`team-slot ${member ? 'filled' : ''}`}>
                      {member ? (
                        <>
                          <button
                            className="slot-remove"
                            onClick={() => handleRemoveFromTeam(index)}
                            title="Remover integrante"
                          >
                            ✕
                          </button>
                          <img
                            src={globalShiny
                              ? member.pokemon.sprites.frontShiny || member.pokemon.sprites.frontDefault
                              : member.pokemon.sprites.frontDefault}
                            alt={member.pokemon.name}
                            style={{ height: '70px', objectFit: 'contain' }}
                          />
                          <input
                            type="text"
                            value={member.nickname}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCurrentTeamDraft((prev) =>
                                prev.map((m, i) => (i === index ? { ...m, nickname: val } : m))
                              );
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              borderBottom: '1px solid rgba(255,255,255,0.2)',
                              color: 'white',
                              textAlign: 'center',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              width: '90%',
                              outline: 'none',
                              marginBottom: '4px',
                            }}
                            title="Clique para editar apelido"
                          />
                          <div style={{ display: 'flex', gap: '3px' }}>
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
                          <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '4px' }}>
                            +
                          </span>
                          Slot {index + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Team Synergy Analytics */}
              {currentTeamDraft.length > 0 && (
                <div className="team-analytics-card">
                  <div className="team-stat-metric">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      MÉDIA DE ATRIBUTOS (BST)
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
                      {teamAvgBst} pts
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Total de Integrantes: {currentTeamDraft.length}/6
                    </span>
                  </div>

                  <div className="team-stat-metric">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      COBERTURA ELEMENTAR ({teamTypeCoverages.length} Tipos)
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {teamTypeCoverages.map((t) => (
                        <span
                          key={t}
                          className={`type-pill badge-${t}`}
                          style={{ fontSize: '0.65rem' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="team-stat-metric">
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      VULNERABILIDADES CRÍTICAS
                    </span>
                    {Object.keys(weaknessCountMap).length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                        {Object.entries(weaknessCountMap).map(([type, count]) => (
                          <span
                            key={type}
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#fca5a5',
                              padding: '2px 6px',
                              borderRadius: '6px',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                            }}
                          >
                            ⚠️ {count}x fracos contra {type}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: '#34d399', fontSize: '0.8rem', marginTop: '4px' }}>
                        🛡️ Equipe bem equilibrada defensivamente!
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Saved Teams List */}
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1.25rem' }}>
                Equipes Salvas no Banco de Dados ({savedTeams.length})
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '1.5rem',
                }}
              >
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
                        <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{team.name}</h4>
                        {team.description && (
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            {team.description}
                          </p>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleBattleWithSavedTeam(team)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            color: '#f87171',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                          title="Lutar com este time na arena"
                        >
                          ⚔️ Batalhar
                        </button>
                        <button
                          onClick={() => handleLoadSavedTeamToDraft(team)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid var(--border-subtle)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                          title="Carregar para bancada"
                        >
                          Carregar
                        </button>
                        <button
                          onClick={() => handleDeleteSavedTeam(team.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: 'none',
                            color: '#f87171',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>

                    {/* Member sprites */}
                    <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0', flexWrap: 'wrap' }}>
                      {team.members.map((m) => (
                        <div
                          key={m.order}
                          style={{
                            textAlign: 'center',
                            background: 'rgba(0,0,0,0.2)',
                            borderRadius: '8px',
                            padding: '4px',
                          }}
                        >
                          <img
                            src={globalShiny
                              ? m.pokemon.sprites.frontShiny || m.pokemon.sprites.frontDefault
                              : m.pokemon.sprites.frontDefault}
                            alt={m.pokemon.name}
                            style={{ width: '46px', height: '46px', objectFit: 'contain' }}
                            title={`${m.nickname || m.pokemon.formattedName} (${m.pokemon.types.join('/')})`}
                          />
                          <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)' }}>
                            {m.nickname || m.pokemon.formattedName}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Type Coverage */}
                    <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Cobertura da Equipe:
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

        {/* ==================== TAB 3: BATTLE ARENA ==================== */}
        {currentTab === 'battle' && (
          <div className="battle-arena-container">
            <div className="glass-panel battle-arena-card">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>⚔️ Arena Pokémon</h2>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Simulador autêntico com cálculo de velocidade, eficácia de tipos, golpes icônicos e acertos críticos!
                </p>

                {/* Battle Mode Toggle */}
                <div style={{ display: 'inline-flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                  <button
                    className={`nav-tab ${battleMode === '1v1' ? 'active' : ''}`}
                    onClick={() => setBattleMode('1v1')}
                  >
                    🥊 Duelo 1x1
                  </button>
                  <button
                    className={`nav-tab ${battleMode === 'teams' ? 'active' : ''}`}
                    onClick={() => setBattleMode('teams')}
                  >
                    🛡️ Batalha de Equipes (Time vs Ginásio)
                  </button>
                </div>
              </div>

              {/* 1v1 Battle Selector */}
              {battleMode === '1v1' && (
                <>
                  <div className="combatants-row">
                    {/* Challenger 1 */}
                    <div className="fighter-card">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        DESAFIANTE 1
                      </span>
                      <select
                        className="sort-select"
                        style={{ width: '100%', margin: '0.75rem 0' }}
                        value={fighter1Id}
                        onChange={(e) => setFighter1Id(Number(e.target.value))}
                      >
                        {allPokemonRoster.map((p) => (
                          <option key={p.id} value={p.id}>
                            #{p.id} {p.formattedName} ({p.types.join('/')})
                          </option>
                        ))}
                      </select>

                      <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={globalShiny
                            ? fighter1?.sprites.frontShiny || fighter1?.sprites.officialArtwork
                            : fighter1?.sprites.officialArtwork || fighter1?.sprites.frontDefault}
                          alt={fighter1?.name}
                          style={{ maxHeight: '130px', objectFit: 'contain' }}
                          className="float-hover"
                        />
                      </div>

                      {/* HP Meter */}
                      <div className="hp-bar-wrap">
                        <div
                          className="hp-bar-fill"
                          style={{
                            width: `${fighter1HpPct}%`,
                            backgroundColor:
                              fighter1HpPct > 50 ? '#10b981' : fighter1HpPct > 20 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        HP: {currentFighter1Hp} / {fighter1MaxHp}
                      </span>
                    </div>

                    <div className="vs-badge">VS</div>

                    {/* Challenger 2 */}
                    <div className="fighter-card">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        DESAFIANTE 2
                      </span>
                      <select
                        className="sort-select"
                        style={{ width: '100%', margin: '0.75rem 0' }}
                        value={fighter2Id}
                        onChange={(e) => setFighter2Id(Number(e.target.value))}
                      >
                        {allPokemonRoster.map((p) => (
                          <option key={p.id} value={p.id}>
                            #{p.id} {p.formattedName} ({p.types.join('/')})
                          </option>
                        ))}
                      </select>

                      <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                          src={globalShiny
                            ? fighter2?.sprites.frontShiny || fighter2?.sprites.officialArtwork
                            : fighter2?.sprites.officialArtwork || fighter2?.sprites.frontDefault}
                          alt={fighter2?.name}
                          style={{ maxHeight: '130px', objectFit: 'contain' }}
                          className="float-hover"
                        />
                      </div>

                      {/* HP Meter */}
                      <div className="hp-bar-wrap">
                        <div
                          className="hp-bar-fill"
                          style={{
                            width: `${fighter2HpPct}%`,
                            backgroundColor:
                              fighter2HpPct > 50 ? '#10b981' : fighter2HpPct > 20 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                        HP: {currentFighter2Hp} / {fighter2MaxHp}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      className="btn-primary"
                      onClick={handleSimulate1v1}
                      disabled={battleLoading || fighter1Id === fighter2Id}
                      style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}
                    >
                      {battleLoading ? '⚡ Simulando Duelo...' : '🔥 Iniciar Batalha 1x1'}
                    </button>

                    {battleResult && (
                      <>
                        <button
                          className="btn-secondary"
                          onClick={() => setIsPlayingAuto(!isPlayingAuto)}
                        >
                          {isPlayingAuto ? '⏸️ Pausar' : '▶️ Auto Play'}
                        </button>
                        <button
                          className="btn-secondary"
                          disabled={currentTurnIndex >= battleResult.turns.length}
                          onClick={() => setCurrentTurnIndex((prev) => Math.min(battleResult.turns.length, prev + 1))}
                        >
                          ⏭️ Avançar Turno
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => setCurrentTurnIndex(battleResult.turns.length)}
                        >
                          ⚡ Ver Resultado Final
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Team vs Team Selector */}
              {battleMode === 'teams' && (
                <div>
                  <div className="combatants-row">
                    {/* Team 1 */}
                    <div className="fighter-card">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        SEU TIME REGISTRADO
                      </span>
                      {savedTeams.length === 0 ? (
                        <p style={{ color: '#f87171', margin: '1rem 0' }}>
                          Nenhum time salvo ainda! Crie um time na aba "Time Estratégico".
                        </p>
                      ) : (
                        <select
                          className="sort-select"
                          style={{ width: '100%', margin: '0.75rem 0' }}
                          value={selectedSavedTeam1Id}
                          onChange={(e) => setSelectedSavedTeam1Id(e.target.value)}
                        >
                          {savedTeams.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.name} ({t.members.length} Pokémon)
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="vs-badge">VS</div>

                    {/* Team 2 Rival */}
                    <div className="fighter-card">
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        LÍDER DE GINÁSIO / RIVAL
                      </span>
                      <select
                        className="sort-select"
                        style={{ width: '100%', margin: '0.75rem 0' }}
                        value={rivalTeamPreset}
                        onChange={(e) => setRivalTeamPreset(e.target.value)}
                      >
                        <option value="rival-blue">Gym Leader Gary (Rival Campeão - 6 Pokémon)</option>
                        <option value="rival-brock">Gym Leader Brock (Ginásio de Pedra - 3 Pokémon)</option>
                        <option value="rival-misty">Gym Leader Misty (Ginásio de Água - 4 Pokémon)</option>
                        <option value="rival-rocket">Team Rocket Giovanni (Chefão - 5 Pokémon)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                      className="btn-primary"
                      onClick={handleSimulateTeamBattle}
                      disabled={battleLoading || savedTeams.length === 0}
                      style={{ fontSize: '1.05rem', padding: '0.9rem 2.5rem' }}
                    >
                      {battleLoading ? '⚡ Simulando Guerra de Equipes...' : '🛡️ Iniciar Batalha de Equipes'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 1v1 Battle Result Presentation */}
            {battleResult && battleMode === '1v1' && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '14px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>
                    🏆
                  </span>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>
                    Vencedor: {battleResult.winner.name}!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                    Batalha encerrada em {battleResult.totalTurns} turnos com {battleResult.winner.remainingHp} HP restante.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 800 }}>Registro dos Golpes (Turno {Math.min(currentTurnIndex, battleResult.turns.length)} de {battleResult.turns.length}):</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {isPlayingAuto ? '▶️ Reproduzindo automaticamente...' : '⏸️ Pausado'}
                  </span>
                </div>

                <div className="battle-log-box">
                  {battleResult.log.slice(0, currentTurnIndex + 1).map((line, idx) => (
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
                              : line.includes('critical hit')
                                ? '#38bdf8'
                                : '#cbd5e1',
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Battle Result Presentation */}
            {teamBattleResult && battleMode === 'teams' && (
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '14px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '2.8rem', display: 'block', marginBottom: '8px' }}>
                    👑
                  </span>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#34d399' }}>
                    Vitória de {teamBattleResult.winningTeamName}!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                    Duelos disputados: {teamBattleResult.totalRounds} rodadas intensas.
                  </p>
                </div>

                <h4 style={{ marginBottom: '1rem', fontWeight: 800 }}>Relatório dos Confrontos:</h4>
                <div className="battle-log-box">
                  {teamBattleResult.log.map((line, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '3px 0',
                        color: line.includes('VICTORY')
                          ? '#10b981'
                          : line.includes('ROUND')
                            ? '#f59e0b'
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

        {/* ==================== TAB 4: QUIZ ==================== */}
        {currentTab === 'quiz' && (
          <div className="glass-panel quiz-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>PONTUAÇÃO</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>
                  {quizScore} pts
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>SEQUÊNCIA ATUAL</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>
                  🔥 {quizStreak} (Recorde: {quizBestStreak})
                </h3>
              </div>
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '1.5rem' }}>
              Quem é esse Pokémon?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Ouça o grito ou adivinhe pela silhueta autêntica!
            </p>

            {quizPokemon && (
              <>
                <div className="quiz-silhouette-wrap">
                  <img
                    src={quizPokemon.sprites.officialArtwork || quizPokemon.sprites.frontDefault}
                    alt="Mystery Pokemon"
                    className={`quiz-silhouette ${quizRevealed ? 'revealed' : ''}`}
                  />
                </div>

                {quizRevealed && (
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>
                      É o {quizPokemon.formattedName}!
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '4px' }}>
                      {quizPokemon.types.map((t) => (
                        <span key={t} className={`type-pill badge-${t}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="quiz-options-grid">
                  {quizOptions.map((opt) => {
                    let btnClass = 'btn-quiz-option';
                    if (quizRevealed) {
                      if (opt.id === quizPokemon.id) {
                        btnClass += ' correct';
                      } else if (opt.id === quizSelectedId) {
                        btnClass += ' wrong';
                      }
                    }

                    return (
                      <button
                        key={opt.id}
                        className={btnClass}
                        disabled={quizRevealed}
                        onClick={() => handleQuizAnswer(opt)}
                      >
                        {opt.formattedName}
                      </button>
                    );
                  })}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                  <button className="btn-secondary" onClick={() => playCry(quizPokemon.cryUrl)}>
                    🔊 Tocar Grito Novamente
                  </button>
                  <button
                    className="btn-primary"
                    disabled={!quizRevealed}
                    onClick={() => initNewQuizQuestion(allPokemonRoster)}
                  >
                    Próximo Pokémon ➔
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* ==================== DETAIL MODAL ==================== */}
      {selectedPokemon && (
        <div className="modal-overlay" onClick={() => setSelectedPokemon(null)}>
          <div className="glass-panel modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPokemon(null)}>
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span className="pokemon-id" style={{ fontSize: '1rem' }}>
                #{String(selectedPokemon.id).padStart(3, '0')}
              </span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginTop: '2px' }}>
                {selectedPokemon.formattedName}
              </h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {selectedPokemon.types.map((t) => (
                  <span key={t} className={`type-pill badge-${t}`}>
                    {t}
                  </span>
                ))}
                <button
                  className="btn-icon-sm"
                  onClick={() => playCry(selectedPokemon.cryUrl)}
                  title="Tocar grito"
                >
                  🔊
                </button>
              </div>
            </div>

            {/* Sprite Display + View Switchers */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.25)',
                borderRadius: '16px',
                padding: '2rem',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                <button
                  className={`btn-icon-sm ${modalShinyView ? 'active' : ''}`}
                  onClick={() => setModalShinyView(!modalShinyView)}
                  title="Alternar versão Shiny"
                >
                  ✨
                </button>
                <button
                  className={`btn-icon-sm ${modalAnimatedView ? 'active' : ''}`}
                  onClick={() => setModalAnimatedView(!modalAnimatedView)}
                  title="Alternar GIF animado"
                >
                  🎬
                </button>
              </div>

              <img
                src={
                  modalAnimatedView
                    ? (modalShinyView ? selectedPokemon.sprites.animatedShiny : selectedPokemon.sprites.animatedFront) ||
                    selectedPokemon.sprites.frontDefault
                    : modalShinyView
                      ? selectedPokemon.sprites.frontShiny || selectedPokemon.sprites.officialArtwork
                      : selectedPokemon.sprites.officialArtwork || selectedPokemon.sprites.frontDefault
                }
                alt={selectedPokemon.name}
                style={{ maxHeight: '190px', objectFit: 'contain' }}
                className="float-hover"
              />
            </div>

            {/* Flavor Text Quote */}
            {selectedPokemon.flavorText && (
              <p
                style={{
                  fontStyle: 'italic',
                  color: 'var(--text-muted)',
                  textAlign: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                }}
              >
                "{selectedPokemon.flavorText}"
              </p>
            )}

            {/* Evolution Chain */}
            {selectedPokemon.evolutionChain && selectedPokemon.evolutionChain.length > 1 && (
              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                  LINHA EVOLUTIVA:
                </h4>
                <div className="evolution-chain-wrap">
                  {selectedPokemon.evolutionChain.map((member, idx) => (
                    <React.Fragment key={member.id}>
                      {idx > 0 && <span className="evolution-arrow">➔</span>}
                      <div
                        className={`evolution-node ${member.id === selectedPokemon.id ? 'current' : ''}`}
                        onClick={async () => {
                          const target = await fetchPokemonDetail(member.id);
                          handleOpenDetail(target);
                        }}
                        title={`Ver ${member.name}`}
                      >
                        <img
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${member.id}.png`}
                          alt={member.name}
                        />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'capitalize' }}>
                          {member.name}
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Physical Characteristics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                background: 'rgba(15, 23, 42, 0.7)',
                padding: '1rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Altura</span>
                <p style={{ fontWeight: 800 }}>{selectedPokemon.height} m</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Peso</span>
                <p style={{ fontWeight: 800 }}>{selectedPokemon.weight} kg</p>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Habilidades</span>
                <p style={{ fontWeight: 700, fontSize: '0.8rem' }}>
                  {selectedPokemon.abilities.map((a) => a.name).join(', ')}
                </p>
              </div>
            </div>

            {/* Base Stats */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', fontWeight: 800 }}>
                Atributos Base (BST: {selectedPokemon.stats.total})
              </h4>
              {[
                { label: 'HP', val: selectedPokemon.stats.hp, max: 255 },
                { label: 'Ataque', val: selectedPokemon.stats.attack, max: 190 },
                { label: 'Defesa', val: selectedPokemon.stats.defense, max: 230 },
                { label: 'Atq. Especial', val: selectedPokemon.stats.specialAttack, max: 194 },
                { label: 'Def. Especial', val: selectedPokemon.stats.specialDefense, max: 230 },
                { label: 'Velocidade', val: selectedPokemon.stats.speed, max: 200 },
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

            {/* Type Matchups */}
            {loadingModal ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                Calculando fraquezas e vantagens elementares...
              </p>
            ) : pokemonMatchup ? (
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem', fontWeight: 800 }}>
                  Análise Defensiva de Tipos
                </h4>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700 }}>
                    Fraquezas (recebe 2x/4x dano):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {pokemonMatchup.weaknesses.length > 0 ? (
                      pokemonMatchup.weaknesses.map((t) => (
                        <span key={t} className={`type-pill badge-${t}`} style={{ fontSize: '0.65rem' }}>
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nenhuma</span>
                    )}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>
                    Resistências (recebe 0.5x/0.25x dano):
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                    {pokemonMatchup.resistances.length > 0 ? (
                      pokemonMatchup.resistances.map((t) => (
                        <span key={t} className={`type-pill badge-${t}`} style={{ fontSize: '0.65rem' }}>
                          {t}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nenhuma</span>
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem' }}>
              <button
                className="btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  handleAddToTeam(selectedPokemon);
                  setSelectedPokemon(null);
                }}
              >
                + Adicionar à Bancada de Times
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
