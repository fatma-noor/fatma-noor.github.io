# Website Content Brief: fatma-noor.github.io

Content brief for building Fatma Noor Kassim's personal website. All sections are written. Photos (headshot, baking, eating out) are in the project folder.

---

## Site structure

Tabs, in this order:

1. **Home**: short intro, photo, LinkedIn link, GitHub link, "Contact me" button
2. **Experience**: drop-down cards (see layout below)
3. **Projects**: data science projects
4. **Leadership & Extracurricular**
5. **Education**: LSE MSc Data Science, then University of Nairobi, then prizes in full
6. **Hobbies & Interests**
7. **Contact**: contact form

## Layout and style decisions

- **Experience cards are drop-downs.** Each card's Skills line is shown as small tags at the top, visible while the card is collapsed.
  - Collapsed: title, role, dates, and a one-line so-what.
  - Expanded: three labelled sections, **Problem**, **What I did**, **Result**.
- **BCG** is one parent card with four levels inside it (Consultant, Senior Associate, Associate, Business Analyst). Each project is its own drop-down within its level. At least 10 projects in total, at least 2 per level.
- **Titles are short and to the point**, around 3 to 6 words (reference: sihanyu.me/projects), with a one-line so-what underneath.
- **Projects cards** use **Overview**, **Approach**, **Outcome**.
- **No client names** anywhere on the site. Use generic descriptions (e.g. "an international foundation", "a government ministry").
- **Writing style:** no em dashes, plain direct English.

---

## Home | FINAL (revised: multi-section home page)

The Home page is now a scrolling page with five sections, in this order. Show the name once only (in the hero). The nav brand reads "Fatma Noor".

### 1. Hero
Two columns on desktop: text on the left, photo on the right. Stacks on mobile, photo first.

**Hi, I'm Fatma Noor.**

Strategy & Operations | Chief of Staff | Product Management | Applied AI | Business Strategy & Development

I'm looking for roles where I can own problems from analysis through to delivery.

Buttons: View my experience (primary, goes to the Experience tab), Contact me (secondary, goes to the Contact tab)
Icon links under the buttons: LinkedIn (linkedin.com/in/fatma-noor/), GitHub (github.com/fatma-noor), Email (goes to the Contact tab)

Layout notes:
- Show the five roles as one line under the name, separated by thin dividers, in the accent colour. Wrap on mobile.
- Crop the headshot into a soft organic blob shape, with one or two abstract shapes in the accent colour layered behind it, offset slightly.

### 2. About
Left: the two paragraphs. Right: an info card with three rows, each with a small icon.

I recently completed an MSc in Data Science at LSE, after four years at BCG in Nairobi working with foundations, governments and companies across Africa. That work ranged from a national AI strategy to a livestock market pilot replicated in three countries.

I've since moved closer to building. I co-founded Roofly Kenya, a verified property marketplace, and at Oxford I built the website and triage flow for Rosa, an AI chatbot supporting survivors of modern slavery.

Info card:
- **Education:** MSc Data Science, LSE | BSc Economics and Statistics, First Class Honours, University of Nairobi
- **Experience:** 4 years at BCG | Co-Founder, Roofly Kenya | Research Assistant, Oxford
- **Interests:** Supporting women at work | Puzzles and strategy games | Baking | Eating out

### 3. Tools I work with
A grid of tiles, each with the tool's logo and name. Use an open-source icon set for logos.

Python | R | SQL | PySpark | Google Cloud | Tableau | Alteryx | Excel | Git | LaTeX | Claude Code | Codex

### 4. Skills
Show as tag groups under four short group headings, then a "View my experience" link to the Experience tab.

- **Strategy:** AI strategy | Growth strategy | Go-to-market strategy | Prioritisation | Problem framing | Organisation design | Operating model design | Programme design
- **Commercial and finance:** Market sizing | Financial modelling | Scenario analysis | Cost modelling | Due diligence | Investment screening | Cost reduction
- **Product and data:** Product management | UX evaluation | Analytics set-up | Geospatial analysis | Location analysis | Market research | Survey analysis | Performance tracking
- **Leadership and stakeholders:** Team leadership | Stakeholder management | Client management | Partnership design | Investor interviews | Marketing campaigns | Event management

[View my experience](links to the Experience tab)

### 5. Featured projects
Three cards, each with the project title, one-liner, tool tags and a link to its card on the Projects tab. Then a "View all projects" link to the Projects tab.

