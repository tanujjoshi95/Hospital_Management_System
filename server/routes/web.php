<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Test route to verify web routes are working
Route::get('/test-web', function () {
    return 'Web routes are working';
});
