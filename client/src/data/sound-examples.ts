export interface SoundExample {
  id: string;
  name: string;
  decibels: number;
  description: string;
  icon: string;
  category: 'quiet' | 'normal' | 'loud' | 'dangerous';
  energyIntensity: number; // W/m²
}

export const soundExamples: SoundExample[] = [
  {
    id: 'threshold',
    name: 'Threshold of hearing',
    decibels: 0,
    description: 'The quietest sound a human can hear',
    icon: 'fas fa-volume-off',
    category: 'quiet',
    energyIntensity: 1e-12
  },
  {
    id: 'whisper',
    name: 'Library whisper',
    decibels: 30,
    description: 'Very quiet whisper in a library',
    icon: 'fas fa-volume-down',
    category: 'quiet',
    energyIntensity: 1e-9
  },
  {
    id: 'conversation',
    name: 'Normal conversation',
    decibels: 60,
    description: 'Typical conversation at home',
    icon: 'fas fa-volume-up',
    category: 'normal',
    energyIntensity: 1e-6
  },
  {
    id: 'traffic',
    name: 'City traffic',
    decibels: 85,
    description: 'Heavy traffic on a busy street',
    icon: 'fas fa-car',
    category: 'loud',
    energyIntensity: 3.16e-4
  },
  {
    id: 'lawnmower',
    name: 'Lawn mower',
    decibels: 90,
    description: 'Gas-powered lawn mower',
    icon: 'fas fa-tools',
    category: 'loud',
    energyIntensity: 1e-3
  },
  {
    id: 'motorcycle',
    name: 'Motorcycle',
    decibels: 95,
    description: 'Motorcycle engine at close range',
    icon: 'fas fa-motorcycle',
    category: 'loud',
    energyIntensity: 3.16e-3
  },
  {
    id: 'jackhammer',
    name: 'Jackhammer',
    decibels: 110,
    description: 'Construction jackhammer',
    icon: 'fas fa-hammer',
    category: 'dangerous',
    energyIntensity: 1e-1
  },
  {
    id: 'rock-concert',
    name: 'Rock concert',
    decibels: 115,
    description: 'Front row at a rock concert',
    icon: 'fas fa-music',
    category: 'dangerous',
    energyIntensity: 3.16e-1
  },
  {
    id: 'jet-engine',
    name: 'Jet engine',
    decibels: 140,
    description: 'Jet engine at takeoff',
    icon: 'fas fa-plane',
    category: 'dangerous',
    energyIntensity: 100
  }
];

export const extremeExamples = [
  {
    decibels: 180,
    name: 'Krakatoa volcanic eruption',
    description: 'The loudest sound in recorded history',
    comparison: 'Heard 3,000 miles away'
  },
  {
    decibels: 194,
    name: 'Theoretical air limit',
    description: 'Maximum sound level possible in air',
    comparison: 'Sound waves become shock waves'
  },
  {
    decibels: 210,
    name: 'Hypersonic shock wave',
    description: 'Beyond the realm of traditional sound',
    comparison: 'Matter begins to behave differently'
  },
  {
    decibels: 300,
    name: 'Supernova explosion',
    description: 'Theoretical decibel level of a supernova',
    comparison: 'If sound could travel through space'
  },
  {
    decibels: 500,
    name: 'Big Bang echo',
    description: 'Theoretical sound of universe creation',
    comparison: 'The birth of everything'
  },
  {
    decibels: 1000,
    name: 'Universal destruction',
    description: 'Energy to destroy galaxies',
    comparison: 'Transcends physics as we know it'
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: 'If a sound increases by 20 dB, by how much does its energy intensity increase?',
    options: [
      { value: 'a', text: '2 times' },
      { value: 'b', text: '20 times' },
      { value: 'c', text: '100 times' },
      { value: 'd', text: '1000 times' }
    ],
    correct: 'c',
    explanation: 'Each 10 dB increase represents a 10× energy increase. So 20 dB = 10² = 100× increase.'
  },
  {
    id: 2,
    question: 'What is the reference intensity (I₀) for the decibel scale?',
    options: [
      { value: 'a', text: '1 × 10⁻¹² W/m²' },
      { value: 'b', text: '1 × 10⁻⁶ W/m²' },
      { value: 'c', text: '1 × 10⁻³ W/m²' },
      { value: 'd', text: '1 W/m²' }
    ],
    correct: 'a',
    explanation: 'The reference intensity is 1 × 10⁻¹² W/m², which represents the threshold of human hearing.'
  },
  {
    id: 3,
    question: 'Why do we use a logarithmic scale for measuring sound?',
    options: [
      { value: 'a', text: 'It makes calculations easier' },
      { value: 'b', text: 'Human hearing perceives sound logarithmically' },
      { value: 'c', text: 'The range of sound intensities is enormous' },
      { value: 'd', text: 'Both B and C' }
    ],
    correct: 'd',
    explanation: 'Both human perception and the enormous range of sound intensities make logarithmic scale practical.'
  },
  {
    id: 4,
    question: 'At what decibel level does sound become physically impossible in air?',
    options: [
      { value: 'a', text: '140 dB' },
      { value: 'b', text: '160 dB' },
      { value: 'c', text: '194 dB' },
      { value: 'd', text: '220 dB' }
    ],
    correct: 'c',
    explanation: 'At around 194 dB, sound waves can no longer propagate through air and become shock waves.'
  },
  {
    id: 5,
    question: 'If Sound A is 90 dB and Sound B is 60 dB, how much more energy does Sound A have?',
    options: [
      { value: 'a', text: '30 times more' },
      { value: 'b', text: '100 times more' },
      { value: 'c', text: '1000 times more' },
      { value: 'd', text: '10,000 times more' }
    ],
    correct: 'c',
    explanation: 'The difference is 30 dB. Each 10 dB = 10× energy, so 30 dB = 10³ = 1000× more energy.'
  }
];
