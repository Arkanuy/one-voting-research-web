import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("validator", Path(__file__).with_name("validate-pdd-v2.py"))
v = importlib.util.module_from_spec(spec)
spec.loader.exec_module(v)

class TestValidator(unittest.TestCase):
    def test_missing_sections(self):
        self.assertTrue(any("bagian" in x.lower() for x in v.validate("# x", Path("."))))

    def test_placeholder(self):
        self.assertTrue(any("placeholder" in x.lower() for x in v.validate("TODO", Path("."))))

    def test_duplicate_heading(self):
        body = "\n".join(f"## {i}. {name}" for i, name in enumerate(v.REQUIRED, 1))
        body += "\n## 99. Tentang One Voting\n" + "kata " * 6000
        self.assertTrue(any("duplikat" in x.lower() for x in v.validate(body, Path("."))))

unittest.main()
