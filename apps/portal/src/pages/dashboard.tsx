import React from 'react';

// Devopstrio AVD Security Baseline
// Cyber Security Operations & Compliance Command Center

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-rose-500/30">
            {/* Global Security Header */}
            <header className="border-b border-white/5 bg-black/60 backdrop-blur-3xl sticky top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center font-black text-white shadow-[0_0_25px_rgba(225,29,72,0.4)] border border-white/10 relative overflow-hidden">
                            SB
                            <div className="absolute top-0 right-0 w-2 h-2 bg-rose-400 rounded-full m-1 border border-black shadow-[0_0_50px_10px_rgba(251,113,133,0.5)]"></div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-widest leading-none">SECURITY BASELINE</h1>
                            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em] mt-2 italic">Zero-Trust Hardened Foundation</p>
                        </div>
                    </div>
                    <nav className="flex gap-12 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
                        <a href="#" className="text-rose-400 border-b-2 border-rose-500 pb-10 pt-10">Posture Overview</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Policy Control</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Hardening Center</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Threat Board</a>
                        <a href="#" className="hover:text-white transition-all pt-10 pb-10">Compliance</a>
                    </nav>
                </div>
            </header>

            <main className="max-w-screen-2xl mx-auto px-10 py-12">

                {/* Global Security Posture Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { label: 'Overall Posture Score', value: '92', status: 'Optimal', color: 'rose' },
                        { label: 'Identity Risk', value: 'Low', status: 'MFA Enforced', color: 'emerald' },
                        { label: 'Hardening Drift', value: '0.4%', status: 'Auto-Healing', color: 'rose' },
                        { label: 'Threats Blocked (24h)', value: '1.4k', status: 'Active Defense', color: 'emerald' }
                    ].map((kpi, idx) => (
                        <div key={idx} className="bg-neutral-900/40 p-10 rounded-[2.5rem] border border-white/5 hover:border-rose-500/40 transition-all shadow-2xl relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/10 transition-all"></div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-4">{kpi.label}</span>
                            <div className="text-4xl font-black text-white tracking-tighter mb-4 font-mono">{kpi.value}</div>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full bg-${kpi.color}-500 shadow-[0_0_10px_rgba(225,29,72,0.5)]`}></div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{kpi.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Primary Cyber Defense Center */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">

                    {/* Live Threat Intelligence Dashboard */}
                    <div className="xl:col-span-2 bg-neutral-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight">Real-Time Threat Visualization</h2>
                                <p className="text-slate-400 text-sm mt-2 max-w-lg">Monitoring global AVD session activity, anomalous identity signals, and endpoint hardening integrity.</p>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-black hover:bg-neutral-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                                    Generate CISO Report
                                </button>
                                <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-900/40">
                                    Initiate Global Lockdown
                                </button>
                            </div>
                        </div>

                        {/* Active Defensive Grid Representation */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { title: 'Identity Health', val: 98, msg: 'No MFA Bypasses' },
                                { title: 'Network Segments', val: 100, msg: '0 External Risks' },
                                { title: 'Host Hardening', val: 94, msg: 'CIS-L1 Active' },
                                { title: 'Data Encryption', val: 100, msg: 'AES-256 GBD' }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 flex flex-col items-center group cursor-pointer hover:border-rose-500/20 transition-all">
                                    <div className="relative w-24 h-24 mb-6">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                                            <circle cx="48" cy="48" r="44" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-rose-500" strokeDasharray="276" strokeDashoffset={276 - (276 * stat.val / 100)} />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white font-mono">{stat.val}%</div>
                                    </div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.title}</div>
                                    <div className="text-[8px] font-bold text-rose-400 italic text-center uppercase tracking-tighter">{stat.msg}</div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-black/60 rounded-[2.5rem] border border-white/5 relative overflow-hidden group">
                            <div className="flex justify-between items-center relative z-10">
                                <div>
                                    <div className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-2 leading-none">Defender for Cloud Sync</div>
                                    <div className="text-lg font-black text-white tracking-tight">Active IDS Protection Operational</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Status</div>
                                    <div className="text-xs font-black text-emerald-400 uppercase tracking-[0.2em] bg-emerald-500/10 px-4 py-1.5 rounded-full">Synchronized</div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-1 h-full bg-rose-600"></div>
                        </div>
                    </div>

                    {/* Active Alerts & Compliance Stack */}
                    <div className="flex flex-col gap-10">
                        <div className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex-1 flex flex-col">
                            <h3 className="text-xl font-black text-white uppercase tracking-wider mb-8 border-b border-rose-500/20 pb-6 flex items-center justify-between">
                                Security Incidents
                                <span className="animate-pulse w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.8)]"></span>
                            </h3>
                            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                {[
                                    { app: 'hostpool-fin-uks', msg: 'Lateal Move Attempt Blocked', time: '4m ago', sev: 'Critical' },
                                    { app: 'vm-dev-uks-22', msg: 'Unauthorized Registry Edit', time: '12m ago', sev: 'High' },
                                    { app: 'ent-id-connector', msg: 'Multiple MFA Failures - Risk Score: 88', time: '22m ago', sev: 'High' },
                                    { app: 'firewall-vnet-01', msg: 'Blocked Egress to High-Risk IP', time: '42m ago', sev: 'Medium' }
                                ].map((alert, idx) => (
                                    <div key={idx} className="p-6 bg-black/40 rounded-2xl border border-white/5 relative group hover:border-rose-500/20 transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alert.app}</div>
                                            <div className="text-[9px] font-bold text-slate-600 italic uppercase">{alert.time}</div>
                                        </div>
                                        <div className="text-sm font-black text-white tracking-tight leading-snug mb-3">{alert.msg}</div>
                                        <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tighter ${alert.sev === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {alert.sev}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-8 bg-black hover:bg-neutral-800 text-white text-[11px] font-black py-4 rounded-2xl border border-white/10 uppercase tracking-widest transition-all">
                                View Sentinel Board
                            </button>
                        </div>

                        <div className="bg-rose-600 p-10 rounded-[3rem] shadow-[0_0_50px_rgba(225,29,72,0.3)] relative overflow-hidden group border border-white/10">
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-all"></div>
                            <h4 className="text-[10px] font-black text-rose-200 uppercase tracking-widest mb-2 leading-none">Compliance Milestone</h4>
                            <div className="text-2xl font-black text-white tracking-tight mb-2">ISO27001 Evidence Sync</div>
                            <p className="text-xs text-rose-100 font-medium leading-relaxed">
                                Automated evidence pack generated for March Audit. Baseline shows <span className="font-bold underline">100% adherence</span> to identity controls.
                            </p>
                        </div>
                    </div>

                </div>

                {/* Sub-Internal Security Intelligence Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl relative overflow-hidden">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-3">Login Attack Surface Analysis</h5>
                                <div className="text-3xl font-black text-white font-mono tracking-tighter">0.02% <span className="text-xs font-bold text-emerald-400 underline ml-1 uppercase tracking-normal">RISK EXPOSURE</span></div>
                            </div>
                            <div className="text-right text-[10px] font-black text-slate-500 uppercase">Live Risk Pulse</div>
                        </div>
                        <div className="flex items-end gap-1.5 h-32 px-2">
                            {[12, 18, 14, 22, 10, 8, 14, 24, 38, 12, 8, 6, 9, 11].map((v, i) => (
                                <div key={i} className="flex-1 bg-rose-500/20 rounded-t-lg hover:bg-rose-500 transition-all relative group cursor-pointer" style={{ height: `${v * 2}%` }}>
                                    <div className="absolute -top-10 left-1/2 -ms-4 opacity-0 group-hover:opacity-100 bg-white text-black text-[10px] font-black px-2 py-1 rounded shadow-xl pointer-events-none transition-all">
                                        {v}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-xl">
                        <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Baseline Health Scorecard</h5>
                        <div className="space-y-6">
                            {[
                                { ctrl: 'Windows Hardening - Level 1', status: 'Compliant', col: 'emerald' },
                                { ctrl: 'Defender IDPS Mode', status: 'Active', col: 'emerald' },
                                { ctrl: 'LSASS Protection', status: 'Drift Detected', col: 'amber' },
                                { ctrl: 'Credential Guard', status: 'Active', col: 'emerald' }
                            ].map((row, idx) => (
                                <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4 hover:border-white/10 transition-colors cursor-pointer group">
                                    <div>
                                        <div className="text-sm font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">{row.ctrl}</div>
                                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Continuous Control Monitoring</div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest bg-${row.col}-500/10 text-${row.col}-400`}>{row.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 bg-white hover:bg-slate-200 text-black text-[11px] font-black py-4 rounded-2xl uppercase tracking-widest transition-all">
                            Remediate Security Drift
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
