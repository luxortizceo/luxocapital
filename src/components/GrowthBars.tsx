const CHART_HEIGHT = 224;

export function GrowthBars({ series }: { series: number[] }) {
  const displayed = series.filter((_, i) => series.length <= 10 || i % Math.ceil(series.length / 10) === 0).slice(0, 10);
  const max = Math.max(...displayed, 1);

  return (
    <div className="flex h-56 items-end gap-2 sm:gap-3" role="img" aria-label="Gráfica de crecimiento proyectado">
      {displayed.map((value, i) => {
        const heightPx = Math.max((value / max) * CHART_HEIGHT, 10);
        return (
          <div key={i} className="relative flex-1">
            <div
              className="relative w-full overflow-hidden rounded-t-md bg-gradient-to-t from-forest via-gold to-gold-bright transition-[height] duration-700 ease-out"
              style={{ height: `${heightPx}px` }}
            >
              <span className="absolute left-1/2 top-2 h-1 w-1 -translate-x-1/2 rounded-full bg-cream/70 animate-pulse-soft" aria-hidden="true" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
