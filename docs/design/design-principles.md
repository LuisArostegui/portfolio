# Design principles and visual direction

## 1. Purpose and scope

This document defines the conceptual visual and interaction direction for the portfolio. It guides later wireframes, design foundations, component specifications, responsive design and prototypes, and gives them a shared standard against which decisions can be reviewed.

The direction translates the accepted product goals and information structure into design principles while respecting the repository's architectural constraints. Product documentation determines what the portfolio must communicate; architecture decision records (ADRs) remain authoritative for how it may be implemented. Later design work must preserve both.

This is not a final visual design. It does not define final colours, typefaces, type scales, spacing values, layouts, grid dimensions, container widths, breakpoints, components, detailed states, animation timings or implementation. Those decisions remain with the milestones responsible for wireframes, foundations, components, responsive design and prototyping.

## 2. Intended professional impression

The portfolio should first communicate experienced frontend engineering, with React and TypeScript as the primary specialisation. Its visual system should reinforce technical judgement and production-quality standards: accessibility, testing, maintainability and architectural awareness should appear as normal parts of the work rather than optional claims.

The impression should be professional, confident, precise, modern and distinctive. Confidence should come from clear evidence and deliberate choices, not exaggerated self-promotion. A recognisable personal voice and a small number of memorable details should prevent the experience from feeling like a generic template while remaining approachable and credible.

One coherent visual system must serve every audience. Recruiters should gain quick clarity through positioning, summaries and obvious continuation paths. Engineering managers should find ownership, constraints and trade-offs. Engineers should be able to reach deeper artefacts and reasoning. Hierarchy and progressive disclosure should support these different reading depths without separate audience-specific modes or designs.

## 3. Design personality

| Attribute | Meaning and expression | Excess to avoid |
| --- | --- | --- |
| **Precise** | Alignment, hierarchy, terminology and interaction feedback should feel considered and consistent. | Sterility, microscopic decoration or complexity presented as rigour. |
| **Confident** | Direct positioning, decisive composition and legible contrast should let evidence speak clearly. | Loud claims, aggressive scale, false certainty or self-congratulatory effects. |
| **Editorial** | Pages should establish reading rhythm, narrative sequence and useful transitions between summary and detail. | Resembling a magazine at the expense of navigation or engineering evidence. |
| **Structured** | Grouping, spacing and relationships should make the content model apparent. | Dashboard chrome, a border around every item or rigid uniformity. |
| **Technically informed** | Relevant metadata, diagrams, code and engineering artefacts may clarify real decisions. | Fake code, terminal theatre or technology logos used as decoration. |
| **Restrained** | A limited visual vocabulary should give important content room and make emphasis meaningful. | Blandness, absent hierarchy or minimalism that removes useful context. |
| **Thoughtful** | Details should reflect visitor needs, content meaning, accessibility and implementation consequences. | Over-explaining ordinary interactions or polishing novelty before substance. |
| **Approachable** | Readable prose, clear labels and a human voice should make technical depth inviting. | Informality that weakens professional credibility or playful devices that distract. |

## 4. Design principles

### Clarity before spectacle

**Intent:** Make the role, specialisation, evidence, navigation and primary actions immediately understandable.

**Rationale:** Visitors have different expertise and limited attention. Effects that compete with the professional message undermine the portfolio's purpose.

**Practical implications:** Establish an obvious reading order, use plain labels and keep essential content visible. Add visual or interactive expression only when it strengthens comprehension, feedback or character.

### Evidence close to claims

**Intent:** Visually connect professional statements to the projects, decisions, responsibilities and quality practices that support them.

**Rationale:** Proximity makes claims easier to evaluate and reinforces an evidence-led professional position.

**Practical implications:** Pair concise claims with relevant context and clear paths to detail. Do not substitute technology logos, badge collections or decorative code for demonstrable evidence.

### Progressive depth within one experience

**Intent:** Let each visitor choose an appropriate level of technical depth without fragmenting the portfolio.

