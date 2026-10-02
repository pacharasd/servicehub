<?php

use App\Http\Middleware\EnsureActiveAccount;
use Illuminate\Support\Facades\Route;

Route::get('/dist/assets/{file}', function (string $file) {
    $filename = basename($file);
    $path = public_path("dist/assets/{$filename}");

    if (! file_exists($path) || is_dir($path)) {
        abort(404);
    }

    $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
    $mimeType = match ($extension) {
        'js' => 'application/javascript',
        'css' => 'text/css',
        'png' => 'image/png',
        'jpg', 'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'webp' => 'image/webp',
        'woff2' => 'font/woff2',
        'woff' => 'font/woff',
        'ttf' => 'font/ttf',
        'ico' => 'image/x-icon',
        default => mime_content_type($path) ?: 'application/octet-stream',
    };

    return response()->file($path, [
        'Content-Type' => $mimeType,
        'Cache-Control' => 'public, max-age=31536000, immutable',
    ]);
})->where('file', '.*');

Route::middleware(['auth', EnsureActiveAccount::class])->group(function () {
    Route::get('/', function () {
        return view('app');
    })->name('dashboard');

    Route::get('/{any}', function () {
        return view('app');
    })->where('any', 'dashboard|users|profile|audit-logs|reports|cleaning-zones|waste-types|module/.*');
});
