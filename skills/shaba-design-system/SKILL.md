---
name: shaba-design-system
description: Design, refine, or review Shaba’s Next.js website and admin UI using its corporate water-service identity and shared design system. Apply for Shaba visual work, not unrelated websites or backend-only tasks.
---

# Shaba Design System

Shaba provides water services in Borama and works with government bodies, local NGOs, and international NGOs. Its website should communicate operational competence, public service, and credibility to residents and institutional partners.

Before visual work, read `docs/design-system.md` and `styles/shaba-tokens.css` from the Shaba repository root. Those repository files are authoritative and evolve with reviewed PRs; do not resolve their paths relative to this installed skill. If unavailable, use the core direction below and identify the missing source before inventing replacement standards.

## Core direction

- Use restrained forest green, navy inspired by the existing logo, white, and pale neutral surfaces. Preserve the existing logo and company identity unless the user requests a brand change.
- Use Mulish initially, with a clear type scale, generous whitespace, legible text, and consistent alignment. Read the repository tokens rather than guessing new hex values or spacing for each page.
- Ground the design in real water-service and project photography. Do not generate documentary-looking evidence of work, partners, beneficiaries, or infrastructure. Confirm captions and image rights where source information is available.
- Give services, project evidence, and partnership information clear hierarchy. Avoid invented impact metrics, certifications, testimonials, or claims that an organization is a current partner based only on its logo asset.
- Use shared containers, section spacing, buttons, form controls, and content cards. Evolve components deliberately when their function differs; do not force every section into identical cards.
- Keep public pages welcoming and informative; keep the admin interface efficient, with explicit draft/published states, accessible forms, and clear feedback. Preserve authentication checks and existing data contracts during visual work.
- Respect keyboard focus, contrast, reduced motion, responsive layouts, and readable empty/loading/error states. Treat status with text as well as color.

## Working approach

State a short visual direction for the requested page, apply the shared tokens, and inspect actual browser output at mobile and desktop sizes. For a redesign or visual review, use the available frontend-design and web-design-guidelines skills; use Playwright or the environment’s browser tools for visual verification. Adapt tool choice to the active environment rather than installing a second browser system unnecessarily.

Record page-specific exceptions or revised tokens in the repository design system when they change the reusable standard. For review, report concrete visual or interaction issues with file locations. For implementation, correct observed issues and include screenshots or a usable preview when practical. Do not claim visual verification when only a build or lint check ran.

This skill supplies design guidance. The user’s request determines whether to propose, implement, or publish work; it does not authorize deployments, merges, or external account changes.
