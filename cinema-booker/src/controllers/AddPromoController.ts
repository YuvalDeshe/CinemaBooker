import { PromoCode } from "@/models/PromoCodeModel";
import { useState } from "react";

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
    priceMultiplier : discountMultiplier,
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


export const useAddPromoController = () => {
  const [name, setName] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const resetForm = () => {
    setName("");
    setDiscountPercent("");
    setStartDate("");
    setEndDate("");
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validate discount
      const multiplier = validateDiscount(discountPercent);
      if (multiplier === null) {
        throw new Error("Enter a valid discount % (0-100)");
      }

      // Normalize dates
      const normalizedStart = normalizeDate(startDate);
      const normalizedEnd = normalizeDate(endDate);

      // Validate date order
      if (!isSecondDateLaterOrEqual(normalizedStart, normalizedEnd)) {
        throw new Error("Start date must be earlier or equal to end date.");
      }

      // Check overlap
      const overlaps = await checkPromoOverlap(name, normalizedStart, normalizedEnd);
      if (overlaps) {
        throw new Error("A promo with that name exists during the given timeframe.");
      }

      // Create model instance
      const newPromo = new PromoCode({
        name,
        priceMultiplier: multiplier,
        startDate: normalizedStart,
        endDate: normalizedEnd,
      });

      // POST request
      const res = await fetch(`/api/admin/addpromo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPromo),
      });

      if (!res.ok) throw new Error("Failed to add promo code");

      alert("✅ Promo code added successfully!");
      resetForm();
    } catch (err: any) {
      alert(`❌ ERROR: ${err.message}`);
    }
  };

  return {
    name, setName,
    discountPercent, setDiscountPercent,
    startDate, setStartDate,
    endDate, setEndDate,
    submitHandler,
  };
};
