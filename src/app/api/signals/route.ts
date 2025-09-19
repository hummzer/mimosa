import { NextRequest, NextResponse } from 'next/server';
import { AutoModel, Tensor } from '@xenova/transformers';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface AlphaVantageResponse {
  'Time Series (Daily)': Record<string, { '4. close': string }>;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { subscription: true } });
  if (user?.subscription?.status !== 'active') return NextResponse.json({ error: 'Subscription required' }, { status: 403 });

  const { symbol } = await req.json();
  if (!symbol) return NextResponse.json({ error: 'Symbol required' }, { status: 400 });

  // Fetch historical data
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
  const { data } = await axios.get<AlphaVantageResponse>(url);
  const timeSeries = data['Time Series (Daily)'];
  if (!timeSeries) return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });

  const historical = Object.values(timeSeries).slice(0, 30).map((day) => parseFloat(day['4. close']));
  if (historical.length < 30) return NextResponse.json({ error: 'Insufficient data' }, { status: 400 });

  // Normalize input
  const maxPrice = Math.max(...historical);
  const minPrice = Math.min(...historical);
  const normalized = historical.map(price => (price - minPrice) / (maxPrice - minPrice));

  // Prepare tensor input (LSTM expects [batch_size, sequence_length, features])
  const input = new Tensor('float32', new Float32Array(normalized), [1, normalized.length, 1]);

  // Load and run model
  const model = await AutoModel.from_pretrained(process.env.HUGGINGFACE_MODEL!);
  const output = await model({ input_ids: input }) as Tensor;
  const predicted = output.data[0] * (maxPrice - minPrice) + minPrice; // Denormalize first value

  // Generate signal
  let signal = 'hold';
  if (predicted > historical[0] * 1.01) signal = 'buy';
  else if (predicted < historical[0] * 0.99) signal = 'sell';

  // Log trade
  await prisma.trade.create({
    data: { userId: session.user.id, symbol, signal },
  });

  return NextResponse.json({ signal, predicted });
}