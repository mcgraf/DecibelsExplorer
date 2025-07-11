export function calculateDecibelFromIntensity(intensity: number, referenceIntensity: number = 1e-12): number {
  if (intensity <= 0) return 0;
  return 10 * Math.log10(intensity / referenceIntensity);
}

export function calculateIntensityFromDecibel(decibels: number, referenceIntensity: number = 1e-12): number {
  return referenceIntensity * Math.pow(10, decibels / 10);
}

export function calculateEnergyRatio(decibel1: number, decibel2: number): number {
  const difference = Math.abs(decibel1 - decibel2);
  return Math.pow(10, difference / 10);
}

export function formatScientificNotation(value: number): string {
  if (value === 0) return '0';
  
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const mantissa = value / Math.pow(10, exponent);
  
  if (Math.abs(exponent) < 3) {
    return value.toFixed(6);
  }
  
  return `${mantissa.toFixed(2)} × 10${exponent >= 0 ? '⁺' : '⁻'}${Math.abs(exponent)}`;
}

export function getCosmicComparison(decibels: number): string {
  if (decibels < 200) {
    return 'Still within the realm of physical possibility';
  } else if (decibels < 300) {
    return 'Energy equivalent to detonating thousands of nuclear bombs per second';
  } else if (decibels < 500) {
    return 'Energy output of a supernova explosion - could destroy solar systems';
  } else if (decibels < 1000) {
    return 'Energy equivalent to the Big Bang - universe-creating levels';
  } else if (decibels < 2000) {
    return 'Energy to annihilate entire galaxies worth of matter';
  } else if (decibels < 5000) {
    return 'Energy density exceeding black hole event horizons';
  } else {
    return 'Energy levels that transcend our understanding of physics';
  }
}

export function getSoundCategory(decibels: number): 'quiet' | 'normal' | 'loud' | 'dangerous' {
  if (decibels < 40) return 'quiet';
  if (decibels < 70) return 'normal';
  if (decibels < 100) return 'loud';
  return 'dangerous';
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'quiet': return 'bg-green-100 text-green-800';
    case 'normal': return 'bg-blue-100 text-blue-800';
    case 'loud': return 'bg-orange-100 text-orange-800';
    case 'dangerous': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getHearingDamageWarning(decibels: number): string | null {
  if (decibels >= 140) {
    return 'Immediate permanent hearing damage - pain threshold exceeded';
  } else if (decibels >= 120) {
    return 'Pain threshold - immediate hearing damage possible';
  } else if (decibels >= 100) {
    return 'Dangerous - prolonged exposure causes hearing damage';
  } else if (decibels >= 85) {
    return 'Extended exposure may cause hearing damage';
  }
  return null;
}
