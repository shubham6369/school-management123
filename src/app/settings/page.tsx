"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Settings, 
  Moon, 
  Bell, 
  ShieldCheck, 
  Monitor, 
  Globe, 
  Key, 
  ChevronRight,
  Zap,
  Layout,
  Terminal,
  Save,
  Trash2,
  Lock,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("interface");

  const tabs = [
    { id: "interface", name: "Interface", icon: Layout },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: ShieldCheck },
    { id: "system", name: "System Operations", icon: Cpu },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
              <Settings className="w-10 h-10 text-indigo-500 animate-spin-slow" />
              Settings Registry
            </h1>
            <p className="text-slate-500 font-medium tracking-wide">Configure your localized system parameters and interface preferences.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all font-bold text-sm">
               Revert to OS Default
             </button>
             <button className="flex items-center px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all font-black text-sm">
               <Save className="w-4 h-4 mr-2" />
               Commit Changes
             </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Navigation for Settings */}
          <div className="w-full lg:w-80 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center justify-between p-5 rounded-3xl transition-all duration-500 group relative overflow-hidden",
                  activeTab === tab.id 
                    ? "bg-indigo-500/10 text-white border border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.1)]" 
                    : "text-slate-400 hover:bg-white/5 border border-transparent hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className={cn("p-2.5 rounded-xl transition-colors", activeTab === tab.id ? "bg-indigo-500/20 text-indigo-400" : "bg-white/5 group-hover:bg-indigo-500/10")}>
                    <tab.icon className="w-5 h-5" />
                  </div>
                  <span className="font-bold tracking-tight">{tab.name}</span>
                </div>
                <ChevronRight className={cn("w-4 h-4 transition-transform", activeTab === tab.id ? "text-indigo-400 translate-x-1" : "text-slate-600")} />
                
                {activeTab === tab.id && (
                  <motion.div layoutId="settings-active" className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                )}
              </button>
            ))}
          </div>

          {/* Settings Content Area */}
          <motion.div 
            key={activeTab}
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-8"
          >
            {activeTab === "interface" && (
              <div className="space-y-8">
                 <div className="border border-white/5 bg-slate-950/40 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-3xl overflow-hidden relative">
                    <div className="flex items-center gap-3 text-white">
                       <Monitor className="w-5 h-5 text-indigo-400" />
                       <h3 className="text-xl font-black italic">Visual Parameters</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">System Theme</label>
                          <div className="grid grid-cols-2 gap-4">
                             {["Cyberpunk Dark", "Nocturnal Glow"].map(theme => (
                               <button key={theme} className="p-4 border-2 border-indigo-500 rounded-2xl bg-indigo-500/10 text-white text-xs font-bold text-center">
                                 {theme}
                               </button>
                             ))}
                          </div>
                       </div>

                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Interface Density</label>
                          <div className="flex gap-4">
                             {["Compact", "Standard", "Spacious"].map(d => (
                               <button key={d} className="flex-1 py-3 text-xs font-black border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors">
                                 {d}
                               </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="pt-4 space-y-6">
                       {[
                         { label: "Hardware Accelerated Animations", desc: "Use GPU for rendering complex interface dynamics.", icon: Zap },
                         { label: "High Contrast Overlays", desc: "Enhance visibility for critical command terminals.", icon: Globe }
                       ].map((pref) => (
                         <div key={pref.label} className="flex items-center justify-between group">
                            <div className="flex gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                                 <pref.icon className="w-4 h-4 text-slate-500 group-hover:text-indigo-400" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-white mb-0.5">{pref.label}</p>
                                  <p className="text-[11px] text-slate-500 font-medium">{pref.desc}</p>
                               </div>
                            </div>
                            <div className="w-12 h-6 bg-indigo-500/20 rounded-full relative p-1 cursor-pointer">
                               <div className="w-4 h-4 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)] ml-auto" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                 <div className="border border-white/5 bg-slate-950/40 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-3xl overflow-hidden">
                    <div className="flex items-center gap-3 text-white">
                       <Lock className="w-5 h-5 text-indigo-400" />
                       <h3 className="text-xl font-black italic">Access Control</h3>
                    </div>

                    <div className="space-y-6">
                       <button className="w-full flex items-center justify-between p-6 border border-white/5 bg-white/[0.03] rounded-3xl hover:bg-white/[0.05] transition-all group">
                          <div className="flex gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                                <Key className="w-6 h-6 text-indigo-400" />
                             </div>
                             <div className="text-left">
                                <p className="text-base font-black text-white">Multi-Factor Authentication</p>
                                <p className="text-xs text-slate-500">Currently active via Quantum Link API.</p>
                             </div>
                          </div>
                          <span className="text-xs font-black text-indigo-400 uppercase tracking-widest group-hover:underline">Manage</span>
                       </button>

                       <button className="w-full flex items-center justify-between p-6 border border-red-500/10 bg-red-500/5 rounded-3xl hover:bg-red-500/10 transition-all group">
                          <div className="flex gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                                <Trash2 className="w-6 h-6 text-red-500" />
                             </div>
                             <div className="text-left">
                                <p className="text-base font-black text-red-100">Terminate Account Node</p>
                                <p className="text-xs text-red-900/60 font-bold uppercase tracking-widest mt-1 italic">Warning: Irreversible deletion protocol</p>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-red-500/40" />
                       </button>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                 <div className="border border-white/5 bg-slate-950/40 rounded-[2.5rem] p-8 space-y-8 backdrop-blur-3xl overflow-hidden relative">
                    <div className="flex items-center gap-3 text-white">
                       <Bell className="w-5 h-5 text-indigo-400" />
                       <h3 className="text-xl font-black italic">Pulse Notifications</h3>
                    </div>

                    <div className="space-y-6">
                       {[
                         { title: "System Critical Alerts", desc: "Immediate pulses for architectural failures or security breaches.", enabled: true },
                         { title: "Network Status Sync", desc: "Brief updates when regional hubs or nodes undergo maintenance.", enabled: true },
                         { title: "Performance Benchmarks", desc: "Weekly analytics synthesis provided to your identity profile.", enabled: false }
                       ].map((item) => (
                         <div key={item.title} className="flex items-center justify-between p-6 border border-white/5 bg-white/[0.02] rounded-3xl">
                            <div className="space-y-1">
                               <p className="text-sm font-black text-white tracking-tight">{item.title}</p>
                               <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                            </div>
                            <div className={cn("w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-500", item.enabled ? "bg-indigo-500/20" : "bg-slate-800")}>
                               <div className={cn("w-4 h-4 rounded-full transition-all duration-300", item.enabled ? "bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)] translate-x-6" : "bg-slate-500 translate-x-0")} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
