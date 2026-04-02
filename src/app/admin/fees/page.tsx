"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  ArrowRight,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FeesPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "payments"), orderBy("date", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPayments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$452,800", change: "+12.5%", trend: "up", icon: DollarSign, color: "blue" },
    { label: "Fees Collected", value: "$384,200", change: "+8.2%", trend: "up", icon: CheckCircle2, color: "emerald" },
    { label: "Pending Dues", value: "$68,600", change: "-4.1%", trend: "down", icon: Clock, color: "rose" },
    { label: "Active Siblings", value: "1,240", change: "+2.4%", trend: "up", icon: Users, color: "indigo" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Elite Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">
               <ShieldCheck className="w-4 h-4" /> Financial Integrity Core
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter drop-shadow-2xl">
              Fiscal <span className="text-indigo-500">Intelligence</span>
            </h1>
            <p className="text-slate-400 font-medium max-w-xl text-lg">
              Manage multi-tier fee structures, process secure transactions, and monitor real-time treasury health across the institution.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-[2rem] font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2 superior-border">
                <Download className="w-5 h-5 text-indigo-400" /> 
                <span className="text-[11px] uppercase tracking-widest font-black">Export Vault</span>
             </button>
             <button className="px-8 py-4 bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-indigo-700 transition-all flex items-center gap-2 active:scale-95">
                <Plus className="w-5 h-5" /> New Transaction
             </button>
          </div>
        </div>

        {/* Dynamic Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="neo-glass bg-slate-900/60 p-8 rounded-[3rem] superior-border group hover:border-indigo-500/50 transition-all relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className={`w-8 h-8 text-indigo-500/20`} />
               </div>
               
               <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-3xl bg-${stat.color}-500/10 border border-${stat.color}-500/20`}>
                     <stat.icon className={`w-6 h-6 text-glow text-indigo-400`} />
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' : 'text-rose-400 bg-rose-500/10 border border-rose-500/20'}`}>
                     {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                     {stat.change}
                  </div>
               </div>
               
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">{stat.label}</p>
               <h3 className="text-3xl font-black text-white tracking-tight leading-none">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Detailed Controls & Ledger */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Ledger Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="neo-glass bg-slate-950/40 rounded-[3rem] superior-border overflow-hidden p-2">
               <div className="p-8 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
                     <h2 className="text-xl font-black text-white tracking-tight uppercase">Institutional Ledger</h2>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input 
                           placeholder="Search TxID or Student..." 
                           className="bg-white/5 border-none rounded-2xl py-3 pl-12 pr-6 text-sm font-bold text-white focus:ring-4 focus:ring-indigo-500/20 transition-all w-64 tracking-tight shadow-sm"
                        />
                     </div>
                     <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all"><Filter className="w-5 h-5"/></button>
                  </div>
               </div>

               <div className="overflow-x-auto p-4">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="border-b border-white/5">
                       <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction / Ref</th>
                       <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Client Profile</th>
                       <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Asset Value</th>
                       <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Compliance Status</th>
                       <th className="px-6 py-4"></th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                     {[1,2,3,4,5].map((_, i) => (
                       <tr key={i} className="group hover:bg-white/[0.03] transition-all">
                         <td className="px-6 py-6 font-mono text-[11px] text-slate-400">#TX-9284-{i}2</td>
                         <td className="px-6 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-slate-800 rounded-xl superior-border flex items-center justify-center font-black text-xs text-slate-500">
                                 SJ
                              </div>
                              <div>
                                 <p className="font-black text-white text-sm group-hover:text-indigo-400 transition-colors">Samuel Jackson</p>
                                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Grade 10 - Section A</p>
                              </div>
                           </div>
                         </td>
                         <td className="px-6 py-6">
                            <span className="font-black text-white text-lg">$1,250.00</span>
                         </td>
                         <td className="px-6 py-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 w-fit">
                               <CheckCircle2 className="w-3.5 h-3.5" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Verified Success</span>
                            </div>
                         </td>
                         <td className="px-6 py-6 text-right">
                            <button className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-slate-500 hover:text-white transition-all"><MoreVertical className="w-4 h-4"/></button>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               
               <div className="p-6 pt-0 flex justify-center">
                  <button className="flex items-center gap-2 group text-slate-500 hover:text-white transition-colors">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em]">Load Archive Records</span>
                     <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>
            </div>
          </div>

          {/* Side Performance Intelligence */}
          <div className="space-y-8">
             <div className="neo-glass bg-indigo-600 p-10 rounded-[3rem] superior-border shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl opacity-50" />
                
                <h3 className="text-2xl font-black text-white tracking-tight mb-2">Vault Capacity</h3>
                <p className="text-indigo-100 text-sm font-medium mb-8">Quarterly intake vs goal achievement metric.</p>
                
                <div className="space-y-6">
                   <div className="flex items-center justify-between text-white font-black text-[11px] uppercase tracking-widest">
                      <span>Tuition Fees</span>
                      <span>85% Collected</span>
                   </div>
                   <div className="w-full h-2.5 bg-indigo-900/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '85%' }}
                         transition={{ duration: 1.5, ease: "circOut" }}
                         className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                      />
                   </div>

                   <div className="flex items-center justify-between text-indigo-200 font-black text-[11px] uppercase tracking-widest mt-8">
                      <span>Transport Services</span>
                      <span>62% Collected</span>
                   </div>
                   <div className="w-full h-2.5 bg-indigo-900/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
                      <motion.div 
                         initial={{ width: 0 }} animate={{ width: '62%' }} transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                         className="h-full bg-indigo-300" 
                      />
                   </div>
                </div>
                
                <button className="mt-12 w-full py-5 bg-white text-indigo-600 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl active:scale-95">
                   Synthesize Recovery Report
                </button>
             </div>

             <div className="neo-glass bg-slate-900/60 p-8 rounded-[3rem] superior-border">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-black text-slate-300 uppercase text-[10px] tracking-[0.3em]">Operational Security</h3>
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                
                <div className="space-y-6">
                   {[
                     { label: "SSL Uplink", status: "Active" },
                     { label: "FIS Compliance", status: "Verified" },
                     { label: "Audit Log Node", status: "Syncing" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-all">
                        <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{item.label}</span>
                        <span className="text-[9px] font-black uppercase text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-full">{item.status}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}
