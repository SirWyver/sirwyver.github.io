import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class ResponsiveImages(HTMLParser):
    def __init__(self):
        super().__init__()
        self.sources = set()

    def handle_starttag(self, tag, attributes):
        if tag not in ("img", "source"):
            return
        srcset = dict(attributes).get("srcset", "")
        for candidate in srcset.split(","):
            if candidate.strip():
                url = urlsplit(candidate.strip().split()[0])
                if not url.scheme and not url.netloc and url.path:
                    self.sources.add(unquote(url.path))


root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
pages = list(root.rglob("*.html"))
if not pages:
    raise SystemExit(f"No generated HTML found in {root}")

missing = set()
checked = set()
for page in pages:
    parser = ResponsiveImages()
    parser.feed(page.read_text(encoding="utf-8"))
    for source in parser.sources:
        target = (root / source.lstrip("/") if source.startswith("/") else page.parent / source).resolve()
        checked.add(target)
        if root not in target.parents or not target.is_file() or target.stat().st_size == 0:
            missing.add(f"{page.relative_to(root)}: {source}")

if missing:
    raise SystemExit("Missing responsive image assets:\n" + "\n".join(sorted(missing)))
print(f"Verified {len(checked)} responsive image assets across {len(pages)} pages.")
