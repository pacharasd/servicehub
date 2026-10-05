<?php

use App\Http\Controllers\Api\ServiceOverviewController;
use App\Http\Controllers\Api\ServiceRecordController;
use App\Models\User;
use App\Support\ServiceCatalog;
use App\Support\ServiceReports;
use Illuminate\Contracts\Console\Kernel;
use Illuminate\Http\Request;

// Read-only SQL and controller timings. Run from a trusted CLI; this does not exercise HTTP middleware.
if (PHP_SAPI !== 'cli') {
    exit(1);
}

require dirname(__DIR__).'/vendor/autoload.php';
$app = require dirname(__DIR__).'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$module = $argv[1] ?? 'road-washings';
$term = $argv[2] ?? 'ถนน';
if (! isset(ServiceCatalog::ACTIVITIES[$module])) {
    fwrite(STDERR, "Unknown activity module.\n");
    exit(1);
}

$user = User::query()->where('is_active', true)
    ->whereHas('roles', fn ($roles) => $roles->where('name', 'super-admin'))->first();
if (! $user) {
    fwrite(STDERR, "No active super-admin account is available for profiling.\n");
    exit(1);
}

$requestFor = function (string $path, array $query = []) use ($user): Request {
    $request = Request::create($path, 'GET', $query);
    $request->setUserResolver(fn () => $user);

    return $request;
};

$cases = [
    'activity-list' => fn () => app(ServiceRecordController::class)
        ->index($requestFor('/api/activities/'.$module, ['per_page' => 6, 'page' => 1]), $module),
    'activity-search' => fn () => app(ServiceRecordController::class)
        ->index($requestFor('/api/activities/'.$module, ['per_page' => 6, 'page' => 1, 'q' => $term]), $module),
    'dashboard' => fn () => app(ServiceOverviewController::class)
        ->dashboard($requestFor('/api/dashboard')),
    'reports' => function () use ($requestFor): void {
        $request = $requestFor('/api/reports');
        $reports = app(ServiceReports::class);
        $reports->summary($request, $reports->period($request));
    },
];

$activeSample = null;
DB::listen(function ($event) use (&$activeSample): void {
    if ($activeSample !== null) {
        $activeSample['queries']++;
        $activeSample['db_ms'] += $event->time;
    }
});

function percentile(array $values, float $rank): float
{
    sort($values, SORT_NUMERIC);

    return $values[(int) ceil(count($values) * $rank) - 1];
}

foreach ($cases as $label => $run) {
    $samples = [];
    try {
        for ($index = -1; $index < 10; $index++) {
            $activeSample = ['queries' => 0, 'db_ms' => 0.0];
            $started = hrtime(true);
            $run();
            $activeSample['app_ms'] = (hrtime(true) - $started) / 1_000_000;
            if ($index >= 0) {
                $samples[] = $activeSample;
            }
            $activeSample = null;
        }
    } catch (Throwable $error) {
        fwrite(STDERR, $label.' failed: '.$error->getMessage()."\n");
        exit(1);
    }

    printf(
        "%s: queries %d-%d; SQL p50 %.1f ms, p95 %.1f ms; controller p50 %.1f ms, p95 %.1f ms\n",
        $label,
        min(array_column($samples, 'queries')),
        max(array_column($samples, 'queries')),
        percentile(array_column($samples, 'db_ms'), 0.5),
        percentile(array_column($samples, 'db_ms'), 0.95),
        percentile(array_column($samples, 'app_ms'), 0.5),
        percentile(array_column($samples, 'app_ms'), 0.95),
    );
}