- **Feature Selection for Neural Decoding:** 30 of 11,190 features, 77% balanced accuracy. Tags: Python | Feature selection | Machine learning
- **Distributed Ad-Click Prediction:** One global model beat partitioned models on ranking, at a tenth of the training time. Tags: PySpark | Google Cloud | Logistic regression
- **Sephora Exclusivity Analysis:** Exclusives win attention without winning happier reviews. Tags: Python | Regression | Clustering

### Theme
- White background by default, with a light/dark toggle in the nav. On first visit, follow the visitor's system setting, then remember their choice.
- Accent colour: a violet/indigo, used for the name, the role line, buttons and the shapes behind the photo. A subtle gradient on the name only is fine.

---

## Experience

### Roofly Kenya | FINAL

**Roofly Kenya** | Co-Founder | July 2026 to present
*Building a verified property marketplace to tackle rental fraud in Kenya*
Skills: Product management | Market research | Go-to-market strategy | Payments design | Pitching

**Problem**
Finding a home in Kenya means wading through fraud. Properties get listed that don't exist, agents aren't verified, and renters are often asked to pay fees upfront to people they have no way of checking.

**What I did**
I co-founded Roofly with my brother, who leads the technical build. I own the market research, go-to-market strategy, payment design, pitch deck and design input. We built Roofly around trust. Agents and owners who list their own property can sign up, every listing is reviewed before it goes live, and enquiries go straight to the person responsible for the listing. Next come 360-degree viewing and escrow. If a lister asks for a fee before a viewing, Roofly will hold the money. If the deal goes through, it is released to them. If not, it goes back to the renter.

**Result**
The platform is live with search, listing and review in place, and we are preparing to onboard our first listings.

Link: https://rooflykenya.vercel.app/

### Rosa, Oxford Blavatnik School of Government | FINAL

**Rosa: AI Support for Survivors of Modern Slavery**
Research Assistant, Oxford Blavatnik School of Government | May to July 2026
*One-liner: Built the website and triage flow for Rosa, an AI chatbot helping survivors of modern slavery find support*
Skills: Product management | AI-assisted development (Claude Code) | UX evaluation | Analytics set-up | Ethical data collection

**Problem**
Survivors of modern slavery often don't know their rights or how to reach help, and seeking it can put them at risk. Rosa gives them a safe place to learn their rights and find out how to contact the authorities for support. The project began at a Blavatnik School hackathon and was shaped by the experiences of real survivors.

**What I did**
I joined as a research assistant before the project's second hackathon and became the technical lead in the team, with other RAs covering market research and qualitative work. I built the website with Claude Code and product-managed the chatbot's triage flow. I also set up the QR codes that bring users to the chatbot, a database for ethical data collection, and analytics, and I ran the UX and ethical evaluation. At the second hackathon, we tested Rosa with legal practitioners, government staff and survivors themselves. I then built their feedback into the website. That included a quick-exit button, which takes a survivor straight to Google if they sense someone coming and fear being caught seeking help. I also built a landing page that sends survivors directly to the chatbot and sends anyone wanting to learn about the project to the project site.

**Result**
Rosa is a working prototype, refined with input from the people it is built for, and not yet deployed.

### BCG (Business Analyst to Consultant, June 2021 to June 2025)

Parent card. Inside it, one section per level, each project its own drop-down. Show dates only on the level headings, not on individual projects.

#### Consultant (Sept 2024 to June 2025) | FINAL

**Red Meat Blended Finance Model**
*Tested whether private capital would fund a pastoralist red meat market, and found only impact investors would*
Skills: Market sizing | Financial modelling | Scenario analysis | Investor interviews

**Problem**
An international foundation had a live pilot in East Africa linking pastoralists directly to an export abattoir. To scale it, the foundation needed other funders to invest alongside it.

**What I did**
98% of East Africa's red meat exports go to the Gulf, so I sized that market and identified the share East African meat could realistically win: supermarkets and retail, since premium meat largely comes from other countries. I interviewed financiers in the Middle East and East Africa to test their appetite. I then built an ROI model with scenarios for drought, intertribal conflict, climate shocks and status quo, because these risks can wipe out herds almost overnight.

**Result**
We identified a $3B market, about $1.5B of it addressable, with a projected 11% five-year return. Private equity and other private capital found the risk too high, mainly because of drought. The conclusion was that this model can only be funded by impact investors.

