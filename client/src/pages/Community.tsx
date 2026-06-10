import React from "react";
import { useLocation } from "wouter";
import { BookOpen, ArrowLeft, MessageSquare, Users, Briefcase, Bell, Clock } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

/**
 * Community page – Early Stage Product Structure
 * Future system, transparent roadmap.
 */
export default function Community() {
  const [, setLocation] = useLocation();

  const items = [
    { icon: <MessageSquare className="h-4 w-4 text-cyan-600" />, title: "Forum", status: "Planned", desc: "Open discussions for learners, parents and teachers." },
    { icon: <Users className="h-4 w-4 text-emerald-600" />, title: "Student Discussions", status: "Planned", desc: "Peer-to-peer learning conversations in a safe space." },
    { icon: <Briefcase className="h-4 w-4 text-violet-600" />, title: "Teacher Space", status: "Planned", desc: "A dedicated area for educators to exchange best practices." },
  ];

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
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setLocation("/")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-cyan-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-16 sm:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-6">
            <Clock className="h-3 w-3" />
            Building Phase
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Community is coming together
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
            A space for learners, teachers and schools will open soon.
          </p>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-8">
          {items.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 flex-shrink-0">
                {s.icon}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider rounded-full border px-2 py-0.5 bg-slate-50 text-slate-600 border-slate-200">
                    {s.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA – Join early access */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <Bell className="h-6 w-6 text-cyan-600 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">Join early access list</h2>
          <p className="text-sm text-slate-500 mb-5 max-w-md mx-auto">
            Be the first to join the Insel1o1 community when it opens.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@example.com"
              disabled
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 placeholder:text-slate-400 cursor-not-allowed"
            />
            <button
              disabled
              className="rounded-xl bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
            >
              Join early
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">Community platform is coming soon.</p>
        </div>
      </main>
    </div>
  );
}
