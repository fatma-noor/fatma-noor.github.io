# Fatma Noor Portfolio Design System

Status: updated for Fatma's approved Home brief and reference-home.jpeg direction on 11 October 2026. Local implementation only, not pushed or deployed.

## Sources and Overrides

Professional personal portfolio for a strategy, product and data science candidate, minimal and credible.

The ui-ux-pro-max skill informs hierarchy, accessibility, responsive layout, contrast and interaction. Fatma's updated brief, reference image and explicit instructions override the earlier blue Swiss-style design. The reference supplies visual direction only. Its text, navigation, illustrations, footer and claims are not copied.

All website wording is in content.json. Existing non-Home content and structure are unchanged. The section labels and headings are the exact wording Fatma supplied in chat.

## Visual Direction

- White light theme and neutral charcoal dark theme.
- Restrained violet/indigo accent, generous space, crisp Inter typography.
- Text-left hero, organic photo crop on the right, two slightly offset solid accent shapes.
- Soft neutral-to-tinted section backdrops. The only text gradient is on the hero name.
- Individual cards have 8px corners, subtle borders, quiet shadows and colour-only hover feedback.
- Skill tags are compact pills, never ratings or bars.
- Lucide outline icons for controls and information. Simple Icons for tool brands, with a Lucide database symbol for SQL.
- No entrance animations, decorative marketing copy, serif display fonts or cream background.

## Colour Tokens

| Role | Light | Dark |
| --- | --- | --- |
| Background | #FFFFFF | #101116 |
| Card / form surface | #FFFFFF | #18191F |
| Primary text | #20212A | #F2F2F6 |
| Secondary text | #535561 | #BDBDC9 |
| Accent | #6846C5 | #B4A1F5 |
| Accent hover | #5334A7 | #CBBDFF |
| Soft accent | #F0EBFC | #252035 |
| Role pill background / text | #7047D9 / #FFFFFF | #7047D9 / #FFFFFF |
| Section tint | #F8F8FC | #15151D |
| Tag background | #F1EEF9 | #292437 |
| Tag text | #594B7F | #D0C4EC |
| Decorative border | #E5E3ED | #32313D |
| Form boundary | #92909F | #757382 |
| Error text | #B42332 | #FF9AA5 |
| Success text | #18603C | #8BDDA9 |

Semantic CSS variables apply to every tab. Organisation logos retain their artwork and sit on white backplates in both themes. Tool marks have appropriate brand colours.

## Typography and Layout

- Locally hosted Inter, font-display swap, system sans-serif fallbacks.
- Hero: 52px desktop, 32px phone, weight 700.
- Tab-page heading: 44px desktop, 34px phone.
- Home section heading: 30px desktop, 26px phone.
- Disclosure title: 20px desktop, 18px phone.
- Body: 16px, line height 1.7. Metadata and compact labels: 12px to 14px.
- Letter spacing is zero. No viewport-unit font sizing.
- Maximum outer width 1440px, with 48px desktop, 28px tablet and 20px phone gutters.
- Long prose has a constrained reading measure. Text wraps without ellipses or truncation.
- Seven navigation tabs retain their exact labels and order. Navigation wraps on smaller screens.
- Selected navigation has an underline. Links, forms, disclosures and theme control expose keyboard focus.
- Browser fragments and history work. Legacy page URLs remain usable.

## Home Structure

1. Hero: exact greeting, Ex-BCG/LSE introductory line, exact role-seeking sentence, Roles you can hire me for heading and five solid bright violet pills with white text, then View my experience and Contact me buttons and LinkedIn/GitHub/Email icon links. Pills wrap as needed. Photo comes first on phones.
2. About: two unchanged paragraphs on the left, three icon rows on the right.
3. Tools: all twelve named tools in a responsive tile grid.
4. Skills: all four groups and every supplied tag, followed by View my experience.
5. Featured projects: three cards with exact titles, summaries and tags. Each opens its specific project disclosure. View all projects follows the cards.
6. Bottom contact band: approved Contact / Get in touch heading, LinkedIn and GitHub links, and Fatma's Send me a message button opening the Contact tab. No additional supporting sentence or copyright copy.

