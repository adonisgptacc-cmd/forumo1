# Forumo Product Requirements Document (PRD)

**Version:** 2025  
**Status:** Master PRD  
**Scope:** Web, Mobile, Backend, Admin, Payments, Escrow, Auctions, Inventory, AI Moderation

---

## 1. Product Overview

### 1.1 Vision
Forumo is a pan-African social marketplace designed to rank among the top three platforms on the continent. It emphasises local buying, selling, auctions, and service exchanges supported by secure escrow, verified identities, real-time engagement, and comprehensive admin oversight. The platform competes directly with Facebook Marketplace, Takealot Marketplace, BidorBuy, and independent Shopify sellers by delivering unmatched safety, transparency, and community-driven commerce.

### 1.2 Mission
Deliver the safest, most trusted, and most user-friendly digital marketplace for African communities, SMBs, and individual sellers through:
- Fair seller fees
- Escrow-backed protection
- Streamlined listing and onboarding flows
- Consistent multi-platform UX
- Professional admin supervision and analytics

### 1.3 Platform Scope
| Platform | Status |
| --- | --- |
| Web App (React/Next.js) | Included |
| Mobile App (React Native) | Included |
| Backend (NestJS/Node.js) | Included |
| Admin Console | Included |
| AI Moderation Engine | Included |
| Escrow & Payments (Stripe/Trustap/Escrow.com) | Included |
| Auctions Module | Included |
| Inventory Engine | Included |
| Messaging System (chat) | Included |
| Notifications (Email, SMS, Push, In-App) | Included |
| Reviews & Trust Score | Included |
| KYC & Verification | Included |

---

## 2. User Roles & Personas

### 2.1 Buyers
**Needs:** Safe payments, trustworthy sellers, delivery clarity, real-time updates, dispute handling.  
**Tools:** Search, Listings, Escrow, Auctions, Chat, Reviews, Notifications.

### 2.2 Sellers
**Needs:** KYC verification, reliable payouts, inventory controls, messaging, reputation management.  
**Tools:** Listings module, Inventory engine, Escrow payouts, Analytics dashboard, Messaging, Reviews.

### 2.3 Admins
Internal staff handling KYC approvals, suspensions, listing moderation, payment oversight, and analytics.  
**Tools:** Admin console, Moderation dashboards, Analytics (PostHog + KPIs).

### 2.4 Moderators
Human reviewers augmented by AI heuristics.  
**Tools:** AI flagging, chat/content review, ban system, decision logs, appeals workflow.

### 2.5 Automation Services
| Module | Purpose |
| --- | --- |
| AI Moderation Engine | Detect harmful content, fraud, scams, abuse |
| Escrow Service | Hold, release, and refund funds |
| Queue Worker (Bull/Redis) | Email, SMS, and push dispatch |
| Auction Engine | Real-time bids with anti-sniping |
| Inventory Engine | Reserve/restock, warn on stock events |

---

## 3. Core Workflows

### 3.1 Buyer Purchase Flow (Escrow)
Browse listings → Select product → Choose delivery → Pay into escrow → Seller notified → Seller ships/prepares → Buyer marks "Received" → Escrow releases funds → Buyer review → Seller trust score updates.

### 3.2 Seller Flow
Register → Complete KYC → Create listings (with variants) → Manage inventory → Respond to messages → Fulfil orders → Receive escrow payout → Review buyer → Improve trust score.

### 3.3 Auction Flow
Create auction → Bidding (real-time + proxy) → Anti-sniping extensions → Auction end → Highest bidder wins → Escrow payment → Delivery → Payout.

### 3.4 Messaging Flow
Real-time Socket.IO chat, buyer-seller conversations, image upload, auto-delete flagged content, AI moderation triggers, "Report Conversation" action.

### 3.5 KYC Flow
Upload ID/selfie/proof of address → Automated OCR + risk scoring → Manual verification bucket → Risk rating → Approve/deny/request more docs.

### 3.6 Dispute Resolution Flow
Issue reported → Admin reviews escrow context → Evidence exchange → Decision → Refund/partial/release funds → Case closure.

---

## 4. Feature Modules

### 4.1 Authentication & Security
Registration, login, 2FA (SMS/email OTP), device fingerprinting, JWT access/refresh tokens, password policies, brute-force protection, IP rate limiting, POPIA-compliant storage. Admins can force logout, disable tokens, and audit actions.

