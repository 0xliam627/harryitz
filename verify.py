#!/usr/bin/env python3
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent
PAGES = (ROOT / "index.html", ROOT / "writing" / "pmmp.html")
REQUIRED = (
    ROOT / "site.css",
    ROOT / "tokens.css",
    ROOT / "assets" / "nguyen-viet-hieu.jpg",
    ROOT / "assets" / "favicon.svg",
)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.links = []
        self.images = []
        self.h1_count = 0
        self.lang = None
        self.title = False
        self.description = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if "id" in attrs:
            self.ids.append(attrs["id"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag == "img":
            self.images.append(attrs)
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title = True
        if tag == "meta" and attrs.get("name") == "description" and attrs.get("content"):
            self.description = True


def check_page(path):
    errors = []
    parser = PageParser()
    text = path.read_text(encoding="utf-8")
    parser.feed(text)

    if parser.lang != "vi":
        errors.append(f"{path.relative_to(ROOT)}: lang phải là vi")
    if parser.h1_count != 1:
        errors.append(f"{path.relative_to(ROOT)}: cần đúng một h1, hiện có {parser.h1_count}")
    if not parser.title or not parser.description:
        errors.append(f"{path.relative_to(ROOT)}: thiếu title hoặc meta description")
    if len(parser.ids) != len(set(parser.ids)):
        errors.append(f"{path.relative_to(ROOT)}: trùng id")

    for image in parser.images:
        for key in ("src", "alt", "width", "height"):
            if not image.get(key):
                errors.append(f"{path.relative_to(ROOT)}: ảnh thiếu {key}")

    for href in parser.links:
        parsed = urlparse(href)
        if parsed.scheme in ("http", "https", "mailto"):
            continue
        if not parsed.path:
            target_path = path
        elif parsed.path.startswith("/"):
            target_path = ROOT / unquote(parsed.path.lstrip("/"))
        else:
            target_path = path.parent / unquote(parsed.path)
        if target_path.is_dir():
            target_path /= "index.html"
        target_path = target_path.resolve()
        if not target_path.exists():
            errors.append(f"{path.relative_to(ROOT)}: link hỏng {href}")
            continue
        if parsed.fragment and target_path.suffix == ".html":
            target_parser = PageParser()
            target_parser.feed(target_path.read_text(encoding="utf-8"))
            if parsed.fragment not in target_parser.ids:
                errors.append(f"{path.relative_to(ROOT)}: fragment hỏng {href}")

    return errors, text


def main():
    errors = []
    for required in REQUIRED + PAGES:
        if not required.exists():
            errors.append(f"Thiếu file: {required.relative_to(ROOT)}")

    texts = {}
    if not errors:
        for page in PAGES:
            page_errors, text = check_page(page)
            errors.extend(page_errors)
            texts[page.name] = text

        home = texts["index.html"]
        article = texts["pmmp.html"]
        for value in (
            "Nguyễn Viết Hiếu",
            "THPT Cockpit",
            "nguyenhieu.c47s@gmail.com",
            "github.com/0xliam627",
            "PHP",
            "PostgreSQL",
        ):
            if value not in home:
                errors.append(f"index.html: thiếu nội dung {value}")
        for value in ("datetime=\"2026-07-11\"", "Galaxy J2 Prime", "Uầy, nghĩ lại"):
            if value not in article:
                errors.append(f"writing/pmmp.html: thiếu nội dung {value}")

    if errors:
        print("VERIFY FAILED")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print("VERIFY OK: 2 pages, links, fragments, metadata, content and image checked")


if __name__ == "__main__":
    main()
