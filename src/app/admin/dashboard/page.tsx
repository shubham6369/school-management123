"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, GraduationCap, 
  TrendingUp, CreditCard,
  ArrowUpRight, ArrowDownRight,
  Calendar, CheckCircle2, Clock,
  Loader2,
  DollarSign,
  Activity,
  Award,
  Bell,
  Search,
  Settings,
  MoreVertical,
  Layers,
  ShieldCheck,
  Zap
} from "lucide-react";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler,
  BarElement,
  ArcElement
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubStudents = onSnapshot(collection(db, "students"), (snapshot) => {
      setStudentCount(snapshot.size);
    });

    const unsubTeachers = onSnapshot(collection(db, "teachers"), (snapshot) => {
      setTeacherCount(snapshot.size);
      setLoading(false);
    });

    return () => {
      unsubStudents();
      unsubTeachers();
    };
  }, []);

  const stats = [
    { label: "Total Students", value: studentCount.toLocaleString(), change: "+12.5%", up: true, icon: GraduationCap, color: "bg-blue-600", light: "bg-blue-50" },
    { label: "Total Teachers", value: teacherCount.toLocaleString(), change: "+3.2%", up: true, icon: Users, color: "bg-indigo-600", light: "bg-indigo-50" },
    { label: "Revenue Collected", value: "$42,500.00", change: "+18.1%", up: true, icon: DollarSign, color: "bg-emerald-600", light: "bg-emerald-50" },
    { label: "Growth Rate", value: "94.2%", change: "-1.4%", up: false, icon: Activity, color: "bg-rose-600", light: "bg-rose-50" },
  ];

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [35000, 42000, 38000, 45000, 52000, 48000, 55000, 62000, 58000, 65000, 72000, 68000],
        fill: true,
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.05)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
      },
      {
        label: "Expenses ($)",
        data: [28000, 32000, 31000, 33000, 35000, 34000, 36000, 38000, 40000, 42000, 45000, 44000],
        fill: true,
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.05)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
                <span className="w-12 h-1.5 bg-blue-600 rounded-full" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">Administration Control</p>
             </div>
             <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Global <span className="text-blue-600">Console</span>
             </h1>
             <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                SYSTEM STATUS: OPTIMAL • UPTIME: 99.9%
             </p>
          </div>
          
          <div className="flex items-center gap-8">
             <div className="hidden lg:flex items-center gap-4 p-4 px-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                <div className="text-right">
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Server</p>
                   <p className="text-xs font-black text-slate-800">US-EAST-1</p>
                </div>
                <div className="w-px h-10 bg-slate-200" />
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                   <Layers className="w-6 h-6 text-blue-600" />
                </div>
             </div>
             <button className="bg-blue-600 text-white px-10 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-blue-900/40 active:scale-95">
                Generate Report
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative"
            >
              <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 relative z-10 transition-transform group-hover:-rotate-12", stat.light)}>
                <stat.icon className={cn("w-8 h-8", stat.color.replace('bg-', 'text-'))} />
              </div>
              <div className="relative z-10">
                 <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                 <div className="flex items-end gap-3">
                    <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                    <div className={cn(
                      "flex items-center gap-0.5 px-3 py-1.5 rounded-2xl text-[10px] font-black tracking-tighter mb-1 shadow-sm",
                      stat.up ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                       {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                       {stat.change}
                    </div>
                 </div>
              </div>
              <div className={cn("absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-3xl", stat.color)} />
            </motion.div>
          ))}
        </div>

        {/* Charts and Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 space-y-12">
              <Card className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-[100px] -mr-64 -mt-64" />
                 <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                       <div className="space-y-1">
                          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none uppercase">Financial Performance</h2>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">Institutional Revenue & Expenditure Analysis</p>
                       </div>
                       <div className="p-2 border border-slate-100 rounded-[2rem] bg-slate-50 flex gap-2">
                          {["Yearly", "Quarterly", "Monthly"].map((period, i) => (
                             <button key={period} className={cn(
                               "px-6 py-2.5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all",
                               i === 0 ? "bg-white shadow-lg text-blue-600 border border-slate-100" : "text-slate-400 hover:text-slate-600"
                             )}>
                                {period}
                             </button>
                          ))}
                       </div>
                    </div>
                    <div className="h-[450px]">
                       <Line 
                         data={revenueData} 
                         options={{ 
                           responsive: true, 
                           maintainAspectRatio: false,
                           scales: { 
                             y: { grid: { color: "rgba(0,0,0,0.02)" }, ticks: { font: { weight: '800', size: 10 } } },
                             x: { grid: { display: false }, ticks: { font: { weight: '800', size: 10 } } }
                           },
                           plugins: { 
                             legend: { position: 'bottom', labels: { usePointStyle: true, font: { weight: '900', size: 11 }, padding: 30 } }
                           }
                         }} 
                       />
                    </div>
                 </div>
              </Card>

              {/* Recruitment / Growth Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[50px]" />
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-400 mb-6 flex items-center gap-2">
                       <Zap className="w-4 h-4" /> System Automations
                    </h4>
                    <p className="text-3xl font-black tracking-tighter mb-4 leading-none uppercase">Automated Enrollment Portals</p>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed mb-10">Streamline student onboarding with AI-driven document verification and placement tests.</p>
                    <button className="w-full py-5 border-2 border-white/10 hover:border-blue-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all">
                       Configure Workflow
                    </button>
                 </div>
                 <div className="bg-indigo-50 rounded-[3rem] p-10 border border-indigo-100 group">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-6 flex items-center gap-2">
                       <Award className="w-4 h-4" /> Academic Integrity
                    </h4>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter mb-4 leading-none uppercase">Staff Evaluation Module</p>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-10">Monitor teacher performance through student feedback and outcome assessment tools.</p>
                    <button className="w-full py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all">
                       Launch Evaluation
                    </button>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-12">
              {/* Notifications / Announcements */}
              <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Critical Alerts</h3>
                    <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                       <Bell className="w-5 h-5 fill-rose-500" />
                    </div>
                 </div>
                 <div className="space-y-6">
                    {[
                      { title: "Server Load Warning", desc: "US-EAST-1 peak reached 92%", time: "5m ago", type: 'warn' },
                      { title: "Financial Audit Required", desc: "Quarter 3 report pending review", time: "2h ago", type: 'info' },
                      { title: "New Staff Onboarding", desc: "3 pending teacher approvals", time: "1d ago", type: 'system' },
                    ].map((alert, i) => (
                      <div key={i} className="flex gap-5 group cursor-pointer">
                         <div className={cn(
                           "w-1.5 h-16 rounded-full shrink-0 transition-all group-hover:w-2",
                           alert.type === 'warn' ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" : 
                           alert.type === 'info' ? "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" : "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                         )} />
                         <div>
                            <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{alert.title}</p>
                            <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase leading-snug">{alert.desc}</p>
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{alert.time}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-12 py-5 bg-slate-50 text-slate-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                    View System Logs
                 </button>
              </div>

              {/* Quick Actions Panel */}
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-4">Instant Access</p>
                 {[
                   { label: "Faculty Directory", icon: Users, color: "text-blue-600" },
                   { label: "Curriculum Builder", icon: Layers, color: "text-indigo-600" },
                   { label: "Financial Ledger", icon: CreditCard, color: "text-emerald-600" },
                   { label: "Institution Branding", icon: Target, color: "text-amber-600" },
                 ].map((action, i) => (
                   <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:border-blue-200 hover:shadow-xl transition-all cursor-pointer group">
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                            <action.icon className={cn("w-6 h-6", action.color)} />
                         </div>
                         <span className="text-xs font-black text-slate-800 uppercase tracking-widest group-hover:translate-x-1 transition-transform">{action.label}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
