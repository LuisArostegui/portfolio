# Content strategy

## 1. Purpose

This content strategy translates the [product vision](product-vision.md) and [information architecture](information-architecture.md) into rules for selecting, structuring, writing, reviewing, and maintaining professional information. It is intended to:

- Keep content accurate and credible.
- Communicate professional value quickly.
- Provide deeper technical evidence when appropriate.
- Support technical and non-technical audiences.
- Avoid generic responsibility lists.
- Prevent confidential or unsupported claims.
- Make future content creation consistent.
- Reduce duplication between pages.

This document defines writing rules and reusable content structures. It does not provide final portfolio copy, completed experience entries, or finished case studies.

## 2. Content goals

Portfolio content should:

- Make my role and specialisation understandable within a few seconds.
- Show professional capabilities through evidence and context.
- Demonstrate technical reasoning, not only familiarity with technologies.
- Explain relevant complexity without exposing confidential information.
- Help recruiters understand my relevance quickly.
- Help technical evaluators assess my engineering judgment.
- Present a coherent professional narrative.
- Encourage visitors to review projects, experience, my CV, professional profiles, or contact options.

## 3. Content principles

### Evidence over claims

Statements about skills and strengths should be supported by experience, projects, decisions, responsibilities, or observable repository practices.

Avoid unsupported claims such as:

- “Expert in React.”
- “World-class developer.”
- “Exceptional problem solver.”
- “Highly scalable architecture.”

Prefer factual descriptions such as:

- “Designed reusable React components for dynamic form flows.”
- “Introduced typed boundaries that reduced ambiguity between form configuration and rendering.”
- “Applied automated testing to protect complex user journeys.”

### Context before technology

Describe the problem, product context, constraints, and responsibility before listing tools. Technology should explain how the work was approached, not act as the main story.

### Contribution over job description

Focus on what I personally contributed, influenced, improved, designed, coordinated, investigated, or delivered. Do not copy generic responsibilities from a job description.

### Decisions and trade-offs

Where relevant, explain why a decision was needed, which constraints affected it, which alternatives were considered, what trade-off was accepted, and what the decision enabled.

### Outcomes without exaggeration

Describe observable consequences accurately, even when exact business metrics cannot be published. Do not infer impact that cannot be supported.

### Concision with optional depth

Keep summaries concise and provide deeper information through project details, case studies, or technical documentation.

### Clear ownership

Use precise language to distinguish individual work, collaborative work, team ownership, organisation-wide initiatives, and decisions I influenced but did not own alone.

### Maintainable content

Content should be easy to update as my experience changes. Avoid statements tied unnecessarily to temporary circumstances.

### Public-safe by default

Professional content must be safe to publish before it is considered complete. Confidentiality review is part of content creation, not a later correction.

### Professional source of truth

The private CV knowledge base is the internal source of truth for confirmed career information, detailed project knowledge, CV material, and interview evidence. Confirmed facts within that knowledge base take precedence when assessing technologies, responsibilities, proficiency, scope, and ownership.

Significant professional claims should be traceable internally to confirmed facts, project knowledge, or another approved source, even when that source is not exposed publicly. Professional interpretations and lessons must be reasonable conclusions from confirmed experience and must not introduce unsupported facts.

Use it to verify and select portfolio content, subject to these rules:

- Do not introduce claims that contradict confirmed professional evidence.
- Do not convert unresolved details into confirmed portfolio claims.
- Do not expose the private repository, internal notes, unresolved questions, or confidential material.
- Do not copy all CV content into the portfolio.
- Select and adapt only information that supports the portfolio product vision.
- Keep public portfolio content independently understandable and safe to publish.
- Do not use the private knowledge base as public visitor evidence.

The private knowledge base preserves the complete professional record; the portfolio presents a selected, public-safe narrative.

## 4. Tone of voice

The tone should be:

- Professional.
- Direct.
- Clear.
- Technically credible.
- Confident without being arrogant.
- Specific without becoming unnecessarily verbose.
- Human without becoming informal.
- Honest about scope, ownership, and limitations.

The writing should sound like a professional software engineer explaining their work clearly and accurately, not like a marketing campaign, generic LinkedIn summary, copied job description, keyword collection, academic paper, or exaggerated personal brand.

