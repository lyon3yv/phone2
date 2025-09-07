# TODO - Solución del problema del admin

## Estado actual
- [x] Identificar problema: referencias incorrectas `storage_1.storage` en lugar de `storage`
- [ ] Corregir todas las referencias en routes.js
- [ ] Verificar que el servidor compile correctamente
- [ ] Probar rutas de admin
- [ ] Confirmar funcionalidad completa

## Referencias a corregir encontradas:
- Múltiples llamadas a `storage_1.storage` en rutas de Instagram, Tinder, Wallapop, WhatsApp, Darkweb y Admin
- Todas deben cambiarse a solo `storage`
