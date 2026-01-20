# Product Requirements Document (PRD)

## Product Name

Daily Planner

## Overview

The Daily Planner is a minimalist, daily-first planning application inspired by tools like Sunsama. It helps an individual intentionally plan each day by managing **tasks**, **habits**, and **goals** in one calm, focused interface. The product prioritizes clarity, simplicity, and cross-device consistency.

The application is built with **SvelteKit**, **DaisyUI**, **PostgreSQL**, **Drizzle ORM**, and **Better Auth**, and is intended for personal use across multiple devices (desktop and mobile browsers).

---

## Goals & Objectives

### Primary Goals

* Enable intentional **daily planning** as a core habit
* Reduce cognitive overload compared to traditional task managers
* Provide seamless cross-device access with secure authentication

### Success Metrics

* User can fully plan their day in under 2 minutes
* Tasks, habits, and goals sync correctly across devices
* Daily completion rate is clearly visible and understandable

---

## Target User

* Single user (self)
* Knowledge worker or student
* Uses multiple devices (laptop + phone)
* Values simplicity, focus, and routine over advanced automation

---

## Key Principles

* **Daily-first**: The app always opens to Today
* **Minimalist UI**: No clutter, no unnecessary features
* **Intentionality**: User actively chooses what to work on today
* **Local-feeling**: Fast, responsive, calm

---

## Core Features

### 1. Authentication (Must Have)

* Email + password authentication
* Secure session-based auth using Better Auth
* HTTP-only cookies
* No social login for MVP

---

### 2. Daily Planning View (Must Have)

**Description**
The Today view is the heart of the application and the default landing page after login.

**Includes**:

* Tasks scheduled for today
* Habits due today
* Quick-add input for new tasks
* Simple visual summary of daily progress

---

### 3. Task Management (Must Have)

**Capabilities**:

* Create, edit, complete, and delete tasks
* Assign tasks to a date (default: today)
* Optional association with a goal

**Task Priority**:

* Simple numeric priority:

  * 1 = High
  * 2 = Medium (default)
  * 3 = Low
* Tasks are sorted by priority within the day

---

### 4. Task Rollover (Should Have)

* Incomplete tasks automatically roll over to the next day
* Rollover happens silently on first app load of a new day
* No notifications or prompts

---

### 5. Habit Tracking (Must Have)

**Capabilities**:

* Define habits with a frequency:

  * Daily
  * Specific weekdays
* Mark habit completion per day
* Track completion history

---

### 6. Goals (Must Have)

**Purpose**:

* Represent long-term intentions
* Provide context for tasks and habits

**Capabilities**:

* Create and edit goals
* Link tasks and habits to a goal
* View goal-related items together

---

## Secondary Features

### Should Have

* Daily completion summary
* Habit streak indicators
* Mobile-responsive layout

### Could Have

* Light/Dark theme toggle
* Weekly review view
* Keyboard-first quick add

### Won’t Have (MVP)

* Team collaboration
* Notifications or reminders
* Calendar integrations
* AI planning or suggestions

---

## User Flow (High-Level)

1. User logs in
2. App opens to **Today**
3. User adds or adjusts today’s tasks
4. User completes tasks and habits
5. Incomplete tasks roll over automatically

---

## Non-Functional Requirements

* Fast page load (< 1s on typical connection)
* Works reliably across devices
* Secure handling of credentials
* Data integrity across sessions

---

## Out of Scope

* Native mobile apps
* Offline-first support
* External integrations

---

## Future Considerations

* Magic link authentication
* Calendar integrations
* Data export
* Progressive Web App (PWA)

---

## Reference Products

* **Sunsama** – Daily intentional planning
* **Todoist** – Simple task prioritization
* **Loop Habit Tracker** – Habit completion model
