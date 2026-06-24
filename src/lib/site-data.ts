export const SITE = {
  name: "Rudrans Systematic Investment",
  short: "RSI",
  tagline: "Think Beyond Limits",
  owner: "Dharmitsinh Solanki",
  phone: "+91 98257 75948",
  phoneRaw: "+919825775948",
  email: "dharmitsolankifnokite@gmail.com",
  address: {
    line1: "Shop No. G-25, Soham Arcade",
    line2: "Green City Road, Pal",
    city: "Surat - 395009, Gujarat, India",
  },
  whatsapp: "https://wa.me/919825775948",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { title: "Financial Planning", desc: "A comprehensive roadmap aligned with your personal goals, cash-flow, and life stage." },
  { title: "SIP Advisory", desc: "Structured investment plans engineered for disciplined, long-horizon wealth creation." },
  { title: "Mutual Fund Distribution", desc: "Curated solutions across equity, debt and hybrid asset classes for any risk appetite." },
  { title: "Tax Saving Solutions", desc: "ELSS and tax-efficient instruments that grow capital while reducing your liability." },
  { title: "Insurance Planning", desc: "Term, health and family-protection strategies sized to your real-world responsibilities." },
  { title: "Retirement Planning", desc: "Decade-by-decade frameworks that translate today's savings into tomorrow's freedom." },
  { title: "Child Education Planning", desc: "Goal-anchored portfolios that mature in step with your child's milestones." },
  { title: "Portfolio Review", desc: "Periodic re-balancing, performance audit and strategy refinement against your benchmarks." },
];

export const PRODUCTS = [
  { title: "Mutual Funds", overview: "Diversified, professionally managed pools across equity, debt and hybrid categories.", benefits: ["Daily liquidity", "Professional management", "Wide diversification"], suited: "First-time investors and seasoned wealth builders." },
  { title: "SIP", overview: "Automated monthly investments that average market volatility and compound steadily.", benefits: ["Habit-driven discipline", "Rupee-cost averaging", "Goal alignment"], suited: "Salaried individuals seeking long-term wealth." },
  { title: "ELSS", overview: "Equity Linked Savings Schemes that combine market growth with Section 80C tax savings.", benefits: ["Tax deduction up to ₹1.5L", "Shortest 80C lock-in", "Equity growth potential"], suited: "Tax-paying investors with a 3+ year horizon." },
  { title: "Health Insurance", overview: "Family-floater and individual plans that protect your portfolio from medical shocks.", benefits: ["Cashless network", "Tax benefits", "Lifetime renewals"], suited: "Anyone with dependents or rising healthcare costs." },
  { title: "Life Insurance", overview: "Term and savings cover that ensures financial continuity for your family.", benefits: ["High cover, low premium", "Income replacement", "Estate planning"], suited: "Primary earners and parents." },
  { title: "Retirement Solutions", overview: "NPS, balanced advantage and annuity blends designed for post-career income.", benefits: ["Inflation-aware planning", "Regular income streams", "Capital preservation"], suited: "Investors 30+ planning for independence." },
  { title: "Child Future Planning", overview: "Goal-linked equity portfolios that align maturity with education and milestone needs.", benefits: ["Time-mapped allocation", "Auto-rebalancing", "Goal tracking"], suited: "Parents building education or wedding corpus." },
];

export const ARTICLES = [
  { title: "The Quiet Power of Compounding", read: "5 min read", excerpt: "Why patience, not prediction, builds the most reliable wealth." },
  { title: "Benefits of Investing Through SIPs", read: "4 min read", excerpt: "How automated discipline outperforms timing the market." },
  { title: "Mutual Funds, Simplified", read: "6 min read", excerpt: "A clear introduction to asset classes, AMCs and what to look for." },
  { title: "Insurance Planning Essentials", read: "5 min read", excerpt: "The right amount of cover at the right life stage." },
  { title: "Smart Financial Habits", read: "3 min read", excerpt: "Five practices that quietly transform your finances over a decade." },
  { title: "Decoding ELSS for Tax Season", read: "4 min read", excerpt: "Why ELSS is the most efficient 80C tool for long-term investors." },
];

export const FAQS = [
  { q: "What is a SIP and how does it work?", a: "A Systematic Investment Plan lets you invest a fixed amount monthly into a mutual fund. It averages out market volatility and turns small contributions into significant corpus through compounding." },
  { q: "How much should I start investing with?", a: "You can begin with as little as ₹500 per month. What matters more than the amount is the consistency and the alignment with your long-term goals." },
  { q: "Are mutual funds safe?", a: "Mutual funds are regulated by SEBI and managed by professional fund houses. While market-linked, diversified long-horizon investing has historically created reliable wealth." },
  { q: "How does RSI earn?", a: "We earn standard distributor commissions paid by Asset Management Companies. You pay no additional fee for our advisory and ongoing support." },
  { q: "Can I withdraw my investment anytime?", a: "Open-ended mutual funds offer daily liquidity. ELSS has a 3-year lock-in. We help you structure investments so liquidity matches your goals." },
];

export const TESTIMONIALS = [
  { name: "Rakesh M.", role: "Business Owner, Surat", quote: "Dharmit helped me move from scattered investments to a clear, goal-linked plan. Five years in, my portfolio finally feels intentional." },
  { name: "Priya & Karan S.", role: "Young Family, Pal", quote: "We started SIPs with RSI for our daughter's education. The reviews and honesty make all the difference." },
  { name: "Ankit V.", role: "IT Professional", quote: "What I value most is the transparency. No pressure, no jargon — just clear advice that respects my long-term horizon." },
  { name: "Meera D.", role: "Doctor", quote: "Insurance, tax planning, retirement — handled in one place with a calm, structured approach. Highly recommend." },
];

export const JOURNEY = [
  { step: "Dream", desc: "Define the life milestones you want your wealth to fund." },
  { step: "Plan", desc: "Map cash-flow, risk profile and time horizon into a strategy." },
  { step: "Invest", desc: "Deploy capital systematically across diversified instruments." },
  { step: "Grow", desc: "Let compounding work while we review and rebalance." },
  { step: "Achieve", desc: "Reach your goals with confidence and a clear exit plan." },
];

export const VALUES = ["Trust", "Integrity", "Commitment", "Transparency", "Growth"];
