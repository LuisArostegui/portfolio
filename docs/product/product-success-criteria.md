# Product success criteria

## 1. Purpose

This document translates the [product vision](product-vision.md), [information architecture](information-architecture.md), and [content strategy](content-strategy.md) into verifiable success criteria. It is intended to:

- Guide future design and implementation decisions.
- Define what “ready” means for the MVP.
- Support consistent acceptance testing.
- Prioritise meaningful product and engineering outcomes.
- Avoid vanity metrics and premature traffic targets.
- Separate launch requirements from later optimisation goals.

It defines success criteria, not implementation details or final test cases.

## 2. Success framework

### MVP launch criteria

Conditions that must be satisfied before the first public production release. Failure of a required launch criterion prevents release unless a documented product decision changes its scope.

### Post-launch validation

Checks performed after release to confirm that representative visitors understand and can use the product in practice. Findings inform prioritised improvements without redefining the completed launch retrospectively.

### Future enhancement objectives

Potential improvements that are valuable but are not required for MVP launch. A future objective must not silently become an MVP requirement without a documented product decision.

## 3. Verification levels

Each criterion uses one of these levels:

- **Required:** Must pass before MVP release.
- **Conditional:** Must pass only if the associated capability exists in the MVP.
- **Future:** Not required for the MVP.

Verification methods are:

- **Automated:** Repeatable checks performed by tooling.
- **Manual:** Documented human inspection or task execution.
- **Structured user validation:** Representative people complete tasks or answer comprehension questions without coaching.
- **Content review:** Accuracy, ownership, positioning, confidentiality, and completeness are reviewed against approved sources.
- **Production observation:** Deployed behaviour or field data is examined after release.

Every criterion identifies at least one method. Automated evidence may support, but does not replace, manual or user validation where human comprehension or interaction is the outcome.

## 4. Product communication criteria

### Role and specialisation comprehension

**Level:** Required.  
**Verification:** Structured user validation.

A visitor reviewing the initial home-page content should be able to identify:

- Me as a Frontend Engineer.
- React and TypeScript as my primary technical specialisation.
- Engineering quality, accessibility, testing, maintainability, and product reasoning as central themes.
- Wider-stack experience as supporting breadth rather than an equal primary specialisation.

Conduct structured comprehension checks with at least three representative reviewers covering recruiter or non-specialist, engineering-manager, and software-engineer perspectives. Show the initial home-page content without additional verbal explanation and ask each reviewer to describe my professional role and strongest capabilities in their own words.

The criterion passes when responses consistently reflect the intended positioning and do not primarily describe me as a designer, generic full-stack engineer, backend specialist, AI engineer, or freelancer. Do not impose an arbitrary reading-time target; validate the first impression from the initial content instead.

### Professional differentiation

**Level:** Required.  
**Verification:** Content review and manual link review.

Home and supporting content must communicate at least three evidence-supported differentiators, chosen from relevant strengths such as React and TypeScript foundations, component architecture and strict typing, accessibility-aware engineering, automated testing and delivery confidence, complex production systems, technical reasoning, and cross-team improvements.

Each prominent differentiator must correspond or link to experience, project evidence, case-study material, or observable repository practice. Unsupported adjectives or skill claims fail this criterion.

### Consistency of positioning

**Level:** Required.  
**Verification:** Content review.

Positioning must remain consistent across Home, Experience, Projects, About content, and CV access or public professional profiles where practical. Review these surfaces against the product vision and content strategy. No surface should present frontend and backend as equal current specialisations unless the product vision is formally changed.

## 5. Visitor-action criteria

### Review selected work

**Level:** Required.  
**Verification:** Manual desktop and mobile journey testing.

Visitors must be able to discover selected projects from Home, reach the Projects index, open at least one credible project detail or case study, and continue to the project collection or another relevant destination. Dead ends, empty detail pages, and placeholder evidence fail this criterion.

### Understand professional experience

**Level:** Required.  
**Verification:** Manual content and navigation review.

