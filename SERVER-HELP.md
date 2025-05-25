# 🎮 Personal OS Server Help

## Quick Start (Less Annoying Way!)

Instead of manually running `npm run dev`, use the automated script:

```bash
./start-server.sh
```

This script automatically:
- ✅ Kills any hanging processes
- ✅ Clears all caches
- ✅ Checks dependencies
- ✅ Starts the server cleanly

## Finding Your Server

Your Personal OS will be running at:
- **Primary**: http://localhost:3000/open
- **Backup**: http://localhost:3001/open (if 3000 is busy)
- **Backup**: http://localhost:3002/open (if 3001 is busy)

## Quick Commands

```bash
# Start server (recommended)
./start-server.sh

# Manual start (if script doesn't work)
npm run dev

# Kill all Next.js processes
pkill -f "next dev"

# Nuclear option (clear everything)
rm -rf .next node_modules/.cache .turbo && npm run dev
```

## Common Issues & Fixes

### "MetricCard import error"
- **Cause**: TypeScript cache corruption
- **Fix**: Run `./start-server.sh` (clears cache automatically)

### "Port already in use"
- **Cause**: Previous server still running
- **Fix**: Script kills old processes automatically

### "Module not found"
- **Cause**: Missing dependencies or corrupted node_modules
- **Fix**: `rm -rf node_modules && npm install`

### "Cannot find module './447.js'"
- **Cause**: Webpack build corruption
- **Fix**: `rm -rf .next` then restart

## Pro Tips

1. **Always use the script**: `./start-server.sh` handles 90% of issues
2. **Check the terminal**: Look for the actual port number in the output
3. **Use Task Master**: For project management and automation
4. **Bookmark the URL**: Once you find the working port, bookmark it

## Emergency Reset

If everything is broken:
```bash
pkill -f "next dev"
rm -rf .next node_modules/.cache .turbo
npm install
./start-server.sh
``` 