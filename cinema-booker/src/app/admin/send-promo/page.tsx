"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./styles.module.css";

type PromoCode = {
  _id: string;
  codeString: string;
  priceMultiplier: number;
  startDate: string;
  endDate: string;
};

type EmailResult = {
  email: string;
  status: string;
  error?: string;
  messageId?: string;
};

export default function SendPromoEmailPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [selectedPromo, setSelectedPromo] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fetchingPromos, setFetchingPromos] = useState(true);
  const [result, setResult] = useState<{
    message: string;
    emailsSent?: number;
    emailsFailed?: number;
    totalUsers?: number;
    promoCode?: string;
    discountPercent?: number;
    results?: EmailResult[];
  } | null>(null);
  const [error, setError] = useState<string>("");

  // Admin guard
  useEffect(() => {
    if (status !== "authenticated") return;
    const role =
      (session?.user as any)?.userType ??
      (session?.user as any)?.role ??
      "USER";
    if (role !== "ADMIN") router.replace("/");
  }, [status, session, router]);

  // Fetch promo codes
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        setFetchingPromos(true);
        const response = await fetch("/api/admin/send-promo");
        if (!response.ok) {
          throw new Error("Failed to fetch promo codes");
        }
        const data = await response.json();
        setPromoCodes(data);
      } catch (err) {
        console.error("Error fetching promo codes:", err);
        setError("Failed to load promo codes");
      } finally {
        setFetchingPromos(false);
      }
    };

    if (status === "authenticated") {
      fetchPromoCodes();
    }
  }, [status]);

  const handleSendEmails = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPromo) {
      setError("Please select a promo code");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/admin/send-promo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promoCodeName: selectedPromo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send promotional emails");
      }

      setResult(data);
      setSelectedPromo("");
    } catch (err: any) {
      console.error("Error sending emails:", err);
      setError(err.message || "An error occurred while sending emails");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || fetchingPromos) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  const selectedPromoDetails = promoCodes.find(
    (promo) => promo.codeString === selectedPromo
  );

  const discountPercent = selectedPromoDetails
    ? Math.round((1 - selectedPromoDetails.priceMultiplier) * 100)
    : 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.push("/admin")} className={styles.backButton}>
          ← Back to Admin
        </button>
        <h1 className={styles.title}>Send Promotional Email</h1>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.formSection}>
          <div className={styles.infoBox}>
            <h3>Promotional Email Campaign</h3>
            <p>
              Select a promo code below to send promotional emails to all users
              who have opted in to receive promotions.
            </p>
          </div>

          <form onSubmit={handleSendEmails} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="promoCode" className={styles.label}>
                Select Promo Code
              </label>
              <select
                id="promoCode"
                value={selectedPromo}
                onChange={(e) => setSelectedPromo(e.target.value)}
                className={styles.select}
                disabled={loading || promoCodes.length === 0}
                required
              >
                <option value="">-- Select a promo code --</option>
                {promoCodes.map((promo) => {
                  const discount = Math.round((1 - promo.priceMultiplier) * 100);
                  return (
                    <option key={promo._id} value={promo.codeString}>
                      {promo.codeString} ({discount}% off)
                    </option>
                  );
                })}
              </select>
            </div>

            {selectedPromoDetails && (
              <div className={styles.promoPreview}>
                <h4>Promo Details:</h4>
                <div className={styles.promoDetails}>
                  <div className={styles.promoItem}>
                    <span className={styles.promoLabel}>Code:</span>
                    <span className={styles.promoValue}>
                      {selectedPromoDetails.codeString}
                    </span>
                  </div>
                  <div className={styles.promoItem}>
                    <span className={styles.promoLabel}>Discount:</span>
                    <span className={styles.promoValue}>
                      {discountPercent}% off
                    </span>
                  </div>
                  <div className={styles.promoItem}>
                    <span className={styles.promoLabel}>Valid From:</span>
                    <span className={styles.promoValue}>
                      {new Date(selectedPromoDetails.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.promoItem}>
                    <span className={styles.promoLabel}>Valid Until:</span>
                    <span className={styles.promoValue}>
                      {new Date(selectedPromoDetails.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {promoCodes.length === 0 && (
              <div className={styles.warningBox}>
                <p>No promo codes available. Please create a promo code first.</p>
                <button
                  type="button"
                  onClick={() => router.push("/admin/addpromo")}
                  className={styles.linkButton}
                >
                  Create Promo Code
                </button>
              </div>
            )}

            {error && (
              <div className={styles.errorBox}>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !selectedPromo || promoCodes.length === 0}
              className={styles.submitButton}
            >
              {loading ? (
                <>
                  <span className={styles.buttonSpinner}></span>
                  Sending Emails...
                </>
              ) : (
                "Send Promotional Emails"
              )}
            </button>
          </form>
        </div>

        {result && (
          <div className={styles.resultSection}>
            <div className={styles.successBox}>
              <h3>{result.message}</h3>
              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{result.emailsSent}</span>
                  <span className={styles.statLabel}>Emails Sent</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{result.emailsFailed}</span>
                  <span className={styles.statLabel}>Failed</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>{result.totalUsers}</span>
                  <span className={styles.statLabel}>Total Users</span>
                </div>
              </div>
              {result.promoCode && (
                <p className={styles.resultDetail}>
                  Promo code <strong>{result.promoCode}</strong> with{" "}
                  <strong>{result.discountPercent}% discount</strong> was sent to
                  registered users.
                </p>
              )}
            </div>

            {result.results && result.results.length > 0 && (
              <div className={styles.detailsSection}>
                <h4>Email Details:</h4>
                <div className={styles.resultsList}>
                  {result.results.map((res, index) => (
                    <div
                      key={index}
                      className={`${styles.resultItem} ${
                        res.status === "sent"
                          ? styles.resultSuccess
                          : styles.resultFailed
                      }`}
                    >
                      <span className={styles.resultEmail}>{res.email}</span>
                      <span className={styles.resultStatus}>
                        {res.status === "sent" ? "Sent" : "Failed"}
                      </span>
                      {res.error && (
                        <span className={styles.resultError}>{res.error}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
