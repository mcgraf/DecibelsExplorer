// Seline Analytics utilities for the Decibel Learning App
// Privacy-first, GDPR compliant analytics

declare global {
  interface Window {
    seline?: {
      track: (event: string, properties?: Record<string, any>) => void;
      page: () => void;
      setUser: (userData: Record<string, any>) => void;
    };
  }
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.seline) {
    window.seline.track(eventName, properties);
  }
};

export const trackPageView = () => {
  if (typeof window !== 'undefined' && window.seline) {
    window.seline.page();
  }
};

// Specific tracking functions for the decibel app
export const trackCalculation = (baseDb: number, compareDb: number, energyRatio: number) => {
  trackEvent('Decibel Calculation', {
    base_decibel: baseDb,
    compare_decibel: compareDb,
    energy_ratio: energyRatio,
    decibel_difference: Math.abs(compareDb - baseDb)
  });
};

export const trackAnimation = (animationType: string) => {
  trackEvent('Animation Played', {
    animation_type: animationType,
    page: window.location.pathname
  });
};

export const trackQuizAnswer = (questionId: string, isCorrect: boolean, answer: string) => {
  trackEvent('Quiz Answer', {
    question_id: questionId,
    correct: isCorrect,
    answer: answer,
    section: 'interactive_exercises'
  });
};

export const trackExtremeCalculation = (decibelLevel: number, scenario: string) => {
  trackEvent('Extreme Calculator Used', {
    decibel_level: decibelLevel,
    scenario: scenario,
    intensity_scientific: Math.pow(10, (decibelLevel - 10) / 10)
  });
};

export const trackSectionView = (sectionName: string) => {
  trackEvent('Section Viewed', {
    section: sectionName,
    page: window.location.pathname
  });
};

export const trackSliderUsage = (sliderType: string, value: number) => {
  trackEvent('Slider Interaction', {
    slider_type: sliderType,
    value: value,
    section: 'decibel_scale'
  });
};

export const trackNavigationClick = (destination: string) => {
  trackEvent('Navigation Click', {
    destination: destination,
    source_page: window.location.pathname
  });
};