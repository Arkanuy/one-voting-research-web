const researchLabels = /\[(FAKTA|INSIGHT|ASUMSI|REKOMENDASI|PERLU VALIDASI)\]/g;
export function decorateResearchLabels(markdown:string){return markdown.replace(researchLabels,"`[$1]`")}