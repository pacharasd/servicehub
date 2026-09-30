<?php

use App\Http\Middleware\EnsureActiveAccount;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', EnsureActiveAccount::class])->group(function () {
    Route::get('/', function () {
        return view('app');
    })->name('dashboard');
});
