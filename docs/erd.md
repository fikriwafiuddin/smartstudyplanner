# Smart Study Planner - Entity Relationship Diagram (ERD)

This document outlines the database schema design for the Smart Study Planner application.

> [!NOTE]
> This ERD uses **Clerk** for authentication. The USERS table stores only the Clerk user ID mapping for database relationships.

## Entity Relationship Diagram

```mermaid
erDiagram
    USERS {
        int id PK
        string clerk_user_id UK "From Clerk"
        timestamp created_at
        timestamp updated_at
    }

    USER_PREFERENCES {
        int id PK
        int user_id FK UK
        string timezone
        int reminder_default_minutes
        int start_of_week "0-6"
        string working_hours_start
        string working_hours_end
        timestamp updated_at
    }

    SEMESTERS {
        int id PK
        int user_id FK
        string name "e.g. Fall 2025"
        date start_date
        date end_date
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    COURSES {
        int id PK
        int user_id FK
        int semester_id FK
        string name
        string code
        string color
        int total_meetings "Total meetings in semester"
        int completed_meetings "Meetings attended"
        timestamp created_at
        timestamp updated_at
    }

    TASKS {
        int id PK
        int user_id FK
        int course_id FK
        int parent_task_id FK "nullable, for subtasks"
        string title
        text description
        date deadline
        enum priority "high|medium|low"
        boolean completed
        int order_index
        timestamp created_at
        timestamp updated_at
    }

    ASSESSMENTS {
        int id PK
        int course_id FK
        int semester_id FK
        enum type "exam|quiz|project|paper|assignment"
        string name
        date date
        float weight_percentage
        float score "nullable"
        float max_score
        string grade "nullable"
        timestamp created_at
        timestamp updated_at
    }

    STUDY_SESSIONS {
        int id PK
        int user_id FK
        int course_id FK "nullable"
        int task_id FK "nullable"
        timestamp started_at
        timestamp ended_at
        int duration_minutes
        text notes
        int focus_rating "1-5"
        timestamp created_at
    }

    SCHEDULES {
        string id PK
        int user_id FK
        int course_id FK "nullable"
        int semester_id FK "nullable"
        enum type "course|activity|event"
        string name
        string code "nullable"
        string lecturer "nullable"
        string organizer "nullable"
        string location
        int day "0-6 Monday-Sunday"
        string start_hour
        string duration
        string color
        text description
        boolean is_recurring
        date event_date "nullable"
        enum status "active|paused|archived"
        date paused_at "nullable"
        timestamp created_at
        timestamp updated_at
    }

    ATTENDANCE_RECORDS {
        int id PK
        int schedule_id FK
        int user_id FK
        date date
        enum status "present|absent|late|excused"
        text notes
        timestamp created_at
    }

    REMINDERS {
        int id PK
        int user_id FK
        int task_id FK "nullable"
        int schedule_id FK "nullable"
        int assessment_id FK "nullable"
        timestamp remind_at
        enum type "push|email"
        boolean is_sent
        timestamp sent_at "nullable"
        timestamp created_at
    }

    RESOURCES {
        int id PK
        int course_id FK
        int user_id FK
        enum type "note|link|file"
        string title
        text content "nullable"
        string url "nullable"
        string file_path "nullable"
        timestamp created_at
        timestamp updated_at
    }

    GROUPS {
        int id PK
        int owner_id FK
        string name
        text description
        string invite_code UK
        string color
        timestamp last_active
        timestamp created_at
        timestamp updated_at
    }

    GROUP_MEMBERS {
        int id PK
        int group_id FK
        int user_id FK
        enum role "owner|admin|member"
        timestamp joined_at
    }

    SHARED_TASKS {
        int id PK
        int group_id FK
        int assignee_id FK "nullable"
        int created_by FK
        string title
        text description
        boolean completed
        timestamp created_at
        timestamp updated_at
    }

    DISCUSSIONS {
        int id PK
        int group_id FK
        int user_id FK
        text message
        timestamp created_at
    }

    %% User relationships
    USERS ||--o| USER_PREFERENCES : "has"
    USERS ||--o{ SEMESTERS : "has"
    USERS ||--o{ TASKS : "has"
    USERS ||--o{ COURSES : "has"
    USERS ||--o{ SCHEDULES : "has"
    USERS ||--o{ STUDY_SESSIONS : "logs"
    USERS ||--o{ REMINDERS : "has"
    USERS ||--o{ ATTENDANCE_RECORDS : "has"
    USERS ||--o{ GROUPS : "owns"
    USERS ||--o{ GROUP_MEMBERS : "joins"
    USERS ||--o{ DISCUSSIONS : "posts"

    %% Semester relationships
    SEMESTERS ||--o{ COURSES : "contains"
    SEMESTERS ||--o{ SCHEDULES : "contains"
    SEMESTERS ||--o{ ASSESSMENTS : "contains"

    %% Course relationships
    COURSES ||--o{ TASKS : "has"
    COURSES ||--o{ SCHEDULES : "linked to"
    COURSES ||--o{ ASSESSMENTS : "has"
    COURSES ||--o{ STUDY_SESSIONS : "studied in"
    COURSES ||--o{ RESOURCES : "has"

    %% Task relationships
    TASKS ||--o{ TASKS : "has subtasks"
    TASKS ||--o{ STUDY_SESSIONS : "worked on"
    TASKS ||--o{ REMINDERS : "has"

    %% Schedule relationships
    SCHEDULES ||--o{ ATTENDANCE_RECORDS : "has"
    SCHEDULES ||--o{ REMINDERS : "has"

    %% Assessment relationships
    ASSESSMENTS ||--o{ REMINDERS : "has"

    %% Group relationships
    GROUPS ||--o{ GROUP_MEMBERS : "has"
    GROUPS ||--o{ SHARED_TASKS : "contains"
    GROUPS ||--o{ DISCUSSIONS : "has"
```