**Rationale:** Recruiters, engineering managers and engineers need different amounts of detail but should encounter the same accurate story.

**Practical implications:** Use summaries, supporting metadata, layered sections and deliberate continuation paths. Do not create separate recruiter and engineer versions.

### Technical character through structure

**Intent:** Express technical identity through disciplined typography, grids, alignment and meaningful engineering material.

**Rationale:** Structural precision communicates engineering practice more credibly than familiar developer-themed decoration.

**Practical implications:** Use diagrams, code excerpts, metadata and artefacts only where they explain a decision or outcome. Never use terminals, grids or diagrams as unrelated wallpaper.

### Distinctiveness through controlled decisions

**Intent:** Build a memorable identity from a small set of coherent choices.

**Rationale:** Typography character, rhythm, composition, restrained accents and interaction detail can create personality without visual noise.

**Practical implications:** Repeat purposeful patterns consistently and reserve emphasis for meaningful moments. Avoid accumulating effects merely to make each section look different.

### Accessible by design

**Intent:** Treat inclusive access as a constraint on every visual decision from the outset.

**Rationale:** Accessibility cannot be reliably added after hierarchy, colour, layout and interaction have already been fixed.

**Practical implications:** Design for sufficient contrast, visible focus, non-colour-dependent meaning, readable typography, clear targets, zoom, text resize, reflow and reduced-motion alternatives. Keep focus distinct from hover.

### Purposeful motion

**Intent:** Use motion only for feedback, orientation, continuity, hierarchy, progress, explanation or controlled brand expression.

**Rationale:** Motion is valuable when it clarifies change; otherwise it consumes attention, performance and accessibility headroom.

**Practical implications:** Ensure the experience remains meaningful and usable without animation. Keep motion brief and proportionate, respect reduced-motion preferences and preserve normal navigation.

### Responsive composition, not content removal

**Intent:** Preserve essential content, evidence, navigation and actions at every supported viewport.

**Rationale:** Narrow screens change available space, not the visitor's need for an equivalent professional account.

**Practical implications:** Adapt layout, density, alignment, media placement and grouping while retaining destinations and meaning. Avoid desktop-only relationships or mobile pages reduced to indistinguishable cards.

### Performance-aware expression

**Intent:** Keep visual ambition compatible with fast, resilient static-first delivery.

**Rationale:** Performance is part of production quality and directly affects comprehension, trust and accessibility.

**Practical implications:** Prefer efficient assets, resilient font loading, stable layout, modern CSS and minimal browser JavaScript. Do not introduce client-side frameworks or heavy animation systems solely for presentation.

## 5. Conceptual visual direction

The established direction is an editorial and technically informed professional portfolio with a sophisticated neutral foundation, strong typographic hierarchy, controlled contrast, deliberate spacing and technical details used as evidence rather than decoration. It should be content-led, expressive without noise and personal without becoming informal.

### Visual hierarchy

Positioning, evidence, supporting context, metadata and secondary information should have clearly different weight. Headings and deliberate grouping should expose the narrative, while primary actions remain visible without overwhelming it. Technical metadata should support—not outrank—the project problem, role and professional relevance.

### Composition

Composition should feel editorial rather than dashboard-like. A stable reading column can combine with wider regions when project evidence benefits from space. Controlled asymmetry may add character if reading order remains unambiguous. Alignment and spatial relationships should appear intentional, without filling every available area with cards. Final grid dimensions remain undecided.

### Content density

Overview pages should be concise and scannable; project and case-study pages may carry greater depth. Dense technical material should be divided into meaningful groups rather than fragmented into many interchangeable cards, badges or pills.

### Whitespace

Whitespace should establish hierarchy, rhythm and separation. Generous space must remain purposeful rather than making pages feel empty or slow. Responsive designs may compress it while retaining clarity and avoiding cramped presentation. Spacing-token values are deferred.

### Typography character

Typography should be contemporary, highly readable and credible across short professional summaries and long-form technical material. Headings may carry more character than body copy. Monospaced text may identify code, metadata, identifiers or small technical annotations, but must not become the body style or a superficial developer aesthetic. Final typefaces and scale values are deferred.

