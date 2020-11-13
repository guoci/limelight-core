/**
 * peptidePage_Display_SingleSearch_ReportedPeptideListSection_Create_TableData.ts
 * 
 * Get Data Table From Reported Peptide Id List
 * 
 * Create Root Table with Reported Peptide String, Reported Peptide Annotation values to display, and best PSM Annotation values filtered on
 * 
 */
import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

//   From data_pages_common
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {
    DataTable_RootTableObject,
    DataTable_TableOptions,
    DataTable_Column,
    DataTable_RootTableDataObject,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,
} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent, PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__psm_list_for_reported_peptide_container_component/js/psmList_Wrapper_ReturnChildReactComponent';

//  Local

import { createReportedPeptideDisplayData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_list__reported_peptides_for_single_search/js/reportedPeptidesForSingleSearch_create_createReportedPeptideDisplayData';
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";

////////////////

const dataTableId_ThisTable = "Experiment Protein Single Protein Single Peptide Search List Table";

////////////////

/**
 * returned from reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects
 */
export class ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result {

    dataTable_RootTableObject : DataTable_RootTableObject
    numberOfPsmsForReportedPeptides : number
    numberOfReportedPeptides : number
}

/**
 * 
 * @returns ReportedPeptides_DataTableObjects_ForSingleSearch_SingleProtein_Result
 */
export const reportedPeptides_DataTableOjbects_ForSingleSearch_PeptidePage_createChildTableObjects = ({

    projectSearchId,
    reportedPeptideIds_ForDisplay,
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    dataPageStateManager
} : {
    projectSearchId : number
    reportedPeptideIds_ForDisplay : Set<number>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

}) : ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result => {

    let reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId : Array<number> = undefined;  //  Reported Peptide Ann Type Ids To Display

    {
        const paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
        const paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
        for ( const paramsForProjectSearchId of paramsForProjectSearchIdsList ) {
            if ( paramsForProjectSearchId.projectSearchId === projectSearchId ) {
                reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId = paramsForProjectSearchId.reportedPeptideAnnTypeDisplay
                break;
            }
        }
        if ( ! reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
            const msg = "reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList not contain entry for projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }
        //  Validate all are numbers
        for ( const reportedPeptideAnnTypeId of reportedPeptideAnnTypeIdsDisplay_For_Single_projectSearchId ) {
            if ( ! variable_is_type_number_Check( reportedPeptideAnnTypeId) ) {
                const msg = "reportedPeptides_DataTableOjbects_ForSingleSearch_SingleProtein_createChildTableObjects(...): searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList[X].reportedPeptideAnnTypeDisplay contains a non-number: |" + reportedPeptideAnnTypeId + "|, projectSearchId: " + projectSearchId;
                console.warn( msg );
                throw Error( msg );
            }
        }
    }

    const {
        dataTable_RootTableObject,
        numberOfPsmsForReportedPeptides,
        numberOfReportedPeptides
    } : {
        dataTable_RootTableObject : DataTable_RootTableObject,
        numberOfPsmsForReportedPeptides : number,
        numberOfReportedPeptides : number

    } = _create_dataTable_RootTableObject({
        projectSearchId,
        reportedPeptideIds_ForDisplay,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        searchDataLookupParamsRoot,
        dataPageStateManager
    });

    const result = new ReportedPeptides_DataTableObjects_ForSingleSearch_PeptidePage_Result();
    result.dataTable_RootTableObject = dataTable_RootTableObject;
    result.numberOfPsmsForReportedPeptides = numberOfPsmsForReportedPeptides;
    result.numberOfReportedPeptides = numberOfReportedPeptides;

    return result; //  EARLY RETURN
}

/**
 * Sort the Reported Peptide List.
 * 
 */
const _create_dataTable_RootTableObject = function({
    projectSearchId,
    reportedPeptideIds_ForDisplay,
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    dataPageStateManager

} : {
    projectSearchId : number
    reportedPeptideIds_ForDisplay : Set<number>
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

}) : {
    dataTable_RootTableObject : DataTable_RootTableObject
    numberOfPsmsForReportedPeptides : number
    numberOfReportedPeptides : number
} {


    const createReportedPeptideDisplayData_result = createReportedPeptideDisplayData({
        reportedPeptideIds_ForDisplay,
        dataPerReportedPeptideId_Map_Key_reportedPeptideId : undefined,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId : undefined/* Only for error reporting */,
        projectSearchId, 
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    });

    if ( ! variable_is_type_number_Check( createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides ) ) {
        const msg = "createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides is not a number.  is: " + createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides;
        console.warn( msg );
        throw Error( msg );
    }
    if ( ! variable_is_type_number_Check( createReportedPeptideDisplayData_result.numberOfReportedPeptides ) ) {
        const msg = "createReportedPeptideDisplayData_result.numberOfReportedPeptides is not a number.  is: " + createReportedPeptideDisplayData_result.numberOfReportedPeptides;
        console.warn( msg );
        throw Error( msg );
    }

    const numberOfPsmsForReportedPeptides = createReportedPeptideDisplayData_result.numberOfPsmsForReportedPeptides;
    const numberOfReportedPeptides = createReportedPeptideDisplayData_result.numberOfReportedPeptides;

    //  Columns

    const dataTable_Columns : Array<DataTable_Column> = [];

    {
        {
            const dataTable_Column = new DataTable_Column({
                id : "repPeptIds", // Used for tracking sort order. Keep short
                displayName : "Reported Peptide",
                width : 400,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }
        {
            const dataTable_Column = new DataTable_Column({
                id : "Modifications", // Used for tracking sort order. Keep short
                displayName : "Modifications",
                width : 150,
                sortable : false,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 }, // whiteSpace: "nowrap", overflowX: "auto", 
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }
        
        {
            const dataTable_Column = new DataTable_Column({
                id : "psmCount", // Used for tracking sort order. Keep short
                displayName : "PSMs",
                width : 75,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", whiteSpace: "nowrap", overflowX: "auto", fontSize: 12 },
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }

        {
            const dataTable_Column = new DataTable_Column({
                id : "Proteins", // Used for tracking sort order. Keep short
                displayName : "Protein(s)",
                width : 220,
                sortable : true,
                style_override_DataRowCell_React : { display: "inline-block", fontSize: 12 }, // whiteSpace: "nowrap", overflowX: "auto", 
                // style_override_header_React : {},  // Optional
                // style_override_React : {},  // Optional
                // cssClassNameAdditions_HeaderRowCell : ""  // Optional, css classes to add to Header Row Cell entry HTML
                // cssClassNameAdditions_DataRowCell : ""   // Optional, css classes to add to Data Row Cell entry HTML
            });
            dataTable_Columns.push( dataTable_Column );
        }



        //  Score Columns
        const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;
        // annotationTypeRecords_DisplayOrder { psmAnnotationTypesForPeptideListEntries, reportedPeptideAnnotationTypesForPeptideListEntries

        {  //  Reported Peptide Scores
            const reportedPeptideAnnotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;
            for ( const reportedPeptideAnnotationType of reportedPeptideAnnotationTypesForPeptideListEntries ) {
                
                const dataTable_Column = new DataTable_Column({
                    id : "rp_" + reportedPeptideAnnotationType.name, // Used for tracking sort order. Keep short
                    displayName : reportedPeptideAnnotationType.name,
                    width : 105,
                    sortable : true,
                    style_override_DataRowCell_React : { fontSize: 12 }
                });
                dataTable_Columns.push( dataTable_Column );
            }
        }
    }

    //  Data Rows

    const dataTable_DataRowEntries : Array<DataTable_DataRowEntry> = [];

    {
        for ( const peptideEntry of createReportedPeptideDisplayData_result.peptideList ) {

            const reportedPeptideId = peptideEntry.reportedPeptideId;

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId );
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId ) {
                const msg = "No entry found in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId for reportedPeptideId: " + reportedPeptideId
                console.warn(msg)
                throw Error(msg)
            }
            const columnEntries : DataTable_DataRow_ColumnEntry[] = [];
            {
                { // reportedPeptideSequence
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : peptideEntry.reportedPeptideSequence,
                        valueSort : peptideEntry.reportedPeptideSequence
                    })
                    columnEntries.push( columnEntry );
                }

                { // Modifications

                    const modMassesAllList = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().get( reportedPeptideId );

                    if ( modMassesAllList && modMassesAllList.length ) {

                        //  Have Dynamic/Variable Mods

                        const _MOD_MASS_POSITION_LABEL__N_TERMINAL = 'n';
                        const _MOD_MASS_POSITION_LABEL__C_TERMINAL = 'c';

                        //  Extract 'n' and 'c' terminal mod masses into separate arrays

                        const modMasses_Main_List = []; // Not 'n' or 'c' terminal
                        const modMasses_N_Terminal_List = []; // 'n' terminal
                        const modMasses_C_Terminal_List = []; // 'c' terminal

                        for ( const modEntry of modMassesAllList ) {

                            const modEntry_Display : {
                                position: any;
                                mass: number;
                            } = { position: modEntry.position,
                                mass: modEntry.mass
                            }

                            if ( modEntry.is_N_Terminal ) {
                                modEntry_Display.position = _MOD_MASS_POSITION_LABEL__N_TERMINAL;
                                modMasses_N_Terminal_List.push( modEntry_Display );
                            } else if ( modEntry.is_C_Terminal ) {
                                modEntry_Display.position = _MOD_MASS_POSITION_LABEL__C_TERMINAL;
                                modMasses_C_Terminal_List.push( modEntry_Display );
                            } else {
                                modMasses_Main_List.push( modEntry_Display );
                            }
                        }

                        //  Sort 'n' terminal mods
                        modMasses_N_Terminal_List.sort( function( a, b ) {
                            if ( a.mass < b.mass ) {
                                return -1;
                            }
                            if ( a.mass > b.mass ) {
                                return 1;
                            }
                            return 0;
                        } );

                        //  Sort 'c' terminal mods
                        modMasses_C_Terminal_List.sort( function( a, b ) {
                            if ( a.mass < b.mass ) {
                                return -1;
                            }
                            if ( a.mass > b.mass ) {
                                return 1;
                            }
                            return 0;
                        } );

                        // Sort Not 'n' or 'c' terminal mods
                        modMasses_Main_List.sort( function( a, b ) {
                            if ( a.position < b.position ) {
                                return -1;
                            }
                            if ( a.position > b.position ) {
                                return 1;
                            }
                            if ( a.mass < b.mass ) {
                                return -1;
                            }
                            if ( a.mass > b.mass ) {
                                return 1;
                            }
                            return 0;
                        } );

                        //  Create combined output list

                        const modMassList = [];

                        for ( const modEntry of modMasses_N_Terminal_List ) {
                            modMassList.push( modEntry );
                        }
                        for ( const modEntry of modMasses_Main_List ) {
                            modMassList.push( modEntry );
                        }
                        for ( const modEntry of modMasses_C_Terminal_List ) {
                            modMassList.push( modEntry );
                        }

                        const modMass_AsStrings : Array<string> = [];
                        for ( const entry of modMassList ) {
                            const asString = entry.position + ":" + entry.mass;
                            modMass_AsStrings.push( asString );
                        }

                        const modMass_String =  modMass_AsStrings.join(", ");


                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay : modMass_String,
                            valueSort : modMass_String
                        })
                        columnEntries.push( columnEntry );

                    } else {

                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay : "",
                            valueSort : ""
                        })
                        columnEntries.push( columnEntry );
                    }
                }

                { // numPsms
                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : peptideEntry.numPsms.toLocaleString(),
                        valueSort : peptideEntry.numPsms
                    })
                    columnEntries.push( columnEntry );
                }

                { // Protein(s)

                    const proteinSequenceVersionIds = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId().get( reportedPeptideId );
                    if ( ! proteinSequenceVersionIds ) {
                        const msg = "No value from loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId().get( reportedPeptideId ). reportedPeptideId: " + reportedPeptideId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    const proteinNames_Set : Set<string> = new Set();

                    for ( const proteinSequenceVersionId of proteinSequenceVersionIds ) {

                        const proteinInfo = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get( proteinSequenceVersionId );
                        if ( ! proteinSequenceVersionIds ) {
                            const msg = "No value from loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId().get( proteinSequenceVersionId ). proteinSequenceVersionId: " + proteinSequenceVersionId;
                            console.warn( msg );
                            throw Error( msg );
                        }

                        for ( const annotation of proteinInfo.annotations ) {
                            proteinNames_Set.add( annotation.name )
                        }
                    }

                    const proteinNames_Array : Array<string> = Array.from( proteinNames_Set );
                    proteinNames_Array.sort();

                    const proteinNames_String = proteinNames_Array.join(", ");

                    const columnEntry = new DataTable_DataRow_ColumnEntry({
                        valueDisplay : proteinNames_String,
                        valueSort : proteinNames_String
                    })
                    columnEntries.push( columnEntry );
                }
            }
            { //  Score Columns
                const annotationTypeRecords_DisplayOrder = createReportedPeptideDisplayData_result.annotationTypeRecords_DisplayOrder;

                {  //  Reported Peptide Scores
                    const annotationTypesForPeptideListEntries = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;
                    for ( const annotationType of annotationTypesForPeptideListEntries ) {
                        if ( peptideEntry.peptideAnnotationMap_KeyAnnType === undefined || peptideEntry.peptideAnnotationMap_KeyAnnType === null ) {
                            const msg = "( peptideEntry.peptideAnnotationMap === undefined || peptideEntry.peptideAnnotationMap === null )"
                            console.warn( msg );
                            throw Error( msg );
                        }
                        const annotationEntry = peptideEntry.peptideAnnotationMap_KeyAnnType.get( annotationType.annotationTypeId );
                        let valueSort : any = annotationEntry.valueDouble;
                        if ( valueSort === undefined || valueSort === null ) {
                            valueSort = annotationEntry.valueString; //  Needed for Descriptive Annotation Types
                        }
                        const columnEntry = new DataTable_DataRow_ColumnEntry({
                            valueDisplay : annotationEntry.valueString,
                            valueSort
                        })
                        columnEntries.push( columnEntry );
                    }
                }
            }

            const psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter = new PsmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter({
                projectSearchId,
                reportedPeptideId,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
                searchDataLookupParamsRoot,
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                dataPageStateManager,
                forMultipleSearchesPage : true  // Always true for Experiment
            });

            const dataTable_DataRowEntry = new DataTable_DataRowEntry({
                uniqueId : reportedPeptideId,
                sortOrder_OnEquals : reportedPeptideId,
                columnEntries,
                dataRow_GetChildTable_ReturnReactComponent_Parameter : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent_Parameter
            })
            dataTable_DataRowEntries.push( dataTable_DataRowEntry );
        }
    }

    const dataTable_RootTableDataObject = new DataTable_RootTableDataObject({
        columns : dataTable_Columns,
        dataTable_DataRowEntries
    });

    const tableOptions = new DataTable_TableOptions({
        //  Comment out since no further drill down to child table
        // dataRow_GetChildTableData : fake_dataRow_GetChildTableData          //  TODO  Need to provide this for child table processing
        dataRow_GetChildTable_ReturnReactComponent : psmList_Wrapper_For_SingleReportedPeptide__dataRow_GetChildTable_ReturnReactComponent
    });

    const dataTable_RootTableObject = new DataTable_RootTableObject({
        dataTableId : dataTableId_ThisTable,
        tableOptions,
        tableDataObject : dataTable_RootTableDataObject
    });

    return {
        dataTable_RootTableObject,
        numberOfPsmsForReportedPeptides,
        numberOfReportedPeptides
    };
}
