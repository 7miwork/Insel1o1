$files = Get-ChildItem -Path "C:\Users\user\Documents\Codes\Insel1o1" -Recurse -File -Include *.md,*.json,*.ts,*.tsx,*.js,*.html | Where-Object { $_.FullName -notmatch '\\node_modules\\|\\\.git\\' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $original = $content
    $content = $content -replace 'Insel1o1', 'I-Land1o1' `
                         -replace 'insel1o1', 'i-land1o1' `
                         -replace 'Insel 1o1', 'I-Land1o1'
    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Output "Updated: $($file.FullName)"
    }
}