# Laravel Backend Project

A RESTful API backend built with Laravel 12.x, providing a solid foundation for web applications and mobile apps. This project includes user authentication, data management, and API endpoints with proper documentation.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Configuration](#database-configuration)
- [API Documentation](#api-documentation)
- [Creating New APIs](#creating-new-apis)
- [Simple vs Complex API Implementation](#simple-vs-complex-api-implementation)
- [Testing](#testing)

## Project Overview

This Laravel backend provides a robust API for client applications. Key features include:

- User authentication and authorization
- RESTful API architecture
- SQLite database integration
- Comprehensive API documentation
- Test suite for reliable development

## Installation

### Prerequisites

- PHP 8.4 or higher
- Composer
- SQLite PDO extension enabled

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/gaganSharma/laravel-backend-project.git
   cd laravel-backend-project
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Start the development server:
   ```bash
   php artisan serve
   ```

   The API will be available at `http://127.0.0.1:8000`

## Environment Setup

The `.env` file contains important configuration for your application. Key settings include:

```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=sqlite
# DB_DATABASE=absolute/path/to/database.sqlite

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
```

## Database Configuration

This project uses SQLite for database storage. To set up the database:

1. Ensure the SQLite PDO extension is enabled in PHP
2. The database file is located at `database/database.sqlite`
3. Run migrations to create tables:
   ```bash
   php artisan migrate
   ```

To seed the database with test data:
```bash
php artisan db:seed
```

## API Documentation

### Authentication

| Method | Endpoint           | Description                    | Parameters                       |
|--------|-------------------|--------------------------------|----------------------------------|
| POST   | `/api/register`   | Register a new user            | name, email, password            |
| POST   | `/api/login`      | User login                     | email, password                  |
| POST   | `/api/logout`     | User logout (requires token)   | -                                |

### User Management

| Method | Endpoint           | Description                    | Parameters                       |
|--------|-------------------|--------------------------------|----------------------------------|
| GET    | `/api/user`       | Get authenticated user details | -                                |
| PUT    | `/api/user`       | Update user information        | name, email, etc.                |

### Posts Management

| Method | Endpoint           | Description                    | Parameters                       |
|--------|-------------------|--------------------------------|----------------------------------|
| GET    | `/api/posts`      | List all posts                 | ?user_id, ?is_published, ?sort_by, ?sort_dir |
| POST   | `/api/posts`      | Create a new post              | title, content, [is_published]   |
| GET    | `/api/posts/{id}` | Get a specific post            | -                                |
| PUT    | `/api/posts/{id}` | Update a post                  | title, content, is_published     |
| DELETE | `/api/posts/{id}` | Delete a post                  | -                                |

### Simple Posts (Minimal API Example)

| Method | Endpoint                | Description                    | Parameters                       |
|--------|------------------------|--------------------------------|----------------------------------|
| GET    | `/api/simple-posts`    | List all simple posts          | -                                |
| POST   | `/api/simple-posts`    | Create a new simple post       | title, content                   |
| GET    | `/api/simple-posts/{id}` | Get a specific simple post    | -                                |
| PUT    | `/api/simple-posts/{id}` | Update a simple post          | title, content                   |
| DELETE | `/api/simple-posts/{id}` | Delete a simple post          | -                                |

### Other Resources

Additional endpoints will be added as the API develops. The standard RESTful convention is followed:

- GET `/api/resource` - List all resources
- POST `/api/resource` - Create a new resource
- GET `/api/resource/{id}` - Get a specific resource
- PUT `/api/resource/{id}` - Update a specific resource
- DELETE `/api/resource/{id}` - Delete a specific resource

## Creating New APIs

### Step-by-Step Guide to Creating a Basic API

Here's how to create a simple API endpoint in Laravel:

1. **Create the migration**:

```bash
php artisan make:migration create_items_table
```

Then define your table structure:

```php
Schema::create('items', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->text('description')->nullable();
    $table->foreignId('user_id')->constrained();
    $table->timestamps();
});
```

2. **Create the model**:

```bash
php artisan make:model Item
```

Define your model:

```php
class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

3. **Create the controller**:

```bash
php artisan make:controller API/ItemController --api
```

Implement basic CRUD operations:

```php
class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();
        $item = Item::create($validated);

        return response()->json($item, 201);
    }

    public function show($id)
    {
        $item = Item::findOrFail($id);
        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $item->update($validated);
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Item deleted']);
    }
}
```

4. **Add the route**:

In your `routes/api.php` file:

```php
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('items', \App\Http\Controllers\API\ItemController::class);
});
```

5. **Run migrations**:

```bash
php artisan migrate
```

That's it! You now have a fully functional API with these endpoints:

- `GET /api/items` - List all items
- `POST /api/items` - Create a new item
- `GET /api/items/{id}` - Get a specific item
- `PUT /api/items/{id}` - Update an item
- `DELETE /api/items/{id}` - Delete an item

## Simple vs Complex API Implementation

### Simple API Implementation (Minimal Approach)

A simple API implementation includes only the essential components:

1. **Model**: Basic Eloquent model with fillable properties
2. **Migration**: Table structure definition
3. **Controller**: Direct validation in controller methods
4. **Routes**: Basic resource routing

**Pros**:
- Quick to implement
- Less files to maintain
- Simple structure

**Cons**:
- Limited customization of responses
- No separation of validation logic
- Can become harder to maintain as complexity grows

### Complex API Implementation (Production Approach)

A more robust API implementation includes:

1. **Model**: Eloquent model with relationships, scopes, and casts
2. **Migration**: Comprehensive table structure
3. **Form Requests**: Separate validation classes
4. **API Resources**: Response transformation classes
5. **Controller**: Slim controllers using Form Requests and Resources
6. **Policies**: Authorization logic
7. **Routes**: Resource routing with additional custom routes

**Pros**:
- Better separation of concerns
- More maintainable and scalable
- Consistent response structure
- Easier to test and debug

**Cons**:
- More initial setup time
- More files to create and manage

### When to Use Each Approach

**Use Simple Implementation for**:
- Prototypes
- Simple CRUD operations
- Internal APIs
- Learning exercises

**Use Complex Implementation for**:
- Production applications
- Public-facing APIs
- APIs with complex business logic
- Projects that need to scale

## Testing

Run the test suite with:
```bash
php artisan test
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
