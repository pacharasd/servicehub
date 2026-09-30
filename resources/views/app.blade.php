<!doctype html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#f7f8f5">
    <meta name="description" content="ระบบข้อมูลส่วนบริการ">
    <title>ServiceHub — ระบบข้อมูลส่วนบริการ</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite('src/main.js', 'dist')
</head>
<body>
    <div id="app"></div>
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
                'apiAudit' => route('api.audit-logs'),
            ];
        @endphp
        window.serviceHubUrls = @json($serviceHubUrls);
    </script>
</body>
</html>