Visitors must be able to reach detailed Experience content, distinguish professional trajectory from project evidence, and understand the relationship between responsibilities, contributions, and capabilities. Experience must not be only a duplicated CV timeline or generic task list.

### Access CV and professional profiles

**Level:** Required.  
**Verification:** Manual link testing and automated external-link checking where practical.

Visitors must be able to locate and activate CV, GitHub, and LinkedIn access. Downloadable resources must exist in the expected format and have a clear link purpose.

### Make professional contact

**Level:** Required.  
**Verification:** Manual desktop, mobile, and keyboard journey testing.

Visitors must be able to identify at least one appropriate professional contact method. Contact must remain accessible whether it is implemented as a Home section or dedicated page.

### No analytics requirement for MVP

Click-through rate, contact conversion, session duration, bounce rate, and visitor volume are not MVP success criteria. They may become post-launch observations only after real traffic exists and a privacy-compliant analytics strategy has been approved.

## 6. Visitor comprehension criteria

### Recruiter comprehension

A recruiter or non-specialist reviewer should be able to identify my current role and primary specialisation, main professional value, relevant experience, CV location, and contact path.

### Engineering-manager comprehension

An engineering manager should be able to identify engineering strengths, relevant production experience, examples of decisions or trade-offs, and evidence of testing, accessibility, architecture, or maintainability practices.

### Software-engineer comprehension

A technical reviewer should be able to locate project implementation context, decisions and trade-offs, quality strategy, architectural or repository documentation, and public-safe technical evidence.

**Level:** Required for all three reviewer types.  
**Verification:** Structured user validation.

Use task-based prompts and record whether each reviewer completes the task without guidance. Record misunderstandings separately from task failures and use findings to revise content or navigation. Statistical significance is not required for the MVP.

## 7. Navigation and usability criteria

### Main destinations

**Level:** Required.  
**Verification:** Manual navigation testing and automated route checks where practical.

Clear navigation must reach Home, Projects, Experience, About content, and Contact content. About and Contact may resolve to Home sections or dedicated routes, consistent with the information architecture.

### Shallow navigation

**Level:** Required.  
**Verification:** Manual review.

The MVP must not require multi-level menus. Main destinations must not be hidden behind unclear labels, and external profiles or CV access must not overcrowd or replace the primary hierarchy.

### Current location

**Level:** Required.  
**Verification:** Manual page-by-page review.

Visitors must be able to determine their current page or destination through page title and heading, navigation state where applicable, and consistent route and content naming.

### No dead ends

**Level:** Required.  
**Verification:** Manual journey testing and automated internal-link checks where practical.

Every project detail must offer a meaningful continuation path, such as returning to Projects, viewing related experience or another project, making contact, or opening public evidence.

### Link clarity

**Level:** Required.  
**Verification:** Manual content review.

Link purpose must be understandable from its label or context. Avoid ambiguous labels such as “Click here” and repeated, indistinguishable “Read more” links.

### Error and unavailable content

**Level:** Required.  
**Verification:** Automated route checks, manual navigation testing, keyboard-only testing, and production smoke testing.

Required production routes must not return unexpected not-found or server-error responses. Future content must not appear in navigation before it exists. Empty sections and placeholder pages fail the MVP criteria.

## 8. Responsive-design criteria

### Supported viewport categories

**Level:** Required.  
**Verification:** Manual viewport testing using a documented implementation-time set of representative sizes.

The portfolio must remain usable on representative small mobile, large mobile, tablet, laptop, and desktop viewports. This document does not prescribe CSS breakpoints.

### Content integrity

**Level:** Required.  
**Verification:** Manual responsive testing.

Across supported viewports:

- Essential content is not clipped or inaccessible.
- No unintended page-level horizontal scrolling occurs.
- Text remains readable without zooming under normal browser settings.
- Navigation remains usable and actions remain reachable.
- Project content and technical documentation remain understandable.
- Code blocks, diagrams, tables, and long URLs do not break page layout.

