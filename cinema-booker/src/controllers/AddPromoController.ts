import { PromoCode } from "@/models/PromoCodeModel";

export const normalizeDate = (date: string): string => {
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${month}/${day}/${year}`;
};

export const isSecondDateLaterOrEqual = (startDate: string, endDate: string): boolean => {
  const [startMonthStr, startDayStr, startYearStr] = startDate.split("/");
  const [endMonthStr, endDayStr, endYearStr] = endDate.split("/");

  const start = new Date(parseInt(startYearStr), parseInt(startMonthStr) - 1, parseInt(startDayStr));
  const end = new Date(parseInt(endYearStr), parseInt(endMonthStr) - 1, parseInt(endDayStr));

  return start.getTime() <= end.getTime();
};

export const validateDiscount = (value: string): number | null => {
  const percent = parseInt(value);
  if (isNaN(percent) || percent < 0 || percent > 100) return null;
  return (100 - percent) / 100;
};

export const checkPromoOverlap = async (name: string, start: string, end: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/admin/addpromo?name=${encodeURIComponent(name)}`);
    const { exists, promo } = await res.json();

    if (!exists) return false;

    // Overlap check: (newStart <= existingEnd) && (existingStart <= newEnd)
    return (
      isSecondDateLaterOrEqual(start, promo.endDate) &&
      isSecondDateLaterOrEqual(promo.startDate, end)
    );
  } catch (err) {
    console.error("Error checking promo:", err);
    throw new Error("Error verifying promo code.");
  }
};

export const submitPromo = async (
  name: string,
  discountPercent: string,
  startDate: string,
  endDate: string
) => {
  // Validate discount %
  const discountMultiplier = validateDiscount(discountPercent);
  if (discountMultiplier === null)
    throw new Error("Enter a valid discount % (0-100)");

  // Normalize to MM/DD/YYYY
  const normalizedStart = normalizeDate(startDate);
  const normalizedEnd = normalizeDate(endDate);

  // Validate date order
  if (!isSecondDateLaterOrEqual(normalizedStart, normalizedEnd))
    throw new Error("Start date must be earlier or equal to end date.");

  // Check overlap
  const overlaps = await checkPromoOverlap(name, normalizedStart, normalizedEnd);
  if (overlaps)
    throw new Error("A promo code with that name already exists during that timeframe.");

  // Build promo model instance
  const promo = new PromoCode({
    name,
    discountMultiplier,
    startDate: normalizedStart,
    endDate: normalizedEnd,
  });

  // Send to API
  const res = await fetch(`/api/admin/addpromo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(promo),
  });

  if (!res.ok) throw new Error("Failed to add promo code");

  return promo;
};
