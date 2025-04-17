<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Simple test route to verify API routes are working
Route::get('/test', function () {
    return response()->json(['message' => 'API is working']);
});

// Authentication Routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Logout Route
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // User Management Routes
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    
    // Additional Resource Routes can be added here
    // Example of a resource route:
    // Route::apiResource('products', ProductController::class);
});

// Post management endpoints
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('posts', \App\Http\Controllers\API\PostController::class);
});
// Simple Posts API (minimal version)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('simple-posts', \App\Http\Controllers\API\SimplePostController::class);
});
