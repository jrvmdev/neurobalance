"use client";

import { useState, useTransition } from "react";
import { PurchaseMethod } from "@/lib/types";

type CheckoutFormProps = {
  methods: PurchaseMethod[];
  productSlug: string;
};

export function CheckoutForm({ methods, productSlug }: CheckoutFormProps) {
  const [selectedProvider, setSelectedProvider] =
    useState<PurchaseMethod["provider"]>("mercadopago");
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
        setMessage(result.message ?? "No pudimos iniciar la compra todavía.");
        return;
      }

      window.location.href = result.redirectUrl;
    });
  }

  return (
    <div className="card checkout-card">
      <div className="checkout-methods" role="tablist" aria-label="Métodos de compra">
        {methods.map((method) => {
          const isActive = method.provider === selectedProvider;

          return (
            <button
              key={method.provider}
              type="button"
              className={`method-pill${isActive ? " active" : ""}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedProvider(method.provider)}
            >
              <span>{method.title}</span>
              <strong>{method.badge}</strong>
            </button>
          );
        })}
      </div>

      <div className="checkout-summary">
        <p className="checkout-badge">{activeMethod.badge}</p>
        <h3>{activeMethod.title}</h3>
        <p>{activeMethod.summary}</p>
        <span>{activeMethod.helper}</span>
      </div>

      <form action={handleSubmit} className="checkout-form">
        <input type="hidden" name="productSlug" value={productSlug} />
        <label>
          Nombre
          <input required name="customerName" placeholder="Tu nombre" />
        </label>
        <label>
          Email
          <input required type="email" name="customerEmail" placeholder="tu@email.com" />
        </label>
        <button className="button-primary" type="submit" disabled={isPending}>
          {isPending ? "Preparando compra..." : activeMethod.buttonLabel}
        </button>
      </form>

      {message ? <p className="checkout-message">{message}</p> : null}
    </div>
  );
}