---

## Entity Descriptions

### USERS

Minimal user entity for Clerk integration.

| Column        | Type         | Constraints        | Description       |
| ------------- | ------------ | ------------------ | ----------------- |
| id            | INT          | PK, AUTO_INCREMENT | Unique identifier |
| clerk_user_id | VARCHAR(255) | UNIQUE, NOT NULL   | Clerk user ID     |
| created_at    | TIMESTAMP    | DEFAULT NOW        | Creation time     |
| updated_at    | TIMESTAMP    | ON UPDATE          | Last update time  |

---

### USER_PREFERENCES

User settings and preferences.

| Column                   | Type        | Constraints           | Description           |
| ------------------------ | ----------- | --------------------- | --------------------- |
| id                       | INT         | PK, AUTO_INCREMENT    | Unique identifier     |
| user_id                  | INT         | FK → USERS.id, UNIQUE | User reference        |
| timezone                 | VARCHAR(50) | NOT NULL              | User timezone         |
| reminder_default_minutes | INT         | DEFAULT 30            | Default reminder time |
| start_of_week            | INT         | DEFAULT 0             | 0=Monday, 6=Sunday    |
| working_hours_start      | VARCHAR(5)  | DEFAULT '08:00'       | Work day start        |
| working_hours_end        | VARCHAR(5)  | DEFAULT '22:00'       | Work day end          |
| updated_at               | TIMESTAMP   | ON UPDATE             | Last update time      |

---

### SEMESTERS

Academic semesters.

| Column     | Type         | Constraints        | Description       |
| ---------- | ------------ | ------------------ | ----------------- |
| id         | INT          | PK, AUTO_INCREMENT | Unique identifier |
| user_id    | INT          | FK → USERS.id      | Semester owner    |
| name       | VARCHAR(100) | NOT NULL           | e.g., "Fall 2025" |
| start_date | DATE         | NOT NULL           | Semester start    |
| end_date   | DATE         | NOT NULL           | Semester end      |
| is_active  | BOOLEAN      | DEFAULT FALSE      | Active semester   |
| created_at | TIMESTAMP    | DEFAULT NOW        | Creation time     |
| updated_at | TIMESTAMP    | ON UPDATE          | Last update time  |

---

### COURSES

Courses with meeting tracking.

| Column             | Type         | Constraints        | Description       |
| ------------------ | ------------ | ------------------ | ----------------- |
| id                 | INT          | PK, AUTO_INCREMENT | Unique identifier |
| user_id            | INT          | FK → USERS.id      | Course owner      |
| semester_id        | INT          | FK → SEMESTERS.id  | Parent semester   |
| name               | VARCHAR(100) | NOT NULL           | Course name       |
| code               | VARCHAR(20)  | NULLABLE           | Course code       |
| color              | VARCHAR(50)  | NOT NULL           | UI color          |
| total_meetings     | INT          | NOT NULL           | Total meetings    |
| completed_meetings | INT          | DEFAULT 0          | Attended          |
| created_at         | TIMESTAMP    | DEFAULT NOW        | Creation time     |
| updated_at         | TIMESTAMP    | ON UPDATE          | Last update time  |

