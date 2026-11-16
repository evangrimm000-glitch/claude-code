// Florida title cost estimate. Rates per Florida Administrative Code 69O-186.003.
(function () {
  "use strict";

  var TIERS = [
    [100000, 5.75],
    [1000000, 5.0],
    [5000000, 2.5],
    [10000000, 2.25],
    [Infinity, 2.0],
  ];

  // Promulgated premium for a policy amount. Charged per $1,000 or part of it, $100 minimum.
  function premium(amount) {
    if (!(amount > 0)) return 0;
    var thousands = Math.ceil(amount / 1000);
    var total = 0;
    var floor = 0;
    for (var i = 0; i < TIERS.length && thousands > floor; i++) {
      var cap = TIERS[i][0] / 1000;
      var inTier = Math.min(thousands, cap) - floor;
      total += inTier * TIERS[i][1];
      floor = cap;
    }
    return Math.max(100, Math.round(total * 100) / 100);
  }

  // Lender's policy issued with the owner's policy: $25 up to the owner's amount,
  // regular rate on any loan amount above it. Standalone (no purchase) is the full rate.
  function lenderPremium(price, loan) {
    if (!(loan > 0)) return 0;
    if (!(price > 0)) return premium(loan);
    if (loan <= price) return 25;
    return 25 + (premium(loan) - premium(price));
  }

  // Documentary stamp tax on the deed: $0.70 per $100 or part of it.
  // (Miami-Dade charges $0.60 on single-family homes. Not modeled here.)
  function deedStamps(price) {
    return price > 0 ? Math.ceil(price / 100) * 0.7 : 0;
  }

  // Documentary stamps on the note ($0.35 per $100 or part) plus intangible tax (0.2%).
  function mortgageTaxes(loan) {
    return loan > 0 ? Math.ceil(loan / 100) * 0.35 + loan * 0.002 : 0;
  }

  function estimate(price, loan) {
    var owner = premium(price);
    var lender = lenderPremium(price, loan);
    var deed = deedStamps(price);
    var mtg = mortgageTaxes(loan);
    return { owner: owner, lender: lender, deed: deed, mtg: mtg, total: owner + lender + deed + mtg };
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { premium: premium, lenderPremium: lenderPremium, deedStamps: deedStamps, mortgageTaxes: mortgageTaxes, estimate: estimate };
    return;
  }

  var form = document.getElementById("calc");
  if (!form) return;

  var price = form.elements.price;
  var loan = form.elements.loan;
  var usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  function parse(el) {
    var n = parseInt(String(el.value).replace(/[^\d]/g, ""), 10);
    return isFinite(n) ? Math.min(n, 999999999) : 0;
  }
  function tidy(el) {
    var n = parse(el);
    el.value = n ? n.toLocaleString("en-US") : "";
  }
  function set(id, n) {
    document.getElementById(id).textContent = usd.format(Math.round(n));
  }
  function update() {
    var e = estimate(parse(price), parse(loan));
    set("o-owner", e.owner);
    set("o-lender", e.lender);
    set("o-deed", e.deed);
    set("o-mtg", e.mtg);
    set("o-total", e.total);
  }

  [price, loan].forEach(function (el) {
    el.addEventListener("input", function () { tidy(el); update(); });
  });
  form.addEventListener("submit", function (ev) { ev.preventDefault(); });
  update();
})();