### 4.2 KYC Verification Module
Documents: SA ID/Passport, selfie, proof of address, optional liveness. Workflows include auto-detection, OCR parsing, AI fraud signals, manual review bucket (24–48 hr SLA). Admin queue with approve/reject, reason codes, and audit trail.

### 4.3 Listings Module
Fields: title, description, condition, category, price, variants, stock, SEO metadata, photos (sharp compression), location, delivery options, "Allow Offers/Auctions" toggles. Lifecycle: Draft → Active → Sold → Archived with search indexing and AI moderation.

### 4.4 Search & Discovery Engine
Optional Elasticsearch/OpenSearch, Redis caching, full-text/fuzzy matching. Filters: category, location, price, condition, seller rating, delivery time, "Ending soon", "Near you".

### 4.5 Auctions Engine
Real-time + proxy bidding, anti-sniping (extend by 2–3 min), reserve price, bid history, alerts (outbid/ending), countdown timers, "Buy Now", cancellation policies, admin overrides (force-close/edit reserve/suspend bidders).

### 4.6 Orders & Escrow Module
Statuses: Pending Payment → Paid (Escrow) → Seller Preparing → Shipped/Pickup → Delivered → Completed → Disputed → Refunded. Escrow auto-release, manual override, refund flows, ledger entries, Stripe/Escrow.com/Trustap integration.

### 4.7 Payment Module
Supports cards, EFT (3rd-party). Future: wallet, Apple/Google Pay, crypto. Handles payouts, commission deductions, refunds, split payments for multi-item carts.

### 4.8 Messaging Module
Socket.IO chat with attachments, read receipts, typing indicators, reporting, AI insight panel for moderation context.

### 4.9 AI Moderation System
Detect scam keywords, abuse, restricted imagery, fraud signals, sentiment. Outputs severity score, flag reason, suggested action, auto-warning/muting/hiding.

### 4.10 Notifications Module
Channels: in-app, email, SMS, push. Events: new messages, order updates, bids, KYC results, reviews, escrow releases.

### 4.11 Reviews & Trust Score
Inputs: verified ID, positive reviews, response time, completed sales, policy compliance. Displayed on seller profiles, product pages, admin dashboards.

### 4.12 Inventory Engine
Multi-location stock, bundles, pre-orders, reservations, restock/damaged handling, stock alerts, audits, purchase order tracking.

### 4.13 Admin Console
User management, KYC approvals, listing moderation, escrow dispute handling, payout approvals, reporting dashboards, fraud panel, audit logs.

### 4.14 Analytics Module
Metrics: active users, sales, seller performance, high-risk behaviour, conversion rates, auction health, revenue, inventory velocity.

### 4.15 Mobile App (React Native)
Features: login + KYC, browsing, auctions, chat, escrow, delivery tracking, offline cache, push notifications.

### 4.16 Web App (React)
Full marketplace surface area: auctions, dashboards, advanced search, admin console (web-only experience).

---

## 5. Technical Architecture

### 5.1 Backend Stack
| Component | Technology |
| --- | --- |
| API | NestJS |
| Database | PostgreSQL |
| Cache | Redis |
| Queue | Bull + Redis |
| Real-time | Socket.IO |
| Storage | AWS S3 |
| Infra | Docker + Kubernetes |
| Deployment | GitHub Actions |

### 5.2 Microservices
Auth, Users, Listings, Orders, Auctions, Escrow, Messaging, KYC, Reviews, Notifications, Admin, Analytics, Inventory.

### 5.3 Database Schema (Core Tables)
Users, Listings, Auctions, Orders, Payments, EscrowTransactions, Messages, Reviews, Inventory, KYCSubmissions, Notifications, AuditLogs — each with UUID PKs, timestamps, soft-delete support.

---

## 6. Compliance Requirements

### 6.1 POPIA
TLS everywhere, AES-256 at rest, consent tracking, export/delete rights.

### 6.2 CPA
Refund rules, cooling-off period, clear delivery timelines.

### 6.3 ECTA
Electronic signatures and transaction logs.

### 6.4 PCI DSS
No card storage; Stripe/Escrow handle PCI scope.

---

## 7. Non-Functional Requirements
| Category | Requirement |
| --- | --- |
| Performance | < 250 ms typical response |
| Availability | 99.9% uptime |
| Scalability | Auto-scaling pods |
| Security | OWASP compliance |
| Logging | Full audit logs |
| Monitoring | Sentry + Prometheus |
| Data Retention | ≥5 years for transactions |

