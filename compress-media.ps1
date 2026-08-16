# ============================================================
# Brush & Bliss - Compress Products Media
# ============================================================

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

$MediaRoot = Join-Path $ProjectRoot "public\products"

$BackupDir = Join-Path $ProjectRoot "_media_backup"

$ImageExtensions = @(
    ".jpg",
    ".jpeg",
    ".png"
)

$VideoExtensions = @(
    ".mp4",
    ".mov",
    ".avi",
    ".mkv",
    ".webm"
)

$TotalBefore = 0
$TotalAfter = 0

$ImageCount = 0
$VideoCount = 0
$SkippedCount = 0
$ErrorCount = 0

# ============================================================
# CHECK MEDIA DIRECTORY
# ============================================================

if (!(Test-Path $MediaRoot)) {

    Write-Host ""
    Write-Host "ERROR: Media directory not found:" -ForegroundColor Red
    Write-Host $MediaRoot -ForegroundColor Yellow
    Write-Host ""

    exit 1
}

# ============================================================
# FORMAT SIZE
# ============================================================

function Format-Size($Bytes) {

    if ($Bytes -ge 1GB) {
        return "{0:N2} GB" -f ($Bytes / 1GB)
    }

    if ($Bytes -ge 1MB) {
        return "{0:N2} MB" -f ($Bytes / 1MB)
    }

    if ($Bytes -ge 1KB) {
        return "{0:N2} KB" -f ($Bytes / 1KB)
    }

    return "$Bytes Bytes"
}

# ============================================================
# BACKUP FILE
# ============================================================