**National AI Strategy**
*Prioritised three sectors and costed a national AI strategy, since adopted by the government*
Skills: AI strategy | Prioritisation | Sector analysis | Stakeholder interviews | Costing

**Problem**
A government ministry wanted a national AI strategy to scale the use of AI across the country.

**What I did**
We started by interviewing countries that already had AI strategies, to learn how they built them. We then reviewed every sector in the country for where AI could add the most value. I narrowed this to three sectors, agriculture, health and education, scored on impact, feasibility, reach and ease of implementation in the short term. We then costed what each would need.

**Result**
We delivered a strategy covering the priority sectors, use cases, implementation timeline and funding required. The ministry adopted it and has started fundraising to implement it.

**Mobile Money Agent Mapping**
*Mapped a national mobile money network to find where new agents could reach remote regions*
Skills: Geospatial analysis | Problem framing | Client management | Cost analysis

**Problem**
Mobile money has expanded access to finance in remote parts of Kenya and Ghana. An African government wanted the same, but its mobile money network hadn't reached remote regions. A development funder needed to know how to scale it.

**What I did**
I led the client-facing work and problem framing, working with BCG's tech team, who built the geospatial model. We mapped every agent across the country's rural areas, using agent submissions, web scraping and central bank records, to find saturated areas and gaps.

**Result**
We produced a national coverage map, identified prime locations based on expected transaction volumes, and recommended 3 sites for new agents. We also laid out a plan for reaching remote regions based on other African countries' experience, covering agent training, extra support and a full cost estimate. This gave the funder a costed, location-by-location basis for deciding where to fund new agents.

#### Senior Associate (Dec 2023 to Aug 2024) | FINAL

Show the campaign card first.

**Accelerator Applicant Campaign**
*Ran the campaign that brought in 100+ applications*
Skills: Marketing campaigns | Performance tracking | Data-driven iteration | Senior stakeholder outreach

**Problem**
A pan-African healthcare accelerator needed a strong pool of applicants for its 2024 cohort.

**What I did**
I launched the application form and led the campaign, creating banners, social media posts, newsletters, website announcements, and posts in which alumni explained the impact the accelerator had on them. I tracked applications daily by category, such as telehealth and manufacturing, and used the numbers to decide which segments to target next, by stage (pre-seed, Series A or mature) and by sector. I also drafted outreach emails for senior leadership.

**Result**
The campaign delivered 100+ applications into the selection phase.

**Healthcare Accelerator Selection**
*Selected 10 healthcare startups from 100+ applicants across Africa*
Skills: Due diligence | Team leadership | Scoring frameworks | Tableau | Stakeholder management

**Problem**
The accelerator needed to pick the startups best placed to benefit from its support.

**What I did**
I ran the pre-selection and selection phases. Each week I prepared materials showing the applications received and built the shortlist, narrowing 100+ applications to 30. I led a team of 3 analysts and interns through due diligence on those 30, interviewing each startup's leaders, clients and investors. For each, we built a case for how the accelerator could help them, then scored them on a matrix of fit with the accelerator and likelihood of success. I built a Tableau dashboard so senior leaders could compare candidates by geography, maturity and revenue.

**Result**
We selected the 10 best-placed startups, spanning manufacturing, telehealth and commerce, from seed to mature stage, and handed the cohort over for the acceleration phase.

#### Associate (June 2022 to Nov 2023) | FINAL

Order: Role of the Centre, Market Pilot, Market Research, Trade Event.

**Conglomerate Role of the Centre**
*Redesigned a family conglomerate's headquarters and identified $2M in annual savings*
Skills: Organisation design | Employee surveys | Cost reduction | Workstream leadership

**Problem**
A major African family-run conglomerate with five business units had recently set up a headquarters, and the business units felt it was overriding their decisions. The client needed to define what its headquarters should do.

**What I did**
I led the initial workstream. We ran a confidential survey asking employees about the culture, their business unit, and whether the headquarters added value, alongside belief audits. From this we pinpointed the problems and redesigned the organisation: a lean headquarters, more autonomy for the business units, and clear reporting lines to their heads. We also designed a private family office, separate from the headquarters' mandate.

**Result**
The reorganisation identified $2M in annual cost savings.

