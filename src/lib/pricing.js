// Shared currency helpers used by the cart, checkout, confirmation and
// Google Sheets modules. Kept in lib/ so component files stay focused on
// rendering. Prices on site are Indian-rupee strings like "₹2,499".

export function parsePrice(price) {
  if (!price) return 0;
  const num = parseFloat(String(price).replace(/[^\d.]/g, ""));
  return isNaN(num) ? 0 : num;
}

export function formatPrice(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}