### Equivalent access

**Level:** Required.  
**Verification:** Manual desktop-to-mobile comparison.

Mobile and desktop must expose equivalent core destinations and content. Responsive presentation may change, but required information and actions must remain available.

### Orientation and zoom

**Level:** Required.  
**Verification:** Manual portrait, landscape, browser-zoom, text-resize, and reflow testing.

Content should remain usable in portrait and landscape where applicable. Zoom and text enlargement must not make core content unusable, and ordinary page content should reflow without two-dimensional scrolling. Automated visual or end-to-end tests may supplement, but not replace, manual review.

## 9. Accessibility criteria

The MVP targets **WCAG 2.2 Level AA** conformance for the implemented portfolio scope. Automated tools alone cannot establish full conformance.

### Semantic structure

**Level:** Required.  
**Verification:** Automated accessibility checks and manual semantic review.

Pages must have meaningful titles, logical heading hierarchy, appropriate landmarks, and correct semantics for lists, links, buttons, forms, and controls.

### Keyboard access

**Level:** Required.  
**Verification:** Keyboard-only testing and manual focus review.

All interactive functionality must be keyboard operable, with logical focus order, visible focus, no keyboard traps, and accessible state exposed for collapsible navigation.

### Screen-reader support

**Level:** Required.  
**Verification:** Screen-reader testing and manual accessibility review.

Controls must have accessible names, images must have appropriate alternatives or decorative treatment, link purpose must be understandable, and dynamic status or error information must be exposed when applicable.

### Visual accessibility

**Level:** Required.  
**Verification:** Contrast checks, manual visual review, zoom and reflow testing.

Text and meaningful interface elements must meet applicable contrast requirements. Information must not depend on colour alone. Content must support zoom and text resizing. Motion must not prevent use and must respect reduced-motion preferences where motion exists.

### Forms, when present

**Level:** Conditional.  
**Verification:** Automated and manual form accessibility testing, keyboard testing, and privacy review.

If a contact form exists, every input must have a programmatically associated label; instructions and errors must be clear and programmatically exposed; validation must not rely only on colour; submission status must be accessible; and privacy implications must be addressed.

### Accessibility statement

**Level:** Required.  
**Verification:** Content review before production release.

An accessibility statement must accurately describe the intended conformance level, known limitations, a contact or feedback method, and the date or scope of the latest review.

### Accessibility verification coverage

**Level:** Required.  
**Verification:** Combined automated and manual audit.

Verification must combine automated checks, keyboard-only testing, manual semantics and focus review, contrast verification, zoom and reflow testing, and screen-reader testing on at least one supported desktop combination and one supported mobile combination where practical. An automated report with no detected violations is not sufficient evidence of full accessibility.

## 10. Performance criteria

### Core Web Vitals

**Level:** Required.  
**Verification:** Production Core Web Vitals lab testing.

Representative production pages under mobile conditions should meet the published “good” thresholds for the current stable Core Web Vitals at implementation time. Record the exact thresholds and authoritative source used. Initial expected metrics include Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift; this document does not freeze thresholds that may become obsolete before implementation.

### Lighthouse or equivalent audits

**Level:** Required.  
**Verification:** Repeatable production-build audits.

Representative pages should meet a documented audit threshold chosen during implementation. A suggested initial target is a performance score of at least 90 for core pages under the project's recorded audit configuration. The score is diagnostic evidence rather than the product outcome, and a single local desktop run is insufficient.

### Resource discipline

**Level:** Required.  
**Verification:** Production audit, asset or bundle analysis where applicable, and manual review.

The MVP should avoid unnecessary client-side JavaScript; optimise images and media; prevent avoidable layout shifts; load non-critical resources appropriately; justify large dependencies; keep font loading resilient and proportionate; and avoid unjustified third-party scripts that materially degrade performance.

### Page coverage

**Level:** Required.  
**Verification:** Production-build audits and manual constrained-device or network testing.