Use first person where it makes ownership clearer. Prefer active constructions such as “I designed…”, “I contributed…”, “I coordinated…”, “I proposed…”, and “I implemented…”. Use collaborative wording when appropriate, including “I worked with…”, “The team introduced…”, “I contributed to…”, and “I helped define…”. Do not use collective language to claim work completed primarily by others.

## 5. Writing style rules

- Use short or medium-length paragraphs.
- Use descriptive headings.
- Prefer concrete verbs.
- Avoid unnecessary adjectives.
- Explain acronyms or domain terms when the intended audience may not know them.
- Avoid jargon when a clearer term exists.
- Use bullet points only when they improve scanning.
- Keep technology lists subordinate to professional context.
- Avoid repeating the same professional positioning on every page.
- Link summaries to canonical detailed content.
- Use consistent English spelling throughout the portfolio.

Use British English, consistent with the existing documentation: `specialised`, `organised`, `prioritise`, `localisation`, and `authorised`. Do not mix British and American spelling.

## 6. Professional positioning rules

The primary positioning is:

> Frontend Engineer specialised in React and TypeScript, with experience contributing across the wider software stack when required.

Apply these rules:

- Keep frontend engineering as my primary specialisation.
- Make React and TypeScript visible early.
- Present wider full-stack experience as relevant professional breadth.
- Do not present frontend and backend as equal current specialisations.
- Emphasise engineering practices, product understanding, quality, and technical reasoning.
- Avoid reducing my profile to framework knowledge or presenting me only as a UI implementer.
- Do not use seniority labels beyond what current evidence and professional history support.
- Use the Technical Lead title only when it accurately reflects the formal or documented context. Otherwise, describe the specific technical leadership responsibilities without implying a permanent formal title.
- Do not position me as a visual designer, generic full-stack expert, AI engineer, freelance service provider, or specialist in an area without supporting evidence.

## 7. Home-page content guidelines

These guidelines follow the ordered home-page sections defined in the [information architecture](information-architecture.md).

### Hero and professional positioning

Communicate my name, current professional role, main specialisation, concise value proposition, and one or two primary actions. Do not include a long biography, complete skill list, or full career history.

A useful structure is:

```text
Role and specialisation
+ professional value
+ evidence-oriented supporting statement
+ primary action
```

This structure is guidance, not final hero copy.

### Professional summary

Briefly explain my main area of experience, the types of products or environments in which I have worked, my main engineering values, and relevant broader-stack experience. Target approximately one concise paragraph or two short paragraphs in the eventual content.

### Selected projects

Each preview should communicate the project name, a one-sentence purpose or problem, my role, its main engineering relevance, and a link to the project detail. Do not overload previews with every technology or technical decision.

### Engineering strengths

Present strengths as capabilities supported by evidence, not as an icon grid of technologies. Suitable capability groups include:

- Frontend architecture.
- Type-safe application development.
- Accessibility and inclusive interaction.
- Testing and delivery confidence.
- Complex forms and user journeys.
- Maintainable component systems.
- Product and domain reasoning.
- Cross-team engineering improvements.

### Selected experience

Show only enough context to establish professional relevance and encourage deeper reading. Do not reproduce the complete Experience page.

### Engineering process

Explain how the repository demonstrates planning, documentation, architectural decisions, pull-request practices, testing, automation, and quality controls. Avoid presenting process as bureaucracy; connect each practice to quality, maintainability, confidence, or decision traceability.

### Contact content

Keep contact language direct and professional. Avoid enthusiastic sales language, freelance-service language, promises of immediate availability, and unnecessary personal information.

## 8. Professional experience entry guidelines

Use a content model equivalent to:

```markdown
## Role — Organisation

**Period:** Start date – End date or Present  
**Context:** Short description of the product, domain, or team context.  
**Focus:** Main professional responsibilities or area of contribution.

### Selected contributions

- Contribution written as action + context + professional relevance.
- Contribution written as action + decision or challenge + outcome.
- Contribution written as collaboration or wider initiative where relevant.

### Capabilities demonstrated

- Relevant capability.
- Relevant capability.
- Relevant capability.
```

