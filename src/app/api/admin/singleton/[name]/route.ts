import { NextRequest } from 'next/server';
import { getSingleton, saveSingleton } from '@/lib/db';
import { hasSingleton, json, notFound, refreshSite } from '@/lib/api';

export async function GET(_: NextRequest, { params }: { params: { name: string } }) {
  if (!hasSingleton(params.name)) return notFound();
  return json(await getSingleton(params.name));
}

export async function PUT(req: NextRequest, { params }: { params: { name: string } }) {
  if (!hasSingleton(params.name)) return notFound();
  await saveSingleton(params.name, await req.json());
  refreshSite();
  return json({ ok: true });
}
