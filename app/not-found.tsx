import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-7xl mb-4">🔭</div>
      <h1 className="text-3xl font-black text-indigo-800 mb-2">Page Not Found</h1>
      <p className="text-indigo-400 font-semibold mb-6 max-w-sm">
        Looks like this page drifted into outer space. Let&apos;s get you back to the lab!
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-black text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5 transition-transform"
      >
        🔬 Back to MadaTV
      </Link>
    </div>
  );
}