Performance verification must cover Home, Projects, one representative project detail, and Experience. Post-launch field data may be considered later when sufficient traffic exists.

## 11. Content completeness criteria

### Home

**Level:** Required.  
**Verification:** Content inventory and content review.

Home must contain my name and positioning, concise value proposition, selected project evidence, engineering strengths, experience preview, engineering-process evidence, contact destination, and CV and professional-profile access.

### Projects

**Level:** Required.  
**Verification:** Content inventory, link validation, and confidentiality review.

Projects must contain a curated index and at least one credible, public-safe detail page with clear status. Empty cards and placeholder routes fail. No arbitrary minimum beyond one credible detail page applies.

### Experience

**Level:** Required.  
**Verification:** Content review against approved professional sources.

Experience must contain accurate role and period information, public-safe context, selected meaningful contributions, demonstrated capabilities, and correct ownership and attribution.

### About content

**Level:** Required as content; dedicated route conditional.  
**Verification:** Content inventory and manual review.

About must contain enough distinct and relevant material to support professional fit and direction. It may remain on Home if it does not justify a dedicated page.

### Contact content

**Level:** Required as content; dedicated route conditional.  
**Verification:** Manual contact-path and link testing.

Contact must contain at least one functioning professional method. It may remain on Home when a dedicated route is unnecessary.

### Repository and process evidence

**Level:** Required in proportion to the project stage.  
**Verification:** Repository and documentation review.

The public repository should make relevant practices discoverable through product documentation, issues and milestones, pull-request history, architecture decisions when introduced, tests and automation when introduced, and setup or contribution information appropriate to the stage.

Repository practices should reinforce, rather than replace, the professional claims presented throughout the portfolio. They demonstrate how I approach software engineering, while experience and project content remain the canonical evidence of my professional work.

### Content quality

**Level:** Required.  
**Verification:** Content inventory, link validation, confidentiality review, comparison with the private professional source of truth, and manual review for placeholders, contradictions, and unsupported claims.

All published professional content must pass the review checklist in the content strategy.

## 12. Maintainability criteria

### Engineering credibility

**Level:** Required.  
**Verification:** Repository review by a reviewer without additional explanation.

Success means a visitor can recognise that the portfolio itself demonstrates professional engineering practices rather than only showcasing completed projects. The repository should make the following discoverable where they are relevant to the project stage:

- Clear product and technical documentation.
- Traceable architectural and product decisions.
- A meaningful commit history.
- Pull requests that preserve delivery and review context.
- Issues and milestones that demonstrate planning and scope management.
- Automated tests.
- Automation and quality checks.
- Architectural documentation.

The criterion passes when a reviewer can identify these practices and explain how they support quality, maintainability, or decision traceability without requiring additional verbal guidance. The presence of files or tooling alone is insufficient when their purpose and relationship to the product cannot be understood.

### Clear ownership and limited duplication

**Level:** Required.  
**Verification:** Documentation and content-duplication review.

Each content type must have a canonical location consistent with the information architecture. Positioning, experience, projects, and contact information must not exist as independently maintained full copies across multiple pages.

### Documented decisions

**Level:** Required when meaningful trade-offs arise.  
**Verification:** Repository documentation review.

Significant architectural, product, accessibility, performance, or content decisions should be documented when they introduce meaningful trade-offs.

### Local quality checks

**Level:** Required.  
**Verification:** Local setup validation and documentation review.

A contributor must be able to run documented validation commands locally. Exact commands belong to implementation documentation.

### Safe change process

**Level:** Required.  
**Verification:** Pull-request and quality-check review.

Changes to core behaviour or content must be reviewable through pull requests and covered by proportionate automated or manual validation.

### Dependency maintainability

**Level:** Required.  
**Verification:** Dependency and implementation review.

Dependencies must have a clear purpose; unused dependencies must not remain; major upgrades must be reviewable and testable; and core content must not be coupled to an unnecessarily difficult migration path.

### Content maintainability

