
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl md:text-5xl font-semibold text-gray-100" suppressHydrationWarning={true}>
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mt-6" suppressHydrationWarning={true}>
        This page has not been generated
      </h2>
      <p className="mt-4 text-xl md:text-2xl text-gray-500" suppressHydrationWarning={true}>
        Tell me what you would like on this page
      </p>
    </div>
  );
}
