import { NextRequest, NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { subscription: true } });
  if (user?.subscription?.status !== 'active') return NextResponse.json({ error: 'Subscription required' }, { status: 403 });

  const { symbol } = await req.json();  // e.g., 'AAPL'

  // Fetch historical data from Alpha Vantage
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  const { data } = await axios.get(url);
  const timeSeries = data['Time Series (Daily)'];
  const historical = Object.values(timeSeries).slice(0, 30).map((day: any) => parseFloat(day['4. close']));  // Last 30 closes

  // Load and run Hugging Face LSTM model
  const generator = await pipeline('text-generation', process.env.HUGGINGFACE_MODEL);  // Or use 'time-series' task if available
  const input = historical.join(',');  // Simple preprocessing; normalize in prod
  const output = await generator(input, { max_new_tokens: 1 });  // Predict next value (adapt for your model)
  const predicted = parseFloat(output[0].generated_text);

  // Generate signal
  const current = historical[0];
  let signal = 'hold';
  if (predicted > current * 1.01) signal = 'buy';
  else if (predicted < current * 0.99) signal = 'sell';

  // Log trade
  await prisma.trade.create({
    data: { userId: session.user.id, symbol, signal },
  });

  return NextResponse.json({ signal, predicted });
}