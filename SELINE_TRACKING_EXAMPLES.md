# Seline Analytics Tracking Examples

## How to Add Tracking to Your Components

Here are examples of how to add Seline analytics tracking to your decibel learning app components.

### 1. Import the tracking functions

```typescript
import { trackCalculation, trackAnimation, trackQuizAnswer, trackSectionView } from "@/lib/seline-analytics";
```

### 2. Track Calculator Usage

In `decibel-visualization.tsx` or `decibel-calculator.tsx`:

```typescript
// Track when users perform calculations
const handleSliderChange = (value: number[]) => {
  setBaseDecibel(value[0]);
  
  // Track the calculation
  trackCalculation(
    value[0], 
    compareDecibel, 
    calculateEnergyRatio(value[0], compareDecibel)
  );
};
```

### 3. Track Animation Plays

In `decibel-visualization.tsx`:

```typescript
const startAnimation = () => {
  setIsAnimating(true);
  setAnimationStep(0);
  
  // Track animation usage
  trackAnimation('10db_rule_demonstration');
  
  // ... rest of animation code
};
```

### 4. Track Quiz Interactions

In `interactive-exercises.tsx`:

```typescript
const handleAnswerSelect = (answer: string) => {
  const isCorrect = answer === currentQuestion.correct;
  
  // Track quiz answers
  trackQuizAnswer(
    currentQuestion.id,
    isCorrect,
    answer
  );
  
  // ... rest of quiz logic
};
```

### 5. Track Section Views

In any component when users scroll to a section:

```typescript
useEffect(() => {
  // Track when section becomes visible
  trackSectionView('energy_visualization');
}, []);
```

### 6. Track Navigation

In `navigation.tsx`:

```typescript
const handleNavClick = (section: string) => {
  trackNavigationClick(section);
  // ... navigation logic
};
```

## Events You'll Be Tracking

With Seline analytics, you'll automatically track:

- **Page Views**: Automatic tracking of page visits
- **Decibel Calculations**: When users use the calculators
- **Animation Plays**: When users watch the 10 dB rule animation
- **Quiz Interactions**: Answers, correct/incorrect responses
- **Section Views**: Which educational sections users visit
- **Navigation**: How users move through the app
- **Extreme Calculator**: Usage of cosmic-level calculations
- **Slider Interactions**: How users interact with the sound scale

## Benefits of Seline for Your Educational App

- **Privacy-First**: No cookies, GDPR compliant
- **Lightweight**: ~1KB script, won't slow down your app
- **Real-time**: See user engagement immediately
- **Educational Insights**: Understand which sections are most engaging
- **Free Tier**: Up to 3,000 events/month included

## Next Steps

1. Sign up at [seline.com](https://seline.com)
2. Create a project for your decibel learning app
3. Add your project token to `client/index.html`
4. Deploy your app - tracking will start automatically!

Your analytics will help you understand how users learn about decibels and which features are most valuable for education.