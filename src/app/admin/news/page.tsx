"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag, 
  MoreVertical, 
  MessageSquare, 
  Heart,
  Share2,
  Bookmark,
  Zap,
  Globe,
  Lock,
  Eye,
  Megaphone,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", category: "General", target: "All" });

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "announcements"), {
        ...newAnnouncement,
        timestamp: serverTimestamp(),
        author: "Administrator",
        likes: 0,
        comments: 0
      });
      setIsModalOpen(false);
      setNewAnnouncement({ title: "", content: "", category: "General", target: "All" });
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        
        {/* Cinematic Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
           
           <div className="space-y-4">
              <div className="flex items-center gap-2 group">
                 <div className="p-2 bg-indigo-500/10 rounded-lg superior-border group-hover:bg-indigo-500/20 transition-all">
                    <Megaphone className="w-4 h-4 text-indigo-400" />
                 </div>
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Propaganda Node</span>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tighter leading-none">
                 Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]">Broadcasts</span>
              </h1>
              <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
                 Disseminate critical intelligence, upcoming events, and official mandates across the institutional network.
              </p>
           </div>

           <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative px-10 py-5 bg-indigo-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all"
           >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="flex items-center gap-3 relative z-10">
                 <Plus className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                 Initialize Broadcast
              </div>
           </button>
        </div>

        {/* Intelligence Filters */}
        <div className="flex flex-wrap items-center gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] superior-border backdrop-blur-md">
           {['All Transmissions', 'Academic', 'Events', 'Administrative', 'Emergency'].map((filter, i) => (
             <button 
               key={filter}
               className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-indigo-500/10 text-white border border-indigo-500/30' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
             >
               {filter}
             </button>
           ))}
           <div className="ml-auto flex items-center gap-2 pr-4">
              <Search className="w-4 h-4 text-slate-600" />
              <input 
                placeholder="Search archive..." 
                className="bg-transparent border-none text-xs font-bold text-slate-400 focus:ring-0 w-40"
              />
           </div>
        </div>

        {/* Announcements Feed */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
           {announcements.length === 0 ? (
             [1,2,3,4].map(i => (
               <div key={i} className="neo-glass bg-slate-900/40 rounded-[3rem] p-10 superior-border animate-pulse h-80" />
             ))
           ) : (
             announcements.map((post, i) => (
               <motion.div
                 key={post.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="group relative neo-glass bg-slate-950/40 rounded-[3.5rem] superior-border p-10 hover:border-indigo-500/40 transition-all duration-700 overflow-hidden shadow-2xl"
               >
                 {/* Decorative Pulse */}
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
                 
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900/50 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700 shadow-inner">
                          <Megaphone className="w-6 h-6 text-indigo-400 text-glow" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">{post.category || 'GENERAL'}</p>
                          <div className="flex items-center gap-2">
                             <h3 className="text-2xl font-black text-white tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-700">{post.title}</h3>
                             {i < 1 && <span className="bg-rose-500/10 text-rose-400 text-[8px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20 animate-pulse uppercase tracking-widest">Recent</span>}
                          </div>
                       </div>
                    </div>
                    <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-slate-500 hover:text-white transition-all"><MoreVertical className="w-5 h-5"/></button>
                 </div>

                 <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10 line-clamp-3 group-hover:text-slate-300 transition-colors">
                   {post.content}
                 </p>

                 <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center superior-border">
                          <User className="w-4 h-4 text-slate-500" />
                       </div>
                       <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">{post.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest bg-white/[0.04] px-4 py-2 rounded-full border border-white/5">
                       <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                       {post.timestamp?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                       <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-white/5 rounded-full transition-all group/btn text-slate-500 hover:text-rose-400">
                          <Heart className="w-4 h-4 group-hover/btn:fill-rose-400 transition-all" />
                          <span className="text-[11px] font-black tracking-widest">{post.likes || 0}</span>
                       </button>
                       <button className="flex items-center gap-1.5 px-4 py-2 hover:bg-white/5 rounded-full transition-all group/btn text-slate-500 hover:text-indigo-400">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-[11px] font-black tracking-widest">{post.comments || 0}</span>
                       </button>
                       <button className="p-2.5 hover:bg-white/5 rounded-full transition-all text-slate-500 hover:text-white">
                          <Share2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               </motion.div>
             ))
           )}
        </div>

        {/* Modal for New Announcement */}
        <AnimatePresence>
          {isModalOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-[100]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-[#020617] border border-white/10 rounded-[3rem] p-12 z-[101] shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.5)]" />
                
                <h2 className="text-4xl font-black text-white tracking-tighter mb-8">Initialize <span className="text-indigo-500">Transmission</span></h2>
                
                <form onSubmit={handlePost} className="space-y-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Transmission Title</label>
                      <input 
                        required
                        value={newAnnouncement.title}
                        onChange={e => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                        className="w-full bg-white/[0.03] border-none rounded-2xl py-5 px-8 text-white font-bold tracking-tight focus:ring-4 focus:ring-indigo-500/20 transition-all text-lg"
                        placeholder="Urgent: Academic Policy Update..."
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Category Vector</label>
                         <select 
                           value={newAnnouncement.category}
                           onChange={e => setNewAnnouncement({...newAnnouncement, category: e.target.value})}
                           className="w-full bg-white/[0.03] border-none rounded-2xl py-4 px-6 text-white font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/20"
                         >
                            <option className="bg-slate-900">General</option>
                            <option className="bg-slate-900">Academic</option>
                            <option className="bg-slate-900">Events</option>
                            <option className="bg-slate-900">Emergency</option>
                         </select>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Target Node</label>
                         <select 
                            value={newAnnouncement.target}
                            onChange={e => setNewAnnouncement({...newAnnouncement, target: e.target.value})}
                            className="w-full bg-white/[0.03] border-none rounded-2xl py-4 px-6 text-white font-bold appearance-none cursor-pointer focus:ring-4 focus:ring-indigo-500/20"
                         >
                            <option className="bg-slate-900">All Entities</option>
                            <option className="bg-slate-900">Teachers Only</option>
                            <option className="bg-slate-900">Students Only</option>
                         </select>
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-2">Broadcast Intelligence</label>
                      <textarea 
                        required
                        value={newAnnouncement.content}
                        onChange={e => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                        rows={5}
                        className="w-full bg-white/[0.03] border-none rounded-[2rem] py-6 px-8 text-white font-medium tracking-normal focus:ring-4 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
                        placeholder="Detailed message payload for institutional synchronization..."
                      />
                   </div>

                   <div className="flex items-center gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-5 bg-white/5 border border-white/10 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                      >
                         Abort Signal
                      </button>
                      <button 
                         type="submit"
                         className="flex-[2] py-5 bg-indigo-600 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all active:scale-95"
                      >
                         Execute Global Broadcast
                      </button>
                   </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </DashboardLayout>
  );
}
