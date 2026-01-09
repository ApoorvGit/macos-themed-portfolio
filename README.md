# macOS-Style Portfolio Website# React + TypeScript + Vite



A modern portfolio website that replicates the macOS/iPadOS experience in the browser, built with React + Vite.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 FeaturesCurrently, two official plugins are available:



- **Lock Screen** - macOS-style lock screen with password authentication (password: `meow`)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Desktop Environment** - Full desktop experience with menu bar, dock, and wallpaper- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Window Manager** - Draggable, resizable windows with minimize/maximize controls

- **Icon Grid** - Drag-and-drop icon organization with keyboard accessibility## React Compiler

- **Responsive Design** - Works across different screen sizes

- **Smooth Animations** - Polished transitions and effectsThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Keyboard Shortcuts** - Full keyboard navigation support

## Expanding the ESLint configuration

## 📦 Tech Stack

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **Framework**: React 19 with TypeScript

- **Build Tool**: Vite```js

- **Styling**: Tailwind CSSexport default defineConfig([

- **State Management**: Zustand  globalIgnores(['dist']),

- **Routing**: React Router v7  {

- **Drag & Drop**: dnd-kit    files: ['**/*.{ts,tsx}'],

- **Windows**: react-rnd    extends: [

- **Icons**: Heroicons      // Other configs...

- **Context Menus**: @szhsin/react-menu

      // Remove tseslint.configs.recommended and replace with this

## 🛠️ Setup & Installation      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

```bash      tseslint.configs.strictTypeChecked,

# Install dependencies      // Optionally, add this for stylistic rules

npm install      tseslint.configs.stylisticTypeChecked,



# Start development server      // Other configs...

npm run dev    ],

    languageOptions: {

# Build for production      parserOptions: {

npm run build        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

# Preview production build      },

npm run preview      // other options...

    },

# Lint code  },

npm run lint])

```

# Format code

npm run formatYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```

```js

## 🎮 Usage// eslint.config.js

import reactX from 'eslint-plugin-react-x'

1. Visit `http://localhost:5173`import reactDom from 'eslint-plugin-react-dom'

2. Click anywhere on the lock screen to unlock

3. Enter password: `meow`export default defineConfig([

4. Explore the desktop by clicking or double-clicking icons  globalIgnores(['dist']),

5. Drag windows to reposition, resize using corner handles  {

6. Minimize windows to the dock    files: ['**/*.{ts,tsx}'],

7. Click dock icons to restore minimized windows    extends: [

      // Other configs...

## 🗂️ Project Structure      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

```      // Enable lint rules for React DOM

/src      reactDom.configs.recommended,

  /assets          - Images, icons, wallpapers    ],

  /components      - Reusable UI components    languageOptions: {

    Window.tsx     - Draggable/resizable window component      parserOptions: {

    IconGrid.tsx   - Desktop icon grid with drag-drop        project: ['./tsconfig.node.json', './tsconfig.app.json'],

    Dock.tsx       - macOS-style dock        tsconfigRootDir: import.meta.dirname,

    MenuBar.tsx    - Top menu bar      },

    Wallpaper.tsx  - Background component      // other options...

  /pages           - Route pages    },

    LockPage.tsx   - Lock screen  },

    DesktopPage.tsx - Desktop environment])

  /lib             - Utilities and helpers```

    window-manager.ts - Zustand store for windows
    keyboard.ts    - Keyboard shortcuts
    constants.ts   - App constants
  /styles          - Global styles
    globals.css    - Global CSS
    tokens.css     - Design tokens
```

## 🎨 Customization

### Content

Edit content in `/src/pages/DesktopPage.tsx`:
- `ProjectsContent` - Your projects
- `ExperienceContent` - Work experience
- `SkillsContent` - Technical skills
- `BlogContent` - Blog posts
- `GalleryContent` - Image gallery
- `ContactContent` - Contact information

### Styling

- Modify design tokens in `/src/styles/tokens.css`
- Update Tailwind config in `tailwind.config.js`
- Customize animations and transitions in `/src/styles/globals.css`

### Wallpaper

Add images to `/src/assets/wallpapers/` and reference them in the `Wallpaper` component.

## ⌨️ Keyboard Shortcuts

- `Enter` - Submit password / Open selected icon
- `Escape` - Cancel dialog / Deselect icons
- `Cmd/Ctrl + W` - Close focused window
- `Cmd/Ctrl + M` - Minimize focused window
- `Arrow Keys` - Navigate icons
- `Tab` - Navigate between focusable elements

## 🎯 Content Portfolio

This portfolio showcases:

- **Projects**: Flask API → EKS, Spinnaker CloudFormation, React Native apps
- **Experience**: SDE II, Senior Financial Analyst at American Express
- **Skills**: React, TypeScript, AWS/EKS, Helm, CI/CD, Spinnaker, Python
- **Blog**: Technical articles and tutorials
- **Gallery**: Project screenshots and visuals
- **Contact**: Email, GitHub, LinkedIn, resume download

## 🚢 Deployment

Build the production bundle:

```bash
npm run build
```

The `dist` folder contains the production-ready static files. Deploy to:
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist` folder
- **GitHub Pages**: Push `dist` to `gh-pages` branch
- **AWS S3**: Upload `dist` contents to S3 bucket

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Acknowledgments

Built following macOS design guidelines and inspired by Apple's Human Interface Guidelines.