---

### TASKS

Tasks with subtask support.

| Column         | Type         | Constraints             | Description         |
| -------------- | ------------ | ----------------------- | ------------------- |
| id             | INT          | PK, AUTO_INCREMENT      | Unique identifier   |
| user_id        | INT          | FK → USERS.id           | Task owner          |
| course_id      | INT          | FK → COURSES.id         | Associated course   |
| parent_task_id | INT          | FK → TASKS.id, NULLABLE | Parent for subtasks |
| title          | VARCHAR(100) | NOT NULL                | Task title          |
| description    | TEXT         | NULLABLE                | Task details        |
| deadline       | DATE         | NOT NULL                | Due date            |
| priority       | ENUM         | 'high','medium','low'   | Priority level      |
| completed      | BOOLEAN      | DEFAULT FALSE           | Completion status   |
| order_index    | INT          | DEFAULT 0               | Sort order          |
| created_at     | TIMESTAMP    | DEFAULT NOW             | Creation time       |
| updated_at     | TIMESTAMP    | ON UPDATE               | Last update time    |

---

### ASSESSMENTS

Exams, quizzes, and graded assignments.

| Column            | Type         | Constraints                                  | Description       |
| ----------------- | ------------ | -------------------------------------------- | ----------------- |
| id                | INT          | PK, AUTO_INCREMENT                           | Unique identifier |
| course_id         | INT          | FK → COURSES.id                              | Parent course     |
| semester_id       | INT          | FK → SEMESTERS.id                            | Parent semester   |
| type              | ENUM         | 'exam','quiz','project','paper','assignment' | Type              |
| name              | VARCHAR(100) | NOT NULL                                     | Assessment name   |
| date              | DATE         | NOT NULL                                     | Due/exam date     |
| weight_percentage | FLOAT        | NOT NULL                                     | Grade weight      |
| score             | FLOAT        | NULLABLE                                     | Achieved score    |
| max_score         | FLOAT        | NOT NULL                                     | Maximum score     |
| grade             | VARCHAR(5)   | NULLABLE                                     | Letter grade      |
| created_at        | TIMESTAMP    | DEFAULT NOW                                  | Creation time     |
| updated_at        | TIMESTAMP    | ON UPDATE                                    | Last update time  |

---

### STUDY_SESSIONS

Track actual study time.

| Column           | Type      | Constraints               | Description       |
| ---------------- | --------- | ------------------------- | ----------------- |
| id               | INT       | PK, AUTO_INCREMENT        | Unique identifier |
| user_id          | INT       | FK → USERS.id             | Session owner     |
| course_id        | INT       | FK → COURSES.id, NULLABLE | Course studied    |
| task_id          | INT       | FK → TASKS.id, NULLABLE   | Task worked on    |
| started_at       | TIMESTAMP | NOT NULL                  | Start time        |
| ended_at         | TIMESTAMP | NULLABLE                  | End time          |
| duration_minutes | INT       | NOT NULL                  | Duration          |
| notes            | TEXT      | NULLABLE                  | Session notes     |
| focus_rating     | INT       | 1-5                       | Focus level       |
| created_at       | TIMESTAMP | DEFAULT NOW               | Creation time     |

---

### SCHEDULES

Weekly schedule items with soft-stop.

