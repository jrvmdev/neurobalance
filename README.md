# NeuroBalance

Base ecommerce en Next.js para vender la coleccion de 7 tomos de NeuroBalance con checkout directo, precio promocional anticipado y entregas semanales automatizables.

## Incluye

- landing enfocada en conversion
- checkout selector para Stripe, Mercado Pago y transferencia
- route handler para iniciar compra
- webhooks preparados para simular confirmacion de pago
- persistencia local de ordenes y agenda de entregas en `data/commerce-store.json`
- procesador de entregas semanales listo para cron o disparo manual
- panel admin minimo para marcar pagos y procesar envios

## Enfoque operativo

- Se vende la coleccion completa en un solo pago
- Semana 1 se entregan tomo 1 y 2
- Luego se libera un tomo por semana
- La coleccion se puede seguir comprando tambien cuando los 7 tomos ya esten completos
- El envio principal recomendado es por email
- WhatsApp e Instagram quedan como soporte y reenvio, no como checkout principal

## Primer setup

1. Instalar dependencias con `npm install`
2. Copiar variables desde `.env.example`
3. Completar claves de Stripe, Mercado Pago y Resend
4. Ejecutar `npm run dev`

## Rutas importantes

- `/` landing principal
- `/api/checkout` inicio de compra
- `/api/webhooks/stripe` webhook Stripe
- `/api/webhooks/mercadopago` webhook Mercado Pago
- `/api/releases/process` procesa entregas vencidas
- `/gracias` confirmacion
- `/admin` panel interno inicial

## Flujo local de prueba

1. Crear una orden desde la landing
2. Ir a `/admin`
3. Marcar la orden como pagada
4. Procesar entregas de hoy
5. Revisar el estado de las entregas en el store local

## Proximo paso tecnico

Conectar las pasarelas reales y ejecutar `/api/releases/process` con un cron diario o semanal.