function Backup-File($File) {

    $RelativePath = $File.FullName.Substring(
        $MediaRoot.Length
    ).TrimStart('\')

    $BackupPath = Join-Path $BackupDir $RelativePath

    $BackupParent = Split-Path $BackupPath -Parent

    if (!(Test-Path $BackupParent)) {

        New-Item `
            -ItemType Directory `
            -Path $BackupParent `
            -Force | Out-Null
    }

    Copy-Item `
        $File.FullName `
        $BackupPath `
        -Force
}

# ============================================================
# HEADER
# ============================================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "       BRUSH & BLISS MEDIA COMPRESSION" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Project:" -ForegroundColor Yellow
Write-Host $ProjectRoot

Write-Host ""
Write-Host "Media directory:" -ForegroundColor Yellow
Write-Host $MediaRoot

Write-Host ""

# ============================================================
# FIND ALL MEDIA
# ============================================================

$Files = Get-ChildItem `
    -Path $MediaRoot `
    -Recurse `
    -File |
    Where-Object {

        $ImageExtensions -contains $_.Extension.ToLower() -or
        $VideoExtensions -contains $_.Extension.ToLower()
    }

if ($Files.Count -eq 0) {

    Write-Host "No images or videos found." -ForegroundColor Red

    exit
}

Write-Host "Found $($Files.Count) media files." -ForegroundColor Green
Write-Host ""

# ============================================================
# CREATE BACKUP DIRECTORY
# ============================================================

if (!(Test-Path $BackupDir)) {

    New-Item `
        -ItemType Directory `
        -Path $BackupDir `
        -Force | Out-Null
}

Write-Host "Backup directory:" -ForegroundColor Yellow
Write-Host $BackupDir
Write-Host ""

# ============================================================
# PROCESS FILES
# ============================================================

foreach ($File in $Files) {

    $Extension = $File.Extension.ToLower()

    $Before = $File.Length

    $TotalBefore += $Before

    Write-Host "--------------------------------------------------"
    Write-Host "File:" -ForegroundColor White
    Write-Host $File.FullName

    Write-Host "Original size:" -ForegroundColor Yellow
    Write-Host (Format-Size $Before)

    # --------------------------------------------------------
    # BACKUP
    # --------------------------------------------------------

    Backup-File $File

    # ========================================================
    # IMAGE
    # ========================================================

    if ($ImageExtensions -contains $Extension) {

        $TempFile = "$($File.FullName).compressed$Extension"

        Write-Host "Compressing image..." -ForegroundColor Cyan

        try {

            if ($Extension -eq ".png") {

                & "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe" ` `
                    $File.FullName `
                    -strip `
                    -define png:compression-level=9 `
                    $TempFile

            }
            else {

                & "C:\Program Files\ImageMagick-7.1.2-Q16-HDRI\magick.exe" `
                    $File.FullName `
                    -strip `
                    -sampling-factor 4:4:4 `
                    -quality 92 `
                    $TempFile
            }

            if ($LASTEXITCODE -ne 0) {

                throw "ImageMagick failed."
            }

            $After = (Get-Item $TempFile).Length

            if ($After -lt $Before) {

                Move-Item `
                    $TempFile `
                    $File.FullName `
                    -Force

                $ImageCount++

                Write-Host "New size:" -ForegroundColor Green
                Write-Host (Format-Size $After)

                Write-Host "Saved:" -ForegroundColor Green
                Write-Host (Format-Size ($Before - $After))

            }
            else {

                Remove-Item $TempFile -Force

                $After = $Before

                $SkippedCount++

                Write-Host "No size improvement. Original kept." `
                    -ForegroundColor Yellow
            }

        }
        catch {

            Write-Host "ERROR:" -ForegroundColor Red
            Write-Host $_.Exception.Message

            $ErrorCount++

            if (Test-Path $TempFile) {
                Remove-Item $TempFile -Force
            }

            $After = $Before
        }
    }

    # ========================================================
    # VIDEO
    # ========================================================

    elseif ($VideoExtensions -contains $Extension) {

        $TempFile = "$($File.FullName).compressed$Extension"

        Write-Host "Compressing video..." -ForegroundColor Cyan

        try {

            & ffmpeg `
                -hide_banner `
                -loglevel error `
                -i $File.FullName `
                -c:v libx264 `
                -preset medium `
                -crf 20 `
                -c:a aac `
                -b:a 192k `
                -movflags +faststart `
                $TempFile

            if ($LASTEXITCODE -ne 0) {

                throw "FFmpeg failed."
            }

            $After = (Get-Item $TempFile).Length

            if ($After -lt $Before) {

                Move-Item `
                    $TempFile `
                    $File.FullName `
                    -Force

                $VideoCount++

                Write-Host "New size:" -ForegroundColor Green
                Write-Host (Format-Size $After)

                Write-Host "Saved:" -ForegroundColor Green
                Write-Host (Format-Size ($Before - $After))

            }
            else {

                Remove-Item $TempFile -Force

                $After = $Before

                $SkippedCount++

                Write-Host "No size improvement. Original kept." `
                    -ForegroundColor Yellow
            }

        }
        catch {

            Write-Host "ERROR:" -ForegroundColor Red
            Write-Host $_.Exception.Message

            $ErrorCount++

            if (Test-Path $TempFile) {
                Remove-Item $TempFile -Force
            }

            $After = $Before
        }
    }

    $TotalAfter += $After

    Write-Host ""
}

# ============================================================
# SUMMARY
# ============================================================

$Saved = $TotalBefore - $TotalAfter

if ($TotalBefore -gt 0) {

    $Percentage = `
        ($Saved / $TotalBefore) * 100
}
else {

    $Percentage = 0
}

Write-Host ""
Write-Host "==================================================" `
    -ForegroundColor Cyan

Write-Host "              COMPRESSION COMPLETE" `
    -ForegroundColor Cyan

Write-Host "==================================================" `
    -ForegroundColor Cyan

Write-Host ""

Write-Host "Images compressed : $ImageCount"
Write-Host "Videos compressed : $VideoCount"
Write-Host "Skipped files     : $SkippedCount"
Write-Host "Errors            : $ErrorCount"

Write-Host ""

Write-Host "Original size     : $(Format-Size $TotalBefore)" `
    -ForegroundColor Yellow

Write-Host "New size          : $(Format-Size $TotalAfter)" `
    -ForegroundColor Green

Write-Host "Space saved       : $(Format-Size $Saved)" `
    -ForegroundColor Green

Write-Host "Reduction         : {0:N2}%" -f $Percentage `
    -ForegroundColor Green

Write-Host ""

Write-Host "Backup location:" `
    -ForegroundColor Yellow

Write-Host $BackupDir `
    -ForegroundColor Cyan

Write-Host ""

Write-Host "Your original files are backed up." `
    -ForegroundColor Green

Write-Host ""