# Database Schema Overview

## Collection Relationships

```mermaid
erDiagram
    USER ||--o{ PRODUCT : "owns"
    USER ||--o{ ORDER : "places"
    USER ||--o{ MESSAGE : "sends/receives"
    USER ||--o{ REPORT : "submits"
    PRODUCT ||--o{ REPORT : "is reported"
    ORDER ||--o{ ORDER_ITEM : "contains"
```

## Schema Definitions

### User
| Field | Type | Note |
| :--- | :--- | :--- |
| _id | ObjectId | Auto-generated |
| name | String | Full name |
| email | String | Unique |
| password | String | Hashed |
| studentId | String | University ID |
| isAdmin | Boolean | Admin privileges |
| isSuspended | Boolean | Account status |

### Product
| Field | Type | Note |
| :--- | :--- | :--- |
| seller | ObjectId | Ref: User |
| title | String | Listing name |
| image | String | Path to image |
| category | String | Electronics/Books/etc. |
| condition | String | Brand New/Used/etc. |
| price | Number | BDT |
| status | String | Available/Sold |

### Message
| Field | Type | Note |
| :--- | :--- | :--- |
| sender | ObjectId | Ref: User |
| receiver | ObjectId | Ref: User |
| content | String | Text content |
| isRead | Boolean | Notification status |
