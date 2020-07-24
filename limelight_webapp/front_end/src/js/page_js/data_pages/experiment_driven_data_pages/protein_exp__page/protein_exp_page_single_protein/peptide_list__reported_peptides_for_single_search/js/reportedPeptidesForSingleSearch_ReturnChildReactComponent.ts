/**
 * reportedPeptidesForSingleSearch_ReturnChildReactComponent.ts
 * 
 * Experiment Protein Page: Single Protein: show Reported Peptides for Single Search for Single Peptide in Peptide List
 * 
 * Return React Component that is shown for child of Single Search for Single Peptide and will contain child table 
 */


//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';


 //  Data Table
import { DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

//  React Component that will be returned
import { ReportedPeptidesForSingleSearch_ChildReactComponent } from '../jsx/reportedPeptidesForSingleSearch_ChildReactComponent';
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";



/**
 * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
 */
class ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter {
    
    projectSearchId : number
    reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager

    /**
     * Used as class for object placed in data row object property dataRow_GetChildTable_ReturnReactComponent_Parameter
     */
    constructor({ 
        
        projectSearchId,
        reportedPeptideIds_ForDisplay,
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        searchDataLookupParamsRoot,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        dataPageStateManager
    } : { 
        projectSearchId : number
        reportedPeptideIds_ForDisplay : Set<number>  // reportedPeptideIds specific to ParentPeptide
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
        searchDataLookupParamsRoot,
        loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
        dataPageStateManager : DataPageStateManager
    }) {

        this.projectSearchId = projectSearchId;
        this.reportedPeptideIds_ForDisplay = reportedPeptideIds_ForDisplay;
        this.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
        this.loadedDataCommonHolder = loadedDataCommonHolder;
        this.dataPageStateManager = dataPageStateManager;
    }


    // shallowClone() {

    //     const clone = new ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter();
    //     Object.assign( clone, this );
    //     return clone;
    // }
}

/**
 * 
 */
const reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent = ( 
    dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm: DataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm 
) : any /* React.Component */ => {

    if ( ! dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm ) {
        throw Error("No value in dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm")
    }
    const dataRow_GetChildTable_ReturnReactComponent_Parameter = dataTable_TableOptions_dataRow_GetChildTable_ReturnReactComponent_RequestParm.dataRow_GetChildTable_ReturnReactComponent_Parameter;
    if ( ! dataRow_GetChildTable_ReturnReactComponent_Parameter ) {
        throw Error("No value in dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    if ( ! ( dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter ) ) {
        throw Error("Not: dataRow_GetChildTable_ReturnReactComponent_Parameter instanceof ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter")
    }
    const dataRow_GetChildTable_ReturnReactComponentParameter = dataRow_GetChildTable_ReturnReactComponent_Parameter as ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter
    // dataRow_GetChildTable_ReturnReactComponentParameter is the value in dataTable_DataRowEntry.dataRow_GetChildTable_ReturnReactComponentParameter

    //  For this implementation, dataRow_GetChildTable_ReturnReactComponent_Parameter is not used here.

    //  Return class

    return ReportedPeptidesForSingleSearch_ChildReactComponent;
}


export { reportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent, ReportedPeptidesForSingleSearch__dataRow_GetChildTable_ReturnReactComponent_Parameter }
