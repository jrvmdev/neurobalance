"use client";

import { useState, useTransition } from "react";
import { PurchaseMethod } from "@/lib/types";

type CheckoutFormProps = {
  methods: PurchaseMethod[];
  productSlug: string;
};

export function CheckoutForm({ methods, productSlug }: CheckoutFormProps) {
  const [selectedProvider, setSelectedProvider] = useState<PurchaseMethod["provider"]>(
    methods[0]?.provider ?? "mercadopago",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeMethod =
    methods.find((method) => method.provider === selectedProvider) ?? methods[0];

  async function handleSubmit(formData: FormData) {
    setMessage(null);

    startTransition(async () => {
      const payload = {
        provider: selectedProvider,
        productSlug: String(formData.get("productSlug")),
        customerName: String(formData.get("customerName")),
        customerEmail: String(formData.get("customerEmail")),
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        ok: boolean;
        redirectUrl?: string;
        message?: string;
      };

      if (!response.ok || !result.ok || !result.redirectUrl) {
        setMessage(result.message ?? "No pudimos iniciar la compra todavia.");
        return;
      }

      window.location.href = result.redirectUrl;
    });
  }

  return (
    <div className="pricing-card reveal">
      <div className="pricing-tabs">
        {methods.map((method) => {
          const isActive = method.provider === selectedProvider;
          return (
            <button
              key={method.provider}
              type="button"
              className={`ptab${isActive ? " active" : ""}`}
              onClick={() => setSelectedProvider(method.provider)}
            >
              {method.title}
            </button>
          );
        })}
      </div>
      <div className="pricing-panels pricing-panels-live">
        <div className="ppanel active">
          <div className="ppanel-price">$29.900</div>
          <div className="ppanel-currency">ARS - Argentina</div>
          <div className="ppanel-methods">
            <div className="pmethod">{activeMethod.badge}</div>
            <div className="pmethod">{activeMethod.summary}</div>
            <div className="pmethod">{activeMethod.helper}</div>
          </div>

          <form action={handleSubmit} className="nb-checkout-form">
            <input type="hidden" name="productSlug" value={productSlug} />
            <label>
              Nombre
              <input required name="customerName" placeholder="Tu nombre" />
            </label>
            <label>
              Email
              <input required type="email" name="customerEmail" placeholder="tu@email.com" />
            </label>
            <button className="ppanel-btn" type="submit" disabled={isPending}>
              {isPending ? "Preparando compra..." : activeMethod.buttonLabel}
            </button>
          </form>

          {message ? <p className="checkout-inline-error">{message}</p> : null}
        </div>
      </div>
    </div>
  );
}
