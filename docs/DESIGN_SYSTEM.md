# Design System

This document outlines the design system for **cvGenfy**, including typography, color palettes, components, and effects. It serves as a reference for maintaining visual consistency across the application.

## 1. Typography

The application uses two primary font families via `next/font/google`:

- **Primary Sans**: `Inter` (Variable)
  - Usage: Body text, UI elements, inputs, buttons.
  - CSS Variable: `--font-inter`
  - Tailwind Class: `font-sans`

- **Display**: `Outfit` (Variable)
  - Usage: Headings, large titles, brand elements.
  - CSS Variable: `--font-outfit`
  - Tailwind Class: `font-display`

## 2. Color Palette

The color system is built on CSS variables to support potential theming (e.g., dark mode) and is integrated with Tailwind CSS.

### Core Theme Colors

| Token                  | Color Value | Description |
|------------------------|-------------|-------------|
| `primary`              | `#7c3aed` (Violet) | Main brand color, primary buttons, active states. |
| `primary-foreground`   | `#ffffff`   | Text on primary background. |
| `secondary`            | `#f4f4f5` (Zinc) | Secondary buttons, backgrounds, muted elements. |
| `secondary-foreground` | `#18181b`   | Text on secondary background. |
| `accent`               | `#f472b6` (Pink) | Highlights, creative accents. |
| `accent-foreground`    | `#ffffff`   | Text on accent background. |
| `background`           | `#ffffff`   | Page background. |
| `foreground`           | `#0a0a0a`   | Default text color. |
| `card`                 | `#ffffff`   | Card backgrounds. |
| `card-foreground`      | `#0a0a0a`   | Text on card backgrounds. |

### Extended Accent Colors
Modern tech feel accents used for specific UI elements or illustrations:
- **Cyan**: `#06b6d4` (`--accent-2`)
- **Yellow**: `#facc15` (`--accent-3`)
- **Muted**: `#71717a` (`--muted-foreground`)

### Tailwind Palette
The system includes a full range of Tailwind color palettes defined as CSS variables (e.g., `--color-slate-50` to `--color-slate-950`) covering:
- Slate, Gray, Zinc, Neutral, Stone
- Red, Orange, Amber, Yellow, Lime, Green, Emerald, Teal, Cyan, Sky, Blue, Indigo, Violet, Purple, Fuchsia, Pink, Rose

## 3. Effects & Styles

### Glassmorphism
Utilities for glass-like effects:
- **`.glass`**: Light glass effect with blur and subtle border.
- **`.glass-card`**: Stronger gradient glass effect with shadow.

### Shadows & Borders
- **Standard Border**: `1px solid rgba(0, 0, 0, 0.1)` (often used with glass).
- **Selection**: Text selection background is `primary` with 30% opacity.

## 4. Animations

Custom keyframe animations defined in `globals.css`:

*   **`fade-in`**: 0.5s ease-out opacity transition.
*   **`slide-up`**: 0.5s ease-out translate Y + opacity.
*   **`shine`**: 8s infinite background position shift (for skeleton or shine effects).
*   **`gradient`**: 8s infinite background position shift (for animated gradients).
*   **`blob-morph`**: 20s infinite border-radius morphing (and reverse variant).
*   **`float`**: 4s infinite Y-axis floating.
*   **`blob-float`**: 15s infinite X/Y floating.

### Utility Classes
- `.animate-fade-in`
- `.animate-slide-up`
- `.animate-shine`
- `.animate-gradient`
- `.animate-blob-morph`
- `.animate-float`
- `.floating-card` (combines style + float animation)

## 5. UI Components

Core components located in `src/components/ui`:

| Component | Description |
|-----------|-------------|
| `Button` | Standard button with variants (default, secondary, destructive, outline, ghost, link). |
| `Input` | Text input fields with standard styling. |
| `Label` | Label for form inputs. |
| `Textarea` | Multiline text input. |
| `Card` | Container for grouped content. |
| `DropdownMenu` | Menu for actions/navigation. |
| `AiButton` | Specialized button for AI actions (likely with icon/gradient). |
| `SkillChip` | Tag/Chip component for displaying skills. |

## 6. Usage Guidelines

1.  **Typography**: Use `font-display` for `h1`-`h3` and `font-sans` for body text.
2.  **Buttons**: Use `Button` component from `ui` folder. Prefer `default` variant for main actions.
3.  **Layout**: Use standard Tailwind layout utilities (`flex`, `grid`, `container`).
4.  **Icons**: Use `lucide-react` for iconography.

