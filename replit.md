# Overview

This is a mobile phone simulator application called "Zona Cero RP" that replicates popular social media and communication apps within a simulated phone interface. The project simulates four major applications: Instagram, Tinder, Wallapop (marketplace), and WhatsApp, providing a realistic mobile experience for roleplay or demonstration purposes.

The application features a React-based frontend with a phone frame UI that displays a home screen with app icons, and each app provides core functionality like user registration, authentication, content creation, and interaction features typical of their real-world counterparts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the main application framework
- **Vite** as the build tool and development server for fast compilation and hot reloading
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Shadcn/ui** component library providing pre-built, accessible UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management, caching, and API interactions

## Backend Architecture
- **Express.js** server providing RESTful API endpoints
- **In-memory storage** using Map data structures for development/demo purposes
- **TypeScript** throughout the backend for type safety
- **Modular route structure** with separate handlers for each app's functionality
- **Shared schema definitions** between frontend and backend using Zod for validation

## Component Structure
- **Phone simulator wrapper** that provides the mobile device frame and status bar
- **App-specific components** for each simulated application (Instagram, Tinder, Wallapop, WhatsApp)
- **Shared UI components** from Shadcn/ui for consistent design patterns
- **Custom hooks** for phone storage simulation and mobile responsiveness

## Data Management
- **Drizzle ORM** configured for PostgreSQL with schema definitions
- **Zod schemas** for runtime validation and type inference
- **Local storage hooks** for persisting user sessions and app state
- **Shared type definitions** ensuring consistency between client and server

## Authentication Pattern
- **Simple credential-based auth** for each app independently
- **Session management** through local storage
- **User isolation** where each app maintains its own user base
- **Password validation** without encryption (suitable for demo purposes)

## Development Workflow
- **Hot module replacement** in development mode
- **TypeScript compilation** with strict type checking
- **Build process** that bundles both frontend and backend
- **Path aliases** for clean import statements and better organization

# External Dependencies

## Core Framework Dependencies
- **React ecosystem**: React 18, React DOM, React Hook Form for form management
- **Build tools**: Vite with TypeScript support, PostCSS, Autoprefixer
- **Routing**: Wouter for lightweight client-side navigation

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Modern icon library for consistent iconography
- **Font Awesome**: Icon library for social media and UI icons

## State Management and API
- **TanStack React Query**: Server state management and caching
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Form state management with validation

## Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit for PostgreSQL
- **Neon Database**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and introspection tools

## Development Tools
- **TypeScript**: Static type checking across the entire codebase
- **ESBuild**: Fast JavaScript bundler for production builds
- **TSX**: TypeScript execution for development server

## Utility Libraries
- **Date-fns**: Date manipulation and formatting
- **Nanoid**: URL-safe unique ID generation
- **Class Variance Authority**: Utility for managing conditional CSS classes
- **CLSX**: Conditional className utility for dynamic styling