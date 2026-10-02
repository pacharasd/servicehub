@extends('auth.layout')
@section('title', 'เข้าสู่ระบบ')
@section('content')
<div class="max-w-md">
    <p class="text-xs font-bold tracking-[.15em] text-[#177a67]">ยินดีต้อนรับ</p>
    <h1 class="mt-3 text-[28px] font-bold leading-tight sm:text-[34px]">เข้าสู่ระบบ</h1>
    <p class="mt-3 text-sm leading-6 text-[#667a71]">กรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบส่วนบริการ</p>
    @if ($errors->any()) <div role="alert" class="mt-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง หรือไม่สามารถเข้าสู่ระบบได้ในขณะนี้</div> @endif
    <form method="POST" action="{{ route('login.store') }}" class="mt-8 space-y-5">
        @csrf
        <div><label for="username" class="mb-2 block text-sm font-semibold">ชื่อผู้ใช้</label><input id="username" name="username" type="text" autocomplete="username" required autofocus value="{{ old('username') }}" class="field w-full" placeholder="กรอกชื่อผู้ใช้"></div>
        <div><label for="password" class="mb-2 block text-sm font-semibold">รหัสผ่าน</label><div class="relative"><input id="password" name="password" type="password" autocomplete="current-password" required class="field w-full pr-12" placeholder="กรอกรหัสผ่าน"><button type="button" id="toggle-password" aria-controls="password" aria-pressed="false" aria-label="แสดงรหัสผ่าน" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-[#667a71] transition hover:text-[#172b2b] focus:outline-none focus:ring-2 focus:ring-[#177a67]/20"><svg id="icon-eye" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><svg id="icon-eye-off" class="hidden h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></button></div></div>
        <p class="text-xs text-[#667a71]">ลืมรหัสผ่าน? ติดต่อผู้ดูแลระบบ</p>
        <button type="submit" class="min-h-12 w-full rounded-xl bg-[#177a67] px-5 text-sm font-bold text-white hover:bg-[#0e6253]">เข้าสู่ระบบ</button>
    </form>
</div>
@endsection
@section('scripts')
<script>
document.getElementById('toggle-password').addEventListener('click', function () {
    const input = document.getElementById('password');
    const showing = input.type === 'password';
    input.type = showing ? 'text' : 'password';
    document.getElementById('icon-eye').classList.toggle('hidden', showing);
    document.getElementById('icon-eye-off').classList.toggle('hidden', !showing);
    this.setAttribute('aria-pressed', String(showing));
    this.setAttribute('aria-label', showing ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
});
</script>
@endsection
