param([switch]$KeepAll)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$backupDir = Join-Path $projectRoot 'storage\backups'
$envPath = Join-Path $projectRoot '.env'
$dumpExe = 'C:\xampp\mysql\bin\mysqldump.exe'
if (-not (Test-Path -LiteralPath $envPath) -or -not (Test-Path -LiteralPath $dumpExe)) { throw 'ServiceHub .env or XAMPP mysqldump is missing.' }

$values = @{}
foreach ($line in Get-Content -LiteralPath $envPath) {
    if ($line -match '^\s*(DB_HOST|DB_PORT|DB_DATABASE|DB_USERNAME|DB_PASSWORD)=(.*)$') {
        $value = $Matches[2].Trim()
        if ($value.Length -ge 2 -and (($value.StartsWith('"') -and $value.EndsWith('"')) -or ($value.StartsWith("'") -and $value.EndsWith("'")))) {
            $value = $value.Substring(1, $value.Length - 2)
        }
        $values[$Matches[1]] = $value
    }
}
foreach ($key in @('DB_HOST', 'DB_PORT', 'DB_DATABASE', 'DB_USERNAME', 'DB_PASSWORD')) {
    if (-not $values.ContainsKey($key)) { throw "Missing $key in .env" }
}
if ($values['DB_DATABASE'] -ne 'servicehub') { throw 'Backup target must be the servicehub database.' }

New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
$backupDir = (Resolve-Path -LiteralPath $backupDir).Path
$destination = Join-Path $backupDir ('servicehub-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.sql')
try {
    $env:MYSQL_PWD = $values['DB_PASSWORD']
    & $dumpExe '--single-transaction' '--skip-lock-tables' '--triggers' '--default-character-set=utf8mb4' "--host=$($values['DB_HOST'])" "--port=$($values['DB_PORT'])" "--user=$($values['DB_USERNAME'])" $values['DB_DATABASE'] "--result-file=$destination"
    if ($LASTEXITCODE -ne 0) { throw 'mysqldump failed.' }
} finally {
    Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue
}
if (-not (Test-Path -LiteralPath $destination) -or (Get-Item -LiteralPath $destination).Length -lt 100) { throw 'The backup file is empty.' }

$identity = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
& icacls.exe $backupDir '/inheritance:r' '/grant:r' "${identity}:(OI)(CI)F" 'SYSTEM:(OI)(CI)F' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not restrict backup directory permissions.' }
& icacls.exe $destination '/inheritance:r' '/grant:r' "${identity}:F" 'SYSTEM:F' | Out-Null
if ($LASTEXITCODE -ne 0) { throw 'Could not restrict backup file permissions.' }

if (-not $KeepAll) {
    $cutoff = (Get-Date).AddDays(-14)
    foreach ($file in Get-ChildItem -LiteralPath $backupDir -File -Filter 'servicehub-*.sql') {
        if ($file.LastWriteTime -lt $cutoff -and (Split-Path -Parent $file.FullName) -eq $backupDir) {
            Remove-Item -LiteralPath $file.FullName -Force
        }
    }
}
Write-Output "Backup created: $destination"
