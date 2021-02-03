import {ModView_VizOptionsData} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modView_VizOptionsData";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";
import {ReportedPeptide} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/ReportedPeptide";
import {ModViewDataVizRenderer_MultiSearch} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewMainDataVizRender_MultiSearch";

export class PSMLocalizationReportDownloadGenerator {

    static async getPsmLocalizationReportText(
        {
            vizOptionsData,
            sortedModMasses,
            projectSearchIds,
            searchDetailsBlockDataMgmtProcessing,
            modViewDataManager
        } : {
            vizOptionsData: ModView_VizOptionsData
            sortedModMasses: Array<number>,
            projectSearchIds: Array<number>,
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            modViewDataManager:ModViewDataManager
        }
    ) : Promise<string> {

        const reportLines:Array<string> = [];
        reportLines.push(['mod mass', 'mod type', 'psm id', 'search id', 'search name', 'peptide sequence', 'peptide mod position', 'residue', 'protein name', 'protein mod position'].join("\t"));

        for(const projectSearchId of projectSearchIds) {

            const searchId = ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing });
            const searchName = ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing });

            // preemptively load all psm mod data for this search for these mod masses
            await modViewDataManager.loadPsmsForModMasses({projectSearchId, modMasses:sortedModMasses});

            // preemptively load all reported peptide data for this search
            const reportedPeptideMap = await modViewDataManager.getReportedPeptides({projectSearchId});

            for(const modMass of sortedModMasses) {

                const psms = await modViewDataManager.getPsmsForModMass({ modMass, projectSearchId });

                for(const psmItem of psms) {

                    const reportedPeptideId: number = psmItem.reportedPeptideId;
                    const psmId:number = psmItem.psmId;

                    if (!(reportedPeptideMap.has(reportedPeptideId))) {
                        throw new Error("Error. Reported peptide map does not contain reported peptide for psm.");
                    }

                    const reportedPeptide: ReportedPeptide = reportedPeptideMap.get(reportedPeptideId);
                    const peptideSequence = reportedPeptide.sequence;

                    // do each variable mod
                    if (psmItem.variable && psmItem.variable.loc) {
                        for (const modPositionInPeptide of psmItem.variable.loc) {

                            const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                            for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                                for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                    const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                    // check that this protein position falls into the current protein position filter
                                    if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                        proteinId,
                                        position: modPositionInProtein
                                    })) {

                                        // add a line for this psm
                                        const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                            proteinId,
                                            projectSearchId
                                        })).sort().join(',');

                                        const line = [modMass, 'variable', psmId, searchId, searchName, peptideSequence, modPositionInPeptide, residue, proteinName, modPositionInProtein].join("\t");
                                        reportLines.push(line);
                                    }
                                }
                            }
                        }
                    }

                    // handle n-term
                    if(psmItem.variable && psmItem.variable.nterm) {
                        const modPositionInPeptide = 1;
                        const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                        for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                            for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                // check that this protein position falls into the current protein position filter
                                if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                    proteinId,
                                    position: modPositionInProtein
                                })) {

                                    // add a line for this psm
                                    const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                        proteinId,
                                        projectSearchId
                                    })).sort().join(',');

                                    const line = [modMass, 'variable', psmId, searchId, searchName, peptideSequence, 'n', residue, proteinName, modPositionInProtein].join("\t");
                                    reportLines.push(line);
                                }
                            }
                        }

                    }

                    // handle c-term
                    if(psmItem.variable && psmItem.variable.cterm) {
                        const modPositionInPeptide = peptideSequence.length;
                        const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                        for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                            for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                // check that this protein position falls into the current protein position filter
                                if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                    proteinId,
                                    position: modPositionInProtein
                                })) {

                                    // add a line for this psm
                                    const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                        proteinId,
                                        projectSearchId
                                    })).sort().join(',');

                                    const line = [modMass, 'variable', psmId, searchId, searchName, peptideSequence, 'c', residue, proteinName, modPositionInProtein].join("\t");
                                    reportLines.push(line);
                                }
                            }
                        }
                    }

                    // do each open mod
                    if (psmItem.open && psmItem.open.loc !== undefined) {
                        for (const modPositionInPeptide of psmItem.open.loc) {

                            const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                            for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                                for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                    const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                    // check that this protein position falls into the current protein position filter
                                    if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                        proteinId,
                                        position: modPositionInProtein
                                    })) {

                                        // add a line for this psm
                                        const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                            proteinId,
                                            projectSearchId
                                        })).sort().join(',');

                                        const line = [modMass, 'open', psmId, searchId, searchName, peptideSequence, modPositionInPeptide, residue, proteinName, modPositionInProtein].join("\t");
                                        reportLines.push(line);
                                    }
                                }
                            }
                        }
                    }

                    // handle n-term
                    if(psmItem.open && psmItem.open.nterm) {
                        const modPositionInPeptide = 1;
                        const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                        for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                            for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                // check that this protein position falls into the current protein position filter
                                if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                    proteinId,
                                    position: modPositionInProtein
                                })) {

                                    // add a line for this psm
                                    const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                        proteinId,
                                        projectSearchId
                                    })).sort().join(',');

                                    const line = [modMass, 'open', psmId, searchId, searchName, peptideSequence, 'n', residue, proteinName, modPositionInProtein].join("\t");
                                    reportLines.push(line);
                                }
                            }
                        }

                    }

                    // handle c-term
                    if(psmItem.open && psmItem.open.cterm) {
                        const modPositionInPeptide = peptideSequence.length;
                        const residue = peptideSequence.substring(modPositionInPeptide - 1, modPositionInPeptide);

                        for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                            for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                const modPositionInProtein = modPositionInPeptide + peptidePositionInProtein - 1;

                                // check that this protein position falls into the current protein position filter
                                if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinPositionInFilter({
                                    proteinId,
                                    position: modPositionInProtein
                                })) {

                                    // add a line for this psm
                                    const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                        proteinId,
                                        projectSearchId
                                    })).sort().join(',');

                                    const line = [modMass, 'open', psmId, searchId, searchName, peptideSequence, 'c', residue, proteinName, modPositionInProtein].join("\t");
                                    reportLines.push(line);
                                }
                            }
                        }
                    }

                    // handle unlocalized open mods
                    if(psmItem.open && psmItem.open.unloc) {

                        const modStartPositionInPeptide = 1;
                        const modEndPositionInPeptide = peptideSequence.length;

                        for (const [proteinId, peptidePositionsInProtein] of reportedPeptide.proteinMatches) {
                            for (const peptidePositionInProtein of peptidePositionsInProtein) {

                                const modStartPositionInProtein = modStartPositionInPeptide + peptidePositionInProtein - 1;
                                const modEndPositionInProtein = modEndPositionInPeptide + peptidePositionInProtein - 1;

                                // check that this unlocalized mod falls on a peptide where that peptide's range of localization
                                // is included in the current protein position filter
                                if (!(vizOptionsData.data.proteinPositionFilter) || vizOptionsData.data.proteinPositionFilter.isProteinRangeInFilter({
                                    proteinId,
                                    start: modStartPositionInProtein,
                                    end: modEndPositionInProtein
                                })) {

                                    // add a line for this psm
                                    const proteinName = Array.from(await modViewDataManager.getNamesForProtein({
                                        proteinId,
                                        projectSearchId
                                    })).sort().join(',');

                                    const line = [modMass, 'open', psmId, searchId, searchName, peptideSequence, 'unlocalized', 'unlocalized', proteinName, 'unlocalized'].join("\t");
                                    reportLines.push(line);
                                }
                            }
                        }
                    }
                }
            }
        }

        return reportLines.join("\n") + "\n";
    }

}