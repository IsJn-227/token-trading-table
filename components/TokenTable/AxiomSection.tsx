"use client";
import React from "react";
export default function AxiomSection({title, children}:{title:string; children:React.ReactNode}){
  return (
    <section className="axiom-card p-4 md:p-5 space-y-3">
      <div className="axiom-toolbar">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        <button className="axiom-pill" aria-label="Filters">
          <span>Filters</span><span className="badge">6</span>
        </button>
      </div>
      {children}
    </section>
  );
}
