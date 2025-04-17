# PowerShell script to enable SQLite extensions in php.ini
$phpIniPath = "D:\software\php-8.4.6-nts-Win32-vs17-x64\php.ini"

# Read the content of the php.ini file
$content = Get-Content -Path $phpIniPath

# Replace the commented lines with uncommented versions
$updatedContent = $content -replace ';extension=pdo_sqlite', 'extension=pdo_sqlite' -replace ';extension=sqlite3', 'extension=sqlite3'

# Write the updated content back to the file
Set-Content -Path $phpIniPath -Value $updatedContent

Write-Host "SQLite extensions have been enabled in $phpIniPath"

# Verify the changes
Write-Host "`nVerifying changes:"
Get-Content -Path $phpIniPath | Select-String "extension=pdo_sqlite|extension=sqlite3"

