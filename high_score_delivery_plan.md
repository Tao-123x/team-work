## Title
WeChat Daily Weather Push – High-Score Delivery Plan

### Summary
- Deliver a fully automated WeChat weather-butler plus a polished 15-minute team presentation by 2026-04-03 13:00 GMT (21:00 China). GitHub Actions + API automation should be in place early so Week 4 focuses on presentation, rehearsal, and QA artifacts tied to the rubric.
- Align every artefact to the rubric weights (Problem 10%, Plan 10%, Build/Eval 30%, Teamwork 35%, Presentation 15%) and keep a contribution log supporting the 50/50 split between group deliverables (criteria 1–3) and individual performance (criteria 4–5).

### Key Deliverables & Evaluation Alignment
1. **Problem definition** – create a concise needs-and-requirements doc (based on the project background) and a short set of personas/user stories that describe how the automated push solves both practical and emotional care gaps.
2. **Planned approach** – maintain a simple backlog with task owners, capture milestones in a shared sprint board, highlight the GitHub Actions schedule, API choices, timezone commitments, and record decisions for the LO1/LO2 evidence.
3. **Build & evaluation** – implement the weather fetch + personalization + WeChat template push logic, capture automated test logs (API responses, payload assembly), and document how data flows through the automation with degradation handling and metrics.
4. **Teamwork** – enforce twice-weekly syncs, rotate facilitation, keep meeting notes plus a decision log, and assign the prescribed roles (Team Lead / Product Owner / Quality Controller / Developers) so the reflection references concrete contributions.
5. **Presentation** – outline a storyboard and PPT that narrates problem → solution → implementation → teamwork → demo, rehearse Q&A, and keep rehearsal notes as proof of practice.

### Division of Labor & Rhythm
- **Team Lead:** oversees timeline/backlog, runs standups/syncs, compiles the LO2/LO3 reflection, and ensures everyone's voice is heard.
- **Product Owner:** owns the persona/problem doc, writes acceptance criteria, and shepherds the emotion-enriched WeChat template content.
- **Quality Controller:** builds the test matrix (API stability, timing), tracks the deployment log as teamwork evidence, and leads at least two walkthrough reviews ahead of the final rehearsal.
- **Developers:** split responsibilities – Weather API integration & caching; GitHub Actions + credentials; Message builder (personalization, countdowns) + monitoring/logging.
- **Cadence:** daily 15-minute standups (async if needed), twice-weekly live syncs, and weekly delivery demos to show rubric-point progress.

### Timeline & Milestones
1. **Week 1 (Mar 5–11):** finalize requirements and role assignments, confirm APIs/accounts/WeChat template, draft backlog, set up GitHub Action scaffolding, and record the first snapshot tied to criteria 1–2.
2. **Week 2 (Mar 12–18):** implement core automation (weather fetch + personalization + push), hook template fields, capture logs, and begin integration testing (criteria 3).
3. **Week 3 (Mar 19–25):** harden reliability (retry/backoff, alerts), finish QA reports, sketch demo scenarios, draft PPT slides per naming convention, and gather individual contribution evidence for criteria 4–5.
4. **Run-up Week (Mar 26–Apr 3):** freeze code, rehearse presentation, polish slides, upload PPT (e.g., `Group1_Wang_X_12345678.pptx`) before Apr 3 13:00 GMT, and finalize LO3 reflection/adaptation notes.

### Interfaces & Automation Specs
- **`weather_push_payload.json`** (or markdown spec) describing the payload fields (location, temperature range, rainfall probability, AQI, outfit suggestion, countdown text, emotional line) so the data contract between the scraper and push layer is explicit.
- **`schedules.yml`** in the repo to document push cadence (time, timezone) plus WeChat template IDs; updates are straightforward for future campus/couple extensions.
- **GitHub Action job** – daily trigger, uses secrets for WeChat keys, records logs, and includes a fallback path (cached/default message + alert) when weather APIs fail.

### Tests & QA Scenarios
1. **Scheduled run validation:** assert the GitHub Actions job runs on time, exits successfully, and logs the payload details to demonstrate criterion 3.
2. **Message content validation:** check the payload contains accurate weather, countdowns, and one randomized emotional line; include boundary tests (heavy rain or typhoon) to prove responsiveness.
3. **Failure handling:** simulate a weather API outage, document the graceful fallback message/alert, and store the log for the team reflection.

### Assumptions & Defaults
- Team size is 5–6 members; adopt the prescribed roles and mention this in deliverables for transparency.
- A WeChat Official Account test environment exists; if not, document a mock template simulator plus the resulting limitations.
- The PPT submission deadline is fixed at Apr 3 13:00 GMT, and presentation week is Apr 6–10; schedule rehearsal and QA during the four days prior.
- AI assistance may draft text but all final artefacts will be reviewed/edited by the team before submission.
