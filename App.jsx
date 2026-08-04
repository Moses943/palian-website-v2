import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ArrowRight, ArrowLeft, ChevronDown, ChevronRight, ShieldCheck, Clock,
  TrendingUp, Users, Wallet, Briefcase, GraduationCap, Car, Building2,
  Home, Sparkles, CheckCircle2, Phone, Mail, MapPin, MessageCircle,
  Send, Star, Calculator, FileText, UserCheck, Banknote, Landmark,
  HeartHandshake, Lock, ArrowUpRight, Quote, LogOut, LayoutDashboard,
  History, Download, Settings, Eye, EyeOff, User, AlertCircle,
} from "lucide-react";

/* ---------------------------------------------------------------
   TOKENS
   Primary  #0B5ED7   Secondary #0D6EFD   Accent (gold) #F4B400
   Ink #14202E   Muted #5B6472   Paper #FFFFFF   Tint #EEF4FE
----------------------------------------------------------------*/
const C = {
  primary: "#0B5ED7",
  primaryDeep: "#073B8C",
  secondary: "#0D6EFD",
  gold: "#F4B400",
  goldDeep: "#C98F00",
  ink: "#14202E",
  muted: "#5B6472",
  paper: "#FFFFFF",
  tint: "#EEF4FE",
  line: "#DCE6F5",
};

/* ---------------------------------------------------------------
   DATA
----------------------------------------------------------------*/
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Loan Products", href: "#products" },
  { label: "Calculator", href: "#calculator" },
  { label: "Branches", href: "#branches" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const STATS = [
  { label: "Happy Customers", value: 18400, suffix: "+", icon: Users },
  { label: "Loans Approved", value: 26900, suffix: "+", icon: CheckCircle2 },
  { label: "Active Branches", value: 14, suffix: "", icon: Building2 },
  { label: "Years of Service", value: 12, suffix: "", icon: Landmark },
];

const WHY = [
  { title: "Fast Approval", desc: "Most applications are assessed within 24 hours of document verification.", icon: Clock },
  { title: "Competitive Rates", desc: "Transparent interest rates that stay fixed for the life of your loan.", icon: TrendingUp },
  { title: "Real Human Support", desc: "A branch officer assigned to your file from application to final payment.", icon: HeartHandshake },
  { title: "Flexible Repayment", desc: "Choose a schedule that matches your salary date or business cash flow.", icon: Wallet },
  { title: "Secure Process", desc: "Bank-grade encryption and strict data-handling protocols on every file.", icon: Lock },
  { title: "12 Years Trusted", desc: "One of Zambia's established lenders, licensed and independently audited.", icon: ShieldCheck },
];

const PRODUCTS = [
  { name: "Personal Loans", icon: Wallet, desc: "Everyday financing for personal needs, from emergencies to home improvements.", eligibility: "Age 21–60, proof of income", max: "K80,000" },
  { name: "Salary Advance", icon: Banknote, desc: "A short bridge against your next payslip, disbursed same day.", eligibility: "3+ months at current employer", max: "K15,000" },
  { name: "Civil Servant Loans", icon: Landmark, desc: "Preferential rates for government employees, deducted at source.", eligibility: "Active payroll number (PMEC)", max: "K150,000" },
  { name: "Business Loans", icon: Briefcase, desc: "Working capital and expansion funding for registered businesses.", eligibility: "PACRA registration, 1yr trading", max: "K500,000" },
  { name: "SME Loans", icon: Building2, desc: "Tailored facilities for small and medium enterprises scaling up.", eligibility: "Business plan, 6mo bank statements", max: "K350,000" },
  { name: "Emergency Loans", icon: Sparkles, desc: "Rapid-response financing for unexpected medical or family costs.", eligibility: "Valid NRC, income proof", max: "K25,000" },
  { name: "Education Loans", icon: GraduationCap, desc: "Tuition and school-fee financing for you or your dependents.", eligibility: "Admission letter or fee statement", max: "K60,000" },
  { name: "Asset Financing", icon: Car, desc: "Structured financing for vehicles and income-generating equipment.", eligibility: "30% deposit, valid quotation", max: "K400,000" },
];

const STEPS = [
  { title: "Submit Application", desc: "Complete the online form or visit any branch with your details.", icon: FileText },
  { title: "Document Verification", desc: "We confirm your NRC, payslip and bank statement.", icon: UserCheck },
  { title: "Loan Assessment", desc: "Our credit team reviews affordability and terms.", icon: Calculator },
  { title: "Approval", desc: "You receive an offer letter with the agreed terms.", icon: CheckCircle2 },
  { title: "Money Disbursed", desc: "Funds are paid directly into your bank account.", icon: Banknote },
];

const TESTIMONIALS = [
  { name: "Chanda Mwansa", role: "Civil Servant, Lusaka", quote: "My salary advance was in my account the same afternoon. The officer explained every fee before I signed anything.", rating: 5 },
  { name: "Mutale Banda", role: "Shop Owner, Ndola", quote: "The SME loan let me restock before the festive season. Repayments line up with my sales cycle, which matters a lot.", rating: 5 },
  { name: "Bwalya Chileshe", role: "Teacher, Kitwe", quote: "Second loan with Palian. Straightforward paperwork and the calculator online matched what I actually paid.", rating: 5 },
  { name: "Natasha Phiri", role: "Nurse, Kabwe", quote: "Applied for an emergency loan on a Friday evening and had an answer by Saturday morning.", rating: 5 },
  { name: "Joseph Zulu", role: "Contractor, Livingstone", quote: "Asset financing on my pickup was cleaner than I expected. No hidden charges at settlement.", rating: 5 },
];

const FAQS = [
  { q: "How do I apply for a loan?", a: "Apply online through our loan application form, or visit any Palian branch with a valid NRC. An officer will guide you through the remaining steps." },
  { q: "What documents are required?", a: "A valid NRC, your most recent payslip, three to six months of bank statements, and proof of address. Business loans additionally require PACRA registration." },
  { q: "How long does approval take?", a: "Most personal and salary advance applications are assessed within 24 hours once documents are verified. Business loans typically take 3–5 working days." },
  { q: "How much can I borrow?", a: "This depends on the loan product and your monthly income or business turnover. Use the calculator below for an estimate, or ask a branch officer for a precise figure." },
  { q: "How do repayments work?", a: "Repayments are deducted from your salary at source (civil servants), by standing order, or via mobile money — whichever you set up at disbursement." },
  { q: "Can I settle my loan early?", a: "Yes. Early settlement is welcomed and there is no penalty — you only pay interest accrued up to the settlement date." },
];

const BRANCHES = [
  { name: "Lusaka — Cairo Road", address: "Plot 22, Cairo Road, Lusaka", phone: "+260 211 22 3344", email: "lusaka@palianmoney.co.zm" },
  { name: "Ndola — Broadway", address: "14 Broadway, Ndola", phone: "+260 212 61 7788", email: "ndola@palianmoney.co.zm" },
  { name: "Kitwe — Independence Ave", address: "56 Independence Avenue, Kitwe", phone: "+260 212 22 9911", email: "kitwe@palianmoney.co.zm" },
  { name: "Livingstone — Mosi-oa-Tunya Rd", address: "9 Mosi-oa-Tunya Road, Livingstone", phone: "+260 213 32 1100", email: "livingstone@palianmoney.co.zm" },
];

const DEMO_ACCOUNT = {
  name: "Chanda Mwansa",
  nrc: "123456/78/1",
  loans: [
    {
      id: "PML-20481",
      product: "Civil Servant Loan",
      status: "Active",
      principal: 45000,
      balance: 27350,
      monthly: 2870,
      nextDue: "18 Aug 2026",
      opened: "02 Feb 2025",
      term: "24 months",
    },
    {
      id: "PML-19204",
      product: "Salary Advance",
      status: "Settled",
      principal: 8000,
      balance: 0,
      monthly: 0,
      nextDue: "—",
      opened: "10 Sep 2024",
      term: "3 months",
    },
  ],
  payments: [
    { date: "18 Jul 2026", loan: "PML-20481", amount: 2870, method: "Payroll Deduction", status: "Paid" },
    { date: "18 Jun 2026", loan: "PML-20481", amount: 2870, method: "Payroll Deduction", status: "Paid" },
    { date: "18 May 2026", loan: "PML-20481", amount: 2870, method: "Payroll Deduction", status: "Paid" },
    { date: "18 Apr 2026", loan: "PML-20481", amount: 2870, method: "Payroll Deduction", status: "Paid" },
    { date: "10 Dec 2024", loan: "PML-19204", amount: 2750, method: "Mobile Money", status: "Paid" },
  ],
};

/* ---------------------------------------------------------------
   HELPERS
----------------------------------------------------------------*/
function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function CountUp({ value, suffix = "", duration = 1400 }) {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);
  return (
    <span ref={ref}>
      {display.toLocaleString()}{suffix}
    </span>
  );
}

