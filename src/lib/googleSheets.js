import { parsePrice, formatPrice } from "./pricing";

export const WEB_APP_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL;

export function generateOrderId() {
  return (
    "BB-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );
}

export function buildOrderPayload({ items, customer }) {
  const itemized = items.map((i) => ({
    id: i.id,
    title: i.title || i.caption || "Untitled",
    price: i.price,
    priceNumeric: parsePrice(i.price),
    quantity: i.quantity,
    subtotal: parsePrice(i.price) * i.quantity,
    image: i.src || null,
  }));

  const totalAmount = itemized.reduce((sum, i) => sum + i.subtotal, 0);

  return {
    orderId: generateOrderId(),
    orderDate: new Date().toISOString(),
    customerName: customer.name || "",
    phone: customer.phone,
    email: customer.email,
    shippingAddress: customer.address,
    items: itemized,
    itemCount: itemized.reduce((sum, i) => sum + i.quantity, 0),
    totalAmount,
    totalAmountFormatted: formatPrice(totalAmount),
    status: "Pending Payment",
  };
}

export function buildSheetRow(payload) {
  const products = payload.items
    .map((i) => `${i.title} — ${formatPrice(i.priceNumeric)} x ${i.quantity}`)
    .join(" | ");
  const quantities = payload.items
    .map((i) => `${i.title}: ${i.quantity}`)
    .join(" | ");
  const details = JSON.stringify(payload.items);

  return [
    payload.orderDate,
    payload.orderId,
    payload.customerName,
    payload.phone,
    payload.email,
    payload.shippingAddress,
    products,
    quantities,
    details,
    payload.itemCount,
    payload.totalAmountFormatted,
    payload.status,
  ];
}

export async function submitOrder(payload) {
  if (!WEB_APP_URL) {
    throw new Error(
      "Google Sheets integration is not configured. Set VITE_GOOGLE_SHEETS_URL in your .env file."
    );
  }

  const response = await fetch(WEB_APP_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ payload, row: buildSheetRow(payload) }),
  });

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Server responded ${response.status}. Please try again.`);
  }

  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || `Request failed with status ${response.status}.`);
  }

  return data;
}
