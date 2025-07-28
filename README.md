<h1>Skillsphere - "A Smarter Way to Onboard, Learn, and Grow."</h1>

## Overview
Skillsphere is an AI-driven training management platform that decomposes the onboarding workflow into specialized agents, ensuring efficient coordination, comprehensive tracking, and seamless reporting. The system caters to both trainees and administrators, providing a centralized control hub via a rich web-based user interface.

---

## Problem Statement
Onboarding new Mavericks involves a complex two-phase program—Foundation and Role-Specific Training—covering functional, behavioral, and technical skills through experiential, project-based methods, augmented with gamification.

Key challenges include:
- Managing multiple touch points for communication and support
- Structuring a daily learning schedule with quizzes, coding challenges, and assessments
- Tracking various assessment scores and certifications
- Maintaining detailed candidate profiles accessible for analysis
- Generating detailed reports for insights and record-keeping

Skillsphere aims to address these challenges by creating an integrated, automated training management solution.

---

## Solution Approach
The core of Skillsphere is an open-source AI multi-agent framework. These agents work collaboratively to automate and manage different aspects of the training process:

- **Onboarding Agent**: Creates personalized onboarding plans and evaluates assessment feedback.
- **Assessment Agent**: Tracks scores from quizzes, coding challenges, assignments, and certifications.
- **Profile Agent**: Maintains and updates comprehensive fresher profiles.
- **Reporting Agent**: Generates downloadable reports summarizing assessments and progress.

The agents communicate and coordinate to ensure a smooth learning experience, with all control and status updates accessible via a web UI.

---

## Agents & Their Roles

| Agent             | Inputs                                               | Outputs                                       | Responsibilities & AI Use                                              |
|-------------------|-----------------------------------------------------|----------------------------------------------|------------------------------------------------------------------------|
| **Onboarding Agent** | Fresher profiles, training schedules             | Personalized onboarding plans                | Creates tailored onboarding pathways, provides feedback on assessments |
| **Assessment Agent** | Assessment scores, certification completions     | Assessment scores, feedback                  | Tracks and evaluates trainee performance                                |
| **Profile Agent**    | Progress updates                                   | Updated fresher profiles                     | Maintains and updates profiles in real-time                            |
| **Reporting Agent**  | Assessment data, profile updates                   | Downloadable reports                         | Provides comprehensive training progress and performance reports     |

---

## Web UI Features

### For Fresher Candidates:
- **Training Status Dashboard**
  - Daily Quiz Status: Completed / Pending
  - Coding Challenge Progress: Not Started / In Progress / Completed
  - Assignment Submissions: Submitted / Pending
  - Certification Status: Completed / In Progress
- **Real-Time Workflow Progress Bar**
  - Action items:
    - Profile Updated
    - Daily Quiz Completed
    - Coding Challenge Submitted
    - Assignment Submitted
    - Certification Completed

### For Administrators:
- **Fresher Search & Filters**
  - Filter by skill, department, status, etc.
- **Admin Console**
  - View agent queues, latencies, error rates
  - Generate reports by individual or department

This feature set ensures transparency, quick access to trainee data, and streamlined management.

---

## Technologies Used
- Open-source AI multi-agent frameworks
- Web technologies: HTML, CSS, React js(frontend)
- Backend server: Node.js /Express js, Python Flask 
- Database: Mongo DB

 ### Authors:
Deekshika G P
Dhanushiyaa P
D Mohamed Vaheen
Karthikeyan S M


