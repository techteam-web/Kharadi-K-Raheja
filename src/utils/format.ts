/** e.g. 14250 -> "14,250" */
export function formatArea(value: number): string {
  return value.toLocaleString('en-IN');
}

/** Rupees -> Crores with one decimal, e.g. 19000000 -> "1.9 Cr" */
export function formatPriceInCrores(value: number): string {
  return `${(value / 1e7).toFixed(1)} Cr`;
}
