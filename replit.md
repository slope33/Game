# Overview

This is a React-based quiz application focused on Colombian geography and culture. The app features an interactive quiz game where users can test their knowledge about Colombia through multiple-choice questions. The application uses a modern tech stack with TypeScript, React, Express.js backend, and PostgreSQL database with Drizzle ORM for data management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Colombian-themed color scheme (yellow, blue, red)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for quiz questions and attempt tracking
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Custom request logging for API endpoints with timing metrics

## Data Layer
- **Database**: PostgreSQL with Neon serverless hosting
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Data Storage**: In-memory storage implementation with fallback for development
- **Validation**: Zod schemas for runtime type checking and API validation

## Database Schema
- **Users Table**: Basic user authentication (username, password)
- **Quiz Questions Table**: Questions with multiple choice answers, correct answer index, explanations, and categories
- **Quiz Attempts Table**: User quiz results tracking (score, total questions, completion timestamp)

## Component Structure
- **Quiz Flow**: Welcome screen → Quiz screen → Results screen
- **Reusable UI**: Comprehensive component library with cards, buttons, progress bars, toasts
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Accessibility**: Screen reader support and keyboard navigation

## Development Workflow
- **Hot Reload**: Vite development server with fast refresh
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared schemas
- **Code Quality**: ESLint and TypeScript compiler checks
- **Build Process**: Separate client and server builds with optimized production output

# External Dependencies

## Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Data Fetching**: TanStack Query for server state management
- **Utilities**: clsx for conditional classnames, date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

## Backend Dependencies
- **Server Framework**: Express.js for HTTP server
- **Database**: Neon serverless PostgreSQL, Drizzle ORM
- **Validation**: Zod for schema validation
- **Development**: TSX for TypeScript execution, ESBuild for production builds

## Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Database Management**: Drizzle Kit for schema migrations
- **Development Environment**: Replit-specific plugins for enhanced development experience
- **Type Checking**: TypeScript compiler with strict mode enabled

## External Services
- **Database Hosting**: Neon serverless PostgreSQL
- **Deployment**: Replit hosting platform
- **CDN**: Google Fonts for typography (Montserrat, Open Sans)