function fmtK(n) {
  return "K" + Math.round(n).toLocaleString();
}

/* ---------------------------------------------------------------
   NAV
----------------------------------------------------------------*/
function Nav({ onLoginClick, onDashboardClick, isAuthed }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2">
          <span
            className="flex items-center justify-center rounded-full font-bold"
            style={{ width: 36, height: 36, background: C.primary, color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 15 }}
          >P</span>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, color: scrolled ? C.ink : C.paper, fontSize: 18, letterSpacing: "-0.01em", textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.35)" }}>
            Palian <span style={{ color: scrolled ? C.primary : C.gold }}>Money Lending</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: scrolled ? C.ink : "#fff", fontFamily: "Inter, sans-serif", textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.35)" }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={isAuthed ? onDashboardClick : onLoginClick}
            className="text-sm font-medium flex items-center gap-1.5"
            style={{ color: scrolled ? C.primary : "#fff", fontFamily: "Sora, sans-serif", background: "none", border: "none", cursor: "pointer", textShadow: scrolled ? "none" : "0 1px 4px rgba(0,0,0,0.35)" }}
          >
            {isAuthed ? <LayoutDashboard size={16} /> : <User size={16} />}
            {isAuthed ? "My Dashboard" : "Customer Login"}
          </button>
          <a href="#apply" className="btn-gold text-sm">Apply Now</a>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X color={scrolled ? C.ink : "#fff"} /> : <Menu color={scrolled ? C.ink : "#fff"} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-6 pb-5 flex flex-col gap-3" style={{ background: "#fff", borderTop: `1px solid ${C.line}` }}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="text-sm font-medium py-1" style={{ color: C.ink, fontFamily: "Inter, sans-serif" }}>
              {n.label}
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); isAuthed ? onDashboardClick() : onLoginClick(); }}
            className="text-sm font-medium py-1 flex items-center gap-1.5 text-left"
            style={{ color: C.primary, fontFamily: "Sora, sans-serif", background: "none", border: "none" }}
          >
            {isAuthed ? <LayoutDashboard size={16} /> : <User size={16} />}
            {isAuthed ? "My Dashboard" : "Customer Login"}
          </button>
          <a href="#apply" onClick={() => setOpen(false)} className="btn-gold text-sm text-center mt-2">Apply Now</a>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------------
   HERO
