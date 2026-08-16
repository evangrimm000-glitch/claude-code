/*
 * ARES Command — local data override TEMPLATE.
 *
 * HOW TO USE
 *   1. Copy this file to `data.local.js` in the same folder.
 *   2. Replace the sample values with your real roster / stages / numbers.
 *   3. Open index.html — it will render on your data instead of the samples.
 *
 * GOVERNANCE — READ THIS
 *   `data.local.js` is git-ignored on purpose. Do NOT commit it, and do NOT
 *   publish the prototype with real employee/customer/revenue data to any
 *   public URL. Real closer names + productivity behind no login is the exact
 *   GLBA / ALTA compliance failure this project exists to fix. Keep real data
 *   local, or put it behind the governed Power BI layer (docs/reporting/).
 *
 * SHAPE (all three keys optional; omitted keys fall back to sample data):
 */
window.ARES_DATA = {
  // Pipeline milestones: [key, label, hexColor]. Match your Core Workflow.
  STAGES: [
    ["pending",   "Pending contract",   "#8A94A1"],
    ["under",     "Under contract",     "#0E6E7D"],
    ["scheduled", "Scheduled to close", "#17A2B4"],
    ["funding",   "In funding",         "#2C7B58"],
  ],

  // One entry per employee. `stages` counts must use the STAGES keys above.
  // `files` is optional detail; totals are computed from `stages`.
  STAFF: [
    {
      id: "xx",                       // short unique id
      name: "First Last",             // real name (LOCAL ONLY)
      role: "Escrow Officer",         // real role
      color: "#0E6E7D",               // avatar color
      target: 100,                    // capacity target (files)
      stages: { pending: 0, under: 0, scheduled: 0, funding: 0 },
      exc: 0,                         // open exceptions
      unread: 0,                      // unanswered emails
      files: [
        // {id,type,city,stage, close, stalled, exc, tasks:[{t,st,w}], emails:[{dir,from,sub,attach,un,when}]}
      ],
    },
    // ...more people
  ],

  // Capacity model assumptions — your actual P&L inputs.
  CAP: {
    closers: 5,                       // real closer count
    rev: 650,                         // revenue per closed file ($)
    scen: [                           // [key, filesPerCloserPerMonth, title, subtitle]
      ["today", 20,  "Today — email in Outlook", "reps hunt inboxes; manual tasks"],
      ["inbox", 50,  "Email-in-file",            "one timeline per file; no inbox hunting"],
      ["auto",  100, "+ Smart Action automation","controls & tasks auto-append"],
    ],
  },
};
