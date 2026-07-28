import { describe, expect, it } from "vitest";
import { decorateResearchLabels, documents, extractHeadings, getMarkdown, slugify } from "./documents";
describe("documents", () => {
 it("loads every full markdown file", () => { expect(documents).toHaveLength(4); for (const d of documents) expect(getMarkdown(d.slug).length).toBeGreaterThan(1000); });
 it("extracts stable heading anchors", () => { expect(slugify("Security & Privacy")).toBe("security-privacy"); expect(extractHeadings("## One\n### Two")).toEqual([{id:"one",text:"One",level:2},{id:"two",text:"Two",level:3}]); });
 it("decorates every research label without changing surrounding prose", () => {
   const result = decorateResearchLabels("[FAKTA] Bukti. [PERLU VALIDASI] Uji lagi.");
   expect(result).toBe("`[FAKTA]` Bukti. `[PERLU VALIDASI]` Uji lagi.");
 });
});
