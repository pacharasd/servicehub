@extends('auth.layout')
@section('title', 'เข้าสู่ระบบ')
@section('content')
<div class="max-w-md">
    <h1 class="text-[28px] font-bold leading-tight text-[#142824] sm:text-[32px]">เข้าสู่ระบบฝ่ายบริการ</h1>
    <p class="mt-2 text-sm leading-6 text-[#4E635E]">กรอกชื่อผู้ใช้และรหัสผ่านสำหรับเจ้าหน้าที่เพื่อเข้าถึงสมุดทะเบียนงานบริการ</p>
    @if ($errors->any()) <div role="alert" class="mt-6 rounded-md border border-[#E5B8B5] bg-[#FDF3F2] p-3.5 text-sm text-[#991B1B]">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง หรือไม่สามารถเข้าสู่ระบบได้ในขณะนี้</div> @endif
    <form method="POST" action="{{ route('login.store') }}" class="mt-7 space-y-5">
        @csrf
        <div><label for="username" class="mb-1.5 block text-sm font-bold text-[#142824]">ชื่อผู้ใช้</label><input id="username" name="username" type="text" autocomplete="username" required autofocus value="{{ old('username') }}" class="field w-full" placeholder="กรอกชื่อผู้ใช้"></div>
        <div><label for="password" class="mb-1.5 block text-sm font-bold text-[#142824]">รหัสผ่าน</label><div class="relative"><input id="password" name="password" type="password" autocomplete="current-password" required class="field w-full pr-12" placeholder="กรอกรหัสผ่าน"><button type="button" id="toggle-password" aria-controls="password" aria-pressed="false" aria-label="แสดงรหัสผ่าน" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-md text-[#4E635E] transition hover:text-[#142824] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/25"><svg id="icon-eye" class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg><svg id="icon-eye-off" class="hidden h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg></button></div></div>
        <div class="pt-1">
            <button type="submit" class="min-h-11 w-full rounded-md bg-[#0F766E] px-5 text-sm font-bold text-white transition hover:bg-[#115E59]">เข้าสู่ระบบ</button>
        </div>
        <p class="border-t border-[#E6EAE6] pt-4 text-xs text-[#4E635E]">หากลืมรหัสผ่านหรือบัญชีถูกระงับ กรุณาติดต่อผู้ดูแลระบบของฝ่ายบริการ</p>
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
