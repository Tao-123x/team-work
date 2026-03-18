# Week 2 Task Assignment

## Project
WeChat Daily Weather Push Agent

## Objective for Week 2
The team should stop discussing at a high level and move into executable delivery. This week's focus is to produce three concrete outputs:

- a working weather data fetch flow
- a working WeChat test message flow
- a documented project management and quality control baseline

## Team Task Allocation

### Tao Jiacheng - Team Leader
- Set up the Trello board with clear columns: `Backlog`, `This Week`, `Doing`, `Review`, `Done`.
- Organize the sprint planning meeting and assign 2-3 specific tasks to each member.
- Create and standardize the basic GitHub repository structure.
- Define simple working rules for branch naming, commit naming, and update frequency.

Deliverables for this week:
- Sprint task list
- Team schedule for the week
- Initial repository structure

### Liu Pengyang - Product Owner
- Write the project requirements clearly, including target users, message content, push timing, and MVP scope.
- Define what must be included in the daily push message, such as weather, temperature, clothing advice, reminder text, and encouragement text.
- Maintain the product backlog and decide which features must be implemented first.

Deliverables for this week:
- `requirements.md`
- `product_backlog.md`

### Wu Sicheng - Quality Controller
- Create the first quality checklist for the project.
- Build the initial risk register, covering API failure, scheduled task failure, WeChat template errors, and missing message content.
- Define clear acceptance criteria for this week's outputs so the team can judge whether tasks are complete.

Deliverables for this week:
- `qa_checklist.md`
- `risk_register.md`

### Dang Xiaofeng - Developer
- Research and test the weather API options.
- Select one main API and one backup API.
- Build a basic script that can input a city and return weather data successfully.
- Extract and document the fields needed by the message generation module.

Deliverables for this week:
- `weather_api_test.py` or equivalent script
- Weather API field notes

### Ma Ruilin - Developer
- Research the WeChat test account and template message process.
- Build a minimum demo that can send a test message successfully, even before weather data is connected.
- Prepare the initial GitHub Actions scheduling approach for daily automated execution.

Deliverables for this week:
- `wechat_push_test.py` or equivalent script
- GitHub Actions draft setup notes

## Weekly Acceptance Targets
- The team can successfully fetch weather data from at least one API.
- The team can successfully send one WeChat test message.
- The team has a usable backlog, checklist, and risk register.

## Recommended Weekly Review Order
1. Dang Xiaofeng demonstrates the weather API result.
2. Ma Ruilin demonstrates the WeChat test push result.
3. Liu Pengyang confirms the final message content and MVP scope.
4. Wu Sicheng reviews the checklist and risk register.
5. Tao Jiacheng updates Trello and confirms the next sprint arrangement.

## Notes
- This task allocation is based on the role assignment recorded in the Week 1 meeting minutes.
- The aim of Week 2 is not to finish the whole system, but to prove that the core technical path is feasible.
- Any blocked task should be reported during the stand-up and moved to review immediately.
