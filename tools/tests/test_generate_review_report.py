from pathlib import Path
import unittest
import zipfile

from tools.generate_review_report import build_report


class GenerateReviewReportTests(unittest.TestCase):
    def test_build_report_writes_valid_docx_package(self):
        output = Path("tools/tests/tmp-review-report.docx")
        if output.exists():
          output.unlink()

        build_report(
            output,
            {
                "title": "Demo Report",
                "sections": [
                    {
                        "heading": "Summary",
                        "paragraphs": ["This is a smoke test."]
                    }
                ]
            }
        )

        self.assertTrue(output.exists())
        self.assertEqual(output.read_bytes()[:2], b"PK")

        with zipfile.ZipFile(output) as archive:
            self.assertIn("[Content_Types].xml", archive.namelist())
            self.assertIn("word/document.xml", archive.namelist())

        output.unlink()


if __name__ == "__main__":
    unittest.main()
