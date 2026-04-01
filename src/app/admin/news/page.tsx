"use client";

import { useState } from "react";
import { 
  Megaphone, Plus, Search, Filter, 
  MoreVertical, Edit3, Trash2, Globe,
  Lock, Calendar, Image as ImageIcon, CheckCircle2,
  AlertCircle, ChevronRight, Share2, Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: "Academic" | "Event" | "Holiday" | "Other";
  date: string;
  status: "Published" | "Draft";
  author: string;
  visibility: "Public" | "Internal";
}

export default function AdminNewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([
    { id: "1", title: "Annual Science Fair 2024", excerpt: "Join us for a spectacular display of innovation and creativity next month.", category: "Event", date: "2024-04-15", status: "Published", author: "Principal", visibility: "Public" },
    { id: "2", title: "Eid Break Announcement", excerpt: "School will remain closed from April 10th to April 14th for Eid-ul-Fitr holidays.", category: "Holiday", date: "2024-04-05", status: "Published", author: "Administration", visibility: "Internal" },
    { id: "3", title: "New Lab Equipment Arrival", excerpt: "We've upgraded our physics lab with the latest experimental apparatus.", category: "Academic", date: "2024-04-20", status: "Draft", author: "HOD Physics", visibility: "Public" },
  ]);

  const toggleStatus = (id: string) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === "Published" ? "Draft" : "Published" } : item
    ));
  };

  const deleteItem = (id: string) => {
    if (confirm("Are you sure you want to delete this announcement?")) {
      setNews(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
                <Megaphone className="w-6 h-6 -rotate-12" />
             </div>
             Announcements
          </h1>
          <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-xs">Keep the community informed with timely updates.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="px-8 py-3 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Quick Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
           {news.map((item, idx) => (
             <motion.div
               key={item.id}
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8, x: 20 }}
               transition={{ duration: 0.3, delay: idx * 0.05 }}
             >
                <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 p-8 rounded-[2rem] group hover:border-indigo-500/30 transition-all flex flex-col h-full relative overflow-hidden">
                   {/* Background Glow */}
                   <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-all" />
                   
                   <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-400" />
                        <span className="text-indigo-400 font-black text-[10px] uppercase tracking-widest">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         {item.visibility === "Public" ? (
                           <Globe className="w-4 h-4 text-slate-500" />
                         ) : (
                           <Lock className="w-4 h-4 text-slate-500" />
                         )}
                         <div className="relative group/actions">
                            <button className="text-slate-600 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                               <MoreVertical className="w-5 h-5" />
                            </button>
                            <div className="absolute right-0 top-full mt-2 w-48 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all z-50">
                               <button onClick={() => toggleStatus(item.id)} className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-indigo-600 transition-all border-b border-white/5">{item.status === 'Published' ? 'Unpublish' : 'Publish'}</button>
                               <button className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 focus:outline-none"><Edit3 className="w-3 h-3" /> Edit Post</button>
                               <button onClick={() => deleteItem(item.id)} className="w-full px-5 py-3 text-left text-xs font-black uppercase tracking-widest text-rose-500 hover:text-white hover:bg-rose-600 transition-all flex items-center gap-2 focus:outline-none"><Trash2 className="w-3 h-3" /> Remove News</button>
                            </div>
                         </div>
                      </div>
                   </div>

                   <h3 className="text-xl font-black text-white tracking-tight uppercase mb-3 line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                     {item.title}
                   </h3>
                   <p className="text-slate-400 font-bold text-sm mb-10 line-clamp-3 leading-relaxed flex-1">
                     {item.excerpt}
                   </p>

                   <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                         <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center font-black text-[10px] text-slate-500 uppercase tracking-tighter">
                            {item.author.charAt(0)}
                         </div>
                         <div>
                            <p className="text-white font-black text-[10px] uppercase tracking-tight">{item.author}</p>
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">{item.date}</p>
                         </div>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
                        item.status === 'Published' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-slate-800/50 border-white/10 text-slate-500'
                      }`}>
                        {item.status}
                      </span>
                   </div>
                </Card>
             </motion.div>
           ))}
        </AnimatePresence>

        {/* Placeholder for adding more */}
        <Card 
          onClick={() => setShowForm(true)}
          className="bg-dashed border-2 border-dashed border-white/5 p-8 rounded-[2rem] flex flex-col items-center justify-center gap-6 group hover:border-indigo-500/30 transition-all cursor-pointer min-h-[350px]"
        >
           <div className="w-16 h-16 rounded-full bg-indigo-500/5 flex items-center justify-center border-2 border-dashed border-indigo-500/20 group-hover:bg-indigo-500/10 transition-all">
              <Plus className="w-8 h-8 text-indigo-500 group-hover:scale-110 transition-transform" />
           </div>
           <div className="text-center">
              <p className="text-white font-black uppercase tracking-widest text-xs">Post New Update</p>
              <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest mt-1">Start writing your next big annoucement.</p>
           </div>
        </Card>
      </div>

      {/* Quick Stats Banner */}
      <div className="flex items-center gap-4 p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-3xl">
         <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center shadow-inner">
            <Share2 className="w-7 h-7 text-indigo-400" />
         </div>
         <div className="flex-1">
            <h4 className="text-white font-black uppercase tracking-tight text-lg mb-1">Impact Summary</h4>
            <p className="text-slate-400 font-bold text-sm tracking-wide">Your announcements have reached over <span className="text-indigo-400">1,200 unique visitors</span> this week. Keep up the momentum!</p>
         </div>
         <button className="hidden md:block px-6 py-2 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-indigo-500 transition-all">View Analytics</button>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-50 flex items-center justify-center">
           <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}

const loading = false;