----------------------------------------------------------------*/
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ minHeight: "92vh" }}>
      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${C.primaryDeep} 0%, ${C.primary} 55%, #0A4FBE 100%)` }} />
      {/* ledger grid texture */}
      <div className="absolute inset-0 ledger-grid" style={{ opacity: 0.16 }} />
      {/* floating seal */}
      <div className="hidden md:flex absolute items-center justify-center seal-float" style={{ top: "18%", right: "8%" }}>
        <div className="seal">
          <span>PALIAN<br/>TRUSTED</span>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-40 pb-28 flex flex-col items-start">
        <div className="eyebrow mb-5">
          <span className="dot" /> Licensed &amp; regulated money lender · Zambia
        </div>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, color: "#fff", fontSize: "clamp(2.4rem, 5.6vw, 4.2rem)", lineHeight: 1.04, letterSpacing: "-0.02em", maxWidth: 760 }}>
          Your Trusted<br/>Financial Partner
        </h1>
        <p className="mt-6" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.88)", fontSize: "1.15rem", maxWidth: 560, lineHeight: 1.6 }}>
          Fast, affordable and reliable loans for individuals, civil servants, SMEs and businesses across Zambia.
        </p>
        <div className="flex flex-wrap gap-4 mt-9">
          <a href="#apply" className="btn-gold">
            Apply Now <ArrowRight size={17} />
          </a>
          <a href="#calculator" className="btn-outline">
            Loan Calculator <Calculator size={17} />
          </a>
        </div>

        <div className="flex items-center gap-6 mt-14 flex-wrap">
          {["NRC only to start", "24-hr assessment", "No hidden fees"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <CheckCircle2 size={16} color={C.gold} />
              <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.85)", fontSize: 13.5 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 1440 80" className="absolute bottom-0 left-0 w-full" style={{ display: "block" }}>
        <path d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z" fill={C.paper} />
      </svg>
    </section>
  );
}

/* ---------------------------------------------------------------
   STATS
----------------------------------------------------------------*/
function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 -mt-2 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <s.icon size={20} color={C.primary} />
            <div className="stat-value">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   SECTION HEADER
