# Physical Digital Calendar

A modern, interactive calendar application that mimics the aesthetic of a physical wall calendar while providing digital functionality. Built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Modern Calendar UI**
- Clean, intuitive calendar grid interface
- Smooth month navigation with animations
- Beautiful hero image section with month/year display
- Spiral binding design element for authentic wall calendar look

📅 **Date Selection**
- Intuitive date range selection
- Visual highlighting for selected dates and ranges
- Quick navigation between months

📝 **Notes**
- Add and edit notes for date ranges
- Auto-save functionality using browser localStorage
- Character counter display
- Responsive layout

🎨 **Design & Animation**
- Smooth page transitions with Framer Motion
- Gradient background
- Responsive design (mobile, tablet, desktop)
- Modern glass-morphism effects

## Tech Stack

- **Frontend Framework:** React 19.2
- **Language:** TypeScript
- **Build Tool:** Vite 8.0
- **Styling:** Tailwind CSS 4.2
- **Animations:** Framer Motion 12.38
- **Date Handling:** date-fns 4.1
- **Icons:** Lucide React 1.7
- **Linting:** ESLint 9.39

## Project Structure

```
src/
├── components/
│   ├── WallCalendar.tsx      # Main calendar component
│   ├── Hero.tsx              # Header with month/year and navigation
│   ├── CalendarGrid.tsx      # Calendar grid display
│   ├── DateCell.tsx          # Individual day cell
│   ├── Notes.tsx             # Notes panel for date ranges
│   └── context/
│       └── CalendarContext.js # React context for shared state
├── hooks/
│   ├── useCalendar.js        # Custom hook for calendar logic
│   └── useCalendarRange.js   # Hook for date range handling
├── lib/
│   ├── date-utils.js         # Date utility functions
│   └── animations.js         # Animation configurations
├── utils/
│   └── dateHelpers.js        # Date helper functions
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles with Tailwind
└── App.css                   # Application component styles
```

## Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd physical-digital-calendar
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the project for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Check code quality:
```bash
npm run lint
```

## Usage

1. **Navigate Months:** Use the arrow buttons in the header to move between months
2. **Select Dates:** Click on dates to create a range selection (start and end dates)
3. **Add Notes:** Type notes in the notes panel - they're automatically saved to your browser
4. **View Range:** The selected date range is displayed at the top of the notes section

## Feature Details

### Calendar Grid
- Displays full calendar month view
- Highlights current date with visual indicator
- Shows dates from previous/next months in muted colors
- Weekend dates distinguished visually

### Date Range Selection
- Two-step selection: click first date (start), then second date (end)
- Hover preview shows potential range
- Visual feedback with color highlighting

### Notes Panel
- Per-range, per-month note storage
- Character count display
- Auto-save to localStorage
- Clear button to reset notes
- Lined background for authentic notebook feel

### Responsive Design
- Optimized for mobile devices (< 768px)
- Tablet layouts (768px - 1024px)
- Desktop layouts with optimal spacing

## Browser Support

Works in all modern browsers supporting:
- ES6+ JavaScript
- CSS Grid and Flexbox
- localStorage API
- Fetch API

## Performance

- Optimized bundle size using Vite
- Lazy-loaded components
- Smooth 60fps animations
- Efficient date calculations with date-fns

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- [ ] Cloud synchronization for notes
- [ ] Multiple calendar views (week, day, agenda)
- [ ] Custom themes and color schemes
- [ ] Event creation and management
- [ ] Reminder notifications
- [ ] Calendar export (PDF, ICS)
- [ ] Dark mode support
- [ ] Sharing capabilities

## Support

For issues and feature requests, please open an issue on the GitHub repository.

## Acknowledgments

- Design inspiration from physical wall calendars
- Icons from Lucide React
- Images from Pexels
- Built with modern React best practices
