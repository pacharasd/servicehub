<!doctype html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#F6F5F1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'เข้าสู่ระบบ') — เทศบาลนครนนทบุรี</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" href="{{ asset('images/nonthaburi-logo.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('images/favicon-192x192.png') }}">
    <link rel="preload" as="font" type="font/woff2" crossorigin href="{{ \Illuminate\Support\Facades\Vite::asset('src/assets/fonts/line-seed/LINESeedSansTH_W_Rg.woff2', 'dist') }}">
    @vite('src/auth.css', 'dist')
</head>
<body class="bg-[#F6F5F1] text-[#142824]">
<main class="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
    <div class="grid w-full max-w-[1040px] overflow-hidden rounded-lg border border-[#D8DDD8] bg-white lg:min-h-[600px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section class="relative hidden flex-col justify-between border-r border-[#1F423D] bg-[#0F2926] p-10 text-[#F2F6F4] lg:flex" aria-label="เกี่ยวกับ เทศบาลนครนนทบุรี">
            <div class="flex items-center gap-3.5 border-b border-[#21453F] pb-6">
                <img src="{{ asset('images/nonthaburi-logo.png') }}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 rounded-full bg-white p-0.5">
                <div>
                    <div class="text-lg font-bold text-white">เทศบาลนครนนทบุรี</div>
                    <div class="text-xs text-[#A9C2BC]">สมุดทะเบียนและฐานข้อมูลฝ่ายบริการ</div>
                </div>
            </div>
            <div class="my-auto py-8">
                <h2 class="text-[32px] font-bold leading-snug text-white">ระบบบันทึกและติดตาม<br>งานบริการสาธารณะ</h2>
                <p class="mt-3 text-sm leading-relaxed text-[#C2D6D1]">รวบรวมข้อมูลการปฏิบัติงานจริงของฝ่ายบริการเพื่อการตรวจสอบและออกรายงานสรุปประจำงวด</p>
                <dl class="mt-8 divide-y divide-[#1F423D] border-y border-[#1F423D] text-xs">
                    <div class="flex items-center justify-between py-2.5">
                        <dt class="flex items-center gap-2 text-[#D5E5E1]"><span class="h-2 w-2 rounded-xs bg-[#2DD4BF]"></span>งานบริการรักษาความสะอาด</dt>
                        <dd class="tabular-nums text-[#A9C2BC]">4 หมวดงาน</dd>
                    </div>
                    <div class="flex items-center justify-between py-2.5">
                        <dt class="flex items-center gap-2 text-[#D5E5E1]"><span class="h-2 w-2 rounded-xs bg-[#F59E0B]"></span>งานบริหารจัดการมูลฝอย</dt>
                        <dd class="tabular-nums text-[#A9C2BC]">1 หมวดงาน</dd>
                    </div>
                    <div class="flex items-center justify-between py-2.5">
                        <dt class="flex items-center gap-2 text-[#D5E5E1]"><span class="h-2 w-2 rounded-xs bg-[#60A5FA]"></span>งานบริหารจัดการสิ่งปฏิกูล</dt>
                        <dd class="tabular-nums text-[#A9C2BC]">3 หมวดงาน</dd>
                    </div>
                    <div class="flex items-center justify-between py-2.5">
                        <dt class="flex items-center gap-2 text-[#D5E5E1]"><span class="h-2 w-2 rounded-xs bg-[#818CF8]"></span>โครงการบริหารจัดการขยะมูลฝอย</dt>
                        <dd class="tabular-nums text-[#A9C2BC]">1 หมวดงาน</dd>
                    </div>
                </dl>
            </div>
            <div class="flex items-center justify-between text-xs text-[#9AB5AE]">
                <span>ฝ่ายบริการ เทศบาลนครนนทบุรี</span>
                <span>ตรวจสอบสิทธิ์ตามบทบาท</span>
            </div>
        </section>
        <section class="flex min-w-0 flex-col justify-center px-6 py-9 sm:px-12 lg:px-14">
            <div class="mb-8 flex items-center gap-3 border-b border-[#D8DDD8] pb-4 lg:hidden">
                <img src="{{ asset('images/nonthaburi-logo.png') }}" alt="ตราเทศบาลนครนนทบุรี" class="h-10 w-10">
                <div>
                    <div class="font-bold text-[#142824]">เทศบาลนครนนทบุรี</div>
                    <div class="text-xs text-[#4E635E]">ฐานข้อมูลฝ่ายบริการ</div>
                </div>
            </div>
            @yield('content')
        </section>
    </div>
</main>
@yield('scripts')
</body>
</html>
