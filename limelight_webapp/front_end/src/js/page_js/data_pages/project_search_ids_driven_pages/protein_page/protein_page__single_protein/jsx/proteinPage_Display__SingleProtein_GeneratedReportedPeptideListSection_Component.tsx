/**
 * proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx
 * 
 * Protein Page - Multiple Searches - Single Protein - Reported Peptide List section - 
 * 
 * Shown when A Protein is clicked
 */


 ///  Removed "Updating Message" since wasn't being displayed anyway.  
 ///  Need a paint cycle to end after add updating message before actually updating the peptide list


import React from 'react'

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts


import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import { DataTable_RootTableObject } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result } from '../js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData';

import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein,
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function,
    GetDataTableDataObjects_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {PeptideFiltersDisplay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/jsx/peptideFiltersDisplay";
import {PeptideFiltersDisplay_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/js/peptideFiltersDisplay_ComponentData";
import {AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component} from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component";


export type ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = () => void;
export type ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = () => void;

/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props {

    peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData
    clearAllSelections_Callback : () => void

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    searchSubGroup_Ids_Selected : Set<number>

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number
    projectSearchIds : Array<number>
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean 
    showGettingDataMessage : boolean
    showProteins? : boolean  // For Peptide Page

    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    // For Peptide Page
    downloadPeptides_Shown_ClickHandler? : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler? : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
}

/**
 * 
 */
interface ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State {

    placeholder?: any
    // showUpdatingMessage? : boolean 
}


/**
 * 
 */
export class ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component extends React.Component< ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props, ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State > {

    /**
     * 
     */    
    constructor(props : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props) {
        super(props);

        this.state = { 
            // prev_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId : this.props.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId
        };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props, state : ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State ) : ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //    Return new state (like return from setState(callback)) or null

    //     if ( props.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId !== state.prev_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId ) {

    //         //   reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId changed so update showUpdatingMessage
            
    //         return { 
    //             showUpdatingMessage : true, 
    //             prev_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId : props.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId
    //         };
    //     }
            
    //     return null;
    // }
    
    // /**
    //  * @returns true if should update, false otherwise
    //  */
    // shouldComponentUpdate(nextProps : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props, nextState : ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State ) {

    //     // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")

    //     //  Only update if changed: props or state: 

    //     if ( this.state. !== nextState. ) {
    //         return true;
    //     }
    //     return false;

    //     //  If Comment out prev code, comment out this method
    // }

    //  returns snapshot which is passed to componentDidUpdate
    // getSnapshotBeforeUpdate(prevProps, prevState)

    // componentDidUpdate(
    //     prevProps : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props, 
    //     prevState : ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State, 
    //     snapshot
    // ) : void {

    //     if ( this.state.showUpdatingMessage ) {
    //         window.setTimeout( () => {
    //             try {
    //                 this.setState( (state: ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State, props: ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_Props ) : ProteinPage_Display__SingleProtein_ReportedPeptideListSection_Component_State => {

    //                     return { showUpdatingMessage : false };
    //                 });
    //             } catch( e ) {
    //                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //                 throw e;
    //             }
    //         }, 20 );
    //     }
    // }
    

    /**
     * 
     */    
    render() {

        //  Validate props
        if ( this.props.showProteins  // For Peptide Page
            && ( ! this.props.proteinName_Clicked_Callback_Function ) ) {  //  Required when showProteins is true.  For Peptide Page

            const msg = "( this.props.showProteins && ( ! this.props.proteinName_Clicked_Callback_Function ) )";
            console.warn(msg);
            throw Error(msg);
        }

        let updatingMessage = undefined;
        let gettingDataMessage = undefined;

        if ( this.props.showUpdatingMessage ) {

            updatingMessage = (
                <div  className=" block-updating-overlay-container " >
                    Updating Peptide List
                </div>
            )
        } else if ( this.props.showGettingDataMessage ) {

            gettingDataMessage = (
                <div  className=" block-updating-overlay-container " >
                    Loading Data to show Peptides
                </div>
            )
        }

        return (

            <div style={ { position: "relative" }}>
                <div style={ { position: "relative" }}>
                    <ReportedPeptideList_Component

                        peptideFiltersDisplay_ComponentData={ this.props.peptideFiltersDisplay_ComponentData }
                        clearAllSelections_Callback={ this.props.clearAllSelections_Callback }

                        create_GeneratedReportedPeptideListData_Result={ this.props.create_GeneratedReportedPeptideListData_Result }

                        searchSubGroup_Ids_Selected={ this.props.searchSubGroup_Ids_Selected }

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }
                        proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                        projectSearchIds={ this.props.projectSearchIds }
                        searchDataLookupParamsRoot={ this.props.searchDataLookupParamsRoot }
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                        loadedDataCommonHolder={ this.props.loadedDataCommonHolder }
                        dataPageStateManager={ this.props.dataPageStateManager }
                        showUpdatingMessage={ this.props.showUpdatingMessage }
                        showProteins={ this.props.showProteins }
                        proteinName_Clicked_Callback_Function={ this.props.proteinName_Clicked_Callback_Function }
                        downloadPeptides_Shown_ClickHandler={ this.props.downloadPeptides_Shown_ClickHandler }
                        downloadPsms_Shown_ClickHandler={ this.props.downloadPsms_Shown_ClickHandler }
                    />
                </div>
                { updatingMessage }
                { gettingDataMessage }
            </div>
            
        );
    }
}




/**
 * 
 */
export interface ReportedPeptideList_Component_Props {

    peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData
    clearAllSelections_Callback : () => void

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    searchSubGroup_Ids_Selected : Set<number>

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean
    showProteins? : boolean  // For Peptide Page

    //  Required when showProteins is true.  For Peptide Page
    proteinName_Clicked_Callback_Function? : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function

    downloadPeptides_Shown_ClickHandler : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback
    downloadPsms_Shown_ClickHandler : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
}

/**
 * 
 */
interface ReportedPeptideList_Component_State {

    placeholder?: any
    // prev_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId? : Map<number, Array<number>>
    // showUpdatingMessage? : boolean 
}


/**
 * 
 */
class ReportedPeptideList_Component extends React.Component< ReportedPeptideList_Component_Props, ReportedPeptideList_Component_State > {

    /**
     * 
     */    
    constructor(props : ReportedPeptideList_Component_Props) {
        super(props);

        this.state = { 
            // prev_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId : this.props.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_Map_KeyProjectSearchId
        };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ReportedPeptideList_Component_Props, nextState : ReportedPeptideList_Component_State ) {

        // console.log("ModificationMass_UserSelections_Variable_or_Open_Modifications: shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( nextProps.showUpdatingMessage ) {
            return false;  //  Never update when showing updating message
        }

        if ( this.props.create_GeneratedReportedPeptideListData_Result !== nextProps.create_GeneratedReportedPeptideListData_Result ) {
            return true;
        }
        if ( this.props.peptideFiltersDisplay_ComponentData !== nextProps.peptideFiltersDisplay_ComponentData ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */    
    render() {

        //  Validate props
        if ( this.props.showProteins  // For Peptide Page
            && ( ! this.props.proteinName_Clicked_Callback_Function ) ) {  //  Required when showProteins is true.  For Peptide Page

            const msg = "( this.props.showProteins && ( ! this.props.proteinName_Clicked_Callback_Function ) )";
            console.warn(msg);
            throw Error(msg);
        }

        const getDataTableDataObjects_Result : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result = createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein({ //  External Function

            create_GeneratedReportedPeptideListData_Result : this.props.create_GeneratedReportedPeptideListData_Result,

            searchSubGroup_Ids_Selected : this.props.searchSubGroup_Ids_Selected,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : this.props.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            projectSearchIds : this.props.projectSearchIds,
            searchDataLookupParamsRoot : this.props.searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.props.loadedDataCommonHolder,
            dataPageStateManager : this.props.dataPageStateManager,
            showProteins : this.props.showProteins,
            proteinName_Clicked_Callback_Function : this.props.proteinName_Clicked_Callback_Function
        });

        const dataTable_RootTableObject : DataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

        const maxDisplay_dataTableCellCount = 400000;  //  MAX

        let dataTableCellCount = 0
        if ( dataTable_RootTableObject && dataTable_RootTableObject.tableDataObject && dataTable_RootTableObject.tableDataObject.dataTable_DataRowEntries ) {
            dataTableCellCount = (
                dataTable_RootTableObject.tableDataObject.columns.length * dataTable_RootTableObject.tableDataObject.dataTable_DataRowEntries.length
            )
        }

        let havePeptideDataTableContentsForDownload : boolean = false;

        let noPeptidesMessage : JSX.Element = undefined;
        let peptideListTable_TooLarge : JSX.Element = undefined;
        let peptideListTable : JSX.Element = undefined;

        if ( this.props.create_GeneratedReportedPeptideListData_Result.peptideList_Length === 0 ) {

            noPeptidesMessage = (
                <div className=" padding-for-room-for-child-table-show-hide-icon ">
                    {/* add className padding-for-room-for-child-table-show-hide-icon to match positioning of peptide list table */}
                    No peptides meet the current filtering criteria.
                </div>
            );

        } else {

            havePeptideDataTableContentsForDownload = true;

            if ( dataTableCellCount > maxDisplay_dataTableCellCount ) {

                peptideListTable_TooLarge = (
                    <div style={ { marginTop: 20, marginLeft: 20 } }>
                        <div>
                            <span style={{ fontWeight: "bold", fontSize: 18, paddingRight: 8 }}>
                                The peptide table is too large to display
                            </span>
                            (the peptide download link will download what would have been shown).
                        </div>
                        <div style={ { marginTop: 20 } }>
                            To reduce the size of the table:
                        </div>
                        <div style={ { marginTop: 5, marginLeft: 20, marginBottom: 30 } }>
                            <div>
                                Filter the data
                            </div>
                            <div>
                                Change the <span style={ { fontWeight: "bold" } }>Show in Peptides:</span>
                            </div>
                            <div>
                                Reduce the number of merged searches
                            </div>
                        </div>
                    </div>
                );

            } else {

                peptideListTable = (
                    <DataTable_TableRoot
                        tableObject={dataTable_RootTableObject}
                    />
                );
            }
        }

        const numberOfPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.peptideList_Length.toLocaleString();
        const numberOfUniquePeptides = this.props.create_GeneratedReportedPeptideListData_Result.numberOfUniquePeptides.toLocaleString();
        const numberOfPSMsForReportedPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.numberOfPsmIds_NonRedundant_AcrossAllPeptides.toLocaleString();

        return (

            <div >
                                                    
                <div style={ { marginTop: 10, paddingBottom: 10 } }>
                    <div>
                        <span style={ { fontSize: 18 } } >
                            <span style={ { fontWeight: "bold" } }>Peptides:</span>
                            <span >(Click row to expand.)</span>
                        </span>
                    </div>

                    <div >
                        <AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component
                            projectSearchIds={ this.props.projectSearchIds }
                            searchDataLookupParameters_Root={ this.props.searchDataLookupParamsRoot }
                            dataPageStateManager_DataFrom_Server={ this.props.dataPageStateManager }
                        />
                    </div>

                    <div >

                        {/* Display of User Selected Modifications and Protein Positions filtering on  */}

                        <PeptideFiltersDisplay
                            peptideFiltersDisplay_ComponentData={ this.props.peptideFiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this.props.clearAllSelections_Callback }
                        />

                    </div>

                    <div style={ { marginTop: 10 } }>
                        <span style={ { fontWeight: "bold" } }>Total Found: </span>
                        <span >{ numberOfPeptidesShown }</span>
                        <span > peptides ({ numberOfUniquePeptides } unique) </span>
                        <span >{ numberOfPSMsForReportedPeptidesShown } PSMs</span>

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler || this.props.downloadPsms_Shown_ClickHandler ) ) ? (
                            //  Separator
                            <React.Fragment>
                                <span style={ { paddingLeft : 20 } }>&nbsp;</span>
                            </React.Fragment>
                        ) : null }

                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler ) ) ? (
                            // Peptide Download Link
                            <span className=" fake-link "
                                  onClick={ this.props.downloadPeptides_Shown_ClickHandler }
                            >Download All Peptides</span>
                        ) : null }
                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && ( this.props.downloadPeptides_Shown_ClickHandler && this.props.downloadPsms_Shown_ClickHandler ) ) ? (
                            //  Separator
                            <span style={ { paddingLeft : 10 } }>&nbsp;</span>
                        ) : null }
                        { ( ( peptideListTable || havePeptideDataTableContentsForDownload ) && this.props.downloadPsms_Shown_ClickHandler ) ? (
                            // PSM Download Link
                            <span className=" fake-link "
                                  onClick={ this.props.downloadPsms_Shown_ClickHandler }
                            >Download All PSMs</span>
                        ) : null }
                    </div>
                </div>

                <div >

                    {/* Container for Reported Peptides using Data Table - */}
                    <div className="  "
                        >
                        {/* Loading Reported Peptides  */}
                        { peptideListTable }
                    </div>
                    { noPeptidesMessage }
                    { peptideListTable_TooLarge }
                </div>
            </div>
        );
    }

}

