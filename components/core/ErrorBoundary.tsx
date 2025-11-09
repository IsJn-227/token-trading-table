"use client";
import React from "react";
export default class ErrorBoundary extends React.Component<{children: React.ReactNode},{hasError:boolean}>{
  constructor(p:any){ super(p); this.state={hasError:false}; }
  static getDerivedStateFromError(){ return {hasError:true}; }
  componentDidCatch(e:any){ console.error("[ErrorBoundary]", e); }
  render(){
    if(this.state.hasError){
      return <div className="axiom-card p-4 text-red-400">Something went wrong. Please refresh.</div>;
    }
    return this.props.children;
  }
}
