# AGENTS.md - Style Guide & Project Overview

This document serves as a foundational guide for any AI agent or developer working on the **Panel Contable Unergy** project. Adhere strictly to these patterns to maintain consistency.

## 🌟 Vision & Design System: "Unergy Glass"

The project follows a **Glassmorphism / Apple-inspired** aesthetic. The goal is to make the interface feel light, airy, and modern, appearing to float over a soft, decorative background.

### UI Standards (Tailwind CSS)
- **Glass Effect**: Use `bg-white/60` (Light) or `bg-zinc-900/60` (Dark) combined with `backdrop-blur-md` or `backdrop-blur-xl`.
- **Borders**: Subtle borders are mandatory to define glass edges. Use `border-white/40` (Light) or `border-zinc-800/50` (Dark).
- **Border Radius**: 
    - Main Containers/Sidebar: `rounded-3xl`
    - Buttons/Inputs/Small Cards: `rounded-xl` or `rounded-2xl`
- **Shadows**: Use `shadow-lg` or `shadow-xl` for depth. Avoid harsh shadows.
- **Color Palette**: 
    - **Primary**: Blue-600 (`#2563eb`)
    - **Neutral**: Zinc scale for dark mode, White/Zinc-100 for light mode.
    - **Status**: Success (Green-600), Error (Red-500), Warning (Orange-500).

## 🛠 Tech Stack
- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript (Strict typing required)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Notifications**: Sileo (Toast system). 
    - **Usage**: Always pass an object with `title` and `description`.
    - **Example**: `sileo.success({ title: "Success", description: "Data loaded" })`.
- **Linting/Formatting**: Biome (Run `npm run lint` and `npm run format`)

## 🔐 Authentication

The application uses a simple but secure **Middleware-based Authentication** system.

### How it works:
- **Shared Secret**: A master password is defined in `APP_PASSWORD` environment variable.
- **Login**: Users must enter this password at `/login`. Success sets an HTTP-only `auth_token` cookie.
- **Protection**: `src/middleware.ts` intercepts all requests. If the cookie is missing, it redirects to `/login`.
- **Refactoring**: This system is designed to be easily replaced by a full Auth provider (like NextAuth or a custom DB) by simply updating the `/api/auth/login` logic and the middleware check.

### Important Notes:
- API routes (except `/api/auth/*`) are also protected by the middleware.
- Logout is handled by `/api/auth/logout` which clears the cookie.

## 🏗 Architecture & Data Flow

### Data Management
- **Centralized State**: All sheet data is managed via `SheetContext.tsx`.
- **Consumer Hook**: Components MUST use `useSheet()` to access data, loading states, and filter setters.
- **Multi-level Filtering**: 
    - The API handles `investor` and `project` query parameters.
    - **Logic**: Filters are cumulative. If `investor` is selected, metrics and transactions filter by that investor. If a specific `project` is also selected, it narrows down to that project within the investor's scope.
    - **Dynamic Projects**: The project list is updated based on the selected investor to ensure only relevant projects are displayed.
- **Caching Strategy**: 
    - Both investor and project lists are cached in `localStorage` (`cached_investors`, `cached_projects`).
    - On mount, the UI renders the cached list while an background fetch updates it.

## 📝 Coding Conventions

### Component Best Practices
1. **Modularity**: Extract logical UI blocks into `src/components/`. 
   - *Example*: `ProjectSummary.tsx`, `TransactionsTable.tsx`.
2. **Independence**: Components should consume the `useSheet()` hook directly rather than receiving large data props (Prop Drilling).
3. **Atomic Metrics**: Use small sub-components or render functions for repeated patterns like individual metric items.
4. **Loading States**: Always implement skeleton loaders or shimmer effects within the component itself while `loading` is true.
5. **Types**: Use shared types from `src/types/sheets.ts`.

### Google Sheets Integration
- **Backend**: `/src/pages/api/sheets.ts` handles all communication with the Google Sheets API.
- **Compute Engine**: Use the `compute` utility for mathematical operations between multiple cells.
    - **Usage**:
      ```typescript
      const val = compute(get => 
        get({ Concepto: "A" }) + get({ Concepto: "B" }) - get({ Concepto: "C" })
      );
      ```
    - **Benefits**: Clean, readable, and leverages JS math power directly.
- **Authentication**: Service Account via `google-auth-library` using JWT object configuration.
    - **Usage**:
      ```typescript
      const auth = new google.auth.JWT({
        email,
        key: privateKey.replace(/\\n/g, "\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
      });
      ```
- **Validation**: Every request must validate the existence of the requested sheet (tab) before processing data.
- **Response Format**: 
    ```typescript
    {
      income: number;
      expenses: number;
      items: Transaction[];
      sheetExists: boolean;
      projectMetrics?: ProjectMetrics;
    }
    ```

### Frontend State Management
- **Dashboard**: Uses `useCallback` for fetching to prevent unnecessary re-renders.
- **Month Handling**: Sheet names are in Spanish (e.g., "Enero", "Febrero"). The UI must map these correctly to API queries.

## 📝 Coding Conventions

1. **Language**: 
   - **Code**: English (Variables, functions, comments, file names).
   - **UI Labels**: Spanish (To match the end-user's context and Sheet names).
2. **Components**:
   - Keep components modular. Large UI blocks in `index.tsx` should be moved to `/src/components` as they grow.
   - Use Lucide icons consistently for visual cues.
3. **Safety**:
   - **NEVER** log or expose `GOOGLE_PRIVATE_KEY` or `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
   - Always handle `loading` and `error` states gracefully with visual feedback (skeletons, Sileo toasts).

## 🚀 Efficiency Guidelines
- **Compactness**: Avoid excessive padding. The layout should be "High Density" but readable.
- **Responsiveness**: Mobile-first approach. Sidebar must transform into a drawer on small screens.