---

## 8. Release Plan
- **MVP (8–10 weeks):** Auth, Listings, Search, Escrow checkout, Orders, Messaging, Reviews, KYC, Basic admin, Web + Mobile basics.
- **V1 (3 months post-launch):** Auctions, Inventory, Delivery integrations, Push notifications, Full admin suite, Analytics.
- **V2 (6–9 months):** Marketplace groups, Seller subscriptions, Wallet, AI dynamic pricing, Crypto payments, Multi-currency.

---

## 9. Appendices

### 9.1 Appendix A — API Catalogue
Detailed REST surface under `/api/v1/*`:
- **Auth:** register, login, logout, refresh, verify OTP, forgot/reset password, `GET /me`.
- **Users:** list, fetch, update, delete, listings, reviews, trust score.
- **KYC:** submit documents, view status, admin pending queue, approve/reject endpoints.
- **Listings:** CRUD, image uploads, variants.
- **Auctions:** create, list active, view, bid, cancel, patch.
- **Orders:** create/list/fetch, status updates, confirm delivery.
- **Escrow:** create, status by order, release, refund, dispute, admin dispute queue.
- **Messaging:** fetch threads, fetch thread, send message, report conversation. Socket events: `message:new`, `message:typing`, `message:read`, `chat:flagged`.
- **Reviews:** create per order, fetch per seller.
- **Inventory:** stock overview, reserve, release, adjust, mark damaged.
- **Notifications:** fetch, mark read.
- **Admin:** manage users, listings, KYC, escrow disputes, orders, audit logs, fraud analysis.

### 9.2 Appendix B — Data Models
Structured models for Users, Listings, Auctions, Orders, Escrow, Messages, Inventory, KYC including canonical fields (UUID IDs, timestamps, status enums, relations, arrays for images/variants/bid history, ledger references, reviewer metadata).

### 9.3 Appendix C — Event Flows
- **Real-time Messaging:** REST send → emit `message:new` → recipient view → AI moderation → if flagged emit `chat:flagged` to admins.
- **Auction Events:** `/bid` updates server state → emit `auction:update` → anti-sniping extension → final `auction:ended` broadcast.
- **Escrow Worker:** payment success creates escrow → queue sends notifications → delivery confirmation triggers release → auto-release fallback.
- **Notification Worker:** triggers on orders, outbids, KYC, reviews, messages; workers for email/SMS/push.

### 9.4 Appendix D — Test Strategy
- **Unit:** services/controllers/utils (Jest, ≥80% coverage).
- **Integration:** Supertest APIs with in-memory Postgres + Redis.
- **E2E:** Cypress flows (login, listings CRUD, checkout, auctions, messaging, admin console).
- **Mobile:** Expo testing + snapshots.
- **AI Moderation:** abusive content simulations, FP/FN tracking.

### 9.5 Appendix E — Monitoring & Alerting
Tools: Sentry, Grafana, Prometheus, AWS CloudWatch. Alerts for latency >500 ms, payment failure rate >5%, high-risk fraud, auction engine failures, KYC backlog >72h.

### 9.6 Appendix F — Logging Schema
Entries capture timestamp, userId, action, entity, entityId, IP, device, status, message. Log types include auth, listing moderation, KYC decisions, escrow events, admin actions, AI moderation results.

### 9.7 Appendix G — Security Controls
Mandatory: JWT rotation, rate limiting, Helmet, strict CORS, SQLi/XSS protection, bcrypt hashing, AES-256 at rest, TLS 1.2+. Fraud prevention: device fingerprinting, suspicious scoring, auto-flagging, manual review for >R10,000.

### 9.8 Appendix H — Compliance Artifacts
POPIA summary, CPA return rules, ECTA audit requirements, PCI DSS delegation, KYC guidelines, risk scoring model.

### 9.9 Appendix I — Deployment & DevOps
Environments: dev/staging/prod. CI/CD via GitHub Actions (lint, unit, integration, Docker build, deploy, migrations, smoke tests). Infrastructure: load balancer, multi-AZ, auto-scaling, Cloudflare CDN/WAF.

---

## 10. Visual References
Marketplace UX blueprint, swimlane diagrams (buyer/seller/escrow/admin), system architecture (API gateway, services, queues, sockets, storage), and ER diagram (Users ↔ Listings/Auctions/Orders/Escrow/Inventory). Refer to `/docs/assets/marketplace-blueprint.png` when available for design alignment.
