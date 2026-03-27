from __future__ import annotations

from datetime import datetime, UTC
from pathlib import Path
from xml.sax.saxutils import escape
import zipfile


CONTENT_TYPES_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>
"""

ROOT_RELS_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"""

DOCUMENT_RELS_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"/>
"""

STYLES_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal">
    <w:name w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Microsoft YaHei"/>
      <w:sz w:val="22"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="32"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="heading 1"/>
    <w:basedOn w:val="Normal"/>
    <w:qFormat/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="28"/>
    </w:rPr>
  </w:style>
</w:styles>
"""


def paragraph_xml(text: str, style: str = "Normal") -> str:
    safe_text = escape(text)
    return (
        "<w:p>"
        f"<w:pPr><w:pStyle w:val=\"{style}\"/></w:pPr>"
        f"<w:r><w:t xml:space=\"preserve\">{safe_text}</w:t></w:r>"
        "</w:p>"
    )


def build_document_xml(data: dict) -> str:
    body_parts = [paragraph_xml(data["title"], "Title")]

    for section in data.get("sections", []):
        body_parts.append(paragraph_xml(section["heading"], "Heading1"))
        for paragraph in section.get("paragraphs", []):
            body_parts.append(paragraph_xml(paragraph))

    body_parts.append("<w:sectPr/>")
    return (
        "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>"
        "<w:document "
        "xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\">"
        f"<w:body>{''.join(body_parts)}</w:body>"
        "</w:document>"
    )


def build_core_xml(title: str) -> str:
    created = datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    safe_title = escape(title)
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:dcmitype="http://purl.org/dc/dcmitype/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>{safe_title}</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{created}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{created}</dcterms:modified>
</cp:coreProperties>
"""


APP_XML = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
  xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Microsoft Office Word</Application>
</Properties>
"""


def build_report(output_path: Path, data: dict) -> Path:
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", CONTENT_TYPES_XML)
        archive.writestr("_rels/.rels", ROOT_RELS_XML)
        archive.writestr("docProps/core.xml", build_core_xml(data["title"]))
        archive.writestr("docProps/app.xml", APP_XML)
        archive.writestr("word/document.xml", build_document_xml(data))
        archive.writestr("word/styles.xml", STYLES_XML)
        archive.writestr("word/_rels/document.xml.rels", DOCUMENT_RELS_XML)

    return output_path


REPORT_DATA = {
    "title": "Dorm Takeaway Review Report",
    "sections": [
        {
            "heading": "Review Scope",
            "paragraphs": [
                "Project: Dorm takeaway pickup relay mini-program.",
                "Focus areas: order state flow, concurrent order acceptance hardening, permission checks, cancellation and payment consistency, notifications gap, error handling, and edge cases."
            ]
        },
        {
            "heading": "Findings",
            "paragraphs": [
                "Critical: protected backend actions trusted client-supplied actor IDs and had no request authentication.",
                "High: payment and review creation bypassed lifecycle and participant validation.",
                "Medium: order creation allowed invalid negative service fees at the API layer.",
                "Medium: order write paths did not verify affected-row counts, so stale writes could be logged as success in future multi-instance or retry scenarios.",
                "Gap: message notification flow is still not implemented and remains tracked as follow-up scope."
            ]
        },
        {
            "heading": "Root Causes",
            "paragraphs": [
                "Authentication was modeled as a demo login response but never enforced on later requests.",
                "Controllers accepted requester_id, helper_id, payer_id, and payee_id from mutable client payloads instead of server-derived identity.",
                "Service-layer payment and review writes inserted records without loading the target order or checking its status.",
                "Order writes assumed the database mutation succeeded and appended logs without checking the update result."
            ]
        },
        {
            "heading": "Fixes Applied",
            "paragraphs": [
                "Added auth middleware that validates Bearer local-token-<id> tokens and resolves req.user.",
                "Protected create-order, accept, status update, cancel, my-orders, payment, and review routes.",
                "Moved actor identity derivation to the server and ignored spoofable client actor IDs.",
                "Enforced payment-after-completion and requester-only rules for manual payment recording.",
                "Enforced completed-order, requester-only, single-review, and rating-range rules for reviews.",
                "Validated service_fee >= 0 at the backend.",
                "Added affected-row checks and 409 stale-write errors for accept, cancel, and status-update order writes."
            ]
        },
        {
            "heading": "Verification Evidence",
            "paragraphs": [
                "Auth regression tests now pass.",
                "Payment and review business rule tests now pass.",
                "Order stale-write hardening tests now pass.",
                "A final full test-suite verification run was executed after implementation."
            ]
        }
    ]
}


def main() -> None:
    build_report(
        Path("docs/reports/2026-03-27-dorm-takeaway-review-report.docx"),
        REPORT_DATA
    )


if __name__ == "__main__":
    main()
