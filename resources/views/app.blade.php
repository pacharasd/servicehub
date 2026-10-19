<!doctype html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#f7f8f5">
    <meta name="description" content="ฐานข้อมูลฝ่ายบริการ">
    <title>เทศบาลนครนนทบุรี — ฐานข้อมูลฝ่ายบริการ</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" href="{{ asset('images/nonthaburi-logo.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/favicon-192x192.png') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preload" as="font" type="font/woff2" crossorigin href="{{ \Illuminate\Support\Facades\Vite::asset('src/assets/fonts/line-seed/LINESeedSansTH_W_Rg.woff2', 'dist') }}">
    @vite('src/main.js', 'dist')
</head>
<body>
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg">ข้ามไปยังเนื้อหาหลัก</a>
    <div id="app">
        <main id="main-content" role="main" tabindex="-1" class="sr-only"></main>
    </div>
    <script>
        window.serviceHubUser = {!! json_encode([
            'id'          => auth()->user()->id,
            'name'        => auth()->user()->name,
            'username'    => auth()->user()->username,
            'roles'       => auth()->user()->getRoleNames()->values()->all(),
            'permissions' => auth()->user()->getAllPermissions()->pluck('name')->values()->all(),
        ]) !!};
        @php
            $serviceHubUrls = [
                'logo' => asset('images/nonthaburi-logo.png'),
                'login' => route('login'),
                'logout' => route('logout'),
                'apiUsers' => route('api.users.index'),
                'apiRoles' => route('api.roles.index'),
                'apiProfile' => route('api.profile.show'),
                'apiProfilePassword' => route('api.profile.password'),
                'apiActivities' => route('api.activities.index', ['module' => '__MODULE__']),
                'apiReferences' => route('api.references.index', ['type' => '__TYPE__']),
                'apiDashboard' => route('api.dashboard'),
                'apiReports' => route('api.reports'),
                'apiReportsExport' => route('api.reports.export'),
                'apiReportDetail' => route('api.reports.detail', ['module' => '__MODULE__']),
                'apiReportDetailExport' => route('api.reports.detail.export', ['module' => '__MODULE__']),
                'apiAudit' => route('api.audit-logs'),
            ];
        @endphp
        window.serviceHubUrls = @json($serviceHubUrls);
    </script>
</body>
</html>
