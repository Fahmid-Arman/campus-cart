# Database Design

## Database: MongoDB
The system uses MongoDB as a NoSQL database, organized into the following collections:

### 1. Users
Stores user information and authentication details.
- `name`: String
- `email`: String (Unique)
- `password`: String (Hashed)
- `studentId`: String
- `isAdmin`: Boolean
- `isSuspended`: Boolean
- `timestamps`: CreatedAt, UpdatedAt

### 2. Products
Stores marketplace listings.
- `seller`: ObjectId (Reference to User)
- `title`: String
- `image`: String
- `category`: String
- `condition`: String
- `description`: String
- `price`: Number
- `status`: String (Available/Sold)
- `timestamps`: CreatedAt, UpdatedAt

### 3. Messages
Stores buyer-seller communications.
- `sender`: ObjectId (Reference to User)
- `receiver`: ObjectId (Reference to User)
- `content`: String
- `isRead`: Boolean
- `timestamps`: CreatedAt, UpdatedAt

### 4. Reports
Stores flagged content for moderation.
- `reporter`: ObjectId (Reference to User)
- `reportedUser`: ObjectId (Reference to User)
- `reportedProduct`: ObjectId (Reference to Product)
- `reason`: String
- `status`: String (Pending/Resolved)
- `timestamps`: CreatedAt, UpdatedAt

### 5. Orders
Stores purchase transactions.
- `user`: ObjectId (Reference to User)
- `orderItems`: Array of Product references
- `totalPrice`: Number
- `isPaid`: Boolean
- `isDelivered`: Boolean
- `timestamps`: CreatedAt, UpdatedAt
