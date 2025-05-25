import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function GET(request: NextRequest) {
  try {
    // Get current month's data
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Fetch active and past_due subscriptions (Stripe's official MRR definition)
    // According to Stripe docs: MRR includes active and past_due subscriptions only
    const activeSubscriptions = await stripe.subscriptions.list({
      status: 'active',
      limit: 100,
    });

    const pastDueSubscriptions = await stripe.subscriptions.list({
      status: 'past_due',
      limit: 100,
    });

    // Combine active and past_due subscriptions for official MRR calculation
    const allMrrSubscriptions = [...activeSubscriptions.data, ...pastDueSubscriptions.data];

    // Calculate MRR using Stripe's official methodology
    // MRR = sum of monthly-normalized amounts of all active and past_due subscriptions
    // Excludes: trials, taxes, free plans, usage-based products
    let mrr = 0;
    allMrrSubscriptions.forEach(sub => {
      sub.items.data.forEach(item => {
        const price = item.price;
        const quantity = item.quantity || 1;
        
        // Skip if this is a usage-based (metered) product - not included in MRR per Stripe
        if (price?.recurring?.usage_type === 'metered') {
          return;
        }
        
        // Skip if amount is 0 (free plans) - not included in MRR per Stripe
        if (!price?.unit_amount || price.unit_amount === 0) {
          return;
        }
        
        // Calculate monthly-normalized amount
        const unitAmount = (price.unit_amount || 0) / 100; // Convert from cents
        
        if (price?.recurring?.interval === 'month') {
          // Monthly subscriptions
          mrr += unitAmount * quantity;
        } else if (price?.recurring?.interval === 'year') {
          // Annual subscriptions (convert to monthly)
          mrr += (unitAmount * quantity) / 12;
        } else if (price?.recurring?.interval === 'week') {
          // Weekly subscriptions (convert to monthly: 52 weeks / 12 months = 4.33)
          mrr += (unitAmount * quantity) * 4.33;
        } else if (price?.recurring?.interval === 'day') {
          // Daily subscriptions (convert to monthly: 365 days / 12 months = 30.42)
          mrr += (unitAmount * quantity) * 30.42;
        }
      });
    });

    // Get recent charges for additional metrics
    const charges = await stripe.charges.list({
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lte: Math.floor(endOfMonth.getTime() / 1000),
      },
      limit: 10,
    });

    const recentRevenue = charges.data
      .filter(charge => charge.paid)
      .reduce((sum, charge) => sum + (charge.amount / 100), 0);

    return NextResponse.json({
      mrr: Math.round(mrr),
      monthlyRevenue: Math.round(recentRevenue),
      activeSubscriptions: allMrrSubscriptions.length,
      recentCharges: charges.data.length,
      lastUpdated: new Date().toISOString(),
      note: "MRR calculated using Stripe's official methodology: active + past_due subscriptions, excluding trials, taxes, free plans, and usage-based products"
    });

  } catch (error) {
    console.error('Stripe API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Stripe data' },
      { status: 500 }
    );
  }
} 