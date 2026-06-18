# ComplianceOS Admin Console - File Structure

## Project Overview
A production-ready admin console/team lead dashboard built with React, TypeScript, Vite, and Tailwind CSS. Features authentication, multi-page navigation, real-time analytics, employee tracking, and incentive management.

## File Organization

### Configuration Files
```
tailwind.config.ts          - Tailwind CSS configuration with custom theme
client/global.css           - Global styles, CSS variables, and Tailwind directives
package.json                - Project dependencies and scripts
```

### Layout Components (`client/components/layout/`)
- **Sidebar.tsx** - Side navigation with page selection and logout
- **TopBar.tsx** - Search bar, notifications, user profile
- **LoginPage.tsx** - Secure login interface with email/password

### Shared Components (`client/components/shared/`)
- **Avatar.tsx** - User avatar with color-coded initials
- **Badge.tsx** - Status/tag badges with color types and dot indicators
- **ProgressBar.tsx** - Visual progress indicators
- **StatCard.tsx** - KPI cards with icons, values, trends, and optional progress
- **Toast.tsx** - Toast notification system (bottom-right)
- **Pager.tsx** - Pagination controls with page numbers

### Page Components (`client/components/pages/`)
- **DashboardPage.tsx** - Team overview, attention required, regional spread, leaderboard
- **EmployeePage.tsx** - Team management, filtering, performance tracking, department distribution
- **TaskPage.tsx** - Task assignment queue, employee availability, live activity feed
- **ClientPage.tsx** - Client/project management, status filtering, deadline tracking
- **TrackingPage.tsx** - Real-time employee check-in/check-out, location, status
- **AnalyticsPage.tsx** - Performance trends charts, top performers, domain distribution
- **IncentivePage.tsx** - Monthly distribution bar chart, pool allocation, leaderboard, payout validation

### Entry Points
- **client/App.tsx** - Main application component with routing and state management
- **client/pages/Index.tsx** - Home page that renders App component

## Color Scheme & Design Tokens

The app uses a modern warm color palette with earthy tones:
- **Primary Gold**: `hsl(35, 85%, 55%)` - Actions, highlights, primary buttons
- **Dark**: `hsl(20, 10%, 12%)` - Sidebar, dark cards
- **Light Background**: `hsl(60, 15%, 97%)` - Page background
- **Text**: `hsl(20, 10%, 12%)` - Dark text for readability

### Color Usage
- Gold accents for interactive elements and highlights
- Dark backgrounds for sidebar and emphasis cards
- Stone/neutral grays for borders and secondary elements
- Semantic colors: Green (success/active), Red (alert), Blue (info), Purple (medium priority), Amber (warning)

## Component Features

### Authentication
- Login screen with email/password inputs
- Show/hide password toggle
- SSL encryption messaging

### Navigation
- Sidebar with 7 main pages
- Top bar with search, notifications, user profile
- Smooth page transitions

### Data Display
- Tables with sorting and pagination
- Charts (Line, Bar) using Recharts
- Progress bars and stats cards
- Status badges with color coding

### Interactions
- Toast notifications for actions
- Filterable tables and employee lists
- Action buttons with immediate feedback
- Modal-like confirmations

## Responsive Design
- Tailwind CSS responsive utilities
- Flexible grid layouts
- Mobile-friendly tables with overflow
- Scalable typography

## State Management
- React hooks (useState, useRef, useEffect)
- Local state for page navigation
- Toast notification system with timeout

## Key Features by Page

| Page | Key Features |
|------|--------------|
| Dashboard | Team KPIs, attention queue, regional spread, leaderboard |
| Employee | Team roster, performance filter, department distribution, training |
| Client | Client management, project status, deadline tracking |
| Task | Task queue, employee availability, live activity |
| Tracking | Check-in/out feed, location tracking, status dashboard |
| Analytics | Performance trends, top performers, domain distribution |
| Incentive | Distribution charts, pool allocation, leaderboard, payout validation |

## UI Component Library Used
- **lucide-react** - Icons (25+ icon types)
- **Recharts** - Analytics charts (LineChart, BarChart)
- **Tailwind CSS 3** - Styling and layout

## Git Workflow
All files are organized for clean commits:
1. Core configuration files (`tailwind.config.ts`, `global.css`)
2. Reusable components (`components/shared/`)
3. Layout components (`components/layout/`)
4. Page components (`components/pages/`)
5. Main app entry (`App.tsx`, `pages/Index.tsx`)

Ready to push to GitHub with organized, separated file structure!
