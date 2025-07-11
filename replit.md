# Decibel Scale Learning App

## Overview

This is a full-stack educational web application built to teach users about the decibel scale and sound intensity measurements. The app features interactive calculators, educational content, quizzes, and extreme scenario exploration to help users understand logarithmic sound measurements.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: In-memory storage with fallback to database sessions
- **API Structure**: RESTful endpoints under `/api` prefix

### Build System
- **Development**: Vite dev server with Express API proxy
- **Production**: Static frontend served by Express with API routes
- **TypeScript**: Strict compilation with path aliases for clean imports
- **Bundling**: ESBuild for server-side code, Vite for client-side

## Key Components

### Educational Components
- **DecibelScale**: Interactive slider-based sound level explorer
- **DecibelCalculator**: Sound intensity and energy ratio calculators
- **InteractiveExercises**: Quiz system with progress tracking
- **ExtremeCalculator**: Theoretical extreme decibel calculations
- **Navigation**: Smooth scroll navigation between sections

### Data Layer
- **Database Schema**: User management with username/password authentication
- **Storage Interface**: Abstracted storage layer supporting both in-memory and database persistence
- **Sound Examples**: Comprehensive dataset of real-world sound measurements

### UI Foundation
- **Design System**: Consistent color palette with light/dark mode support
- **Component Library**: Complete set of accessible UI components
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## Data Flow

### Client-Side Flow
1. React components manage local UI state
2. TanStack Query handles server communication and caching
3. Form submissions use React Hook Form with Zod validation
4. Educational content is static with interactive JavaScript calculations

### Server-Side Flow
1. Express middleware handles request parsing and logging
2. API routes perform business logic and database operations
3. Storage layer abstracts database interactions
4. Error handling middleware provides consistent error responses

### Development Flow
1. Vite serves client-side code with hot module replacement
2. Express server runs simultaneously for API endpoints
3. Database migrations managed through Drizzle Kit
4. TypeScript compilation ensures type safety across the stack

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Headless UI component primitives
- **wouter**: Lightweight React router
- **zod**: Runtime type validation and schema definition

### Development Tools
- **drizzle-kit**: Database schema management and migrations
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds
- **tailwindcss**: Utility-first CSS framework

### Database Configuration
- **Connection**: Environment variable `DATABASE_URL` for database connection
- **Migrations**: Stored in `./migrations` directory
- **Schema**: Centralized in `./shared/schema.ts` for type sharing

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds optimized static assets to `dist/public`
2. **Server Build**: ESBuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations ensure schema is up-to-date

### Production Configuration
- **Static Serving**: Express serves built client assets
- **API Endpoints**: Server handles all `/api/*` routes
- **Database**: PostgreSQL connection via environment variables
- **Error Handling**: Comprehensive error boundaries and logging

### Development Environment
- **Hot Reload**: Vite HMR for client-side changes
- **Auto Restart**: tsx watches server files for changes
- **Database**: Local development database or shared staging instance
- **Environment Variables**: `.env` file for local configuration

### Replit Integration
- **Banner**: Development banner for non-Replit environments
- **Cartographer**: Code mapping for Replit IDE integration
- **Runtime Errors**: Modal overlay for development error handling