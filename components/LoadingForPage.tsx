import LoadingSpinner from '@/components/LoadingSpinner';

export default function LoadingForPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" color="yellow-600" />
    </div>
  );
}
