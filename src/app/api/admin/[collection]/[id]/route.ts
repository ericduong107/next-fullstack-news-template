import { NextRequest } from 'next/server';
import { deleteItem, updateItem } from '@/lib/db';
import { hasCollection, json, notFound, refreshSite } from '@/lib/api';

type Ctx = { params: { collection: string; id: string } };

export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!hasCollection(params.collection)) return notFound();
  const item = await updateItem(params.collection, params.id, await req.json());
  if (!item) return notFound();
  refreshSite();
  return json(item);
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  if (!hasCollection(params.collection)) return notFound();
  await deleteItem(params.collection, params.id);
  refreshSite();
  return json({ ok: true });
}