The eventual presentation may differ, but each entry should explain the role and period, public-safe organisational or product context, scope of responsibility, selected contributions, relevant complexity or constraints, collaboration or ownership, demonstrated capabilities, and outcomes that can be stated accurately.

Apply these rules:

- Do not copy the CV verbatim or list every task performed.
- Prefer three to six meaningful contributions.
- Separate routine responsibilities from distinctive contributions.
- Use present tense for current ongoing responsibilities and past tense for completed work.
- Avoid internal project names and confidential customer, transaction, infrastructure, or business details.
- Avoid unsupported claims of leadership or sole ownership.
- Explain cross-team work factually.
- Distinguish between implementation, contribution, proposal, coordination, and ownership.

## 9. Contribution-writing formula

Use this reusable formula:

```text
Action
+ relevant context or challenge
+ engineering approach or decision
+ observable result or value
```

Structural example, not approved final portfolio copy:

> Designed a reusable configuration-driven form architecture for complex onboarding flows, separating domain configuration from UI rendering to improve extensibility and consistency across variants.

Less effective:

> Worked on dynamic forms using React and TypeScript.

More effective:

> Contributed to dynamic onboarding forms by defining typed configuration boundaries and reusable rendering patterns for multiple product variants.

Start with a concrete verb, include why the work mattered, and explain relevant complexity. Mention technology only when it clarifies the approach. Include a supported outcome when possible, but do not force one into every statement.

## 10. Skills and capabilities strategy

Group skills by capability rather than presenting one undifferentiated technology list.

### Frontend engineering

May include React, TypeScript, component architecture, state and form management, complex user flows, and responsive and semantic interfaces.

### Software quality

May include automated testing, maintainability, refactoring, static analysis, code review, and quality gates.

### Accessibility

May include semantic interaction, keyboard support, focus management, accessible forms, screen-reader considerations, and inclusive component behaviour.

### Architecture and design

May include modular boundaries, extensible component systems, typed contracts, separation of concerns, architectural decision records, and hexagonal or layered reasoning where evidence supports it.

### Wider software stack

May include Node.js, Express, APIs, PostgreSQL, backend and persistence collaboration, and understanding of frontend-backend boundaries.

### Product and collaboration

May include domain reasoning, requirement clarification, cross-team initiatives, technical coordination, documentation, and trade-off communication.

Apply these rules:

- Support every prominent skill with evidence elsewhere in the portfolio.
- Do not use proficiency percentages, star ratings, progress bars, or arbitrary levels.
- Do not list technologies used only superficially or imply current expertise from old or limited exposure.
- Distinguish current professional experience, previous professional experience, and limited familiarity through wording and supporting evidence rather than numerical proficiency levels.
- Make capability names more prominent than tool names.
- Link skills to supporting experience or projects where useful.
- Use wider-stack experience to support, not compete with, the primary frontend positioning.

## 11. Project-summary structure

Use a model equivalent to:

```markdown
## Project name

**Purpose:** One concise sentence explaining the problem or user need.  
**Role:** My role or ownership.  
**Professional relevance:** Why the project demonstrates relevant engineering capability.  
**Key capabilities:** Three to five relevant capabilities or technologies.  
**Status:** Current state when relevant.
```

The rendered summary may be shorter, but it should answer what the project is, who it is for, which problem it addresses, what my role was, why it is relevant to the portfolio, and where deeper evidence can be found.

Apply these rules:

- Lead with the problem or value, not the framework.
- Avoid summaries such as “A React app built with TypeScript.”
- Use technologies only to clarify the engineering approach.
- Keep project previews concise.
- Do not claim production usage, scale, adoption, or impact without evidence.
- Distinguish clearly between completed, active, experimental, and planned projects.
- Do not present a tutorial or copied project as original professional evidence.
- Do not create a detail page unless credible content exists.

## 12. Technical case-study structure

Use this scalable structure:

