# 🔑 Stripe API Setup Guide

## Step 1: Get Your Stripe API Keys

1. **Go to Stripe Dashboard**: https://dashboard.stripe.com/apikeys
2. **Copy these keys:**
   - **Secret Key** (starts with `sk_test_` or `sk_live_`)
   - **Publishable Key** (starts with `pk_test_` or `pk_live_`)

## Step 2: Create Environment File

Create a file called `.env.local` in your project root with:

```bash
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_actual_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here

# Notion API (optional - for later)
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
```

## Step 3: Test the Integration

Once you add your keys, restart the server:

```bash
pkill -f "next dev" 2>/dev/null; rm -rf .next && npm run dev
```

Then visit: http://localhost:3000/api/business/stripe

You should see your real MRR data!

## What You'll Get

- **Real-time MRR** from your Stripe subscriptions
- **Active subscription count**
- **Monthly revenue trends**
- **Automatic updates** every time you refresh

## Security Notes

- ⚠️ **Never commit `.env.local` to git** (it's already in .gitignore)
- 🔒 **Keep your secret key private**
- 🧪 **Use test keys for development**

---

**Next**: Once this works, we can add Notion integration for your content pipeline! 