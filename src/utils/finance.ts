export type GrowthInput = {
  initial: number;
  monthly: number;
  years: number;
  annualRate: number;
};

/** Calcula el valor futuro con aportaciones mensuales y capitalización mensual (ilustrativo). */
export function compoundGrowth({ initial, monthly, years, annualRate }: GrowthInput): number {
  const months = Math.max(Math.round(years * 12), 0);
  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return initial + monthly * months;
  }

  const growthFactor = Math.pow(1 + monthlyRate, months);
  const futureInitial = initial * growthFactor;
  const futureContributions = monthly * ((growthFactor - 1) / monthlyRate);
  return futureInitial + futureContributions;
}

/** Genera una serie anual del valor acumulado, útil para visualizaciones. */
export function growthSeries({ initial, monthly, years, annualRate }: GrowthInput): number[] {
  const series: number[] = [];
  const totalYears = Math.max(Math.round(years), 1);
  for (let y = 1; y <= totalYears; y++) {
    series.push(compoundGrowth({ initial, monthly, years: y, annualRate }));
  }
  return series;
}

export function formatMXN(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}