**Pastoralist Market Pilot**
*Designed a pilot that paid pastoralists more, replicated in three countries*
Skills: Programme design | Partnership design | Operating model design | Cost modelling

**Problem**
Pastoralists were losing most of the value of their animals to middlemen and had little access to veterinary care, training or feed.

**What I did**
I designed the pilot. I identified the export abattoir to partner with and the starting region in Ethiopia. Under the model, the abattoir buys directly from pastoralists at a higher price, and the cost of training, veterinary care and feed is deducted from that price. We focused on goats and sheep because women rear them. I mapped how the funders, the company and the pastoralists would work together, and built a cost model covering the cost of bringing pastoralists on board, providing inputs and training, and the value the pilot would create over the following years.

**Result**
About $5M was deployed into the pilot. The model was proven in Ethiopia and replicated in Kenya and Nigeria.

**Pastoralist Livestock Market Research**
*Found that middlemen take a 2 to 3x markup from pastoralists*
Skills: Market research | Survey analysis | Value chain analysis

**Problem**
An international foundation wanted to understand East Africa's livestock market.

**What I did**
We researched the market and found that around 60 to 80% of meat in East Africa comes from pastoralists. To validate our findings, we surveyed 500+ livestock value chain actors.

**Result**
Two findings stood out. Pastoralists had little access to veterinary support, training or feed. They also sold to middlemen out of necessity, and the middlemen bought cheap and sold high, at a 2 to 3x markup, capturing most of the profit. These findings shaped the design of a demand-led pilot to support pastoralists. We also presented them at an event bringing together 100+ value chain actors from 14 countries, and the discussions there led to a dedicated pastoralist entity being established within an African Union body.

**UK–Kenya Horticulture Trade Event**
*Organised the event that launched a UK government trade programme*
Skills: Event management | Speaker outreach | Stakeholder coordination

**Problem**
The UK government wanted to connect Kenyan and UK horticulture trade parties through an event.

**What I did**
I managed and organised the event, covering the agenda, panels, speaker outreach and attendee logistics, and ran it on the day.

**Result**
The event launched what became a UK trade programme, since expanded to other regions including Asia.

#### Business Analyst (June 2021 to May 2022) | FINAL

Contract role, converted to a permanent Associate offer.

**Store Whitespace Strategy**
*Found 10 prime sites for a grocery chain's expansion ahead of its sale*
Skills: Location analysis | Growth strategy | Sell-side due diligence | Market sizing

**Problem**
A private equity firm preparing to sell a Kenyan grocery chain needed an information memorandum for prospective buyers.

**What I did**
I wrote the sections on the chain's profile, competitive advantage and growth opportunity. I mapped expansion potential on a 1km by 1km grid, scoring each square on wealth, household income, road access and distance to the nearest competitor.

**Result**
We delivered the information memorandum, including a growth strategy in which I identified 10 prime sites for new stores. The chain was sold to another private equity firm.

**Green Investment Screening**
*Screened ~300 African companies and found only a handful had passed $10M in revenue*
Skills: Investment screening | Database building | Market analysis

**Problem**
An international foundation wanted to find green, inclusive companies in Africa to support.

**What I did**
I built a database of ~300 companies across sectors from the portfolios of major development funders, capturing each company's founding year, revenue, employees, funding and stage.

**Result**
Only 1 to 5 companies had passed $10M in revenue, and most were 70+ years old. African companies lack the access to capital and affordable advisory services that companies in developed markets have. This finding prompted a dedicated programme focused on food systems. Two companies, in aquaculture and sanitation, were selected to receive advisory support on scaling their operations, and both grew revenue by 30%.

**Horticulture Value Chain Strategy**
*Made 10 trade expansion recommendations across five Kenyan value chains*
Skills: Market sizing | Value chain analysis | Stakeholder interviews | Trade strategy

**Problem**
A research institute needed a growth strategy for mango, banana, passion fruit, dairy and avocado in Kenya.

**What I did**
I interviewed 60+ producers, sellers and exporters, and sized each value chain across domestic, regional and international markets. I also designed a market-back model that starts from end buyers and connects them directly to producers, cutting out middlemen.

**Result**
We made 10 prioritised trade expansion recommendations across local, regional and export markets, giving the client a plan for which value chains and markets to grow first.

---

## Projects | FINAL (one detail to confirm on Sephora)

Do not include the MSc capstone. It cannot be shared without the industry partner's permission.

