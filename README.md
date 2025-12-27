# Avik's Runtime Calculator

A modern web application for analyzing code's time complexity with intelligent reasoning and detailed explanations.

## Features

- **Code Analysis**: Paste any code snippet to analyze its runtime complexity
- **Intelligent Reasoning**: Get detailed explanations of why a particular time complexity was determined
- **Multi-language Support**: Supports multiple programming languages
- **Beautiful UI**: Modern, responsive design with gradient backgrounds and smooth animations
- **Real-time Feedback**: Instant analysis results with loading states
- **Toast Notifications**: User-friendly feedback for all actions
- **Tab Support**: Native tab indentation support in the code editor

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14+ with TypeScript
- **UI Components**: 
  - [Radix UI](https://www.radix-ui.com/) primitives
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Shadcn/ui](https://ui.shadcn.com/) component library
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form with custom form components
- **CSS Animation**: [Tailwind CSS Animate](https://github.com/jamiebuilds/tailwindcss-animate)

## Project Structure

```
├── app/
│   ├── globals.css              # Global styles and CSS variables
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Main application page
│
├── components/
│   └── ui/                      # Reusable UI components (40+ components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── textarea.tsx
│       ├── table.tsx
│       ├── badge.tsx
│       └── ... (and many more)
│
├── hooks/
│   └── use-toast.ts             # Custom toast notification hook
│
├── lib/
│   └── utils.ts                 # Utility functions
│
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
├── postcss.config.js            # PostCSS configuration
└── package.json                 # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd runtime_calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Enter Code**: Paste your code snippet in the textarea
2. **Analyze**: Click the "Analyze Runtime" button
3. **View Results**: See the complexity and reasoning
4. **Clear**: Use "Clear Results" to start fresh

### Supported Complexity Patterns

- **O(1)** - Constant time
- **O(log n)** - Logarithmic
- **O(n)** - Linear
- **O(n²)** - Quadratic
- **O(n³)** - Cubic
- And more complex patterns

## Key Features

### Code Input
- Custom textarea with syntax-friendly font
- Real-time character counter
- Tab support for indentation
- Multi-language support
- Example placeholder code

### Analysis Results
- Loading state with spinner
- Clean results table
- Status badges
- Detailed reasoning
- Fully responsive design

### UI Components

**Main Components:**
- Button - Action buttons with variants
- Card - Container components
- Textarea - Multi-line input
- Table - Data display
- Badge - Status indicators
- Toaster - Notifications

## Customization

### Colors & Theme

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: 0 0% 9%;
  --secondary: 0 0% 96.1%;
  --accent: 0 0% 96.1%;
  --destructive: 0 84.2% 60.2%;
}
```

### Typography

Modify fonts in `app/layout.tsx`:

```typescript
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

## API Integration

To connect with a backend service, update the `analyzeCode` function in `app/page.tsx`:

```typescript
const analyzeCode = async (codeInput: string) => {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: codeInput }),
  });
  return response.json();
};
```

## Performance

- Static site generation for fast loading
- Tailwind CSS for minimal CSS overhead
- Optimized component rendering
- Responsive design for all devices

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Color contrast compliance

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Author

**Avik** - Built with Next.js, TypeScript, and Tailwind CSS

## Support

- Open an issue for bugs or suggestions
- Contact through GitHub discussions

---

**Built with ❤️ using modern web technologies**