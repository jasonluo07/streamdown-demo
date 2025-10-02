# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 project with React 19, using App Router architecture, TypeScript, and Tailwind CSS.

## Common Commands

### Development

```bash
npm run dev        # Start development server (using Turbopack)
```

Development server runs at http://localhost:4321 with hot reload support.

### Build & Deploy

```bash
npm run build      # Build production version (using Turbopack)
npm start          # Start production server
```

### Code Quality

```bash
npm run lint       # Run ESLint checks
npm run lint:fix   # Auto-fix ESLint issues
npm run format     # Format all files with Prettier
npm run format:check # Check code formatting
```

## Project Architecture

### Directory Structure

- `src/app/` - Main application directory for Next.js App Router
  - `page.tsx` - Home page component
  - `layout.tsx` - Root layout component with font configuration and global styles
  - `globals.css` - Global CSS styles
  - `favicon.ico` - Favicon

### Tech Stack

- **Framework**: Next.js 15.5.4 (using Turbopack as build tool)
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS 4 with PostCSS
- **Fonts**: Geist and Geist Mono (optimized via next/font)
- **Language**: TypeScript 5

### TypeScript Configuration

- Path alias: `~/*` maps to `./src/*`
- Strict mode enabled
- Target version: ES2017

## Development Guidelines

### Type Usage

- Never use `any` type
- Do not use `eslint-disable-next-line` to ignore `any` type
- Use more precise type definitions

### Component Development

- All pages and layout components are located in `src/app/` directory
- Use TypeScript for type checking
- Use Tailwind CSS for styling
