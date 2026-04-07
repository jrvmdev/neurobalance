"use client";

import { useRef, useState, useTransition } from "react";
import { PurchaseMethod } from "@/lib/types";

type CheckoutFormProps = {
  methods: PurchaseMethod[];
  productSlug: string;
  priceLabel: string;
  productLabel: string;
};

const providerMeta: Record<PurchaseMethod["provider"], { icon: string; kicker: string; action: string }> = {
  mercadopago: { icon: "MP", kicker: "Pago automatico", action: "Abrir checkout" },
  transfer: { icon: "TR", kicker: "Opcion asistida", action: "Ver transferencia" },
  stripe: { icon: "ST", kicker: "Pago internacional", action: "Abrir checkout" },
};

const transferDetails = {
  bank: "Banco a definir",
  alias: "NEUROBALANCE.ALIAS",
  cbu: "0000003100000000000000",
  holder: "NeuroBalance",
};

const whatsappUrl =
  "https://wa.me/5490000000000?text=Hola,%20quiero%20comprar%20la%20coleccion%20NeuroBalance%20por%20transferencia";

export function CheckoutForm({ methods, productSlug, priceLabel, productLabel }: CheckoutFormProps) {
  const [selectedProvider, setSelectedProvider] = useState<PurchaseMethod["provider"]>(
    methods[0]?.provider ?? "mercadopago",
  );
  const [message, setMessage] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const activeMethod = methods.find((method) => method.provider === selectedProvider) ?? methods[0];
  const isManual = selectedProvider === "transfer";

  function openAutomaticCheckout(provider: PurchaseMethod["provider"]) {
    setSelectedProvider(provider);
    setMessage(null);
    dialogRef.current?.showModal();
  }

  function selectManualMode() {
    setSelectedProvider("transfer");
    setMessage(null);
    setCopyMessage(null);
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }

  function closeDialog() {
    dialogRef.current?.close();
    setMessage(null);
  }

  async function copyValue(label: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyMessage(`${label} copiado`);
      window.setTimeout(() => setCopyMessage(null), 1500);
    } catch {
      setCopyMessage(`No pudimos copiar ${label.toLowerCase()}`);
    }
  }

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
    <>
      <div className="checkout-shell">
        <div className="payment-grid" role="tablist" aria-label="Metodos de pago">
          {methods.map((method) => {
            const isActive = method.provider === selectedProvider;
            const meta = providerMeta[method.provider];

            return (
              <button
                key={method.provider}
                type="button"
                className={`payment-card${isActive ? " active" : ""}`}
                onClick={() =>
                  method.provider === "transfer"
                    ? selectManualMode()
                    : openAutomaticCheckout(method.provider)
                }
              >
                <span className="payment-card-icon" aria-hidden="true">
                  {meta.icon}
                </span>
                <span className="payment-card-kicker">{meta.kicker}</span>
                <strong className="payment-card-title">{method.title}</strong>
                <span className="payment-card-badge">{method.badge}</span>
                <span className="payment-card-copy">{method.summary}</span>
                <span className="payment-card-action">{meta.action}</span>
              </button>
            );
          })}
        </div>

        {isManual ? (
          <div className="checkout-manual-panel">
            <div className="checkout-manual-head">
              <div>
                <p className="pricing-overline">Transferencia asistida</p>
                <h3 className="checkout-manual-title">Alias y CBU listos para copiar</h3>
              </div>
              <div className="checkout-manual-price">{priceLabel}</div>
            </div>

            <div className="manual-bank-grid">
              <div className="manual-bank-row">
                <span className="manual-bank-label">Banco</span>
                <strong>{transferDetails.bank}</strong>
              </div>
              <div className="manual-bank-row">
                <span className="manual-bank-label">Titular</span>
                <strong>{transferDetails.holder}</strong>
              </div>
              <div className="manual-bank-row">
                <span className="manual-bank-label">Alias</span>
                <div className="manual-bank-value">
                  <strong>{transferDetails.alias}</strong>
                  <button type="button" className="copy-button" onClick={() => copyValue("Alias", transferDetails.alias)}>
                    Copiar
                  </button>
                </div>
              </div>
              <div className="manual-bank-row">
                <span className="manual-bank-label">CBU</span>
                <div className="manual-bank-value">
                  <strong>{transferDetails.cbu}</strong>
                  <button type="button" className="copy-button" onClick={() => copyValue("CBU", transferDetails.cbu)}>
                    Copiar
                  </button>
                </div>
              </div>
            </div>

            <p className="checkout-helper">
              Haz la transferencia, envianos el comprobante y activamos el acceso. Si prefieres, puedes escribirnos directo y te acompanamos por WhatsApp.
            </p>
            {copyMessage ? <p className="checkout-copy-feedback">{copyMessage}</p> : null}

            <div className="manual-actions">
              <a className="manual-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
                Ir a WhatsApp
              </a>
            </div>
          </div>
        ) : null}
      </div>

      <dialog ref={dialogRef} className="checkout-modal" aria-labelledby="checkout-modal-title">
        <div className="checkout-modal-card">
          <button type="button" className="checkout-modal-close" onClick={closeDialog} aria-label="Cerrar">
            Cerrar
          </button>

          <div className="checkout-modal-head">
            <p className="pricing-overline">Coleccion NeuroBalance</p>
            <h3 id="checkout-modal-title" className="checkout-modal-title">
              Completa tus datos para pagar con {activeMethod.badge}
            </h3>
            <div className="checkout-modal-price">{priceLabel}</div>
            <p className="ppanel-currency">{productLabel}</p>
          </div>

          <div className="checkout-method-box">
            <div className="checkout-method-head">
              <span className="checkout-method-chip">{activeMethod.badge}</span>
              <span className="checkout-method-tip">{providerMeta[activeMethod.provider].kicker}</span>
            </div>
            <p className="checkout-method-copy">{activeMethod.summary}</p>
            <p className="checkout-helper">{activeMethod.helper}</p>
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
      </dialog>
    </>
  );
}
