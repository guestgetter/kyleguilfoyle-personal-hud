# Personal Operating System (Personal OS)

A real-time, public-facing dashboard that showcases what you're working on, tracking, and experimenting with. Built with Next.js, TypeScript, and Framer Motion for a playful, game-like experience.

## 🎯 Purpose

This Personal OS serves as:
- A transparent growth dashboard
- A public changelog/logbook
- A showcase of systems thinking applied to personal development
- An inspiration for others to build their own systems

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Data**: JSON files (easily upgradeable to Notion API/Airtable)
- **Icons**: Lucide React

### Project Structure
```
personal-hud/
├── app/
│   ├── open/          # Personal OS page
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # Reusable UI components
├── data/             # JSON data files
├── types/            # TypeScript definitions
└── public/           # Static assets
```

## 📊 Data Structure

Each daily entry tracks:

### Business Progress
- Monthly Recurring Revenue (MRR)
- Current focus area
- Recent micro-win

### Health Metrics
- Garmin sleep score
- VO₂ Max
- Current health experiment

### Learning & Content
- Current book (with % complete)
- Key takeaways
- Content in progress

### Experiments & Adventures
- Active experiments
- Evening activities with ratings
- Daily changelog

## 🚀 Getting Started

### Development
```bash
npm run dev
# Visit http://localhost:3000/open
```

### Production Build
```bash
npm run build
npm start
```

## 📝 Updating Data

### Manual Updates (Current)

1. Edit `data/sample-entries.json`
2. Add new entries following the existing format:

```json
{
  "date": "2024-01-16",
  "business": {
    "mrr": 12750,
    "currentFocus": "Scaling customer success",
    "microWin": "Launched automated check-in system"
  },
  // ... rest of the entry
}
```

### Future Automation Options

1. **Notion Integration**
   - Use Notion API to pull data from a database
   - Set up webhook for real-time updates

2. **Airtable Integration**
   - Connect via Airtable API
   - Use Zapier/Make for automation

3. **GitHub Actions**
   - Daily automated commits
   - Pull data from various sources

## 🎨 Customization

### Colors
Edit `tailwind.config.ts`:
```js
colors: {
  'brand-green': '#2D5F3F',
  'brand-orange': '#D97B34',
  'brand-cream': '#FFF8F0',
}
```

### Animations
Modify component animations in individual files using Framer Motion.

### Layout
The modular component structure makes it easy to:
- Rearrange sections
- Add new metrics
- Create custom visualizations

## 🔄 Migration Path

### To Dynamic Data Sources

1. **Create API Routes**
   ```typescript
   // app/api/entries/route.ts
   export async function GET() {
     // Fetch from Notion/Airtable
   }
   ```

2. **Update Data Fetching**
   Replace JSON import with API calls

3. **Add Authentication**
   Protect write endpoints if needed

## 🎮 Design Philosophy

Inspired by Neal.fun's playful simplicity:
- Clean, minimal interface
- Delightful micro-interactions
- Information density without overwhelm
- Game-like progress tracking

## 📈 Future Enhancements

- [ ] Weekly/monthly view toggles
- [ ] Data visualization charts
- [ ] Public API for others to use
- [ ] Mobile app companion
- [ ] Integration with wearables
- [ ] AI-powered insights
- [ ] Social sharing features

## 🤝 Contributing

Feel free to fork and create your own Personal OS! If you build something cool, I'd love to see it.

## 📄 License

MIT - Use this as inspiration for your own Personal OS!

---

Built with ❤️ by Kyle Guilfoyle 