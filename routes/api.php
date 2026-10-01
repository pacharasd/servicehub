<?php

use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ReferenceRecordController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\ServiceOverviewController;
use App\Http\Controllers\Api\ServiceRecordController;
use App\Http\Controllers\Api\UserController;
use App\Http\Middleware\EnsureActiveAccount;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', EnsureActiveAccount::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('api.profile.show');
    Route::put('/profile', [ProfileController::class, 'update'])->name('api.profile.update');
    Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('api.profile.password');

    Route::get('/dashboard', [ServiceOverviewController::class, 'dashboard'])->name('api.dashboard');
    Route::get('/reports', [ServiceOverviewController::class, 'report'])->name('api.reports');
    Route::get('/reports/export', [ServiceOverviewController::class, 'reportExport'])->name('api.reports.export');
    Route::get('/reports/{module}/export', [ServiceOverviewController::class, 'reportDetailExport'])->name('api.reports.detail.export');
    Route::get('/reports/{module}', [ServiceOverviewController::class, 'reportDetail'])->name('api.reports.detail');
    Route::get('/audit-logs', [ServiceOverviewController::class, 'audit'])->name('api.audit-logs');
    Route::get('/activities/{module}/export', [ServiceRecordController::class, 'export'])->name('api.activities.export');
    Route::get('/activities/{module}', [ServiceRecordController::class, 'index'])->name('api.activities.index');
    Route::post('/activities/{module}', [ServiceRecordController::class, 'store'])->name('api.activities.store');
    Route::get('/activities/{module}/{record}', [ServiceRecordController::class, 'show'])->name('api.activities.show');
    Route::put('/activities/{module}/{record}', [ServiceRecordController::class, 'update'])->name('api.activities.update');
    Route::delete('/activities/{module}/{record}', [ServiceRecordController::class, 'destroy'])->name('api.activities.destroy');
    Route::get('/references/{type}', [ReferenceRecordController::class, 'index'])->name('api.references.index');
    Route::post('/references/{type}', [ReferenceRecordController::class, 'store'])->name('api.references.store');
    Route::get('/references/{type}/{record}', [ReferenceRecordController::class, 'show'])->name('api.references.show');
    Route::put('/references/{type}/{record}', [ReferenceRecordController::class, 'update'])->name('api.references.update');
    Route::delete('/references/{type}/{record}', [ReferenceRecordController::class, 'destroy'])->name('api.references.destroy');
    Route::get('/users', [UserController::class, 'index'])->name('api.users.index');
    Route::post('/users', [UserController::class, 'store'])->name('api.users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('api.users.update');
    Route::patch('/users/{user}/status', [UserController::class, 'toggleStatus'])->name('api.users.status');
    Route::post('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('api.users.reset-password');

    Route::get('/roles', [RoleController::class, 'index'])->name('api.roles.index');
});
