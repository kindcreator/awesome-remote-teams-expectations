export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-7xl px-4 py-8 mt-auto">
      <div className="flex items-center justify-center gap-1 text-sm text-neutral-500">
        <span>Created with</span>
        <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span>by</span>
        <a 
          href="https://kindsolutions.net/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          KindSolutions
        </a>
      </div>
    </footer>
  )
}