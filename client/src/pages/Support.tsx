import React from "react";
import { useLocation } from "wouter";
import { BookOpen, ArrowLeft, HelpCircle, Mail, Clock } from "lucide-react";

/**
 * Support page – Early Stage Product Structure
 * Prepared, not empty. No fake ticket system.
 */
export default function Support() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setLocation("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 text-white">
              <BookOpen className="h-4 w-4" />
            </span>
            <span className="font-bold text-slate-900">Insel 1o1</span>
          </button>
          <button
            onClick={() => setLocation("/")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-6">
            <Clock className="h-3 w-3" />
            Early Access
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Support Center
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            We are building a structured support system.
          </p>
        </div>

        {/* FAQ Block */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-4 flex items-start gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 border border-amber-200 flex-shrink-0">
            <HelpCircle className="h-4 w-4 text-amber-600" />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-base font-semibold text-slate-900">FAQ</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 bg-amber-50 text-amber-700 border-amber-200">
                Coming soon
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              A structured list of frequently asked questions will be available here.
            </p>
          </div>
        </div>

        {/* Contact Block */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-8 flex items-start gap-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 border border-cyan-200 flex-shrink-0">
            <Mail className="h-4 w-4 text-cyan-600" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Contact</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              For early access feedback and inquiries:
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              disabled
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 placeholder:text-slate-400 cursor-not-allowed mb-2"
            />
            <button
              disabled
              className="rounded-xl bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              Send message
            </button>
          </div>
        </div>

        {/* Response Time Note */}
        <div className="text-center">
          <p className="text-xs text-slate-400">
            Support is currently in early access phase.
          </p>
        </div>
      </main>
    </div>
  );
}
