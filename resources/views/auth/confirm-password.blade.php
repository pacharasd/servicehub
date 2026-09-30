@extends('auth.layout')
@section('title', 'ยืนยันรหัสผ่าน')
@section('content')
<div class="max-w-md"><h1 class="text-[28px] font-bold">ยืนยันรหัสผ่าน</h1><p class="mt-3 text-sm text-[#667a71]">กรอกรหัสผ่านอีกครั้งเพื่อเปลี่ยนการตั้งค่าความปลอดภัย</p>
@if ($errors->any()) <div role="alert" class="mt-5 text-sm text-red-800">รหัสผ่านไม่ถูกต้อง</div> @endif
<form method="POST" action="{{ route('password.confirm.store') }}" class="mt-8 space-y-5">@csrf
<div><label for="password" class="mb-2 block text-sm font-semibold">รหัสผ่าน</label><input id="password" name="password" type="password" autocomplete="current-password" required class="field w-full" autofocus></div>
<button class="min-h-12 w-full rounded-xl bg-[#177a67] px-5 font-bold text-white">ยืนยัน</button></form></div>
@endsection
