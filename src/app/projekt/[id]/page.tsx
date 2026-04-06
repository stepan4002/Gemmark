import { projectDetails } from '@/data/projectDetails';
import ProjektPageClient from './ProjektPageClient';

// Required for static export — tells Next.js which [id] pages to pre-render
export function generateStaticParams() {
  return Object.keys(projectDetails).map((id) => ({ id }));
}

export default function ProjektPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProjektPageClient params={params} />;
}
