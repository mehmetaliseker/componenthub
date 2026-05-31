# ComponentHub

ComponentHub, React Bits benzeri bir **React / Next.js component galerisidir**. Kullanıcılar kayıtlı bileşenleri canlı önizleyebilir, açıklamalarını okuyabilir ve TSX/CSS kodunu kopyalayabilir.

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS |
| Backend | Java 21, Spring Boot 4, Spring Data JPA, Validation |
| Veritabanı | PostgreSQL 16 |
| Migration | Flyway (raw SQL) |
| Altyapı | Docker Compose |

## Proje Mimarisi

```
componenthub/
├── frontend/          # Next.js UI + merkezi API client
├── backend/           # Spring Boot REST API
├── docker-compose.yml # PostgreSQL
└── README.md
```

**Frontend API katmanı:** `MethodNames` → `executeJsonRequest` → `componentApi` — endpoint stringleri sayfalara dağılmaz.

**Backend katmanları:** `controller` → `service` → `repository` → `entity`

## Güvenlik Notu

Kullanıcıdan gelen `componentCode` **asla** `eval`, `new Function`, `dangerouslySetInnerHTML` veya runtime transpile ile çalıştırılmaz. Canlı önizleme yalnızca frontend içinde önceden tanımlı güvenli preview componentleriyle yapılır.

## Kurulum

### 1. PostgreSQL (Docker)

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
mvnw.cmd spring-boot:run
```

API: `http://localhost:8080`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI: `http://localhost:3000`

`frontend/.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

## API Testi

Backend çalışırken şu adres **en az 5 built-in component** döndürmelidir:

**http://localhost:8080/api/components**

Beklenen slug'lar:

| Component | slug | previewType |
|-----------|------|-------------|
| Animated Button | `animated-button` | `animated-button` |
| Pricing Card | `pricing-card` | `pricing-card` |
| Glass Login Card | `glass-login-card` | `glass-login-card` |
| Gradient Navbar | `gradient-navbar` | `gradient-navbar` |
| Draggable Note Card | `draggable-note-card` | `draggable-note-card` |

Detay için: `GET http://localhost:8080/api/components/{slug}` — yanıtta `componentCode`, `description`, `previewType` dolu olmalı.

## Hazır Componentler (Flyway V5)

Migration: `backend/src/main/resources/db/migration/V5__force_refresh_builtin_component_code.sql` (V4 sonrası bozuk seed düzeltmesi)

- `INSERT ... ON CONFLICT (slug) DO UPDATE` ile eski bozuk kayıtlar düzeltilir.
- `component_code` alanı dollar-quoted multiline TSX içerir.

## Troubleshooting (Seed gelmiyorsa)

1. PostgreSQL'de `flyway_schema_history` tablosunu kontrol edin — **V4** çalışmış mı?
2. Backend'i yeniden başlatın (`spring-boot:run`) — Flyway startup'ta migration uygular.
3. Geliştirme ortamında gerekirse veritabanını sıfırlayın:
   ```bash
   docker compose down -v
   docker compose up -d
   ```
   Ardından backend'i tekrar çalıştırın.
4. Alternatif: `V4__seed_component_gallery_items.sql` içindeki `ON CONFLICT` upsert sorgularını pgAdmin/psql ile manuel çalıştırın.

## API Endpointleri

| Method | Path | Açıklama |
|--------|------|----------|
| GET | `/api/components` | Tüm componentler |
| GET | `/api/components/{slug}` | Slug ile detay |
| POST | `/api/components` | Yeni component |
| PUT | `/api/components/{id}` | Güncelle |
| DELETE | `/api/components/{id}` | Sil |

## Geliştirme Komutları

```bash
# Frontend
cd frontend
npm run lint
npm run build

# Backend
cd backend
mvnw.cmd clean package
```

Frontend dev (webpack):

```bash
npm run dev
```

Turbopack (opsiyonel): `npm run dev:turbo`
