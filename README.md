# Dorm Takeaway Help

## Project Overview
This repository contains the team project for a dormitory takeaway relay mini-program. The team originally explored a WeChat weather push concept, but after review the project direction was changed to a more practical campus scenario: helping students post, accept, and complete dorm takeaway pickup requests.

The current project focuses on an MVP that supports the core delivery flow:
- requester posts a pickup request
- helper accepts the order
- helper updates progress through pickup and delivery
- requester confirms completion
- users can review order progress and related records

## Repository Structure
- `client/`: Uni-app + Vue front-end for the mini-program pages and interaction flows
- `server/`: Express back-end with order, auth, payment, and review APIs
- `business_flow.md`: business process description for the dorm takeaway workflow
- `data_structure.md`: data structure design notes
- `interfaces_and_page_fields.md`: API and page field definitions
- `Week2_Task_Assignment.md`: task breakdown for the current project direction
- `Group 15_*.docx`: English project submission materials
- `*_中文版.docx`: Chinese versions of the team templates

## MVP Scope
### Front End
- entry demo and iteration pages
- order creation page
- order list and detail pages
- profile and my-orders pages

### Back End
- health check endpoint
- authentication and profile endpoints
- order creation, listing, acceptance, cancellation, and status updates
- payment and review routes
- SQLite schema and seed data

## Current Tech Stack
- Front end: Uni-app, Vue 3, Vite
- Back end: Node.js, Express
- Database: SQLite
- Documentation support: Python scripts for generating and translating project forms

## Supporting Scripts
- `fill_project_forms.py`: fills the team project forms with the current team and project information
- `translate_docx_templates.py`: generates Chinese versions of the provided DOCX templates

## Notes
The old weather push concept remains part of the team's early planning history, but the repository's active implementation and recent documents now follow the dorm takeaway mini-program direction.
