import { unlink, readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'instagram');
const META_FILE = path.join(process.cwd(), 'src', 'lib', 'imageMeta.json');

export async function DELETE(request) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== (process.env.ADMIN_KEY || 'alina2024')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { filename } = await request.json();
  if (!filename) return Response.json({ error: 'No filename' }, { status: 400 });

  // Safety: only allow deleting from instagram dir, no path traversal
  const safeName = path.basename(filename);
  const filePath = path.join(UPLOAD_DIR, safeName);

  if (existsSync(filePath)) {
    await unlink(filePath);
  }

  // Remove from metadata
  try {
    const raw = await readFile(META_FILE, 'utf-8');
    const meta = JSON.parse(raw);
    const updated = meta.filter(e => e.filename !== safeName);
    await writeFile(META_FILE, JSON.stringify(updated, null, 2));
  } catch {
    // metadata file may not exist yet
  }

  return Response.json({ success: true });
}