```markdown
# Project or case-study title

## Summary

A concise overview of the project, problem, role, and professional relevance.

## Problem

Explain the user, product, or engineering problem.

## Context

Describe the relevant product, domain, users, and project situation using public-safe information.

## Constraints

Describe relevant limitations, such as existing architecture, compatibility,
accessibility, delivery, regulatory or domain constraints, team boundaries,
and confidentiality limitations.

## Role and responsibilities

Explain my actual contribution and level of ownership.

## Goals

Define what the work intended to achieve.

## Decisions and trade-offs

For each important decision, explain the decision, why it was needed,
alternatives considered when known, trade-offs, and consequences.

## Implementation approach

Describe the engineering approach at an appropriate, public-safe level. This may
cover architecture, data flow, component boundaries, typing, testing,
accessibility, integration, and delivery.

## Quality strategy

Explain relevant testing, accessibility validation, static analysis, review,
incremental migration, quality gates, or public-safe monitoring practices.

## Outcome

Describe supported technical, product, team, or delivery outcomes.

## Lessons learned

Explain what worked, what was difficult, what I would change, and which principles
are reusable.

## Evidence

Link to public-safe repositories, demonstrations, documentation, ADRs, tests,
screenshots, or articles.
```

Not every case study needs equal length. Its depth should reflect the evidence and complexity available, while retaining Problem, Context, Constraints, Role, Decisions, Implementation, Outcome, and Lessons learned. Never expose confidential source code or proprietary implementation details.

## 13. Outcome-writing guidelines

Outcomes may be product, user-experience, engineering, team, delivery, or learning outcomes. Use exact metrics only when they are accurate, public, attributable, non-confidential, and supported by evidence. Otherwise, use precise qualitative outcomes.

Suitable patterns include:

- Enabled reuse across multiple product variants.
- Reduced duplication in the affected implementation.
- Improved consistency between related flows.
- Made future changes safer through automated coverage.
- Established a shared migration path across teams.
- Improved keyboard and assistive-technology behaviour.
- Clarified ownership or architectural boundaries.
- Reduced the risk of inconsistent implementations.
- Supported incremental adoption without requiring a full rewrite.

Avoid vague, unsupported statements such as “significantly improved performance”, “dramatically increased productivity”, “greatly enhanced user satisfaction”, “reduced development time by a large amount”, “scaled seamlessly”, or “delivered major business impact”.

When attribution is shared, use language such as “Contributed to…”, “Helped enable…”, “Supported…”, “Worked with the team to…”, or “Participated in…”. Do not imply causation when only correlation or contribution can be supported.

## 14. Confidentiality and public-safety rules

### Never publish

- Source code owned by an employer or client.
- Private repositories or internal URLs.
- Credentials, tokens, secrets, or environment configuration.
- Customer, user, transaction, or account data.
- Internal screenshots.
- Internal project, platform, service, or team names when not public.
- Security architecture details or private infrastructure information.
- Non-public metrics, roadmaps, incidents, or vulnerabilities.
- Internal documentation.
- Non-public commercial or regulatory information.
- Names or information about colleagues without permission.

### Publish only when already public and relevant

- Employer names.
- Public product names.
- Publicly documented technologies.
- Public company information.
- Public responsibilities already present in an approved CV or profile.

Public availability permits consideration; it does not make information automatically relevant.

### Safe abstraction techniques

Use generic domain descriptions, anonymised project descriptions, relative scale instead of private numbers, architectural patterns instead of proprietary implementation, public-safe diagrams recreated from first principles, and generalised challenges and constraints. Describe my contribution without exposing internal context.

Unsafe:

> Migrated the internal X platform used by Y million customers from private system A to system B.

Safer structural example:

> Contributed to a cross-team migration of shared frontend infrastructure in a large production environment, using incremental adoption to reduce delivery risk.

All content based on employer work must receive a confidentiality review before publication.

## 15. Content review checklist

Apply this checklist before publishing professional content.

### Accuracy

- Is every factual statement true?
- Is the role or ownership represented correctly?
- Is the technology description accurate?
- Is the time period correct?
- Can every stated outcome be supported?

### Confidentiality

- Does the content expose internal names, systems, private metrics, implementation, or security details?
- Does it contain unauthorised screenshots, code, or colleague information?
- Could someone infer confidential business information from the description?

### Clarity

- Is the problem understandable before the solution?
- Is jargon explained where necessary?
- Is my contribution distinct from the team's broader work?
- Is the content concise enough for its location?
- Does it link to deeper content instead of duplicating it?

