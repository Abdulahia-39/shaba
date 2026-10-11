# Shaba design system

## Purpose and status

This is the initial working direction for a professional corporate website for Shaba, a water-service company serving Borama and working with government bodies, local NGOs, and international NGOs. It establishes a consistent starting point for the forthcoming page redesign. It is not a completed redesign or a new logo identity; refine it against rendered page previews and the user's feedback.

Residents need clear service and contact information. Institutional visitors need to understand Shaba's capabilities, project experience, and how to discuss collaboration. The design should communicate competence and public service through specific content, real photography, and orderly presentation.

The source of truth is this document plus `styles/shaba-tokens.css`. Tokens are imported by the root layout and mapped into Tailwind’s `shaba-*` colours. Public pages use shared components and a scoped CSS module in `components/public`; the admin keeps its own scoped workspace styles.

## Brand and palette

Preserve the current logo. Its green and navy inform a calmer website palette; the low-resolution logo asset should be replaced with an owner-supplied high-quality original when available, without redrawing it as a new brand.

| Token | Value | Use |
| --- | --- | --- |
| brand | `#145A46` | Primary actions, key section accents |
| brand-hover | `#104735` | Primary action hover |
| navy | `#153E68` | Institutional accents, selected dark sections |
| ink | `#172E2A` | Main text |
| muted | `#526762` | Supporting text |
| paper | `#FFFFFF` | Main page background and cards |
| surface | `#F5F8F7` | Alternate sections |
| tint | `#E8F1ED` | Subtle green surfaces |
| border | `#CBD9D3` | Decorative dividers and card outlines |
| focus | `#1D6A94` | Keyboard focus outline |
| error | `#A12B35` | Error text on `#FFF1F2` or white |
| warning | `#79521C` | Warning text on `#FFF7E8` or white |

Use white text on brand or navy. Use ink/muted on paper, surface, and tint. Pale borders are decorative, not the sole cue for a form control or selected state: use stronger outlines, labels, and text where needed. Measure contrast for each actual pairing, including text over images. Aim for at least 4.5:1 for normal text and 3:1 for large text and necessary interface boundaries. Do not assume a palette automatically makes every combination accessible.

## Typography and rhythm

Start with the existing Mulish family, 400 for body and 700 for headings/actions. Keep the current font loading until the redesign deliberately changes it. System sans is the fallback; the design preview uses that fallback to avoid an external font dependency.

Use the token scale: body 16px, supporting text 14px, lead 18–20px, h3 22–28px, h2 32–48px, and h1 40–72px. Body line-height is 1.65, heading line-height 1.12. Keep reading content around 65 characters wide. Prefer sentence case, short headings, and consistent left alignment; center only compact statements where it improves the layout. Avoid excessive uppercase tracking and mixing many typefaces.

Use a 4px spacing basis with named tokens. Containers max out at 1200px, with 16–48px fluid side gutters. Section spacing grows from 48px on smaller screens to 96px on desktop. Card padding generally uses 24–32px; forms use 16–24px gaps. Let content define height; avoid fixed viewport-height sections that clip text or push service information off-screen.

## Shared component contracts

Introduce shared components when implementing pages; these are design contracts, not existing components.

- **Container and Section:** common max-width/gutters, consistent section rhythm, optional surface variants. Use a narrow reading container for articles.
- **Navigation:** visible company identity, concise service/project/about/contact links, obvious active state, accessible mobile menu, and a clear contact action. The private admin remains outside public navigation.
- **Buttons:** primary brand, secondary bordered, and text variants. Use verb-based labels, visible focus, 44px minimum interactive height, disabled/pending states, and one dominant action per local section. A link navigates; a button performs an action.
- **Content cards:** image, meaningful heading, brief description, and optional type/date metadata. Use 6px control radius, 12px card radius, and 16px image radius. Prefer spacing and subtle borders; use shadows sparingly.
- **Forms:** persistent labels, helpful required-field cues, inline errors, submission feedback, and distinct focus. Never rely on placeholder text or color alone. Admin editing can be denser than public marketing pages without sacrificing legibility.
- **Status and empty states:** communicate draft/published/loading/error/success with text. Explain the next available action. An empty collection should not masquerade as existing projects or publications.

If a component already exists, inspect it before adding another variant. Keep appearance separate from data actions so visual work preserves public/private behavior.

## Photography and evidence