All three are LSE MSc group projects, and I was the group lead on each. Code for each is on GitHub (github.com/fatma-noor).

### Feature Selection for Neural Decoding
*30 of 11,190 features, 77% balanced accuracy*

**Overview**
Which feature selection methods still work when there are 16 times more features than observations? We tested this on mouse brain activity data: 11,190 features against 683 trials, with imbalanced classes and a weak signal spread thinly across many features.

**Approach**
I led the group, setting the research question, dividing the work and bringing everyone's pieces together. I wrote all six methods: forward stepwise, mRMR, Lasso, Elastic Net, and Random Forest and gradient boosting importance. I also did the exploratory analysis, built an evaluation pipeline scoring each method on accuracy, sparsity and runtime, and wrote the report.

**Outcome**
Forward stepwise won overall, reaching 0.774 balanced accuracy with just 30 features. Elastic Net scored highest at 0.805 but needed 2,168 features and failed to generalise. I also explained why Random Forest importance favoured noisy features, and why mRMR fails when features are nearly uncorrelated.

Repo: github.com/fatma-noor/high-dimensional-feature-selection

### Distributed Ad-Click Prediction
*One global model beat partitioned models on ranking, at a tenth of the training time*

**Overview**
With 40 million ad impressions, is it better to train one model on everything, or to split the data and train a separate model for each group? We tested this on the Avazu click-through dataset, covering 10 days of mobile ad impressions.

**Approach**
I led a group of three, setting the research question, dividing the work and bringing everyone's pieces together. We built a PySpark pipeline on Google Cloud Dataproc and compared three logistic regression set-ups: one global model; separate models for ads on mobile websites and ads inside apps; and 24 models, one per hour of the day. I built the exploratory analysis, the preprocessing pipeline and the website-versus-app model. We tested every model on later days than it was trained on, as a real ad system would be used, and ran scaling tests from 25% to 100% of the data.

**Outcome**
The global model ranked clicks best and trained about 10x faster. The hourly models gave the most accurate click probabilities, which matters because those probabilities set ad bid prices. In early tests, the app channel alone outperformed every other model, pointing to a hybrid approach: separate models for app traffic, the global model for the rest.

Repo: github.com/fatma-noor/avazu-ctr-prediction

### Sephora Exclusivity Analysis
*Exclusives win attention without winning happier reviews*

**Overview**
Retailers sell some products exclusively, only through their own stores and website, to draw shoppers in. Does it work? We tested whether exclusive Sephora products get more engagement, and whether customers like them more, across 8,494 products and about 1 million reviews.

**Approach**
I led the group, setting the research question, dividing the work and bringing everyone's pieces together. I did the exploratory analysis, built a logistic regression testing which product characteristics predict whether a product is exclusive, and clustered products by price, loves, rating and reviews to check whether exclusives dominate the top-performing tier. Alongside this, our regression models tested whether exclusivity still predicts loves after controlling for price, rating, reviews and category, and sentiment analysis compared how customers felt about exclusive and non-exclusive products.

**Outcome**
Exclusive products got more loves and reviews, but their reviews were no more positive. Exclusivity helps products get noticed without making customers happier with them.

Repo: github.com/fatma-noor/sephora-exclusivity-analysis

## Leadership & Extracurricular | FINAL

Same drop-down format: short title, one-line so-what, then Problem, What I did, Result.

### LSE Africa Summit 2026
Finance & Sponsorship Team
*Raised £20k+ in sponsorship for the summit, held in March 2026*

**Problem**
The summit, themed on AI in Africa, needed sponsors to fund it.

**What I did**
I built a target list of 50 organisations and tracked the pipeline in Excel. I found prospects through cold emails, LinkedIn and mutual contacts, then held calls to understand what each company wanted and negotiated a package to fit. One company wanted access to talent. I proposed a £5,000 package, they countered at £3,500, and we agreed £4,000 with logos on the brochures and at the event, plus a speaking slot on a panel.

**Result**
I converted 5 of 50 organisations and raised £20k+.

### MSc Programme Proposal
Academic Representative, MSc Data Science
*Proposed an optional two-year MSc Data Science pathway, now under a feasibility review*

**Problem**
LSE admits students from many backgrounds, but the one-year MSc Data Science is built for recent graduates in fields like computer science, maths or engineering. Career changers and students returning after years of work have to rebuild statistics, maths and coding foundations while keeping pace with advanced courses, often with several deadlines landing in the same two weeks. Unlike reading-based MScs, these skills can't be caught up through independent reading, and the part-time option isn't open to international students on standard visas.