The nav brand is Fatma Noor. The name appears once within Home, in the hero.

## Other Tabs

- Experience: Roofly and Rosa remain individual disclosures. BCG remains one parent, four levels and twelve nested project disclosures. All collapsed skills, roles, dates and summaries remain visible.
- Roofly, Oxford Blavatnik and BCG logos accompany the experience titles. BCG uses a clean official asset without the checkerboard in the supplied PNG.
- Projects: all three existing disclosures, Overview/Approach/Outcome content and repository links remain unchanged.
- Leadership & Extracurricular: all three existing disclosures and tags remain unchanged.
- Education: LSE, University of Nairobi and all five prizes remain in order. Institution logos and the existing LSE photograph are displayed.
- Hobbies & Interests: both women's initiatives and all interests remain unchanged. The three eating-out photos remain under Other interests. Baking remains text-only.
- Contact: name, email, message and Send remain unchanged. Formspree AJAX sends to mwlvbroj, with inline approved success/errors and no redirect.

BCG's nested projects use rows and separators, not nested decorated cards. Unframed education and hobby sections stay unframed.

## Theme and Motion

On the first visit, the theme follows prefers-color-scheme, with white as the light fallback. It follows system changes until the visitor makes a choice. The navigation toggle then saves the explicit light/dark preference locally. Theme setup runs before the stylesheet to avoid an incorrect-theme flash.

Only 150ms colour feedback and disclosure-chevron rotation are used. Reduced motion removes transitions. Hover does not change component bounds.

## Assets and Hosting

- Existing WebP photo variants, responsive sizes, intrinsic dimensions and lazy loading are retained.
- The headshot is eager/high priority. Original photos and supplied logos are preserved.
- Roofly, LSE and University of Nairobi raster logos are optimised as WebP. Oxford Blavatnik is SVG; BCG is an optimised official WebP.
- Lucide and Simple Icons are self-hosted with their licences. No runtime icon CDN dependency.
- Plain HTML, CSS and JavaScript. No build step.
- GitHub Actions packages the public shell, content, theme script, optimised photos, logos, icons, font and Formspree SDK. Originals, reference files, design notes and historical documents are excluded.

## Pre-Delivery Review

Apply the skill's web Quick Reference sections 1 to 3 plus focused dark-mode and keyboard/form guidance. Native-app-only haptics, Dynamic Type and point/dp checks do not apply.

- [x] 337 brief content entries and all 60 narrative blocks are verified.
- [x] All non-Home content, navigation, photos and form copy match the pre-refresh snapshot exactly.
- [x] All approved labels and headings are stored in content.json.
- [x] No em dashes or added client identifiers in site copy.
- [x] Both themes tested on all seven tabs, including first-visit system setting and remembered choice.
- [x] Five viewport sizes, including 375px phone and 812px landscape, pass without horizontal overflow.
- [x] All disclosures, twelve BCG projects, feature-card deep links and browser history work.
- [x] Keyboard focus, reduced motion, 200% text, labelled form fields and disabled submit are checked.
- [x] Normal text contrast is checked separately in both themes. Body, secondary and accent pairs exceed 4.5:1. Tag, button and name-gradient pairs are also checked.
- [x] All visible image assets load, with no browser errors or missing files.
- [x] Form success, validation, server failure and network failure pass with simulated responses, retaining failed input and avoiding redirects. Actual inbox delivery is not tested.
- [x] LinkedIn, GitHub, Roofly, neural decoding and Sephora return HTTP 200. The supplied avazu-ctr-prediction repository URL still returns public HTTP 404 and is retained as confirmed by Fatma.
- [x] Home and Experience screenshots captured in light and dark themes.

## Local Preview

From the portfolio folder, run `python -m http.server 8088 --bind 127.0.0.1`, then open http://127.0.0.1:8088/#home. No build or dependency installation is needed. A local preview server is already running on port 8088.
