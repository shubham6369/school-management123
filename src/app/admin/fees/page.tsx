"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  CreditCard, Search, Filter, 
  DollarSign, TrendingUp, AlertTriangle,
  Download, Printer, Plus, MoreVertical,
  CheckCircle2, Clock, XCircle, ArrowUpRight,
  User, Mail, Phone, Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp, doc, setDoc } from "firebase/firestore";
import { formatDate, formatCurrency, cn } from "@/lib/utils";

interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  date: string;
  invoiceId: string;
}

export default function FeesPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [newPayment, setNewPayment] = useState({
    studentId: "",
    studentName: "",
    rollNumber: "",
    amount: "",
    status: "paid" as const,
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const q = query(collection(db, "payments"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Payment[];
      setPayments(data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const invoiceId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
      await addDoc(collection(db, "payments"), {
        ...newPayment,
        amount: Number(newPayment.amount),
        date: Timestamp.now().toDate().toISOString(),
        invoiceId
      });
      setShowAddModal(false);
      setNewPayment({ studentId: "", studentName: "", rollNumber: "", amount: "", status: "paid" });
      fetchPayments();
    } catch (err) {
      console.error("Error adding payment:", err);
    }
  };

  const filteredPayments = payments.filter(p => 
    p.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 font-display">Revenue Management</h1>
              <p className="text-slate-500 text-sm mt-0.5">Manage school fees, payments, and financial records</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-600 px-5 py-3 rounded-2xl font-bold border border-slate-100 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                Export Ledger
             </button>
             <button 
               onClick={() => setShowAddModal(true)}
               className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-100 active:scale-95"
             >
                <Plus className="w-5 h-5" />
                Record Payment
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Total Collected</p>
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-slate-800">$42,500</h3>
                   <div className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      18%
                   </div>
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                   <div className="w-[72%] h-full bg-emerald-500 rounded-full" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Pending Fees</p>
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-slate-800">$12,800</h3>
                   <div className="text-amber-600 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      34 Students
                   </div>
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                   <div className="w-[34%] h-full bg-amber-500 rounded-full" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Overdue Payments</p>
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-rose-600">$5,400</h3>
                   <div className="text-rose-600 bg-rose-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Critical
                   </div>
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                   <div className="w-[12%] h-full bg-rose-500 rounded-full" />
                </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Projected Income</p>
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-blue-600">$60,700</h3>
                   <div className="text-blue-600 bg-blue-50 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Targets
                   </div>
                </div>
                <div className="mt-4 w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                   <div className="w-[60%] h-full bg-blue-500 rounded-full" />
                </div>
            </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 font-bold" />
            <input 
              type="text" 
              placeholder="Search by student name or invoice ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <button className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-5 py-3 rounded-xl text-slate-600 text-sm font-bold border border-slate-100 transition-all">
            <Filter className="w-4 h-4" />
            All Status
          </button>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="p-6 border-b border-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student Info</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {loading ? (
                      <tr><td colSpan={6} className="py-20 text-center text-slate-400 italic">Processing ledger...</td></tr>
                   ) : filteredPayments.length === 0 ? (
                      <tr><td colSpan={6} className="py-20 text-center text-slate-400 italic">No transactions found.</td></tr>
                   ) : (
                      filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                           <td className="px-8 py-5">
                              <span className="text-sm font-bold text-slate-800">#{p.invoiceId}</span>
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500 border border-slate-200">
                                    {p.studentName.charAt(0)}
                                 </div>
                                 <div>
                                    <p className="text-sm font-bold text-slate-800">{p.studentName}</p>
                                    <p className="text-xs text-slate-400">{p.rollNumber}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-sm font-black text-slate-800">{formatCurrency(p.amount)}</p>
                           </td>
                           <td className="px-8 py-5">
                              <p className="text-sm text-slate-500 font-medium">{formatDate(p.date)}</p>
                           </td>
                           <td className="px-8 py-5">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit",
                                p.status === "paid" && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                                p.status === "pending" && "bg-amber-50 text-amber-600 border border-amber-100",
                                p.status === "overdue" && "bg-rose-50 text-rose-600 border border-rose-100"
                              )}>
                                 {p.status === "paid" && <CheckCircle2 className="w-3 h-3" />}
                                 {p.status === "pending" && <Clock className="w-3 h-3" />}
                                 {p.status === "overdue" && <XCircle className="w-3 h-3" />}
                                 <span className="capitalize">{p.status}</span>
                              </span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button title="Print Receipt" className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-blue-600 transition-all border border-transparent">
                                    <Printer className="w-4 h-4" />
                                 </button>
                                 <button title="More Options" className="p-2 hover:bg-white hover:shadow-sm rounded-xl text-slate-400 hover:text-blue-600 transition-all border border-transparent">
                                    <MoreVertical className="w-4 h-4" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                      ))
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setShowAddModal(false)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-100">
                       <CreditCard className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Record New Payment</h2>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 transition-all">
                    <XCircle className="w-6 h-6" />
                 </button>
              </div>

              <form onSubmit={handleAddPayment} className="space-y-6">
                 <div className="space-y-4">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1.5">Student Name</label>
                       <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                             required
                             type="text" 
                             className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm"
                             placeholder="e.g. Michael Jordan"
                             value={newPayment.studentName}
                             onChange={e => setNewPayment({...newPayment, studentName: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Roll Number</label>
                          <input 
                             required
                             type="text" 
                             className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm"
                             placeholder="SN-042"
                             value={newPayment.rollNumber}
                             onChange={e => setNewPayment({...newPayment, rollNumber: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1.5">Amount ($)</label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                               required
                               type="number" 
                               className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm"
                               placeholder="1500.00"
                               value={newPayment.amount}
                               onChange={e => setNewPayment({...newPayment, amount: e.target.value})}
                            />
                          </div>
                       </div>
                    </div>
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1.5">Payment Status</label>
                       <div className="flex gap-4">
                          <button 
                             type="button"
                             onClick={() => setNewPayment({...newPayment, status: "paid"})}
                             className={cn(
                                "flex-1 py-3 rounded-xl border font-bold text-sm transition-all",
                                newPayment.status === "paid" 
                                  ? "bg-emerald-50 border-emerald-500 text-emerald-600" 
                                  : "border-slate-100 text-slate-400 hover:bg-slate-50"
                             )}
                          >
                             Paid
                          </button>
                          <button 
                             type="button"
                             onClick={() => setNewPayment({...newPayment, status: "pending"})}
                             className={cn(
                                "flex-1 py-3 rounded-xl border font-bold text-sm transition-all",
                                newPayment.status === "pending" 
                                  ? "bg-amber-50 border-amber-500 text-amber-600" 
                                  : "border-slate-100 text-slate-400 hover:bg-slate-50"
                             )}
                          >
                             Pending
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="flex gap-3 pt-6">
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    >
                       Discard
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-[0.98]"
                    >
                       Process Payment
                    </button>
                 </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
