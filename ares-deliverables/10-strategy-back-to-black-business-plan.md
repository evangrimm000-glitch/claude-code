# Operation ARES — Back to Black (working draft, v1)

> Source: Gmail draft (r3131771284468166853) · saved 2026-07-01 · strategic work product only (no client data, no NPI, no financials)

---

WORKING DRAFT — strategic work product only. No client data, no NPI, no financials from Qualia/Auro. Placeholders [X], [N], [State] mark where real figures go (fill those inside the sanctioned environment, not here).

#####################################################
OPERATION ARES — "BACK TO BLACK"
National Title & Settlement Operation — Turnaround Business Plan
Prepared for CFO / Owner-Investor review · Draft v1
#####################################################

1. EXECUTIVE SUMMARY
A [N]-state title & settlement operation with strong underwriter relationships and a capable production platform (Qualia), underperforming its potential due to fragmented knowledge management, under-instrumented sales, and no unified reporting. This plan returns the operation to profitability ("back to black") via operational standardization, a referral-source-driven sales engine, and executive-grade reporting — no new licensing spend required to begin.

2. TURNAROUND THESIS (weakness -> solution)
- Knowledge in email/scattered folders -> Structured SharePoint operations hub
- Sales run on relationships, not data -> KPI framework + source-concentration management
- No unified reporting for Finance -> Power BI layer on Qualia (data stays in place)
- Onboarding/knowledge risk -> Documented SOPs, single source of truth

3. MARKET ANALYSIS (expanded)
- Industry & revenue engine: Title insurance + settlement services. Revenue tracks real-estate transaction volume (purchase + refinance), the rate environment, and regional housing activity. Purchase business is stickier and relationship-driven; refi is rate-elastic and volatile. A durable operation over-indexes on purchase + diversified sources.
- Underwriter landscape: National underwriters (Fidelity, First American, Old Republic, Stewart) provide capacity and set splits. Appointments are a strategic asset and a barrier to entry; concentration among underwriters is both leverage and risk.
- Demand drivers & cyclicality: Rate cycles swing volume sharply; seasonality peaks in spring/summer purchase season. Plan for capacity flex so margins hold in down-cycles.
- Regulatory moat: GLBA (safeguarding nonpublic personal info), RESPA (referral/anti-kickback compliance), and state DOI requirements. Done right, disciplined compliance is a competitive advantage and a defense against larger, sloppier competitors.
- Competitive position: [rank/share by county/state — quantify once the SharePoint map + ops data are reviewed]. Differentiators to press: turnaround speed, accuracy, closing experience, and reporting transparency to referral sources.

4. OPERATIONS
- Production spine: order -> title search/exam -> underwriting -> closing/settlement -> post-closing/policy.
- Standardize with an SOP library + stage checklists; measure open->close cycle time; centralize templates; kill version chaos.
- SharePoint hub = operational backbone; Qualia optimized for throughput and visibility.

5. SALES & GROWTH STRATEGY
- Referral-source engine: acquire / retain / reactivate agents, lenders, builders, attorneys.
- Manage source concentration (durability) and rep productivity (quota attainment).
- Growth vectors: new geographies/states, product-mix expansion, dormant-source win-back.
- Instrumented by the KPI framework (Tiers 1-4, below).

6. TECHNOLOGY & REPORTING
- SharePoint modernization: structure + naming standard + metadata columns.
- Power BI: one governed semantic model with Row-Level Security -> department Apps + per-closer dashboards. Native connector; client data stays in the sanctioned M365 tenant.
- Animated visuals (Play Axis, bar-chart-race, bookmarks) for the announce moment.

7. PEOPLE, ORG & CORE VALUES
- Org clarity; onboarding via the hub.
- Core values (draft): Accuracy · Accountability · Client confidentiality · Speed with integrity · Continuous improvement.

