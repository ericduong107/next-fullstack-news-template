import { NextRequest } from 'next/server';
import { createItem } from '@/lib/db';
import { hasCollection, json, notFound, refreshSite } from '@/lib/api';

export async function POST(req: NextRequest, { params }: { params: { collection: string } }) {
  if (!hasCollection(params.collection)) return notFound();
  const data = await req.json();
  const item = await createItem(params.collection, data);
  refreshSite();
  return json(item, 201);
}