----------------------------------------------------------------*/
function SectionHead({ eyebrow, title, sub, light }) {
  return (
    <div className="max-w-2xl mb-12">
      <div className="eyebrow-dark mb-3">{eyebrow}</div>
      <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", color: light ? "#fff" : C.ink, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
      {sub && <p className="mt-3" style={{ fontFamily: "Inter, sans-serif", color: light ? "rgba(255,255,255,0.75)" : C.muted, fontSize: 16, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------
   WHY CHOOSE US
----------------------------------------------------------------*/
function WhyChoose() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHead eyebrow="Why Palian" title="Built for how Zambians actually borrow" sub="Six commitments we hold ourselves to on every single loan file." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {WHY.map((w) => (
          <div key={w.title} className="why-card">
            <div className="why-icon"><w.icon size={20} color={C.primary} /></div>
            <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 17, color: C.ink }}>{w.title}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", color: C.muted, fontSize: 14.5, lineHeight: 1.6, marginTop: 6 }}>{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   LOAN PRODUCTS
----------------------------------------------------------------*/
function Products() {
  return (
    <section id="products" className="py-24" style={{ background: C.tint }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Loan Products" title="A product for every stage of life" sub="Eight facilities, each with clear eligibility and a ceiling you can plan around." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="product-card">
              <div className="product-icon"><p.icon size={22} color="#fff" /></div>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16.5, color: C.ink, marginTop: 14 }}>{p.name}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", color: C.muted, fontSize: 13.5, lineHeight: 1.55, marginTop: 6, minHeight: 64 }}>{p.desc}</p>
              <div className="ledger-line" />
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.muted }}>
                <div className="mb-1"><strong style={{ color: C.ink }}>Eligibility:</strong> {p.eligibility}</div>
                <div><strong style={{ color: C.ink }}>Max amount:</strong> <span className="mono" style={{ color: C.primary, fontWeight: 700 }}>{p.max}</span></div>
              </div>
              <a href="#apply" className="product-apply">Apply <ArrowUpRight size={14} /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   HOW IT WORKS
----------------------------------------------------------------*/
function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHead eyebrow="Process" title="From application to disbursement" sub="Five steps, most completed inside 24–48 hours." />
      <div className="steps-row">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.title}>
            <div className="step-item">
              <div className="step-num mono">{String(i + 1).padStart(2, "0")}</div>
              <div className="step-icon"><s.icon size={19} color={C.primary} /></div>
              <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, marginTop: 10 }}>{s.title}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", color: C.muted, fontSize: 13, lineHeight: 1.5, marginTop: 4 }}>{s.desc}</p>
            </div>
            {i < STEPS.length - 1 && <div className="step-connector" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   CALCULATOR  — the signature "passbook" element
----------------------------------------------------------------*/
function LoanCalculator() {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(18);
  const [months, setMonths] = useState(12);
  const [stamped, setStamped] = useState(false);

  const monthlyRate = rate / 100 / 12;
  const n = months;
  const monthlyInstallment = monthlyRate === 0
    ? amount / n
    : (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalRepayment = monthlyInstallment * n;
  const totalInterest = totalRepayment - amount;

  const handleCalc = () => {
    setStamped(true);
    setTimeout(() => setStamped(false), 1600);
  };

  return (
    <section id="calculator" className="py-24" style={{ background: C.primaryDeep, position: "relative", overflow: "hidden" }}>
      <div className="absolute inset-0 ledger-grid" style={{ opacity: 0.08 }} />
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Loan Calculator" title="See your repayment before you apply" sub="Adjust the figures — this passbook updates instantly, just like your first statement will." light />

        <div className="passbook">
          <div className="passbook-tab mono">LEDGER · ESTIMATE</div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-7">
              <div>
                <div className="pb-label">
                  <span>Loan Amount</span>
                  <span className="mono pb-value">{fmtK(amount)}</span>
                </div>
                <input type="range" min={1000} max={500000} step={1000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="slider" />
              </div>
              <div>
                <div className="pb-label">
                  <span>Interest Rate (annual)</span>
                  <span className="mono pb-value">{rate}%</span>
                </div>
                <input type="range" min={5} max={40} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="slider" />
              </div>
              <div>
                <div className="pb-label">
                  <span>Repayment Period</span>
                  <span className="mono pb-value">{months} mo</span>
                </div>
                <input type="range" min={1} max={60} step={1} value={months} onChange={(e) => setMonths(Number(e.target.value))} className="slider" />
              </div>
              <button onClick={handleCalc} className="btn-gold w-fit mt-2">Calculate <Calculator size={16} /></button>
            </div>

            <div className="passbook-result">
              {stamped && <div className="stamp">APPROVED · EST.</div>}
              <div className="pb-row pb-row-lg">
                <span>Monthly Installment</span>
                <span className="mono">{fmtK(monthlyInstallment)}</span>
              </div>
              <div className="pb-row"><span>Total Interest</span><span className="mono">{fmtK(totalInterest)}</span></div>
              <div className="pb-row"><span>Total Repayment</span><span className="mono">{fmtK(totalRepayment)}</span></div>
              <div className="pb-row"><span>Outstanding Balance (today)</span><span className="mono">{fmtK(amount)}</span></div>
              <div className="pb-bar">
                <div className="pb-bar-fill" style={{ width: `${Math.min(100, (amount / totalRepayment) * 100)}%` }} />
              </div>
              <div className="flex justify-between mt-1.5" style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.muted }}>
                <span>Principal</span><span>Interest</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-5 text-center" style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: "rgba(255,255,255,0.55)" }}>
          Estimate only. Final terms are confirmed in your offer letter after assessment.
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   ABOUT
----------------------------------------------------------------*/
function About() {
  const values = ["Integrity", "Professionalism", "Customer First", "Innovation", "Transparency", "Responsibility"];
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div>
          <div className="eyebrow-dark mb-3">About Us</div>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.7rem, 3.2vw, 2.4rem)", color: C.ink, letterSpacing: "-0.01em" }}>
            Twelve years of lending responsibly
          </h2>
          <p className="mt-5" style={{ fontFamily: "Inter, sans-serif", color: C.muted, fontSize: 15.5, lineHeight: 1.7 }}>
            Palian Money Lending Limited was founded to close the gap between traditional bank lending and the everyday
            financial needs of working Zambians. Today we operate branches across the Copperbelt, Lusaka and Southern
            Province, serving civil servants, SME owners and salaried employees alike.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="mv-card">
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: C.primary }}>Our Mission</div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.55 }}>
                To provide fast, fair and transparent credit that helps Zambians meet life's moments without exploitative terms.
              </p>
            </div>
            <div className="mv-card">
              <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14, color: C.primary }}>Our Vision</div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.55 }}>
                To be Zambia's most trusted financial partner for individuals and small businesses by 2030.
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="eyebrow-dark mb-3">Core Values</div>
          <div className="flex flex-col gap-2">
            {values.map((v, i) => (
              <div key={v} className="value-row">
                <span className="mono value-num">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   BRANCHES
----------------------------------------------------------------*/
function Branches() {
  return (
    <section id="branches" className="py-24" style={{ background: C.tint }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead eyebrow="Branch Network" title="Find a branch near you" sub="Fourteen branches nationwide — four flagship locations below." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BRANCHES.map((b) => (
            <div key={b.name} className="branch-card">
              <MapPin size={18} color={C.primary} />
              <h4 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 15, color: C.ink, marginTop: 10 }}>{b.name}</h4>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>{b.address}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, marginTop: 4 }}>{b.phone}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted }}>{b.email}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.address)}`}
                target="_blank" rel="noopener noreferrer"
                className="branch-link"
              >
                Get directions <ArrowUpRight size={13} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   TESTIMONIALS
----------------------------------------------------------------*/
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  const cur = TESTIMONIALS[i];
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <SectionHead eyebrow="Testimonials" title="What our customers say" />
      <div className="testimonial-card">
        <Quote size={30} color={C.gold} style={{ opacity: 0.5 }} />
        <p style={{ fontFamily: "Sora, sans-serif", fontWeight: 500, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: C.ink, lineHeight: 1.5, marginTop: 12 }}>
          &ldquo;{cur.quote}&rdquo;
        </p>
        <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
          <div>
            <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14.5, color: C.ink }}>{cur.name}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.muted }}>{cur.role}</div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: cur.rating }).map((_, k) => <Star key={k} size={15} fill={C.gold} color={C.gold} />)}
          </div>
        </div>
        <div className="flex gap-1.5 mt-6">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className="dot-btn" style={{ background: k === i ? C.primary : C.line }} aria-label={`Testimonial ${k + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   FAQ
----------------------------------------------------------------*/
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24" style={{ background: C.tint }}>
      <div className="max-w-3xl mx-auto px-6">
        <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
        <div className="flex flex-col gap-3">
          {FAQS.map((f, idx) => (
            <div key={f.q} className="faq-item">
              <button className="faq-q" onClick={() => setOpen(open === idx ? -1 : idx)}>
                <span>{f.q}</span>
                <ChevronDown size={18} style={{ transform: open === idx ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
              </button>
              {open === idx && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   APPLY + CONTACT
----------------------------------------------------------------*/
function ApplyContact() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="apply" className="max-w-6xl mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3">
          <div className="eyebrow-dark mb-3">Apply for a Loan</div>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 2.6vw, 2rem)", color: C.ink }}>
            Start your application
          </h2>
          <p className="mt-3 mb-8" style={{ fontFamily: "Inter, sans-serif", color: C.muted, fontSize: 14.5 }}>
            This sends your enquiry to a branch officer, who will contact you for document upload and verification.
          </p>

          {submitted ? (
            <div className="submitted-box">
              <CheckCircle2 size={28} color={C.primary} />
              <div>
                <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, color: C.ink }}>Application received</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: C.muted, marginTop: 3 }}>A branch officer will call you within one business day.</div>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
              <Field label="First Name" required />
              <Field label="Last Name" required />
              <Field label="NRC Number" placeholder="000000/00/0" required />
              <Field label="Phone Number" type="tel" required />
              <Field label="Email" type="email" />
              <SelectField label="Loan Type" options={PRODUCTS.map((p) => p.name)} />
              <Field label="Loan Amount (K)" type="number" />
              <SelectField label="Branch" options={BRANCHES.map((b) => b.name)} />
              <div className="sm:col-span-2">
                <Field label="Purpose of Loan" textarea />
              </div>
              <button type="submit" className="btn-gold sm:col-span-2 justify-center mt-2">
                Submit Application <Send size={16} />
              </button>
              <p className="sm:col-span-2 text-center" style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.muted }}>
                Document upload (NRC, payslip, bank statement) is completed with your branch officer after this step.
              </p>
            </form>
          )}
        </div>

        <div id="contact" className="lg:col-span-2">
          <div className="contact-panel">
            <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 17, color: "#fff" }}>Talk to us directly</h3>
            <div className="flex flex-col gap-4 mt-6">
              <ContactRow icon={Phone} label="Call us" value="+260 211 22 3344" />
              <ContactRow icon={Mail} label="Email" value="info@palianmoney.co.zm" />
              <ContactRow icon={MapPin} label="Head Office" value="Plot 22, Cairo Road, Lusaka" />
              <ContactRow icon={Clock} label="Working Hours" value="Mon–Fri 08:00–17:00 · Sat 08:00–13:00" />
            </div>
            <div className="flex gap-3 mt-8">
              <a href="https://wa.me/260211223344" target="_blank" rel="noopener noreferrer" className="chat-btn">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href="#contact" className="chat-btn chat-btn-ghost">
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required, placeholder, textarea }) {
  return (
    <label className="field">
      <span>{label}{required && <span style={{ color: C.gold }}> *</span>}</span>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} required={required} />
      ) : (
        <input type={type} placeholder={placeholder} required={required} />
      )}
    </label>
  );
}
function SelectField({ label, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select defaultValue="">
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
function ContactRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="contact-icon"><Icon size={16} color="#fff" /></div>
      <div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: "rgba(255,255,255,0.6)" }}>{label}</div>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: "#fff", marginTop: 1 }}>{value}</div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FOOTER
