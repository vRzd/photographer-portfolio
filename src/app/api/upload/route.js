import { writeFile, readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'instagram');
const META_FILE = path.join(process.cwd(), 'src', 'lib', 'imageMeta.json');

async function readMeta() {
  try {
    const raw = await readFile(META_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeMeta(meta) {
  await writeFile(META_FILE, JSON.stringify(meta, null, 2));
}

export async function POST(request) {
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey !== (process.env.ADMIN_KEY || 'alina2024')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const category = formData.get('category') || 'lifestyle';
  const title = formData.get('title') || '';
  const featured = formData.get('featured') === 'true';

  if (!file || typeof file === 'string') {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const ext = path.extname(file.name) || '.jpg';
  const timestamp = Date.now();
  const filename = `upload-${timestamp}${ext}`;
  const dest = path.join(UPLOAD_DIR, filename);

  await writeFile(dest, buffer);

  // Add to metadata
  const meta = await readMeta();
  const newEntry = {
    id: timestamp,
    src: `/instagram/${filename}`,
    filename,
    alt: title || `Photo by Alina Vladyka`,
    category,
    title: title || filename,
    featured,
    uploadedAt: new Date().toISOString(),
  };
  meta.push(newEntry);
  await writeMeta(meta);

  return Response.json({ success: true, entry: newEntry });
}
