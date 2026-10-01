<!doctype html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#f4f8f5">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'เข้าสู่ระบบ') — ServiceHub</title>
    @vite('src/auth.css', 'dist')
</head>
<body class="bg-[#f4f8f5] text-[#19302b]">
<main class="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
    <div class="grid w-full max-w-[1100px] overflow-hidden rounded-[28px] border border-[#e0eae3] bg-white shadow-[0_24px_80px_rgba(24,69,49,.08)] lg:min-h-[650px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
        <section class="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0e6253] via-[#177a67] to-[#2f9779] p-12 text-white lg:flex" aria-label="เกี่ยวกับ ServiceHub">
            <div class="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/10" aria-hidden="true"></div>
            <div class="relative flex items-center gap-3"><img src="{{ asset('images/nonthaburi-logo.png') }}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 rounded-full bg-white p-0.5"><span class="text-xl font-bold">ServiceHub</span></div>
            <div class="relative max-w-md"><p class="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold">ฐานข้อมูลฝ่ายบริการ</p><h2 class="text-[42px] font-bold leading-tight">จัดการข้อมูลบริการ<br>ในที่เดียว</h2><p class="mt-6 text-sm leading-7 text-white/80">ติดตามงานรักษาความสะอาด การจัดการมูลฝอย สิ่งปฏิกูล และโครงการของฝ่ายบริการ</p></div>
            <p class="relative text-xs text-white/70">เทศบาลนครนนทบุรี</p>
        </section>
        <section class="flex min-w-0 flex-col justify-center px-6 py-9 sm:px-12 lg:px-14">
            <div class="mb-9 flex items-center gap-3 lg:hidden"><img src="{{ asset('images/nonthaburi-logo.png') }}" alt="ตราเทศบาลนครนนทบุรี" class="h-11 w-11"><span class="font-bold">ServiceHub</span></div>
            @yield('content')
        </section>
    </div>
</main>
@yield('scripts')
</body>
</html>
