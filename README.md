# React 19 Design System

A modern, accessible, and scalable design system built with React 19.

## Features

- 🎨 Comprehensive design tokens system
- 📦 Reusable and accessible components
- 🎭 Storybook documentation
- 🔍 TypeScript support
- ⚡ Modern React features
- 🌙 Dark mode support
- ♿ WCAG 2.1 AA compliant
- 📱 Responsive design

## Installation

```bash
# Clone the repository
git clone https://github.com/num2k/design-system.git

# Install dependencies
yarn install

# Build all packages
yarn build

# Start Storybook
yarn storybook
```

## Project Structure

```
design-system/
├── packages/
│   ├── core/               # Design tokens and theme
│   ├── components/         # React components
│   ├── docs/              # Documentation
│   └── icons/             # Icon components
└── package.json
```

## Usage

```tsx
import { ThemeProvider } from '@design-system/core';
import { Button } from '@design-system/components';

function App() {
  return (
    <ThemeProvider>
      <Button variant="primary">Click me</Button>
    </ThemeProvider>
  );
}
```

## Available Scripts

- `yarn build`: Build all packages
- `yarn dev`: Start development mode
- `yarn lint`: Run ESLint
- `yarn test`: Run tests
- `yarn storybook`: Start Storybook
- `yarn build-storybook`: Build Storybook for production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 