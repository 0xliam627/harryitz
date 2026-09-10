#!/usr/bin/env python3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

REQUIRED_FILES = [
    ROOT / "package.json",
    ROOT / "vite.config.ts",
    ROOT / "tsconfig.json",
    ROOT / "index.html",
    ROOT / "src" / "App.tsx",
    ROOT / "src" / "main.tsx",
    ROOT / "src" / "index.css",
    ROOT / "src" / "types.ts",
    ROOT / "src" / "data" / "portfolioData.ts",
    ROOT / "src" / "components" / "ThreeCanvas.tsx",
    ROOT / "src" / "components" / "Navbar.tsx",
    ROOT / "src" / "components" / "AboutSection.tsx",
    ROOT / "src" / "components" / "ProjectsSection.tsx",
    ROOT / "src" / "components" / "WritingSection.tsx",
    ROOT / "src" / "components" / "Footer.tsx",
    ROOT / "public" / "CNAME",
    ROOT / "public" / "assets" / "favicon.svg",
    ROOT / "public" / "assets" / "nguyen-viet-hieu.jpg",
]

CHECK_TERMS = [
    "Nguyễn Viết Hiếu",
    "harryitz",
    "TwoTech",
    "2tech.studio",
    "HUIT",
    "THPT Cockpit",
    "Clean APIs",
    "Practical UI",
    "Fast Debugging",
    "Reading",
    "Gaming",
    "Sleeping",
    "Cats 🐱",
    "harryitz@duck.com",
    "0335085080",
    "PMMP",
]

def main():
    errors = []
    print("🔍 Kiểm tra các tệp bắt buộc...")
    for f in REQUIRED_FILES:
        if not f.exists():
            errors.append(f"Thiếu tệp: {f.relative_to(ROOT)}")

    print("🔍 Kiểm tra nội dung portfolioData.ts...")
    data_file = ROOT / "src" / "data" / "portfolioData.ts"
    if data_file.exists():
        content = data_file.read_text(encoding="utf-8")
        for term in CHECK_TERMS:
            if term not in content:
                errors.append(f"portfolioData.ts: thiếu thông tin quan trọng '{term}'")

    if errors:
        print("\n❌ VERIFY FAILED:")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)

    print("\n✅ VERIFY OK: Tất cả các file và dữ liệu đều sẵn sàng và đầy đủ!")

if __name__ == "__main__":
    main()
