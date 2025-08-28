# Pradakshina Counter

A mobile-first, installable Progressive Web App (PWA) for counting Pradakshina rounds with offline support, beautiful UI, and accessibility features.

## Features

- 🎯 **Smart Counter**: Track rounds with visual progress ring
- 📱 **Mobile-First Design**: Optimized for one-handed use and thumb reach
- 🌙 **Dark/Light Mode**: Automatic theme switching with system preference support
- 🔊 **Audio & Haptics**: Optional sound effects and vibration feedback
- 📊 **History Tracking**: Daily progress tracking with export/import
- 🚀 **PWA Ready**: Installable on mobile and desktop devices
- ♿ **Accessible**: Screen reader support, keyboard navigation, focus management
- 💾 **Offline First**: Works without internet connection
- 🎨 **Beautiful UI**: Modern design with smooth animations

## Tech Stack

- **Framework**: Angular 17+ with standalone components
- **Styling**: SCSS with CSS custom properties and mixins
- **PWA**: Service worker, manifest, offline caching
- **State Management**: RxJS with localStorage persistence
- **Icons**: Custom SVG icon system
- **Fonts**: Google Fonts (Poppins, Inter, Roboto)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pradakshina-counter.git
   cd pradakshina-counter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200`

### Build & Deploy

1. **Build for production**
   ```bash
   npm run build:prod
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## PWA Installation

### Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (⋮) → "Add to Home screen"
3. Follow the prompts to install

### iOS (Safari)
1. Open the app in Safari
2. Tap the share button (□↑) → "Add to Home Screen"
3. Tap "Add" to install

### Desktop (Chrome/Edge)
1. Open the app in Chrome/Edge
2. Click the install icon (⬇) in the address bar
3. Click "Install" to add to desktop

## Usage

### Main Counter
- **Tap the large button** to increment your count
- **View progress** in the circular ring around the number
- **Set goals** using the input field or quick preset buttons (11, 21, 51, 108)

### Settings
- **Theme**: Choose light, dark, or system preference
- **Audio**: Toggle sound effects on/off
- **Haptics**: Enable/disable vibration feedback
- **History**: View daily progress and clear data
- **Data**: Export/import your data as JSON

### Accessibility
- **Screen Readers**: Live announcements of count changes
- **Keyboard**: Navigate with Tab, activate with Enter/Space
- **Focus**: Clear focus indicators and logical tab order
- **Contrast**: High contrast ratios for readability

## Project Structure

```
src/
├── app/
│   ├── counter/           # Main counter component
│   ├── settings/          # Settings modal component
│   ├── services/          # State, haptics, audio services
│   ├── ui/               # Reusable UI components
│   │   ├── icon/         # Icon component system
│   │   └── sheet/        # Modal sheet component
│   ├── app.config.ts     # App configuration
│   └── routes.ts         # Routing configuration
├── assets/
│   └── icons/            # PWA icons (various sizes)
├── theme.scss            # CSS variables and mixins
├── manifest.webmanifest  # PWA manifest
└── styles.scss           # Global styles
```

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run test` - Run unit tests
- `npm run deploy` - Deploy to GitHub Pages

### Code Style

- **TypeScript**: Strict mode enabled
- **SCSS**: BEM methodology with CSS custom properties
- **Components**: Standalone Angular components
- **Services**: Injectable services with RxJS observables

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## PWA Features

### Service Worker
- Offline caching of app shell
- Background sync for data persistence
- Push notification support (future)

### Manifest
- App name and description
- Theme colors and icons
- Display mode: standalone
- Orientation: portrait

### Offline Support
- App works without internet
- Data stored in localStorage
- Service worker caches resources

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS 14+, Android 8+
- **PWA**: Chrome, Edge, Samsung Internet, Firefox (limited)

## Performance

### Lighthouse Scores (Target)
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 90

### Optimization
- Lazy loading of components
- Optimized images and icons
- Minimal bundle size
- Efficient state management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Angular style guide
- Write meaningful commit messages
- Include tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Icons**: Inspired by Lucide and Heroicons
- **Design**: Mobile-first UX principles
- **Accessibility**: WCAG 2.1 AA compliance
- **PWA**: Progressive Web App best practices

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/pradakshina-counter/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/pradakshina-counter/discussions)
- **Wiki**: [Project Wiki](https://github.com/yourusername/pradakshina-counter/wiki)

## Roadmap

- [ ] Push notifications
- [ ] Cloud sync
- [ ] Multiple counters
- [ ] Statistics and charts
- [ ] Social sharing
- [ ] Multi-language support
- [ ] Advanced customization
- [ ] Widget support

---

**Built with ❤️ and ☸️ for spiritual practice**