| Column       | Type         | Constraints                  | Description       |
| ------------ | ------------ | ---------------------------- | ----------------- |
| id           | VARCHAR(36)  | PK (UUID)                    | Unique identifier |
| user_id      | INT          | FK → USERS.id                | Owner             |
| course_id    | INT          | FK → COURSES.id, NULLABLE    | Linked course     |
| semester_id  | INT          | FK → SEMESTERS.id, NULLABLE  | Semester          |
| type         | ENUM         | 'course','activity','event'  | Item type         |
| name         | VARCHAR(100) | NOT NULL                     | Item name         |
| code         | VARCHAR(20)  | NULLABLE                     | Course code       |
| lecturer     | VARCHAR(100) | NULLABLE                     | Lecturer          |
| organizer    | VARCHAR(100) | NULLABLE                     | Organizer         |
| location     | VARCHAR(100) | NOT NULL                     | Location          |
| day          | INT          | 0-6                          | Day of week       |
| start_hour   | VARCHAR(5)   | NOT NULL                     | Start time        |
| duration     | VARCHAR(10)  | NOT NULL                     | Duration          |
| color        | VARCHAR(50)  | NOT NULL                     | UI color          |
| description  | TEXT         | NULLABLE                     | Details           |
| is_recurring | BOOLEAN      | DEFAULT TRUE                 | Recurring         |
| event_date   | DATE         | NULLABLE                     | One-time date     |
| status       | ENUM         | 'active','paused','archived' | Status            |
| paused_at    | DATE         | NULLABLE                     | Pause date        |
| created_at   | TIMESTAMP    | DEFAULT NOW                  | Creation time     |
| updated_at   | TIMESTAMP    | ON UPDATE                    | Last update time  |

> [!IMPORTANT]
> **Soft-stop**: Set `status = 'paused'` to disable without deleting.

---

### ATTENDANCE_RECORDS

Track class attendance.

| Column      | Type      | Constraints                         | Description       |
| ----------- | --------- | ----------------------------------- | ----------------- |
| id          | INT       | PK, AUTO_INCREMENT                  | Unique identifier |
| schedule_id | INT       | FK → SCHEDULES.id                   | Schedule item     |
| user_id     | INT       | FK → USERS.id                       | User              |
| date        | DATE      | NOT NULL                            | Attendance date   |
| status      | ENUM      | 'present','absent','late','excused' | Attendance        |
| notes       | TEXT      | NULLABLE                            | Notes             |
| created_at  | TIMESTAMP | DEFAULT NOW                         | Creation time     |

---

### REMINDERS

Notifications for tasks, schedules, and assessments.

| Column        | Type      | Constraints                   | Description       |
| ------------- | --------- | ----------------------------- | ----------------- |
| id            | INT       | PK, AUTO_INCREMENT            | Unique identifier |
| user_id       | INT       | FK → USERS.id                 | Owner             |
| task_id       | INT       | FK → TASKS.id, NULLABLE       | Task reference    |
| schedule_id   | INT       | FK → SCHEDULES.id, NULLABLE   | Schedule ref      |
| assessment_id | INT       | FK → ASSESSMENTS.id, NULLABLE | Assessment ref    |
| remind_at     | TIMESTAMP | NOT NULL                      | Reminder time     |
| type          | ENUM      | 'push','email'                | Notification type |
| is_sent       | BOOLEAN   | DEFAULT FALSE                 | Sent status       |
| sent_at       | TIMESTAMP | NULLABLE                      | When sent         |
| created_at    | TIMESTAMP | DEFAULT NOW                   | Creation time     |

---

### RESOURCES

Study materials per course.

| Column     | Type         | Constraints          | Description       |
| ---------- | ------------ | -------------------- | ----------------- |
| id         | INT          | PK, AUTO_INCREMENT   | Unique identifier |
| course_id  | INT          | FK → COURSES.id      | Parent course     |
| user_id    | INT          | FK → USERS.id        | Owner             |
| type       | ENUM         | 'note','link','file' | Resource type     |
| title      | VARCHAR(100) | NOT NULL             | Title             |
| content    | TEXT         | NULLABLE             | Note content      |
| url        | VARCHAR(500) | NULLABLE             | Link URL          |
| file_path  | VARCHAR(500) | NULLABLE             | File path         |
| created_at | TIMESTAMP    | DEFAULT NOW          | Creation time     |
| updated_at | TIMESTAMP    | ON UPDATE            | Last update time  |

---

### GROUPS

Study groups.

| Column      | Type         | Constraints        | Description       |
| ----------- | ------------ | ------------------ | ----------------- |
| id          | INT          | PK, AUTO_INCREMENT | Unique identifier |
| owner_id    | INT          | FK → USERS.id      | Creator           |
| name        | VARCHAR(100) | NOT NULL           | Name              |
| description | TEXT         | NULLABLE           | Description       |
| invite_code | VARCHAR(20)  | UNIQUE, NOT NULL   | Join code         |
| color       | VARCHAR(50)  | NOT NULL           | UI color          |
| last_active | TIMESTAMP    | DEFAULT NOW        | Last activity     |
| created_at  | TIMESTAMP    | DEFAULT NOW        | Creation time     |
| updated_at  | TIMESTAMP    | ON UPDATE          | Last update time  |

