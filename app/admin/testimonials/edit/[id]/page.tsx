
import EditTestimonialClient from './EditTestimonialClient';

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <EditTestimonialClient testimonialId={params.id} />;
}