8. FINANCIALS & PROJECTIONS (expanded — model + placeholders)
- Revenue model: Revenue = Orders Opened x Pull-Through % x Revenue per Closed Order.
    Orders Opened [N] · Pull-Through [P%] · Revenue/Closed [$R] -> Revenue [$X].
- Revenue mix: title premium vs. escrow/settlement fees; track margin by product and by state.
- Cost structure: labor (largest lever), underwriter splits, technology, occupancy. Target variable/flex cost so down-cycles don't erase margin.
- Unit economics to manage: revenue per closed order, cost per file, cycle time (drives revenue recognition timing).
- Scenarios: Base / Upside / Downside, each driven by volume and pull-through assumptions; track Forecast vs. Actual to prove projection accuracy to Finance.
- KPI targets feed the projection model directly (pull-through %, source retention, rep attainment).

9. INVESTMENT SCENARIO & ROI (optional framing)
- Frame: "With an investment of $[X] in [automation / new-market entry / staffing], the operation yields $[delta revenue] at [margin], payback in [T] months, ROI [%]."
- Show the owner-investor the upside case AND the CFO the payback math on the same page. Tie each dollar to a KPI it moves (e.g., automation -> cycle time -> capacity -> orders closed).

10. RISKS & MITIGATIONS (named honestly, each with a fix)
- Rate/volume cyclicality -> source diversification + flexible cost base.
- Source concentration -> retention targets + new-source acquisition.
- Compliance (GLBA/RESPA) -> controls, training, audit-ready processes.
- Key-person/knowledge risk -> documented SOPs in the hub.
- Underwriter concentration -> maintain diversified appointments.

11. ROADMAP
- 0-90 days: SharePoint hub live; KPI baseline; reporting v1.
- 3-6 months: sales cadence on KPIs; source-health management; projection model.
- 6-12 months: new-market/product expansion; reporting automation; board-grade dashboards.

#####################################################
APPENDIX A — SALES KPI FRAMEWORK
#####################################################
Tier 1 (Exec rollup): Orders Opened; Orders Closed; Pull-Through %; Fall-out %; Revenue; Revenue/Closed Order.
Tier 2 (Rep/branch): Quota Attainment; New Accounts; Reactivated Accounts; Activity->Order ratio.
Tier 3 (Source health): Active Sources; Source Concentration (top-10 %); Source Retention; Churn (90+ days quiet).
Tier 4 (Pipeline/forecast): Open Pipeline; Forecast vs. Actual; Cycle Time (open->close).

DAX sketches (placeholder columns):
Pull-Through % = DIVIDE(CALCULATE(COUNTROWS(Orders), Orders[Status]="Closed"), CALCULATE(COUNTROWS(Orders), NOT ISBLANK(Orders[OpenDate])))
Top-10 Source Concentration = DIVIDE(SUMX(TOPN(10, VALUES(Sources[SourceID]), [Revenue]), [Revenue]), [Revenue])

#####################################################
APPENDIX B — POWER BI ARCHITECTURE
#####################################################
- One governed semantic model + Row-Level Security (RLS): each closer sees only their files; each dept head sees only their team.
- Department Apps: Sales / Operations / Closing / Finance, role-tuned.
- Per-closer desktop dashboard: My Open Files · Aging · Today/This Week · Exceptions · My Month vs. Target (solves Qualia's hard-to-read UI).
- Data sources: SharePoint Online List connector (ops hub); Qualia via API/Qualia Connect OR scheduled report export (TBD — determines live vs. refresh).
- Private until launch: build in a private Power BI workspace; publish the App only when ready to announce (keeps it yours, no premature feedback).

#####################################################
OPEN ITEMS
#####################################################
1. Paste sanitized Site Contents (library names + counts + menu + subsites) -> build manifest.md.
2. How does Qualia data come out today: API/Qualia Connect, or scheduled export? -> determines Power BI pipeline.
3. Decide breadth: whole team site vs. owned areas only.
