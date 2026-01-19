# Backend Project Rules & Architecture Guidelines

## General Principles

- This project is a **Node.js backend application** built with **Express**.
- The architecture follows a **layered structure** to enforce separation of concerns.
- **AI agents or collaborators must strictly follow these rules** and **must not introduce new conventions or patterns** without explicit instruction.
- Error handling is centralized using a custom `errorMiddleware`.
- All responses **must use standardized response classes** (`SuccessResponse`, `ErrorResponse`).

---

## Technologies Used

Primary stack:

- JavaScript (ES Modules)
- Node.js
- Express
- Prisma
- PostgreSQL
- Supabase
- Clerk (Authentication)
- Zod (Validation)
- Morgan (HTTP logging)
- Winston (Application logging)

Additional technologies may be introduced later if required.

---

## Project Structure Overview

```
src/
├── routers/
├── controllers/
├── validations/
├── services/
├── repositories/
├── domains/        (optional, future layer)
├── lib/
├── utils/
└── middlewares/
```

---

## 1. Routers Layer

**Purpose:**
Handle HTTP routing and map endpoints to controllers.

### Rules

- Each feature/module has its own router file
  Example:
  - `userRouter.js`
  - `categoryRouter.js`

- There is a **main router file** that aggregates all module routers.

### Main Router File

- The main router file (e.g. `router.js`) is the entry point for all routes.
- Each route must use a **plural noun** as the route prefix.

Example:

```js
const router = express.Router()

router.use("/categories", categoryRouter)
router.use("/transactions", transactionRouter)

router.all(/.*/, (req, res) =>
  res.status(404).json(new ErrorResponse("Route not found", 404)),
)

router.use(errorMiddleware)

export default router
```

### Important Notes

- No business logic is allowed in routers.
- Routers only delegate requests to controllers.
- The `errorMiddleware` **must be registered last**.

---

## 2. Controllers Layer

**Purpose:**
Handle HTTP requests and responses.

### Rules

- Controllers are responsible for:
  - Reading request data (`req.body`, `req.params`, `req.query`, `req.user`)
  - Calling validation
  - Calling services
  - Returning HTTP responses

- Controllers **must not contain business logic**.
- For common/simple CRUD operations, **only the following methods are allowed**:
  - `create`
  - `getAll`
  - `update`
  - `remove`

### Error Handling

- Controllers **must not handle errors directly**.
- Use `next(error)` inside `catch`.
- All errors are handled by the global `errorMiddleware`.

### Response Format

- Success responses must use `SuccessResponse`.
- Controllers must not construct error responses directly.

### Example Controller

```js
const create = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body
    const validatedData = await validate(request, schema)
    const category = await categoryService.create(validatedData, user)

    return res
      .status(201)
      .json(new SuccessResponse("Category successfully created", category))
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    // implementation
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    // implementation
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    // implementation
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  create,
  update,
  remove,
  getAll,
}

export default categoryController
```

---

## 3. Validations Layer

**Purpose:**
Validate incoming request data before it reaches the business logic.

### Rules

- Validation uses **Zod**.
- Each module may define its own Zod schemas.
- There is a shared file named `validation.js`.

### `validation.js`

- Exposes a function that:
  - Accepts two parameters:
    1. `schema` (Zod schema)
    2. `data` (request data)

  - Throws an `ErrorResponse` if validation fails.

- The controller is responsible for calling validation.
- The validated data is then passed to the services layer.

---

## 4. Services Layer

**Purpose:**
Contain business logic.

### Rules

- Naming and export structure must match controllers.
- Services:
  - Receive validated data
  - Implement business rules
  - Coordinate repositories and other services

- If an error occurs:
  - **Immediately throw an `ErrorResponse`**
  - Do not catch errors unless necessary

### Example

```js
const create = async (request, user) => {
  if (!user) {
    throw new ErrorResponse("Unauthorized", 401)
  }

  // business logic here
}

export default {
  create,
}
```

---

## 5. Repositories Layer

**Purpose:**
Handle all database access.

### Rules

- Only database queries are allowed in this layer.
- Uses Prisma for database interaction.
- Naming and export structure must match services and controllers.
- No business logic or HTTP logic is allowed here.
- Errors may be thrown as `ErrorResponse` if needed.

---

## 6. Domains Layer (Future)

**Purpose:**
Introduce an additional abstraction when services become too complex.

### Rules

- This layer sits **between services and repositories**.
- It encapsulates complex domain logic.
- Only introduced when necessary.
- Services may delegate complex logic to domains.

---

## 7. Responses

### SuccessResponse

```js
class SuccessResponse {
  constructor(message, data = {}, meta = {}) {
    this.success = true
    this.message = message
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}
```

### ErrorResponse

```js
class ErrorResponse {
  constructor(message, status = 500, errors = {}, data = {}, meta = {}) {
    this.success = false
    this.message = message
    this.status = status
    this.errors = errors
    this.data = data
    this.meta = {
      timestamp: new Date().toISOString(),
      ...meta,
    }
  }
}
```

---

## 8. `lib` and `utils` Folders

### `lib`

- Used for:
  - Third-party integrations
  - SDK wrappers
  - External service initializations (e.g. Clerk, Supabase)

### `utils`

- Used for:
  - Pure helper functions
  - Formatting helpers
  - Reusable, stateless utilities

---

## Final Notes for AI Agents & Collaborators

- Do not introduce new layers, patterns, or naming conventions.
- Follow this structure strictly.
- If a requirement is unclear, **ask before implementing**.
- Consistency is more important than creativity in this project.
- Use camel case for file naming