----------------------------------------------------------------*/
function Footer() {
  return (
    <footer style={{ background: C.ink }}>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center rounded-full font-bold" style={{ width: 32, height: 32, background: C.primary, color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 13 }}>P</span>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, color: "#fff", fontSize: 16 }}>Palian Money Lending</span>
          </div>
          <p style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.6 }}>
            Licensed money lender registered in Zambia. Lending responsibly since 2014.
          </p>
        </div>
        <FooterCol title="Quick Links" items={["Loan Products", "Branches", "Loan Calculator", "Contact Us"]} />
        <FooterCol title="Legal" items={["Privacy Policy", "Terms & Conditions", "Careers"]} />
        <div>
          <div className="footer-title">Follow Us</div>
          <div className="flex gap-3 mt-4">
            {["Facebook", "Instagram", "LinkedIn", "X"].map((s) => (
              <a key={s} href="#" className="social-dot" aria-label={s}>{s[0]}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between gap-2">
          <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 12.5 }}>© 2026 Palian Money Lending Limited. All rights reserved.</span>
          <span style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 12.5 }}>Regulated by the Bank of Zambia</span>
        </div>
      </div>
    </footer>
  );
}
function FooterCol({ title, items }) {
  return (
    <div>
      <div className="footer-title">{title}</div>
      <div className="flex flex-col gap-2.5 mt-4">
        {items.map((i) => (
          <a key={i} href="#" style={{ fontFamily: "Inter, sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 13.5 }} className="hover:opacity-100 opacity-80 transition-opacity">{i}</a>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CUSTOMER LOGIN
----------------------------------------------------------------*/
function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter both your email and password to continue.");
      return;
    }
    setError("");
    onLogin(email);
  };

  return (
    <div className="auth-shell">
      <div className="absolute inset-0 ledger-grid" style={{ opacity: 0.1 }} />
      <div className="auth-card">
        <button onClick={onBack} className="auth-back">
          <ArrowLeft size={15} /> Back to site
        </button>

        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center justify-center rounded-full font-bold" style={{ width: 34, height: 34, background: C.primary, color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 14 }}>P</span>
          <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, color: C.ink, fontSize: 16 }}>Palian <span style={{ color: C.primary }}>Customer Portal</span></span>
        </div>
        <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 24, color: C.ink, marginTop: 18 }}>Welcome back</h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13.5, color: C.muted, marginTop: 4 }}>
          Sign in to view your loan status, payments and statements.
        </p>

        <form onSubmit={submit} className="flex flex-col gap-4 mt-7">
          <label className="field">
            <span>Email Address</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
          </label>
          <label className="field">
            <span>Password</span>
            <div className="pw-wrap">
              <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="pw-toggle" aria-label="Toggle password visibility">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          {error && (
            <div className="auth-error"><AlertCircle size={15} /> {error}</div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2" style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.muted }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>
            <a href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, color: C.primary, fontWeight: 600, textDecoration: "none" }}>Forgot password?</a>
          </div>

          <button type="submit" className="btn-gold justify-center mt-2">Sign In <ArrowRight size={16} /></button>
        </form>

        <p className="mt-6 text-center" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted }}>
          Demo portal — enter any email &amp; password to preview the dashboard.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CUSTOMER DASHBOARD
