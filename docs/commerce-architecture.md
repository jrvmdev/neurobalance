# NeuroBalance Ecommerce MVP

## Objetivo

Vender ebooks con:

- pago directo por Mercado Pago en Argentina
- pago directo por Stripe para internacional
- transferencia bancaria como respaldo manual
- entrega automatica por email y pantalla de confirmacion
- enlace unico de descarga con expiracion
- panel interno minimo para soporte y reenvios

## Recomendacion

No usar WhatsApp como flujo principal de compra.

Usar esta jerarquia:

1. CTA principal: comprar ahora
2. CTA secundario: hablar por WhatsApp
3. Transferencia: opcion manual asistida

WhatsApp debe quedar como canal de confianza y cierre asistido, no como el checkout principal.

## Stack recomendado

- Frontend: Next.js App Router sobre Vercel
- Base de datos: Neon Postgres
- Email: Resend
- Pagos Argentina: Mercado Pago Checkout Pro o Preference API
- Pagos internacional: Stripe Checkout
- Archivos: Vercel Blob o storage privado equivalente
- Admin minimo: ruta protegida solo para el equipo

## Por que este stack

- Vercel ya esta vinculado al proyecto
- Stripe resuelve muy bien pagos internacionales
- Mercado Pago sigue siendo la mejor opcion local para Argentina
- Neon + Resend mantienen la primera version simple
- Un panel minimo evita construir un backoffice gigante antes de vender

## Flujo de compra ideal

### Stripe

1. Usuario entra a la landing
2. Hace click en comprar ahora
3. Selecciona producto o pack
4. Se crea una orden en estado `pending`
5. Se redirige a Stripe Checkout
6. Stripe confirma el pago via webhook
7. La orden pasa a `paid`
8. Se genera un token unico de descarga
9. Se envia email con magic link
10. La pagina de exito tambien muestra el acceso

### Mercado Pago

1. Usuario entra a la landing
2. Hace click en comprar ahora
3. Se crea una orden en estado `pending`
4. Se crea una preferencia de Mercado Pago
5. Usuario paga en Checkout Pro
6. Mercado Pago confirma el pago via webhook
7. La orden pasa a `paid`
8. Se genera el token unico
9. Se envia email con el link
10. Se muestra la pagina de gracias

### Transferencia manual

1. Usuario completa un formulario corto
2. Se crea una orden en estado `awaiting_transfer`
3. Se muestran los datos bancarios
4. Usuario envia comprobante
5. Desde admin se aprueba manualmente
6. Se genera el token y se envia el email

## Base de datos minima

### products

- id
- slug
- title
- description
- price_ars
- price_usd
- currency_default
- active
- created_at

### customers

- id
- email
- full_name
- whatsapp
- country
- created_at

### orders

- id
- customer_id
- product_id
- provider
- provider_reference
- status
- amount
- currency
- email
- created_at
- paid_at

### download_tokens

- id
- order_id
- token_hash
- expires_at
- max_downloads
- download_count
- last_download_at
- created_at

### transfers

- id
- order_id
- status
- proof_url
- reviewed_at
- reviewed_by
- notes

## Estados recomendados

### orders.status

- `pending`
- `paid`
- `failed`
- `refunded`
- `awaiting_transfer`
- `cancelled`

### transfers.status

- `pending_review`
- `approved`
- `rejected`

## Magic link de descarga

No usar un link publico directo al PDF.

Usar:

- token aleatorio largo
- guardar solo hash del token en base de datos
- expiracion de 24 a 72 horas
- limite de descargas, por ejemplo 3
- regeneracion manual desde admin

Flujo:

1. El sistema genera token
2. Email contiene URL tipo `/download/[token]`
3. La ruta valida hash, expiracion y limite
4. Si es valido, devuelve acceso al archivo
5. Se registra la descarga

## Admin minimo recomendado

No construir un CRM grande.

Al inicio alcanza con una ruta protegida tipo `/admin` con:

- listado de ordenes
- filtro por email
- estado del pago
- proveedor de pago
- boton para reenviar link
- boton para regenerar link
- aprobacion manual de transferencias

## Landing recomendada

La landing actual tiene buena estetica, pero para vender mejor deberia reordenarse asi:

1. Hero especifico
   - coleccion de 7 tomos
   - promesa concreta
   - precio o desde cuanto
   - CTA comprar ahora
2. Seccion de los 7 tomos
   - nombre
   - problema que resuelve
   - resultado esperado
3. Que recibis
   - PDF
   - acceso inmediato
   - bonus si existen
4. Como funciona
   - compras
   - pagas
   - recibis el link
5. Medios de pago
   - Mercado Pago
   - Stripe
   - transferencia
6. FAQ
7. CTA final
8. WhatsApp como apoyo

## Fases de implementacion

### Fase 1

- migrar de landing estatica a app Next.js
- modelar productos
- crear CTA principal de compra
- integrar Stripe
- integrar Mercado Pago
- guardar ordenes
- webhooks funcionales
- email con Resend
- magic link de descarga

### Fase 2

- admin minimo
- aprobacion de transferencias
- reenvio manual
- metricas basicas de conversion

### Fase 3

- upsells o bundles
- cupones
- afiliados
- automatizaciones post compra

## Variables de entorno esperadas

- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_WEBHOOK_SECRET`
- `DOWNLOAD_TOKEN_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- `ADMIN_EMAIL`

## Decisiones recomendadas

### Recomendado para arrancar

- Stripe + Mercado Pago
- transferencia manual
- email automatico
- magic link propio
- admin minimo

### No recomendado para arrancar

- vender solo por WhatsApp
- depender solo de transferencia
- panel admin complejo
- descarga publica directa del PDF

## Siguiente paso sugerido

Implementar la base tecnica en este orden:

1. mover el proyecto a Next.js
2. crear esquema de datos
3. conectar Stripe
4. conectar Mercado Pago
5. crear webhooks
6. crear descarga protegida
7. rehacer la landing para conversion
