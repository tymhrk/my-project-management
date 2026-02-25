import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* ヒーローセクション */}
      <main className="max-w-5xl mx-auto pt-24 pb-16 px-8 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full">
          v1.0.0 Now Available
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Manage Projects <br />
          <span className="text-blue-600">with Simplicity.</span>
        </h1>

        <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          複雑な管理をシンプルに。あなたのプロジェクトを美しく整理し、
          チームの生産性を最大化するためのミニマルな管理ツールです。
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/projects"
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-95"
          >
            管理画面へ移動する
          </Link>
          <a
            href="#features"
            className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            詳しく見る
          </a>
        </div>
      </main>

      {/* 簡単な特徴セクション */}
      <section id="features" className="max-w-5xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">⚡️</span>
            </div>
            <h3 className="text-xl font-bold mb-3">高速なレスポンス</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Next.js 15とRails
              APIの組み合わせにより、ストレスのない操作性を実現。
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-3">直感的なUI</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              説明不要。開いた瞬間に使い方がわかる、洗練されたデザインを提供。
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="text-xl font-bold mb-3">リアルタイム通知</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              操作の結果を即座にトーストで通知。入力漏れも逃しません。
            </p>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="py-12 border-t border-gray-100 text-center text-sm text-gray-400">
        &copy; 2026 My Project Manager. Built with Next.js & Rails.
      </footer>
    </div>
  );
}