**Level:** Required.  
**Verification:** Content review against the private CV knowledge base and duplication review.

Professional content must be reviewable against the private professional source of truth and should use stable dates or periods instead of unnecessarily stale wording.

## 13. Extensibility criteria

**Level:** Required as architectural readiness; unused extension mechanisms are not required.  
**Verification:** Architecture, content-model, route-boundary, and later implementation review.

The MVP should conceptually support additional projects, project details of different depths, future articles, localisation, additional public evidence, analytics, and optional contact integrations without unnecessary rewrites.

Success means:

- Another project can follow the existing content model.
- Project volume can grow before requiring new top-level navigation.
- New top-level destinations require a documented visitor need.
- Future localisation does not require rewriting existing meaning or ownership.
- Empty routes and speculative abstractions do not represent future capabilities in the MVP.

## 14. Production-readiness criteria

### Build

**Level:** Required.  
**Verification:** Automated build and quality results plus manual warning review.

The production build must complete successfully, required quality checks must pass, blocking errors or warnings must not remain unexplained, and production environment configuration must be documented.

### Deployment

**Level:** Required.  
**Verification:** Production smoke test and deployment record.

The production URL and required routes must load, static resources must resolve, routed-page refreshes must not fail unexpectedly, deployment must be reproducible through documentation or automation, and rollback or redeployment must be reasonably possible.

### Reproducibility

**Level:** Required.  
**Verification:** Fresh local setup using only the repository documentation.

Another developer should be able to clone the project, follow the documented setup instructions, and obtain a working local environment without undocumented manual steps. Any required prerequisites, environment variables, and validation commands must be documented without exposing secrets.

### Security and privacy

**Level:** Required.  
**Verification:** Repository, deployment, security, and privacy review.

No secrets or private configuration may be committed. Review supported security headers and hosting settings. External dependencies and scripts must be justified. Analytics, cookies, forms, and other data collection require appropriate privacy and legal treatment. Contact links must not expose unnecessary personal data.

### Metadata and discoverability

**Level:** Required, except social-sharing metadata when excluded from the MVP.  
**Verification:** Manual metadata inspection and automated checks where practical.

Core pages should include appropriate titles, descriptions, canonical URLs where applicable, favicon and basic identity assets when defined, and robots and sitemap behaviour appropriate to deployment. Social-sharing metadata is required only if included in MVP scope. This does not define a final SEO strategy.

### Error handling

**Level:** Required.  
**Verification:** Manual error-path testing, link checking, and production smoke testing.

Known not-found routes must produce an understandable response, broken required links are release blockers, and user-facing errors must not expose technical or sensitive information.

### Availability

**Level:** Required at release validation.  
**Verification:** Production observation.

The portfolio must be reachable at its intended public URL during release validation. No uptime percentage or service-level objective applies to the MVP unless later hosting needs justify one.

### Production smoke test

**Level:** Required.  
**Verification:** Documented manual production smoke test, supported by automated checks where practical.

After deployment, verify Home, Projects, at least one project detail, Experience, About and Contact destinations, CV access, GitHub and LinkedIn links, keyboard navigation, a representative mobile layout, and the absence of obvious console or network errors that affect use.

## 15. Release-blocking criteria

The following are MVP release blockers:

- My professional role or specialisation is unclear or materially misrepresented.
- Required navigation destinations are inaccessible.
- Required content is empty or placeholder material.
- Confidential information is exposed.
- A required production route or production build fails.
- A working local environment cannot be reproduced from the repository documentation.
- Core keyboard navigation is unusable.
- A critical accessibility barrier prevents access to core content or actions.
- Required links, contact, or CV access are unavailable.
- Core content is materially inaccurate.
- Severe layout breakage occurs on representative mobile or desktop viewports.
- An identified, avoidable performance issue materially prevents practical use.
- Secrets or private configuration are committed.

**Level:** Required.  
**Verification:** Combined automated checks, manual acceptance testing, content review, accessibility review, and production smoke testing.

