export default function Footer() {
  return (
    <footer className="py-8 border-t border-emerald-900/20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-gray-500 font-mono">
          <span className="text-emerald-600">$</span> &copy;{" "}
          {new Date().getFullYear()}{" "}
          <span className="text-gray-400">Sara El Mountasser</span> — all
          rights reserved
        </p>
      </div>
    </footer>
  );
}
