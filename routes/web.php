<?php

use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

// Route::get('/', function () {
//     return view('app');
// });

Route::get('/login', function () {
    return Inertia::render('login/Pages');
})->name('login');

Route::get('/', function () {
    // return view('welcome');
    return Inertia::render('Home');
});



// http://localhost:8000/about
// Route::get('/about', function () {
//     return Inertia::render('About');
// });