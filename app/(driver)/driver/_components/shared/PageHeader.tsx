
export default function PageHeader({ title, onBack }: any) {
  return (
    <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 bg-white w-full">
      <button onClick={onBack}
        className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shrink-0">
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
  );
}