# Seline Analytics Setup for Decibel Learning App

✅ **Seline Analytics is now configured!** This guide shows you how it's set up and how to customize it further.

## Current Setup

Seline analytics is already installed and configured in your app:

1. **Script added to HTML head** (`client/index.html`)
2. **Custom tracking utilities** created (`client/src/lib/seline-analytics.ts`)
3. **Ready for event tracking** in your components

## How to Get Your Project Token

1. Sign up at [seline.com](https://seline.com)
2. Create a new project for your decibel learning app
3. Copy your project token from the dashboard
4. Add it to the script tag in `client/index.html`:

```html
<!-- Update this line in client/index.html -->
<script data-token="YOUR_PROJECT_TOKEN" src="https://cdn.seline.so/seline.js" async></script>
```

## Option 1: Add to HTML Head (Recommended)

Add your analytics script to `client/index.html` in the `<head>` section, after the existing meta tags:

```html
<!-- Add your analytics code here, after line 120 in client/index.html -->
<script>
  // Your analytics tracking code goes here
  // Example for Plausible:
  // <script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
  
  // Example for Fathom:
  // <script src="https://cdn.usefathom.com/script.js" data-site="ABCDEFG" defer></script>
  
  // Example for custom analytics:
  // Your custom tracking code
</script>
```

## Option 2: Component-Based Tracking

Create a custom analytics component for tracking specific interactions:

### Create `client/src/lib/analytics.ts`:

```typescript
// Custom analytics utilities
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Replace with your analytics provider's tracking method
  console.log('Event:', eventName, properties);
  
  // Example for different providers:
  
  // Plausible:
  // window.plausible?.(eventName, { props: properties });
  
  // Fathom:
  // window.fathom?.('trackGoal', 'YOUR_GOAL_ID', properties?.value || 0);
  
  // Custom API:
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ event: eventName, properties })
  // });
};

export const trackPageView = (page: string) => {
  // Track page views
  trackEvent('page_view', { page });
};
```

### Add tracking to key interactions:

```typescript
// In your components, import and use:
import { trackEvent } from '@/lib/analytics';

// Track calculator usage
const handleCalculation = () => {
  trackEvent('decibel_calculation', {
    base_db: baseDecibel,
    compare_db: compareDecibel,
    energy_ratio: energyRatio
  });
};

// Track animation plays
const startAnimation = () => {
  trackEvent('animation_played', { animation: '10db_rule' });
  // ... rest of animation code
};

// Track quiz interactions
const handleQuizAnswer = (correct: boolean) => {
  trackEvent('quiz_answer', { correct, question: currentQuestion });
};
```

## Option 3: Environment-Based Setup

For different analytics in development vs production, add to your environment:

### In `client/src/main.tsx`:

```typescript
// Add after imports
if (import.meta.env.PROD) {
  // Production analytics only
  // Add your production analytics script here
}
```

## Popular Analytics Providers

### Plausible Analytics
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

### Fathom Analytics
```html
<script src="https://cdn.usefathom.com/script.js" data-site="ABCDEFG" defer></script>
```

### Simple Analytics
```html
<script async defer src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
```

### Umami Analytics
```html
<script async defer data-website-id="your-website-id" src="https://umami.yourdomain.com/umami.js"></script>
```

## Key Events to Track in Your Decibel App

Here are the important user interactions you might want to track:

1. **Calculator Usage**: When users perform calculations
2. **Animation Plays**: When users watch the 10 dB rule animation
3. **Quiz Interactions**: Quiz answers and completion
4. **Extreme Calculator**: Usage of cosmic-level calculations
5. **Navigation**: Which sections users visit most
6. **Time Spent**: How long users engage with each section

## Implementation Location

**Recommended approach**: Add the analytics script to `client/index.html` at line 120 (after the structured data scripts). This ensures tracking works across your entire app without modifying individual components.

Your decibel learning app will work perfectly with any analytics provider!