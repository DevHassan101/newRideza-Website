// app/driver/_components/shared/UploadBox.tsx
"use client";
import { useRef } from "react";

export default function UploadBox({ label, value, onChange, height = "h-36" }: any) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { const r = new FileReader(); r.onloadend = () => onChange(r.result as string); r.readAsDataURL(f); }
  };

  return (
    <div>
      {label && (
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">{label}</p>
      )}
      <div onClick={() => ref.current?.click()}
        className={`relative ${height} rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition-all group
          ${value ? "border-cyan-300 bg-cyan-50/30" : "border-gray-200 bg-gray-50 hover:border-cyan-300 hover:bg-cyan-50/20"}`}>

        {value ? (
          <>
            <img src={value} alt="" className="absolute inset-0 w-full h-full object-cover" />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-white/90 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="text-xs font-semibold text-gray-600">Change</span>
              </div>
            </div>
            {/* Success badge */}
            <div className="absolute top-2.5 right-2.5 w-7 h-7 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-200">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:border-cyan-200 group-hover:bg-cyan-50 transition-all">
              <svg className="w-6 h-6 text-gray-400 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 group-hover:text-cyan-600 transition-colors">Tap to upload</p>
              <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG supported</p>
            </div>
          </div>
        )}

        <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}