----------------------------------------------------------------*/
function Dashboard({ email, onLogout }) {
  const [tab, setTab] = useState("overview");
  const activeLoan = DEMO_ACCOUNT.loans.find((l) => l.status === "Active");
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "payments", label: "Payment History", icon: History },
    { id: "statements", label: "Statements", icon: Download },
    { id: "profile", label: "Profile Settings", icon: Settings },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.tint }}>
      <div style={{ background: C.ink }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center rounded-full font-bold" style={{ width: 34, height: 34, background: C.primary, color: "#fff", fontFamily: "Sora, sans-serif", fontSize: 14 }}>P</span>
            <span style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>Customer Portal</span>
          </div>
          <button onClick={onLogout} className="chat-btn chat-btn-ghost" style={{ padding: "8px 14px" }}>
            <LogOut size={15} /> Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="eyebrow-dark mb-1">Dashboard</div>
          <h1 style={{ fontFamily: "Sora, sans-serif", fontWeight: 700, fontSize: 26, color: C.ink }}>
            Welcome, {DEMO_ACCOUNT.name.split(" ")[0]}
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.muted, marginTop: 2 }}>{email} · NRC {DEMO_ACCOUNT.nrc}</p>
        </div>

        <div className="dash-tabs">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`dash-tab ${tab === t.id ? "dash-tab-active" : ""}`}>
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="mt-6 flex flex-col gap-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="dash-stat">
                <div className="dash-stat-label">Outstanding Balance</div>
                <div className="dash-stat-value mono">{fmtK(activeLoan.balance)}</div>
              </div>
              <div className="dash-stat">
                <div className="dash-stat-label">Next Payment Due</div>
                <div className="dash-stat-value">{activeLoan.nextDue}</div>
              </div>
              <div className="dash-stat">
                <div className="dash-stat-label">Monthly Installment</div>
                <div className="dash-stat-value mono">{fmtK(activeLoan.monthly)}</div>
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 12 }}>Your Loans</h3>
              <div className="flex flex-col gap-3">
                {DEMO_ACCOUNT.loans.map((l) => (
                  <div key={l.id} className="loan-row">
                    <div>
                      <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 14.5, color: C.ink }}>{l.product}</div>
                      <div className="mono" style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, marginTop: 2 }}>{l.id} · opened {l.opened} · {l.term}</div>
                    </div>
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="text-right">
                        <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: C.muted }}>Balance</div>
                        <div className="mono" style={{ fontWeight: 600, color: C.ink, fontSize: 13.5 }}>{fmtK(l.balance)}</div>
                      </div>
                      <span className={`status-pill ${l.status === "Active" ? "status-active" : "status-settled"}`}>{l.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "payments" && (
          <div className="mt-6 dash-panel">
            <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 14 }}>Payment History</h3>
            <div className="table-wrap">
              <table className="dash-table">
                <thead>
                  <tr><th>Date</th><th>Loan</th><th>Amount</th><th>Method</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {DEMO_ACCOUNT.payments.map((p, i) => (
                    <tr key={i}>
                      <td>{p.date}</td>
                      <td className="mono">{p.loan}</td>
                      <td className="mono">{fmtK(p.amount)}</td>
                      <td>{p.method}</td>
                      <td><span className="status-pill status-settled">{p.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "statements" && (
          <div className="mt-6 dash-panel">
            <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 14 }}>Download Statements</h3>
            <div className="flex flex-col gap-3">
              {DEMO_ACCOUNT.loans.map((l) => (
                <div key={l.id} className="statement-row">
                  <div className="flex items-center gap-3">
                    <FileText size={18} color={C.primary} />
                    <div>
                      <div style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 13.5, color: C.ink }}>{l.product} statement</div>
                      <div style={{ fontFamily: "Inter, sans-serif", fontSize: 11.5, color: C.muted }}>{l.id} · updated {DEMO_ACCOUNT.payments[0].date}</div>
                    </div>
                  </div>
                  <button className="chat-btn" style={{ background: C.primary }} onClick={() => alert(`Demo portal: "${l.product} statement" would download here.`)}>
                    <Download size={14} /> PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "profile" && (
          <div className="mt-6 dash-panel" style={{ maxWidth: 480 }}>
            <h3 style={{ fontFamily: "Sora, sans-serif", fontWeight: 600, fontSize: 16, color: C.ink, marginBottom: 14 }}>Profile Settings</h3>
            <div className="flex flex-col gap-4">
              <Field label="Full Name" placeholder={DEMO_ACCOUNT.name} />
              <Field label="Email" placeholder={email} />
              <Field label="Phone Number" placeholder="+260 97 000 0000" />
              <button className="btn-gold w-fit" onClick={() => alert("Demo portal: changes are not persisted.")}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   GLOBAL STYLES
----------------------------------------------------------------*/
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap');

      .mono { font-family: 'IBM Plex Mono', monospace; }

      .ledger-grid {
        background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px);
        background-size: 100% 28px;
      }

      .eyebrow {
        display: inline-flex; align-items: center; gap: 8px;
        font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.08em;
        text-transform: uppercase; color: ${C.gold}; font-weight: 600;
      }
      .eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: ${C.gold}; display:inline-block; }
      .eyebrow-dark {
        font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.08em;
        text-transform: uppercase; color: ${C.primary}; font-weight: 600;
      }

      .seal-float { animation: float 6s ease-in-out infinite; }
      @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
      .seal {
        width: 128px; height: 128px; border-radius: 50%;
        border: 2px dashed rgba(244,180,0,0.65);
        display: flex; align-items: center; justify-content: center;
        text-align: center; transform: rotate(-14deg);
      }
      .seal span {
        font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 600;
        letter-spacing: 0.06em; color: ${C.gold};
      }

      .btn-gold {
        display: inline-flex; align-items: center; gap: 8px;
        background: ${C.gold}; color: #14202E; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14.5px;
        padding: 13px 24px; border-radius: 10px; text-decoration: none; border: none; cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
        box-shadow: 0 6px 20px rgba(244,180,0,0.28);
      }
      .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 10px 26px rgba(244,180,0,0.38); }

      .btn-outline {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(255,255,255,0.08); color: #fff; font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14.5px;
        padding: 13px 24px; border-radius: 10px; text-decoration: none; border: 1px solid rgba(255,255,255,0.35);
        transition: background 0.18s ease;
      }
      .btn-outline:hover { background: rgba(255,255,255,0.16); }

      .stat-card {
        background: #fff; border: 1px solid ${C.line}; border-radius: 14px; padding: 20px 18px;
        box-shadow: 0 10px 30px rgba(11,94,215,0.08);
        display: flex; flex-direction: column; gap: 8px;
      }
      .stat-value { font-family: 'IBM Plex Mono', monospace; font-weight: 600; font-size: 26px; color: ${C.ink}; }
      .stat-label { font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.muted}; }

      .why-card {
        background: #fff; border: 1px solid ${C.line}; border-radius: 16px; padding: 24px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .why-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(11,94,215,0.12); }
      .why-icon {
        width: 42px; height: 42px; border-radius: 11px; background: ${C.tint};
        display: flex; align-items: center; justify-content: center; margin-bottom: 14px;
      }

      .product-card {
        background: #fff; border-radius: 16px; padding: 22px; display: flex; flex-direction: column;
        border: 1px solid ${C.line}; transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .product-card:hover { transform: translateY(-4px); box-shadow: 0 16px 34px rgba(11,94,215,0.14); }
      .product-icon {
        width: 46px; height: 46px; border-radius: 12px;
        background: linear-gradient(135deg, ${C.primary}, ${C.secondary});
        display: flex; align-items: center; justify-content: center;
      }
      .ledger-line { border-top: 1px dashed ${C.line}; margin: 14px 0 10px; }
      .product-apply {
        display: inline-flex; align-items: center; gap: 4px; margin-top: 14px;
        font-family: 'Sora', sans-serif; font-weight: 600; font-size: 13px; color: ${C.primary}; text-decoration: none;
      }

      .steps-row { display: flex; align-items: flex-start; gap: 0; flex-wrap: wrap; }
      .step-item { flex: 1 1 160px; min-width: 150px; padding: 4px 10px 4px 0; }
      .step-connector { flex: 0 0 40px; height: 1px; background: ${C.line}; margin-top: 30px; display: none; }
      @media (min-width: 900px) { .step-connector { display: block; } }
      .step-num { font-size: 12px; color: ${C.gold}; font-weight: 600; }
      .step-icon {
        width: 44px; height: 44px; border-radius: 12px; background: ${C.tint};
        display: flex; align-items: center; justify-content: center; margin-top: 8px;
      }

      .passbook {
        position: relative; background: #fff; border-radius: 20px; padding: 36px 32px 30px;
        box-shadow: 0 30px 70px rgba(0,0,0,0.35);
      }
      .passbook-tab {
        position: absolute; top: -14px; left: 32px; background: ${C.ink}; color: ${C.gold};
        font-size: 10.5px; letter-spacing: 0.1em; padding: 6px 14px; border-radius: 999px;
      }
      .pb-label { display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 13px; color: ${C.muted}; margin-bottom: 8px; }
      .pb-value { font-weight: 600; color: ${C.ink}; font-size: 14px; }
      .slider {
        -webkit-appearance: none; width: 100%; height: 6px; border-radius: 999px;
        background: ${C.line}; outline: none;
      }
      .slider::-webkit-slider-thumb {
        -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%;
        background: ${C.primary}; cursor: pointer; border: 3px solid #fff; box-shadow: 0 0 0 1px ${C.primary};
      }
      .passbook-result {
        position: relative; background: ${C.tint}; border-radius: 14px; padding: 26px 22px;
        border: 1px dashed ${C.primary}; display: flex; flex-direction: column; gap: 12px; justify-content: center;
      }
      .pb-row { display: flex; justify-content: space-between; font-family: 'Inter', sans-serif; font-size: 13.5px; color: ${C.muted}; }
      .pb-row span:last-child { color: ${C.ink}; font-weight: 600; }
      .pb-row-lg { font-size: 15.5px; }
      .pb-row-lg span:last-child { color: ${C.primary}; font-size: 22px; font-weight: 700; }
      .pb-bar { height: 8px; border-radius: 999px; background: ${C.line}; overflow: hidden; margin-top: 4px; }
      .pb-bar-fill { height: 100%; background: ${C.primary}; border-radius: 999px; }
      .stamp {
        position: absolute; top: 10px; right: 14px; border: 2px solid ${C.gold}; color: ${C.goldDeep};
        font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em;
        padding: 5px 10px; border-radius: 6px; transform: rotate(6deg);
        animation: stampIn 0.3s ease;
      }
      @keyframes stampIn { from { opacity: 0; transform: rotate(6deg) scale(1.6); } to { opacity: 1; transform: rotate(6deg) scale(1); } }

      .mv-card { background: ${C.tint}; border-radius: 12px; padding: 16px; }
      .value-row {
        display: flex; align-items: center; gap: 14px; padding: 12px 16px;
        background: #fff; border: 1px solid ${C.line}; border-radius: 10px;
      }
      .value-num { color: ${C.gold}; font-size: 13px; font-weight: 600; }

      .branch-card { background: #fff; border-radius: 14px; padding: 20px; border: 1px solid ${C.line}; }
      .branch-link {
        display: inline-flex; align-items: center; gap: 4px; margin-top: 12px;
        font-family: 'Sora', sans-serif; font-weight: 600; font-size: 12.5px; color: ${C.primary}; text-decoration: none;
      }

      .testimonial-card {
        background: #fff; border: 1px solid ${C.line}; border-radius: 20px; padding: 40px;
        box-shadow: 0 20px 50px rgba(11,94,215,0.08);
      }
      .dot-btn { width: 8px; height: 8px; border-radius: 50%; border: none; cursor: pointer; }

      .faq-item { background: #fff; border: 1px solid ${C.line}; border-radius: 12px; overflow: hidden; }
      .faq-q {
        width: 100%; display: flex; justify-content: space-between; align-items: center;
        padding: 18px 20px; background: none; border: none; cursor: pointer; text-align: left;
        font-family: 'Sora', sans-serif; font-weight: 600; font-size: 14.5px; color: ${C.ink};
      }
      .faq-a {
        padding: 0 20px 20px; font-family: 'Inter', sans-serif; font-size: 13.5px; color: ${C.muted}; line-height: 1.6;
      }

      .field { display: flex; flex-direction: column; gap: 6px; font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.ink}; font-weight: 500; }
      .field input, .field select, .field textarea {
        border: 1px solid ${C.line}; border-radius: 9px; padding: 10px 12px; font-family: 'Inter', sans-serif;
        font-size: 13.5px; color: ${C.ink}; outline: none; background: #fff; resize: vertical;
      }
      .field input:focus, .field select:focus, .field textarea:focus { border-color: ${C.primary}; box-shadow: 0 0 0 3px rgba(11,94,215,0.12); }

      .submitted-box {
        display: flex; align-items: flex-start; gap: 14px; background: ${C.tint};
        border: 1px solid ${C.line}; border-radius: 14px; padding: 22px;
      }

      .contact-panel { background: ${C.ink}; border-radius: 20px; padding: 32px; height: 100%; }
      .contact-icon { width: 32px; height: 32px; border-radius: 9px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .chat-btn {
        display: inline-flex; align-items: center; gap: 6px; background: ${C.primary}; color: #fff;
        font-family: 'Sora', sans-serif; font-weight: 600; font-size: 13px; padding: 10px 16px; border-radius: 9px; text-decoration: none;
      }
      .chat-btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.3); }

      .footer-title { font-family: 'Sora', sans-serif; font-weight: 600; font-size: 13.5px; color: #fff; }
      .social-dot {
        width: 32px; height: 32px; border-radius: 50%; background: rgba(255,255,255,0.08); color: #fff;
        display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;
        text-decoration: none; font-family: 'Sora', sans-serif;
      }

      @media (prefers-reduced-motion: reduce) {
        .seal-float, .stamp { animation: none !important; }
      }

      /* Auth */
      .auth-shell {
        min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center;
        padding: 24px; background: linear-gradient(160deg, ${C.primaryDeep} 0%, ${C.primary} 60%, #0A4FBE 100%);
      }
      .auth-card {
        position: relative; background: #fff; border-radius: 20px; padding: 36px 34px; width: 100%; max-width: 400px;
        box-shadow: 0 30px 70px rgba(0,0,0,0.35);
      }
      .auth-back {
        display: inline-flex; align-items: center; gap: 6px; background: none; border: none; cursor: pointer;
        font-family: 'Inter', sans-serif; font-size: 12.5px; color: ${C.muted}; margin-bottom: 20px; padding: 0;
      }
      .pw-wrap { position: relative; }
      .pw-wrap input { width: 100%; padding-right: 38px; box-sizing: border-box; }
      .pw-toggle {
        position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
        background: none; border: none; cursor: pointer; color: ${C.muted}; padding: 2px;
      }
      .auth-error {
        display: flex; align-items: center; gap: 6px; background: #FDECEC; color: #B42318;
        font-family: 'Inter', sans-serif; font-size: 12.5px; padding: 9px 12px; border-radius: 8px;
      }

      /* Dashboard */
      .dash-tabs { display: flex; gap: 6px; flex-wrap: wrap; border-bottom: 1px solid ${C.line}; padding-bottom: 2px; }
      .dash-tab {
        display: flex; align-items: center; gap: 7px; padding: 10px 16px; border-radius: 9px 9px 0 0;
        background: none; border: none; cursor: pointer; font-family: 'Sora', sans-serif; font-weight: 600;
        font-size: 13px; color: ${C.muted};
      }
      .dash-tab-active { color: ${C.primary}; background: #fff; border: 1px solid ${C.line}; border-bottom: 1px solid #fff; margin-bottom: -1px; }
      .dash-stat { background: #fff; border: 1px solid ${C.line}; border-radius: 14px; padding: 18px 20px; }
      .dash-stat-label { font-family: 'Inter', sans-serif; font-size: 12px; color: ${C.muted}; }
      .dash-stat-value { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 21px; color: ${C.ink}; margin-top: 6px; }
      .dash-panel { background: #fff; border: 1px solid ${C.line}; border-radius: 16px; padding: 24px; }
      .loan-row {
        display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;
        background: #fff; border: 1px solid ${C.line}; border-radius: 14px; padding: 18px 20px;
      }
      .status-pill {
        font-family: 'Inter', sans-serif; font-weight: 600; font-size: 11px; padding: 5px 12px; border-radius: 999px;
      }
      .status-active { background: #E7F5EC; color: #1B7A3D; }
      .status-settled { background: ${C.tint}; color: ${C.primary}; }
      .table-wrap { overflow-x: auto; }
      .dash-table { width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 13px; }
      .dash-table th { text-align: left; color: ${C.muted}; font-weight: 600; font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em; padding: 10px 12px; border-bottom: 1px solid ${C.line}; }
      .dash-table td { padding: 12px; border-bottom: 1px solid ${C.line}; color: ${C.ink}; }
      .statement-row {
        display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;
        border: 1px solid ${C.line}; border-radius: 12px; padding: 14px 16px;
      }
    `}</style>
  );
}

/* ---------------------------------------------------------------
   APP
----------------------------------------------------------------*/
export default function PalianMoneyLending() {
  const [view, setView] = useState("site"); // "site" | "login" | "dashboard"
  const [session, setSession] = useState(null);

  const handleLogin = (email) => {
    setSession({ email });
    setView("dashboard");
  };
  const handleLogout = () => {
    setSession(null);
    setView("site");
  };

  if (view === "login") {
    return (
      <>
        <GlobalStyles />
        <LoginPage onLogin={handleLogin} onBack={() => setView("site")} />
      </>
    );
  }

  if (view === "dashboard" && session) {
    return (
      <>
        <GlobalStyles />
        <Dashboard email={session.email} onLogout={handleLogout} />
      </>
    );
  }

  return (
    <div style={{ background: C.paper, minHeight: "100vh" }}>
      <GlobalStyles />
      <Nav
        isAuthed={!!session}
        onLoginClick={() => setView("login")}
        onDashboardClick={() => setView("dashboard")}
      />
      <Hero />
      <Stats />
      <WhyChoose />
      <Products />
      <HowItWorks />
      <LoanCalculator />
      <About />
      <Branches />
      <Testimonials />
      <FAQ />
      <ApplyContact />
      <Footer />
    </div>
  );
}
