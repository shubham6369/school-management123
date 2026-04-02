"use client";

import { useState } from "react";
import { 
  FileText, Upload, Search, Filter, 
  File, FileVideo, FileAudio, FileType,
  MoreVertical, Download, Trash2, FolderPlus,
  Eye, Globe, Lock, Share2, Archive,
  CheckCircle2, Clock, Info, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "doc" | "xls" | "zip";
  category: "Academic" | "Legal" | "HR" | "Resources";
  size: string;
  updatedAt: string;
  visibility: "Public" | "Internal";
  isArchived: boolean;
}

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "School_Policy_2024.pdf", type: "pdf", category: "Legal", size: "2.4 MB", updatedAt: "Mar 12, 2024", visibility: "Public", isArchived: false },
    { id: "2", name: "Annual_Syllabus_Physics.doc", type: "doc", category: "Academic", size: "1.2 MB", updatedAt: "Mar 15, 2024", visibility: "Internal", isArchived: false },
    { id: "3", name: "Budget_Report_Q1.xls", type: "xls", category: "Legal", size: "5.6 MB", updatedAt: "Mar 10, 2024", visibility: "Internal", isArchived: true },
    { id: "4", name: "Admission_Forms_Templates.zip", type: "zip", category: "Resources", size: "12.8 MB", updatedAt: "Feb 28, 2024", visibility: "Public", isArchived: false },
  ]);

  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Archived">("Active");

  const filteredDocs = documents.filter(doc => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return !doc.isArchived;
    if (activeTab === "Archived") return doc.isArchived;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="text-rose-500" />;
      case "doc": return <File className="text-indigo-500" />;
      case "xls": return <FileType className="text-emerald-500" />;
      case "zip": return <Archive className="text-amber-500" />;
      default: return <File className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-4 uppercase font-title leading-tight">
             Digital Repository
          </h1>
          <p className="text-slate-400 mt-2 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            Secure Cloud Vault for School Assets & Resources
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button className="p-3 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all shadow-xl shadow-white/5 active:scale-95">
              <FolderPlus className="w-5 h-5" />
           </button>
           <button className="px-8 py-3.5 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/20 flex items-center gap-3 active:scale-95">
              <Upload className="w-5 h-5" />
              Upload Asset
           </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-slate-900/40 border-white/5 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
               <FileText className="w-7 h-7" />
            </div>
            <div>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">Total Assets</p>
               <p className="text-2xl font-black text-white leading-none tracking-tight">1,284 <span className="text-[10px] text-slate-600">FILES</span></p>
            </div>
         </Card>
         <Card className="p-6 bg-slate-900/40 border-white/5 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-600/10 flex items-center justify-center text-amber-400">
               <Share2 className="w-7 h-7" />
            </div>
            <div>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">Shared Links</p>
               <p className="text-2xl font-black text-white leading-none tracking-tight">412 <span className="text-[10px] text-slate-600">LINKS</span></p>
            </div>
         </Card>
         <Card className="p-6 bg-slate-900/40 border-white/5 rounded-3xl flex items-center gap-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-400">
               <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">Uptime Rating</p>
               <p className="text-2xl font-black text-white leading-none tracking-tight">99.9% <span className="text-[10px] text-slate-600">LIVE</span></p>
            </div>
         </Card>
      </div>

      {/* Main Content Area */}
      <Card className="bg-slate-900/40 backdrop-blur-xl border-white/5 rounded-[2.5rem] overflow-hidden">
         {/* Filter Bar */}
         <div className="p-8 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-2 bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 w-fit self-start">
               {["Active", "Archived", "All"].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab as any)}
                   className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                     activeTab === tab ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10" : "text-slate-500 hover:text-slate-200"
                   }`}
                 >
                   {tab}
                 </button>
               ))}
            </div>

            <div className="flex-1 max-w-md relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
               <input 
                 type="text" 
                 placeholder="SEARCH DOCUMENTS..." 
                 className="w-full pl-12 pr-6 py-3.5 bg-slate-950/50 border border-white/5 rounded-2xl focus:outline-none focus:border-indigo-500/50 text-xs font-black uppercase tracking-widest text-white placeholder:text-slate-700 transition-all"
               />
            </div>
         </div>

         {/* Document Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-white/5">
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Asset Name</th>
                     <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Category</th>
                     <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">File Info</th>
                     <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap">Visibility</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 whitespace-nowrap text-right">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  <AnimatePresence mode="popLayout">
                     {filteredDocs.map((doc, idx) => (
                       <motion.tr 
                         key={doc.id}
                         layout
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.05 }}
                         className="group border-b border-white/5 hover:bg-white/[0.02] last:border-0"
                       >
                         <td className="px-8 py-5">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                  {getIcon(doc.type)}
                                </div>
                                <div>
                                   <p className="text-xs font-black text-white hover:text-indigo-400 transition-colors cursor-pointer uppercase tracking-tight">{doc.name}</p>
                                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1">Uploaded {doc.updatedAt}</p>
                                </div>
                            </div>
                         </td>
                         <td className="px-6 py-5">
                            <span className="text-[10px] font-black tracking-widest uppercase py-1 px-3 bg-white/5 border border-white/5 text-slate-400 rounded-full">{doc.category}</span>
                         </td>
                         <td className="px-6 py-5">
                            <p className="text-xs font-black text-white uppercase">{doc.type}</p>
                            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-0.5">{doc.size}</p>
                         </td>
                         <td className="px-6 py-5">
                            {doc.visibility === "Public" ? (
                              <div className="flex items-center gap-2 text-emerald-400">
                                 <Globe className="w-3.5 h-3.5" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Public</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-amber-400">
                                 <Lock className="w-3.5 h-3.5" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Internal</span>
                              </div>
                            )}
                         </td>
                         <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button title="View Online" className="p-2 text-slate-400 hover:text-white transition-colors"><Eye className="w-4 h-4" /></button>
                               <button title="Download" className="p-2 text-slate-400 hover:text-white transition-colors"><Download className="w-4 h-4" /></button>
                               <button title="Options" className="p-2 text-slate-400 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                            </div>
                         </td>
                       </motion.tr>
                     ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>

         {/* Empty State */}
         {filteredDocs.length === 0 && (
           <div className="p-20 flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-slate-950 flex items-center justify-center border-2 border-dashed border-white/10">
                 <FileText className="w-8 h-8 text-slate-700" />
              </div>
              <div className="text-center">
                 <p className="text-white font-black uppercase tracking-widest text-xs">No assets found in this category.</p>
                 <p className="text-slate-600 font-bold text-[10px] uppercase tracking-widest mt-1">Try refining your search or add a new file.</p>
              </div>
           </div>
         )}
      </Card>

      {/* Cloud Status Footer */}
      <div className="flex items-center justify-between text-slate-600">
         <p className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <ExternalLink className="w-3 h-3" />
            Cloud Storage: <span className="text-slate-400 text-xs">4.2 GB / 10 GB</span>
         </p>
         <p className="text-[10px] font-black uppercase tracking-widest">System Engine v1.0.4-LTS</p>
      </div>
    </div>
  );
}
