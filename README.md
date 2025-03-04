# DocsCMS - Modern Documentation Platform

![DocsCMS](https://i.imgur.com/XYZ123.png)

DocsCMS is a modern documentation platform built with React and TypeScript. It provides a clean, responsive interface for creating, managing, and browsing documentation.

## Features

- **Beautiful Documentation**: Create and present documentation with a clean, modern interface
- **Dark Mode Support**: Built-in dark mode for comfortable reading in any environment
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Markdown Support**: Write documentation in Markdown with support for code highlighting
- **Categorized Content**: Organize documentation into categories for easy navigation
- **Search Functionality**: Quickly find documentation with built-in search
- **Interactive 3D Elements**: Includes a 3D solar system visualization component

## Tech Stack

- **React**: UI library for building the user interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **React Router**: For handling navigation and routing
- **Three.js/React Three Fiber**: For 3D visualizations
- **CSS Variables**: For theming and dark mode support

## Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/docscms.git
cd docscms
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
docscms/
├── public/              # Static assets
│   └── textures/        # Texture files for 3D components
├── src/                 # Source code
│   ├── components/      # React components
│   ├── data/            # Data files and mock APIs
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   │   └── cms/         # CMS-related pages
│   └── types/           # TypeScript type definitions
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── README.md            # Project documentation
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Usage

### Browsing Documentation

The platform provides several ways to browse documentation:

- **Homepage**: Overview of the platform with featured documentation
- **Documentation Page**: Browse all documentation or filter by category
- **Search**: Use the search bar to find specific documentation

### Creating Documentation

To create new documentation:

1. Log in to the CMS
2. Navigate to the document editor
3. Write your documentation in Markdown
4. Assign a category and add metadata
5. Publish your documentation

## Customization

### Theming

The platform uses CSS variables for theming. You can customize the colors by editing the CSS variables in `src/App.css`:

```css
:root {
  --primary: #4f46e5;
  --primary-hover: #4338ca;
  --secondary: #818cf8;
  /* ... other variables */
}

.dark {
  --primary: #818cf8;
  --primary-hover: #6366f1;
  --secondary: #4f46e5;
  /* ... other variables */
}
```

### Adding Categories

To add new documentation categories, edit the `categories` array in `src/data/docs.ts`:

```typescript
export const categories: DocCategory[] = [
  {
    id: 'new-category',
    title: 'New Category',
    description: 'Description of the new category',
    icon: '🆕'
  },
  // ... other categories
];
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- [React Router](https://reactrouter.com/)

---

Built with ❤️ by DocsCMS Team