Blocking accessibility failures must be distinguished from non-critical known limitations. Non-blocking limitations must still be documented in the accessibility statement and backlog.

## 16. MVP acceptance matrix

| Area                    | Criterion                                                             | Level       | Verification                | Evidence                        |
| ----------------------- | --------------------------------------------------------------------- | ----------- | --------------------------- | ------------------------------- |
| Positioning             | Intended frontend specialisation is correctly understood              | Required    | Structured user validation  | Validation notes                |
| Navigation              | All required destinations are reachable                               | Required    | Manual and automated checks | Test results                    |
| Responsive design       | Core content works across representative viewports                    | Required    | Manual viewport testing     | Test checklist                  |
| Accessibility           | Implemented scope targets WCAG 2.2 AA                                 | Required    | Automated and manual audit  | Accessibility report            |
| Performance             | Representative pages meet documented thresholds                       | Required    | Production audit            | Audit report                    |
| Content                 | Required content is complete and public-safe                          | Required    | Content review              | Review checklist                |
| Engineering credibility | Professional engineering practices are discoverable in the repository | Required    | Repository review           | Repository evidence review      |
| Maintainability         | Local quality checks and content ownership are documented             | Required    | Repository review           | Documentation                   |
| Reproducibility         | A fresh local setup succeeds using repository documentation           | Required    | Manual setup validation     | Setup notes                     |
| Deployment              | Production build and smoke test pass                                  | Required    | Automated and manual        | Workflow and smoke-test results |
| Contact form            | Form is accessible, private, and reliable                             | Conditional | Form testing                | Test results                    |
| Analytics               | Privacy-compliant behavioural observation                             | Future      | Production observation      | Analytics report                |

This matrix summarises the detailed criteria and does not replace them.

## 17. Post-launch validation

**Level:** Post-launch.  
**Verification:** Structured user validation and production observation where approved.

After release, conduct a small structured review with representative visitors. Validate whether positioning is understood; projects, experience, CV, and contact are discoverable; technical evidence is accessible; navigation labels are clear; mobile use has avoidable friction; and content produces recurring questions or misunderstandings.

Record task success, misunderstandings, navigation failures, content gaps, accessibility feedback, and prioritised follow-up actions. A small review is not statistically representative; it identifies concrete communication and usability problems.

## 18. Future enhancement objectives

**Level:** Future.  
**Verification:** A documented product decision and a method appropriate to each promoted capability.

Possible objectives include:

- Privacy-compliant analytics.
- Real-user Core Web Vitals monitoring.
- Search and project filtering.
- Localisation.
- Additional case studies.
- Articles or technical writing.
- Richer social-sharing previews.
- Automated visual regression testing.
- Broader assistive-technology coverage.
- Advanced performance budgets.
- Error and availability monitoring.
- Contact-form delivery monitoring.
- Structured data and expanded SEO.
- Recruiter or hiring-manager feedback collection.

Promote these objectives only when real product needs, traffic, content volume, or operational evidence justify them.

## 19. Evidence and reporting

Later milestones should retain proportionate evidence such as:

- Structured user-validation notes.
- Content-review checklist.
- Accessibility audit.
- Keyboard and screen-reader test notes.
- Responsive test checklist.
- Performance audit.
- Automated test results.
- Build and CI results.
- Production smoke-test checklist.
- Link-check report.
- Deployment record.
- Fresh local setup notes.
- Known-limitations list.

Success criteria must not be marked complete through an undocumented verbal assertion alone.

## 20. Decision boundaries

This document does not decide:

- Exact visual design or responsive breakpoints.
- Framework or routing library.
- Hosting provider.
- CI platform or test framework.
- Monitoring or analytics vendor.
- Consent implementation.
- Exact performance tooling.
- Final content or project selection.
- Detailed SEO strategy.
- Legal wording.
- Long-term service-level objectives.

Those decisions belong to later architecture, design, implementation, infrastructure, content, legal, and operations tasks.
