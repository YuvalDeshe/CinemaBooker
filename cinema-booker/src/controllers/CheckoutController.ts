"use client";

import { useEffect, useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { bookingFacade } from "@/facades/BookingFacade";
import PaymentCard from "@/models/PaymentCardModel";
import { PromoCode } from "@/models/PromoCodeModel";
import { Ticket } from "@/models/TicketModel";
import User from "@/models/UserModel";

type PromoAppliedState = {
  isApplied: boolean;
  multiplier: number;
};

export function useCheckoutController() {
  // ---- routing + session ----
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const movieId = String(params.id);

  // ---- state ----
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [promos, setPromos] = useState<PromoCode[]>([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState<PromoAppliedState>({
    isApplied: false,
    multiplier: 1,
  });
  const [promoMessage, setPromoMessage] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // ---- booking params from URL ----
  const adultTickets = parseInt(searchParams.get("adultTickets") ?? "0", 10);
  const childTickets = parseInt(searchParams.get("childTickets") ?? "0", 10);
  const seniorTickets = parseInt(searchParams.get("seniorTickets") ?? "0", 10);

  const showtime = searchParams.get("showtime") || "";
  const showId = searchParams.get("showId") || "";
  const date = searchParams.get("date") || "";
  const auditorium = searchParams.get("auditorium") || "";

  const selectedSeatsParam = searchParams.get("selectedSeats") || "";
  const selectedSeats = selectedSeatsParam
    .split(",")
    .filter((s) => s.trim().length > 0);

  const totalTickets = adultTickets + childTickets + seniorTickets;

  // ---- derived prices from tickets ----
  const adultTicket = tickets.find((t) => t.ticketType === "ADULT");
  const childTicket = tickets.find((t) => t.ticketType === "CHILD");
  const seniorTicket = tickets.find((t) => t.ticketType === "SENIOR");

  const adultPrice = adultTicket?.ticketPrice ?? 0;
  const childPrice = childTicket?.ticketPrice ?? 0;
  const seniorPrice = seniorTicket?.ticketPrice ?? 0;

  const baseOrderTotal =
    adultTickets * adultPrice +
    childTickets * childPrice +
    seniorTickets * seniorPrice;

  const finalOrderTotal = Math.trunc(
    baseOrderTotal * promoApplied.multiplier * 100
  ) / 100;

  const cardsList: PaymentCard[] = user?.paymentCard || [];

  // ---- initial data load (ALL through facade) ----
  useEffect(() => {
    async function load() {
      if (!session?.user?.id) {
        setLoadingInitial(false);
        return;
      }

      try {
        const [u, p, t] = await Promise.all([
          bookingFacade.fetchUser(session.user.id),
          bookingFacade.fetchPromos(),
          bookingFacade.fetchTickets(),
        ]);

        setUser(u);
        setPromos(p);
        setTickets(t);
      } catch (err) {
        console.error("Error loading checkout data:", err);
      } finally {
        setLoadingInitial(false);
      }
    }

    load();
  }, [session]);

  // ---- controller handlers ----

  function handleCardChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCard(e.target.value);
  }

  function handlePromoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPromo(e.target.value);
  }

  function handleApplyPromo() {
    const code = promo.trim();
    if (!code) {
      setPromoApplied({ isApplied: false, multiplier: 1 });
      setPromoMessage("");
      return;
    }

    const result = bookingFacade.validatePromo(code, promos);
    setPromoApplied({
      isApplied: result.isValid && !!result.promo,
      multiplier: result.multiplier,
    });
    setPromoMessage(result.message);
  }

  /**
   * Main submit handler.
   * The view should call this from a <form>:
   *   <form onSubmit={(e) => handleSubmit(e, c.movie.title)}>
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>, movieTitle?: string) {
    e.preventDefault();
    if (!user) return;

    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);

      // Re-validate promo through facade
      const promoResult = bookingFacade.validatePromo(promo.trim(), promos);

      const { bookingId, bookingData } = await bookingFacade.confirmAndPay(
        formData,
        user,
        selectedCard,
        cardsList,
        {
          movieId,
          showId,
          promoCode: promo.trim(),
          promo: promoResult.promo,
          adultTickets,
          childTickets,
          seniorTickets,
          adultPrice,
          childPrice,
          seniorPrice,
          selectedSeats,
          movieTitle,
          showtime,
          date,
          auditorium,
        }
      );

      // Build querystring for confirmation page
      const qs = new URLSearchParams({
        bookingId,
        movieId,
        showId,
        seats: selectedSeats.join(","),
        adultTickets: adultTickets.toString(),
        childTickets: childTickets.toString(),
        seniorTickets: seniorTickets.toString(),
        orderTotal: finalOrderTotal.toString(),
        promoCode: promo.trim(),
        bookingDate: bookingData.bookingDate,
        userEmail: user.email ?? "",
      });

      router.push(`/movie/${movieId}/booking/confirmation?${qs.toString()}`);
    } catch (err) {
      console.error("Error completing booking:", err);
      setPromoMessage("Something went wrong while completing your booking.");
    } finally {
      setIsProcessing(false);
    }
  }

  // ---- exposed API for the VIEW ----
  return {
    // loading flags
    loadingInitial,
    isProcessing,

    // domain data
    user,
    tickets,
    promos,
    cardsList,

    // booking & pricing
    adultTickets,
    childTickets,
    seniorTickets,
    totalTickets,
    selectedSeats,
    showtime,
    date,
    auditorium,
    adultPrice,
    childPrice,
    seniorPrice,
    baseOrderTotal,
    finalOrderTotal,

    // promo-related
    promo,
    promoApplied,
    promoMessage,

    // selection
    selectedCard,

    // controller methods for the view
    handleCardChange,
    handlePromoChange,
    handleApplyPromo,
    handleSubmit,
  };
}