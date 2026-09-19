export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      <p className="ml-3 text-gray-600">Loading...</p>
    </div>
  );
}