### Role of colour

Design exploration should begin from a sophisticated neutral foundation. Accent colour may be used selectively for actions, focus, current state, meaningful emphasis or controlled brand expression. Hierarchy should not require many accents, and colour must never be the only communication channel. A dark presentation, if later selected, must still provide legible contrast. No colour names, values or tokens are established here.

### Surfaces and borders

Surfaces, tonal shifts, borders and spacing should clarify relationships only when necessary. Prefer subtle separation over wrapping every item in a heavy card. Avoid excessive elevation, glass effects, glowing borders and interchangeable rounded containers; structure should remain understandable without visual clutter.

### Imagery and graphical elements

Imagery should contribute evidence, context, explanation or measured personality. Suitable directions include public-safe project media, diagrams, workflows, carefully designed illustrations and recreated technical artefacts. Decorative graphics should be limited and secondary. Stock photography and generic abstract 3D objects are not required, and this issue adds no third-party assets.

### Technical visual motifs

Architecture diagrams, code fragments, repository activity, pull-request or issue structures, testing evidence, typed contracts, terminal output, development workflows, structured metadata and subtle grid or measurement details are potential motifs. Each must substantiate a professional point. Decorative fake code, meaningless commands, binary backgrounds, Matrix-style effects and repeated technology icons are excluded.

### Project and engineering evidence

Project presentations should lead with the problem, context, role and relevance. Technical decisions and trade-offs form a deliberate secondary layer, with technologies supporting the story rather than dominating it. Evidence should be integrated into the narrative instead of isolated in a logo wall. Previews and detailed case studies should remain related while using appropriately different density.

### Interaction feedback

Where applicable, interactive elements should visibly distinguish hover, focus, active, selected, current, expanded, loading, success and error states. Focus must remain distinguishable from hover; feedback should be immediate, proportionate and not dependent only on colour or motion. Detailed component specifications are deferred.

### Responsive adaptation

Equivalent destinations and content should remain available across viewport sizes. Typography, spacing, grouping, media placement and composition may adapt fluidly. Technical diagrams, code, tables and long text must remain understandable on narrow screens. Exact breakpoints and device-specific layouts are deferred.

## 6. Visual references

These references are studied for principles and qualities. They must not be combined into a visual collage, treated as templates or used to copy identities, layouts or assets. No screenshots, logos, moodboards or third-party files are introduced.

### Linear