**What I did**
Before the staff-student liaison meeting, I surveyed the cohort on workload, structure and programme length (25 responses). I then wrote and presented a proposal to the department for an optional two-year pathway: a first year on foundations, and a second on advanced coursework, a substantive capstone and research. The one-year route would stay unchanged. I addressed the likely objections, including cost to students, perceived dilution of the one-year degree, and staffing, and set out four questions a feasibility review should answer: market demand, resources, programme design and visa compliance.

**Result**
Most students found the workload manageable (71%), but 80% wanted the compulsory course structure changed, 56% would have preferred a slower first half, and a slight majority (52%) preferred a two-year programme. Students' recurring theme was wanting stronger foundations in statistics, programming and maths before advanced machine learning. The department was receptive, especially after seeing the survey evidence. The proposal was reviewed in department meetings, and a team has been set up to investigate its feasibility and whether and how to launch it.

### AI Summit London 2026
Department Delegate
*Brought two companies into partnerships with LSE*

**Problem**
The Department of Statistics is less well known than departments like Economics or Geography. The summit was a chance to build industry relationships and raise the department's profile.

**What I did**
I was one of 20 LSE Statistics students selected for a delegate pass. I represented the MSc programme, attended talks, built relationships with senior figures, and introduced them to LSE's External Engagement team.

**Result**
Two companies are now working with LSE. One is running an early careers programme with the university, and the other works with the department through student capstone projects.

## Education | FINAL

### The London School of Economics and Political Science | 2025 to 2026
MSc Data Science (awaiting final results)
Relevant coursework: Machine Learning, Multivariate Methods, Distributed Computing for Big Data

### University of Nairobi | 2016 to 2020
BSc Economics and Statistics, First Class Honours
Graduated in the top 1% of my class and top of the Faculty of Arts and Social Sciences.

### Prizes
- **Gandhi Smarak Nidhi Trustee Fund** (2019/20): Best final-year student, Faculty of Arts and Social Sciences
- **University of Nairobi Alumni Association Prize** (2019/20): Best overall student, Faculty of Arts and Social Sciences
- **Prof. Arthur T. Porter Prize** (2019/20): Best final-year student, Faculty of Arts and Social Sciences
- **Prof. Jane F. Mariara Award** (2019/20): Best female student, BSc Economics and Statistics
- **Prof. Jane Kabubo Mariara Award** (2017/18): Best overall second-year student, BSc Economics and Statistics

## Hobbies & Interests | FINAL (hiking to confirm)

### Supporting women at work
I come from an environment where not many women go into the workforce, and supporting women at work is one of the things that drives me most. I've always made time for initiatives that help, and these are two of them.

**Project Girls 4 Girls Kenya** | Mentor | 2021 to present
Women in Kenya often step into offices dominated by men, with few senior women to look up to, especially women from minority backgrounds. Project G4G mentors women of all ages and connects them with accomplished women who can serve as role models. Its mentorship covers communication, networking, ethics, standing up for yourself, and running for public office. I mentor women aged 25 to 34 from the Association of Women Accountants of Kenya.

**Women@BCG Nairobi** | Core team member
I joined the Nairobi core team as an entry-level analyst, when it was just two people, a managing director and a senior consultant. I helped set it up in the office and plan its programme each year: masterclasses, International Women's Day with a guest speaker, interactive events, and an end-of-year event for the office's women. We worked with the recruiting team on hiring more women, recommending extra support for women during interviews. Drawing on my Project G4G experience, we brought Empower Her, already running in other BCG offices, to Nairobi. It pairs students from different universities with BCG analysts to learn consulting skills, and most students who completed it went on to join BCG full-time.

### Other interests
- **Puzzles and strategy games:** all kinds. Sudoku, kakuro, and strategy shows like Survivor, The Circle and The Amazing Race.
- **Baking:** I bake a lot. [photos: in the project folder]
- **Eating out:** if there's a new restaurant, sign me up. [photos: in the project folder]

## Contact | FINAL

A simple contact form: name, email, message, send button.

Note for the build: GitHub Pages is static and can't process form submissions by itself. Fatma has a Formspree account; connect the form to it so messages arrive in her email (fatma.noor004@gmail.com).
