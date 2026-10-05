<?php

// Read-only HTTP timing for an operator's authenticated session. Never print cookies or response bodies.
if (PHP_SAPI !== 'cli' || ! extension_loaded('curl')) {
    fwrite(STDERR, "Run this script with PHP CLI and the cURL extension.\n");
    exit(1);
}

[$script, $baseUrl, $cookieFile, $module, $term] = array_pad($argv, 5, null);
$baseUrl = rtrim((string) $baseUrl, '/');
$module = $module ?: 'road-washings';
$term = $term ?: 'ถนน';
if (! preg_match('~^https?://[^/]+(?:/.*)?$~', $baseUrl)
    || ! is_readable((string) $cookieFile)
    || ! preg_match('/^[a-z-]+$/', $module)) {
    fwrite(STDERR, "Usage: php scripts/benchmark-api.php BASE_URL COOKIE_JAR [module] [search_term]\n");
    exit(1);
}

$activityPath = '/api/activities/'.$module.'?per_page=6&page=1';
$endpoints = [
    'activity-list' => $activityPath,
    'activity-search' => $activityPath.'&q='.rawurlencode($term),
    'dashboard' => '/api/dashboard',
    'reports' => '/api/reports',
];

function measure(string $url, string $cookieFile): float
{
    $handle = curl_init($url);
    curl_setopt_array($handle, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_COOKIEFILE => $cookieFile,
        CURLOPT_HTTPHEADER => ['Accept: application/json'],
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 20,
    ]);
    $body = curl_exec($handle);
    $status = curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    $seconds = curl_getinfo($handle, CURLINFO_TOTAL_TIME);
    $error = curl_error($handle);
    curl_close($handle);

    if ($body === false || $status !== 200 || ! is_array(json_decode($body, true))) {
        throw new RuntimeException('Request failed (HTTP '.$status.'). '.$error.' Check the session and wait if rate limited.');
    }

    return $seconds * 1000;
}

try {
    foreach ($endpoints as $label => $path) {
        $url = $baseUrl.$path;
        measure($url, $cookieFile); // Warm-up request is excluded from measurements.
        $samples = [];
        for ($index = 0; $index < 10; $index++) {
            $samples[] = measure($url, $cookieFile);
        }
        sort($samples, SORT_NUMERIC);
        printf("%s: p50 %.0f ms; p95 %.0f ms; samples %d\n", $label, $samples[4], $samples[9], count($samples));
    }
} catch (RuntimeException $error) {
    fwrite(STDERR, $error->getMessage()."\n");
    exit(1);
}
