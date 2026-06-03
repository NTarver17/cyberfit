# GitHub Issues Tracking & Workflow Guide for AI Dev Agents

Welcome! As an AI dev agent working on the **CyberFit** codebase, you are required to strictly follow this guide to track all development tasks, bugs, features, and milestones using GitHub Issues. 

Maintaining a clean and updated issue tracker is essential for team alignment and project health.

---

## 🛠️ MCP Tools for GitHub Integration
Ensure you use the correct tools to interact with GitHub:
*   `list_issues`: Fetch existing issues.
*   `issue_write`: Create new issues or update issue states (e.g., open, closed).
*   `add_issue_comment`: Add comments, updates, and progress logs to an issue.
*   `create_pull_request`: Submit pull requests linked to issues.

---

## 🔄 The Issue Lifecycle Workflow

Every development action must be represented by a GitHub Issue. Follow this workflow for every task:

### 1. Initial State Alignment (Start of Chat/Task)
Before writing any code or proposing plans:
1.  **Retrieve Current Issues**: Call `list_issues` to understand the active backlog and milestones.
2.  **Locate or Create the Issue**:
    *   If an issue already exists for your task, proceed to step 2.
    *   If no issue exists, **create one** before writing any code.

### 2. Creating an Issue (If Not Found)
Use the `issue_write` tool to create a new issue.
*   **Title**: Keep it action-oriented (e.g., `feat: Add booking flow to landing page` or `fix: Align hero background gradient on mobile`).
*   **Description**: Must include:
    *   **Context**: Why this is being done.
    *   **Acceptance Criteria (AC)**: A checklist of required outcomes.
    *   **Milestone**: Link the issue to the relevant active Milestone.

*Example Issue Body:*
```markdown
### 📝 Description
Implement custom micro-interactions and hover animations on the features section to enhance premium feel.

### ✅ Acceptance Criteria
- [ ] Hovering over feature cards adds a subtle glassmorphism scaling effect (+3% size).
- [ ] Transition duration is set to 0.3s ease-in-out.
- [ ] Active states work correctly on mobile touch.
- [ ] Performance does not drop (no layout shifts, GPU-accelerated transforms used).
```

### 3. Starting Work (In-Progress)
Once the issue is identified or created:
1.  **Comment on the Issue**: Add a comment stating you are beginning work (e.g., *"Starting implementation of this task now."*).
2.  **Work on a Branch**: If creating a branch, name it to match the issue number (e.g., `feature/123-hover-animations` or `bugfix/142-gradient-leak`).

### 4. Progress Updates (Optional but Encouraged)
For multi-step or long-running tasks:
*   Comment on the issue with intermediate findings, architecture decisions, or blockers.
*   If blocked, add details clearly explaining the roadblock.

### 5. Completion & Verification
Once the implementation is complete and verified:
*   **If working via PR**: When creating a Pull Request, reference the issue in the description using GitHub keywords (e.g., `Closes #123` or `Fixes #123`). This will auto-close the issue on merge.
*   **If merging directly or working on a single branch**: Manually close the issue by updating its state to `closed` via `issue_write`, and leave a final comment detailing what was accomplished.

---

## 🎯 Milestones and Release Tracking
*   **Milestone Check**: Always check if the user has active milestones (e.g., `v1.1 - Polish & Micro-interactions`).
*   **Association**: Always associate issues with the current active milestone.
*   **Milestone Updates**: When all issues under a milestone are resolved, notify the user so the milestone can be closed.

---

## ⚠️ Critical Rules for AI Agents
1.  **No Issue, No Code**: Do not write, modify, or commit code without a corresponding GitHub Issue (either existing or created by you).
2.  **Real-Time Status**: Never delay closing an issue or posting comments. Do it immediately as actions occur.
3.  **Clean Git Messages**: When making commits, include the issue number in the commit message (e.g., `feat: implement feature card scaling (#123)`).