**Source:** [Behind the latest design refresh](https://linear.app/now/behind-the-latest-design-refresh) and [How we redesigned the Linear UI](https://linear.app/now/how-we-redesigned-the-linear-ui).

**Relevant qualities:** Controlled hierarchy and density; neutral, timeless surfaces; reduced visual noise; restrained separators; precise alignment; and structure legible without excessive chrome.

**Potential lessons:** Use contrast and spacing to clarify relationships, reduce unnecessary icons and treatments, and test decisions across different content densities without wrapping every element.

**What must not be copied:** Linear's application chrome, sidebar-heavy layouts, exact dark theme, gradients, typography, icons, brand identity or product-level density.

### Vercel Geist

**Source:** [Geist introduction](https://vercel.com/geist/introduction), [Geist grid](https://vercel.com/geist/grid) and [Vercel font](https://vercel.com/font).

**Relevant qualities:** Grid discipline, high contrast, precise typography, a developer-oriented language, functional minimalism and controlled mono or technical detail.

**Potential lessons:** Create recognisable technical character through typography and alignment, use grid motifs sparingly and maintain hierarchy with a limited visual vocabulary.

**What must not be copied:** Vercel's black-and-white identity, triangle symbol, exact grids, marketing compositions or brand-specific choices. Geist is not automatically selected as the final typeface.

### Rauno Freiberg

**Source:** [Rauno Freiberg](https://rauno.me/), [Novelty](https://rauno.me/craft/novelty) and [Vercel](https://rauno.me/craft/vercel).

**Relevant qualities:** Personal identity beyond standard portfolio sections, precise interaction detail, purposeful restraint, visible implementation quality and a balance of speed, beauty, consistency and character.

**Potential lessons:** Use few memorable details, make interaction quality visible without overwhelming content, retain a personal voice and treat novelty as a limited resource.

**What must not be copied:** Experimental navigation, dense interaction, hidden or unconventional discovery, structures designed for an interaction designer, or effects requiring unnecessary JavaScript or explanation.

### Josh W. Comeau

**Source:** [Josh W. Comeau](https://www.joshwcomeau.com/) and [How to build an effective portfolio](https://www.joshwcomeau.com/effective-portfolio/).

**Relevant qualities:** Editorial readability, progressive technical depth, an approachable voice, strong long-form presentation, explanatory interaction and clear continuation paths.

**Potential lessons:** Make technical material inviting, support substantial project narratives, combine professional credibility with personality and guide visitors towards deeper evidence.

**What must not be copied:** The highly playful illustration language, tutorial-site navigation and volume, decorative interaction density, personal brand voice or teaching-oriented structures that do not support recruitment.

## 7. Visual and interaction anti-patterns

The following patterns conflict with an evidence-led, accessible and production-minded portfolio:

- Generic developer-portfolio templates and copied layouts, identities, illustrations or assets weaken credibility and personal relevance.
- Skill-logo walls, arbitrary percentages, ratings and progress bars make ungrounded claims instead of showing evidence.
- Fake terminal windows, decorative code, meaningless commands and repeated technology icons turn technical practice into costume.
- Excessive cards, pills, gradients, glows, blur, glassmorphism, shadows or borders flatten hierarchy and create visual noise.
- Large irrelevant 3D assets, particles and continuous decorative backgrounds consume attention and performance without professional value.
- Custom cursors, typewriter hero text, scroll hijacking, parallax and automatic carousels interfere with familiar controls, reading and navigation.
- Site-wide reveal-on-scroll and long staggered entrances delay content and can make the page depend on animation.
- Content hidden until JavaScript executes contradicts static-first delivery and progressive enhancement.
- Low-contrast dark themes, colour-only meaning, icon-only actions without accessible names and hover-only information exclude visitors.
- Desktop-only composition fails to preserve equivalent access across devices.
- Disconnected visual experiments make the work resemble an interaction showcase or SaaS landing page rather than a professional engineering portfolio.

## 8. Accessibility principles

The implemented portfolio targets WCAG 2.2 Level AA, but this conceptual document does not itself establish conformance. Design work should provide meaningful hierarchy and reading order, readable text sizing and line lengths, and sufficient contrast for text and meaningful non-text elements.

Keyboard focus must be visible and must not be removed for visual polish. Meaning, labels and states must remain understandable without colour; controls need clear names, states and adequate targets. Content cannot depend on hover or be hidden behind an interaction, and essential meaning must survive without animation.

Layouts should support browser zoom, text resize, reflow and useful portrait and landscape presentation. Meaningful images need appropriate alternatives, and diagrams need textual equivalents that communicate the same essential information. Reduced-motion preferences require designed alternatives rather than merely faster animation.

Accessibility validation must combine automation with manual review of keyboard use, focus, reading order, assistive-technology output, contrast, zoom, resize, reflow, orientation, motion and touch interaction. Automated success alone cannot prove conformance.

## 9. Performance and implementation awareness

Visual decisions must remain compatible with static-first rendering and meaningful content before hydration. Client-side JavaScript should be minimal, and React islands must not be introduced solely for presentation or animation.

Images should use responsive sizing and suitable formats, with media included selectively. Font choices must account for loading, fallbacks and layout stability; unnecessary families and weights should be avoided. Design should avoid heavy filters, continuous painting, expensive scroll behaviour, avoidable layout shifts and large animation libraries without a feature-specific requirement.

The accepted implementation direction supports modern CSS, scoped Astro styles, CSS Modules, custom properties, intrinsic layout, media queries and container queries. These capabilities should be preferred where appropriate, without this document prescribing code or configuration. Performance must ultimately be measured against production output rather than assumed from design intent.

## 10. Motion principles

In alignment with ADR 0003, motion may support feedback, orientation, continuity, hierarchy, progress, explanation, comprehension of change and limited brand expression. It must remain a progressive enhancement: normal navigation, visible content and core meaning cannot depend on it.

Motion should be brief and proportionate, must not hide or delay content, and cannot be the only communication channel. The design must respect `prefers-reduced-motion` and provide an intentional reduced-motion alternative. Native CSS, View Transitions or the Web Animations API may be used according to the accepted architecture; static Astro presentation must not become React solely for animation.

Durations, easing values, distances and choreography are deferred.

## 11. Established direction and deferred decisions

### Established by this document

- The intended professional impression and focused design personality.
- An editorial and technically informed direction.
- Principles for hierarchy, density, whitespace and progressive depth.
- A conceptual neutral foundation with controlled accents.
- Restrained surfaces and evidence-oriented imagery and technical motifs.
- Accessibility principles and performance-aware visual decision-making.
- Purposeful, progressively enhanced motion.
- Preservation of content and actions through responsive adaptation.
- Explicit visual and interaction anti-patterns.
- Lessons from the four references and clear copying boundaries.

### Deferred

- Final palette and colour-token values.
- Selected typefaces, type scale and spacing scale.
- Grid measurements, container widths and breakpoints.
- Component inventory, variants and detailed states.
- Final project-card design and navigation interaction.
- Exact imagery, illustrations, icons, logo or personal mark.
- Motion tokens and animation choreography.
- Wireframes, prototypes and Figma resources.
- Application implementation.

The relevant later milestone issues should evaluate and make these decisions within the constraints above. Their inclusion here neither pre-authorises a particular outcome nor turns a possible direction into an approved implementation.

## 12. Review checklist

- [ ] Is the professional positioning immediately understandable?
- [ ] Is evidence more prominent than technology decoration?
- [ ] Does one coherent experience support every audience through progressive depth?
- [ ] Does the content hierarchy work without animation?
- [ ] Does each technical motif explain something real?
- [ ] Are accessibility constraints visible in the design?
- [ ] Are focus and applicable interaction states considered?
- [ ] Does mobile retain equivalent content, destinations and actions?
- [ ] Is density appropriate to the content and reading context?
- [ ] Is the result free from a dominant generic-template pattern?
- [ ] Have reference principles been interpreted without copying a reference?
- [ ] Are visual decisions feasible under the accepted architecture?
- [ ] Do unresolved visual values remain explicitly deferred?

## 13. Related documentation

- [Product vision](../product/product-vision.md)
- [Information architecture](../product/information-architecture.md)
- [Content strategy](../product/content-strategy.md)
- [Product success criteria](../product/product-success-criteria.md)
- [High-level architecture](../architecture/high-level-architecture.md)
- [Architecture decision records](../architecture/decisions/README.md)
- [ADR 0001: Use Astro as the primary frontend framework](../architecture/decisions/0001-use-astro-as-the-primary-frontend-framework.md)
- [ADR 0002: Use modern CSS as the primary styling strategy](../architecture/decisions/0002-use-modern-css-as-the-primary-styling-strategy.md)
- [ADR 0003: Use a native-first, purpose-driven animation strategy](../architecture/decisions/0003-use-a-native-first-purpose-driven-animation-strategy.md)
- [ADR 0004: Use Git-versioned Astro Content Collections](../architecture/decisions/0004-use-git-versioned-astro-content-collections.md)
- [ADR 0005: Use Cloudflare Workers Static Assets for hosting](../architecture/decisions/0005-use-cloudflare-workers-static-assets-for-hosting.md)
- [ADR 0006: Use a pragmatic, risk-based testing strategy](../architecture/decisions/0006-use-a-pragmatic-risk-based-testing-strategy.md)