---

### GROUP_MEMBERS

Group membership.

| Column    | Type      | Constraints              | Description       |
| --------- | --------- | ------------------------ | ----------------- |
| id        | INT       | PK, AUTO_INCREMENT       | Unique identifier |
| group_id  | INT       | FK → GROUPS.id           | Group             |
| user_id   | INT       | FK → USERS.id            | Member            |
| role      | ENUM      | 'owner','admin','member' | Role              |
| joined_at | TIMESTAMP | DEFAULT NOW              | Join time         |

> **Unique Constraint**: (group_id, user_id)

---

### SHARED_TASKS

Group tasks.

| Column      | Type         | Constraints             | Description       |
| ----------- | ------------ | ----------------------- | ----------------- |
| id          | INT          | PK, AUTO_INCREMENT      | Unique identifier |
| group_id    | INT          | FK → GROUPS.id          | Group             |
| assignee_id | INT          | FK → USERS.id, NULLABLE | Assignee          |
| created_by  | INT          | FK → USERS.id           | Creator           |
| title       | VARCHAR(100) | NOT NULL                | Title             |
| description | TEXT         | NULLABLE                | Details           |
| completed   | BOOLEAN      | DEFAULT FALSE           | Completed         |
| created_at  | TIMESTAMP    | DEFAULT NOW             | Creation time     |
| updated_at  | TIMESTAMP    | ON UPDATE               | Last update time  |

---

### DISCUSSIONS

Group messages.

| Column     | Type      | Constraints        | Description       |
| ---------- | --------- | ------------------ | ----------------- |
| id         | INT       | PK, AUTO_INCREMENT | Unique identifier |
| group_id   | INT       | FK → GROUPS.id     | Group             |
| user_id    | INT       | FK → USERS.id      | Author            |
| message    | TEXT      | NOT NULL           | Content           |
| created_at | TIMESTAMP | DEFAULT NOW        | Post time         |

---

## Relationships Summary

| Relationship                   | Type | Description                   |
| ------------------------------ | ---- | ----------------------------- |
| USERS → USER_PREFERENCES       | 1:1  | User has one preference set   |
| USERS → SEMESTERS              | 1:N  | User has many semesters       |
| USERS → COURSES                | 1:N  | User owns many courses        |
| USERS → TASKS                  | 1:N  | User owns many tasks          |
| USERS → STUDY_SESSIONS         | 1:N  | User logs many sessions       |
| USERS → SCHEDULES              | 1:N  | User owns many schedules      |
| USERS → REMINDERS              | 1:N  | User has many reminders       |
| USERS → ATTENDANCE_RECORDS     | 1:N  | User has attendance records   |
| SEMESTERS → COURSES            | 1:N  | Semester contains courses     |
| SEMESTERS → SCHEDULES          | 1:N  | Semester contains schedules   |
| SEMESTERS → ASSESSMENTS        | 1:N  | Semester contains assessments |
| COURSES → TASKS                | 1:N  | Course has many tasks         |
| COURSES → ASSESSMENTS          | 1:N  | Course has assessments        |
| COURSES → STUDY_SESSIONS       | 1:N  | Course has study sessions     |
| COURSES → RESOURCES            | 1:N  | Course has resources          |
| COURSES → SCHEDULES            | 1:N  | Course has schedule items     |
| TASKS → TASKS                  | 1:N  | Task has subtasks             |
| TASKS → STUDY_SESSIONS         | 1:N  | Task has study sessions       |
| TASKS → REMINDERS              | 1:N  | Task has reminders            |
| SCHEDULES → ATTENDANCE_RECORDS | 1:N  | Schedule has attendance       |
| SCHEDULES → REMINDERS          | 1:N  | Schedule has reminders        |
| ASSESSMENTS → REMINDERS        | 1:N  | Assessment has reminders      |
| GROUPS → GROUP_MEMBERS         | 1:N  | Group has members             |
| GROUPS → SHARED_TASKS          | 1:N  | Group has shared tasks        |
| GROUPS → DISCUSSIONS           | 1:N  | Group has discussions         |