### Positioning

- Does the content support the frontend-specialist positioning?
- Does wider-stack experience appear as relevant breadth?
- Does it demonstrate engineering practice rather than only tools?
- Does it avoid inflated seniority or expertise?
- Is evidence close to the claim?

### Quality

- Does the content explain meaningful decisions or constraints?
- Are outcomes accurate and proportionate?
- Is British English used consistently?
- Are headings and terminology consistent?
- Is the content still current?

## 16. Explicit content exclusions

The portfolio should not contain:

- Confidential employer or client information.
- Full reproductions of internal professional projects.
- Generic job-description responsibility lists.
- Unsupported performance or business metrics.
- Inflated seniority.
- Arbitrary skill ratings.
- Technology logo walls without context.
- Exhaustive lists of every tool ever used.
- Personal lifestyle content unrelated to professional positioning.
- Political or controversial personal content unrelated to the product purpose.
- Salary expectations, private contact information, a personal address, or sensitive personal data.
- Testimonials without explicit permission.
- Freelance pricing or sales packages.
- AI-generated claims that have not been manually verified.
- Empty project pages or placeholder case studies.
- Content copied from employers, documentation, other portfolios, or job descriptions.
- Continuous-blog commitments before a sustainable publishing need exists.

## 17. Language strategy

The MVP content and repository documentation should be written in English because the intended professional audience includes international recruiters, engineering managers, and companies; English supports wider accessibility across the software industry; and the existing product documentation already uses English. A single initial language also avoids maintaining duplicate content before a real localisation need exists.

Apply these rules:

- Use clear international English with consistent British spelling.
- Avoid idioms, culture-specific humour, and unnecessarily complex vocabulary.
- Explain domain-specific terms.
- Do not mix English and Spanish within the same content surface.
- Keep the CV and external profiles consistent with the portfolio language where practical.
- Introduce Spanish localisation only when audience needs justify it.
- Do not begin localisation through manually duplicated pages without a maintenance strategy.
- Preserve meaning and professional positioning in future translations rather than translating wording mechanically.

Do not introduce `/es` routes or translation infrastructure as part of this strategy.

## 18. Content ownership by page

This ownership follows the [information architecture](information-architecture.md).

### Home

Owns concise professional positioning, selected evidence, a short professional summary, project previews, an experience preview, the contact destination, and an engineering-process overview.

### Experience

Owns detailed professional history, responsibilities, contributions, professional growth, and public-safe work context.

### Projects index

Owns curated project summaries, comparison and discovery, and links to detail pages.

### Project detail

Owns detailed project evidence, case-study narrative, decisions, trade-offs, implementation, outcomes, and lessons learned.

### About

Owns engineering values, working approach, professional direction, and relevant personal context. It may initially exist as a Home section.

### Contact

Owns professional contact channels and external professional links where appropriate. It may initially exist as a Home section.

Do not duplicate full content across surfaces. Use summaries and links to canonical content, avoid slightly different versions of the same professional claim, and keep technology and capability terminology consistent.

## 19. Content maintenance

Review portfolio content:

- After significant role changes.
- After completing a relevant project.
- When a technology or capability is no longer representative.
- Before major job applications.
- When public evidence changes or becomes unavailable.
- When confidentiality conditions change.
- Periodically, to remove stale claims or broken links.

Professional portfolio content should be reviewed against the private CV knowledge base whenever confirmed experience, responsibilities, skills, or evidence are updated.

Prefer stable dates and explicit periods over relative wording such as “currently”, “recently”, or “for several years” when those expressions could become outdated or ambiguous.

Each content item should remain accurate, relevant, supported, public-safe, and consistent with current positioning. No arbitrary publication schedule is required.

## 20. Decision boundaries

This document does not decide:

- Final portfolio copy.
- Final project selection.
- Exact case-study content.
- Visual layout or typography.
- Component design.
- CMS or content storage format.
- Translation framework.
- SEO implementation.
- Analytics.
- Contact-form implementation.
- Detailed legal copy.
- Publication schedule.

Those decisions belong to later content, design, architecture, implementation, and legal tasks.
