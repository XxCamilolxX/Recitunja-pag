import React, { useMemo, useState } from 'react';
import PageHero from '../components/ui/PageHero';
import SectionHeader from '../components/ui/SectionHeader';
import WaveDivider from '../components/ui/WaveDivider';
import { DAY_LABELS, ROUTE_SCHEDULES, ROUTE_SCHEDULES_UPDATED } from '../constants/routeSchedules';

const normalizeText = (value) =>
  value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const getMatches = (route, query) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return {
      isMatch: true,
      matchedNeighborhoods: [],
      nearbyNeighborhoods: route.neighborhoods,
    };
  }

  const matchedNeighborhoods = route.neighborhoods.filter((neighborhood) =>
    normalizeText(neighborhood).includes(normalizedQuery)
  );

  const searchableRouteText = normalizeText(
    `${route.macroRoute} ${route.macroCode} ${route.microCode} ${route.neighborhoods.join(' ')}`
  );

  return {
    isMatch: matchedNeighborhoods.length > 0 || searchableRouteText.includes(normalizedQuery),
    matchedNeighborhoods,
    nearbyNeighborhoods: route.neighborhoods.filter(
      (neighborhood) => !matchedNeighborhoods.includes(neighborhood)
    ),
  };
};

const formatFrequency = (frequency) =>
  frequency.map((day) => DAY_LABELS[day] || day).join(', ');

const RutasHorarios = () => {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim();

  const results = useMemo(
    () =>
      ROUTE_SCHEDULES.map((route) => ({
        ...route,
        ...getMatches(route, normalizedQuery),
      })).filter((route) => route.isMatch),
    [normalizedQuery]
  );

  const macroRouteCount = new Set(ROUTE_SCHEDULES.map((route) => route.macroCode)).size;
  const neighborhoodCount = ROUTE_SCHEDULES.reduce(
    (total, route) => total + route.neighborhoods.length,
    0
  );

  return (
    <div className="w-full bg-cream">
      <PageHero
        title="Rutas y horarios"
        description="Consulta las macro rutas, micro rutas, frecuencias y horarios de recolección de residuos aprovechables en Tunja."
      />
      <WaveDivider />

      <section className="relative z-10 bg-cream py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <SectionHeader eyebrow="Rutas y horarios" title="Consulta por barrio">
            Información tomada de la tabla de frecuencias de ReciTunja para {ROUTE_SCHEDULES_UPDATED}.
          </SectionHeader>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-secondary-dark/40"></i>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Buscar barrio o urbanización"
                className="w-full rounded-2xl border border-secondary-dark/10 bg-white py-4 pl-14 pr-28 text-base font-semibold text-secondary-dark shadow-sm outline-none transition-all duration-300 placeholder:text-secondary-dark/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-secondary-dark/10 px-4 py-2 text-xs font-bold text-secondary-dark/70 transition-colors hover:bg-secondary-dark/15"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="block text-2xl font-extrabold text-secondary-dark">{macroRouteCount}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary-dark/50">Macro rutas</span>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="block text-2xl font-extrabold text-secondary-dark">{ROUTE_SCHEDULES.length}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary-dark/50">Micro rutas</span>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <span className="block text-2xl font-extrabold text-secondary-dark">{neighborhoodCount}</span>
                <span className="text-xs font-semibold uppercase tracking-wide text-secondary-dark/50">Sectores</span>
              </div>
            </div>
          </div>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-secondary-dark/65">
              {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
              {normalizedQuery ? ` para "${normalizedQuery}"` : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(DAY_LABELS).map(([day, label]) => (
                <span key={day} className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-secondary-dark/55 shadow-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {results.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-2">
              {results.map((route) => (
                <article
                  key={`${route.macroCode}-${route.microCode}`}
                  className="rounded-2xl border border-secondary-dark/8 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {route.macroRoute}
                      </p>
                      <h3 className="mt-1 text-xl font-extrabold text-secondary-dark">
                        Micro ruta {route.microCode}
                      </h3>
                    </div>
                    <div className="rounded-xl bg-cream px-3 py-2 text-right">
                      <p className="text-[11px] font-bold uppercase text-secondary-dark/45">Código macro</p>
                      <p className="font-black text-secondary-dark">{route.macroCode}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-secondary-dark p-4 text-white">
                      <div className="mb-2 flex items-center gap-2 text-primary">
                        <i className="fa-regular fa-calendar-check"></i>
                        <span className="text-xs font-bold uppercase tracking-wide">Frecuencia</span>
                      </div>
                      <p className="text-base font-extrabold">{formatFrequency(route.frequency)}</p>
                    </div>
                    <div className="rounded-xl bg-primary/15 p-4 text-secondary-dark">
                      <div className="mb-2 flex items-center gap-2 text-primary-dark">
                        <i className="fa-regular fa-clock"></i>
                        <span className="text-xs font-bold uppercase tracking-wide">Horario</span>
                      </div>
                      <p className="text-base font-extrabold">{route.schedule}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-secondary-dark/45">
                      {route.matchedNeighborhoods.length ? 'Barrio encontrado' : 'Barrios cubiertos'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(route.matchedNeighborhoods.length ? route.matchedNeighborhoods : route.neighborhoods).map((neighborhood) => (
                        <span
                          key={neighborhood}
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            route.matchedNeighborhoods.includes(neighborhood)
                              ? 'bg-primary text-secondary-dark'
                              : 'bg-cream text-secondary-dark/70'
                          }`}
                        >
                          {neighborhood}
                        </span>
                      ))}
                    </div>
                  </div>

                  {route.matchedNeighborhoods.length > 0 && route.nearbyNeighborhoods.length > 0 && (
                    <div className="mt-4 border-t border-secondary-dark/8 pt-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-secondary-dark/45">
                        Barrios cercanos en la misma micro ruta
                      </p>
                      <p className="text-sm leading-relaxed text-secondary-dark/70">
                        {route.nearbyNeighborhoods.join(', ')}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-secondary-dark/8 bg-white p-10 text-center shadow-sm">
              <i className="fa-solid fa-route mb-4 text-4xl text-primary"></i>
              <h3 className="text-xl font-extrabold text-secondary-dark">Sin resultados</h3>
              <p className="mt-2 text-sm text-secondary-dark/60">
                Intenta con otro barrio, urbanización o código de ruta.
              </p>
            </div>
          )}
        </div>
      </section>

      <WaveDivider from="bg-cream" to="text-secondary-dark" variant="dip" />
    </div>
  );
};

export default RutasHorarios;