Use genuine Shaba project and water-service photographs, with purposeful crops, consistent aspect ratios, and contextual captions when verified. Prefer 16:9 for project/publication cards and flexible landscapes for featured project imagery. Use overlays only when text contrast requires them; do not darken every image by default.

The existence of a partner logo in `public/assets` does not establish a current partnership. Verify names, relationship descriptions, usage rights, statistics, project status, certifications, and testimonials before publishing them. Do not invent impact metrics to fill a hero or simulate evidence of work with AI imagery. ImageGen can support clearly illustrative assets when useful.

## Page direction

- **Home:** clearly explain Shaba's work and service area, show genuine infrastructure imagery, surface services and selected projects, and provide an obvious contact route. Use an intentional layout instead of a sequence of identical cards.
- **Services:** describe actual offerings and who they help. Confirm details with the user rather than inventing products, tariffs, availability, or government responsibilities.
- **About and partnerships:** present the company and confirmed relationships with an institutional tone. Distinguish clients, funders, and implementing partners when that information exists.
- **Projects:** communicate the problem, work performed, location, and verified status. Link to an informative detail page. Articles/publications should not be presented as projects merely because of a shared feed.
- **Publications:** readable titles, authors/dates where appropriate, useful summaries, and comfortable article typography.
- **Contact:** accurate contact channels, a clearly labeled form, and useful service-area context.
- **Admin:** clear workspace hierarchy, efficient editing, obvious visibility state, safe destructive actions, and consistent pending/error/success behavior. Preserve Google admin verification and draft confidentiality. Do not remove the notice that draft media uploads are public in B2.

## Visual review

For substantial visual changes, inspect the affected routes in a real browser at roughly 375px, 768px, and 1440px widths. Check 320px for overflow, long titles, navigation, forms, and text wrapping. Verify keyboard navigation, visible focus, zoom, image behavior, contrast, and loading/empty/error states. Review the page as a composition, not just individual components.

Honor reduced motion. Avoid decorative entrance effects on every section; use short, purposeful transitions for interactions. Capture screenshots or provide a usable preview, correct observed issues, and report what was actually checked. Unit tests and successful builds do not establish visual quality. Use the appropriate checks for a given change rather than requiring an exhaustive audit for a small edit.

## Skills and upkeep

Installed user-level skills:

- [Anthropic frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design): composition, typography, and intentional aesthetic direction.
- [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines): accessibility and interface review.
- [OpenAI playwright](https://github.com/openai/skills/tree/main/skills/.curated/playwright): browser interaction and visual checks.
- `shaba-design-system`: this project's brand and consistency guidance; versioned at `skills/shaba-design-system/SKILL.md`.

Third-party skills are installed in the user's Codex environment, not shipped with the website. The custom skill reads these repository guidelines so token updates do not require duplicating them into a global skill. If its entrypoint changes, synchronize the installed copy. `AGENTS.md` preserves the review workflow for collaborators without those global skills. Use tools and instructions appropriate to the active environment; a skill's provider-specific tool names may need to be mapped to available Codex tools.

Preview the starting palette, type scale, and component direction in `docs/design-preview.html`. It is a static design sample, not a deployed website or functional editor.


## Public website implementation

The public design uses Mulish 400/700, the shared forest/navy palette, a white header, left-aligned editorial headings, and genuine photographs already in the repository. The homepage uses a two-column introduction, service enquiries, published projects, company story, partners, and published news. About combines the mission/vision into a compact purpose section. Contact preserves the existing phone numbers, email and office-area description, with working phone/email/maps links.

Partner names/logos for UNICEF, Somaliland Development Fund, Ministry of Water Resources and Borama Municipality were explicitly confirmed as partners by the owner during this redesign. No funding roles, new impact figures, tariff/availability promises, or completion claims were inferred.

`/Projects` contains project-category records; `/Blog` contains news/publication records. Existing `/Blog/[id]` detail URLs are preserved for both, with the correct collection highlighted in navigation. Collections show honest loading, empty, filtered and error states; no sample projects appear in production. Titles, authors, dates, descriptions and Markdown bodies come from the published data service. Use authored headings for project location, purpose, work performed and verified status when publishing case studies; the UI does not fabricate absent metadata.

The public shell is independent of `/admin`. It uses accessible mobile navigation in a modal dialog, native form validation, clear submission feedback, and no decorative entrance animation. Search/type filters are reflected in the collection URL. The frontend introduces no backend resources or environment variables.
