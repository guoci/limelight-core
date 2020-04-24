/**
 * proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Component.tsx
 * 
 * Protein Page - Multiple Searches - Single Protein - Reported Peptide List section - 
 * 
 * Shown when A Protein is clicked
 */


 ///  Removed "Updating Message" since wasn't being displayed anyway.  
 ///  Need a paint cycle to end after add updating message before actually updating the peptide list


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   From data_pages_common
import { DataPageStateManager }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts


import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';

import {

    DataTable_ColumnId,

    DataTable_RootTableObject,
    
    DataTable_TableOptions,
    DataTable_TableOptions_dataRowClickHandler_RequestParm,
    
    DataTable_Column,
    DataTable_SortColumnsInfoEntry,

    DataTable_RootTableDataObject,
    DataTable_DataGroupRowEntry,
    DataTable_DataRowEntry,
    DataTable_DataRow_ColumnEntry,

    DataTable_cellMgmt_External,
    DataTable_cellMgmt_External_PopulateRequest,
    DataTable_cellMgmt_External_PopulateResponse,
    DataTable_cellMgmt_ExternalReactComponent

} from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';


import { create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein, Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result, CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_Entry } from '../js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData';

import { createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein, GetDataTableDataObjects_MultipleSearch_SingleProtein_Result } from '../js/proteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Create_TableData';

/**
 * 
 */
export interface ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props {

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For dispaying the peptide list in sub component

    reporterIonMassesSelected : Set<number>, 
    staticModificationMassesToFilterOn, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean 
    showGettingDataMessage : boolean
}

/**
 * 
 */
interface ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State {

    placeholder?
    // showUpdatingMessage? : boolean 
}


/**
 * 
 */
export class ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component extends React.Component< ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State > {

    /**
     * 
     */    
    constructor(props : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props) {
        super(props);

        this.state = { 
            // prev_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : this.props.reportedPeptideIdsForDisplay_Map_KeyProjectSearchId 
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
    // static getDerivedStateFromProps( props : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, state : ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State ) : ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //    Return new state (like return from setState(callback)) or null

    //     if ( props.reportedPeptideIdsForDisplay_Map_KeyProjectSearchId !== state.prev_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId ) {

    //         //   reportedPeptideIdsForDisplay_Map_KeyProjectSearchId changed so update showUpdatingMessage
            
    //         return { 
    //             showUpdatingMessage : true, 
    //             prev_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : props.reportedPeptideIdsForDisplay_Map_KeyProjectSearchId 
    //         };
    //     }
            
    //     return null;
    // }
    
    // /**
    //  * @returns true if should update, false otherwise
    //  */
    // shouldComponentUpdate(nextProps : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, nextState : ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State ) {

    //     // console.log("ModificationMass_UserSelections_VariableModifications: shouldComponentUpdate")

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
    //     prevProps : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props, 
    //     prevState : ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State, 
    //     snapshot
    // ) : void {

    //     if ( this.state.showUpdatingMessage ) {
    //         window.setTimeout( () => {
    //             try {
    //                 this.setState( (state: ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State, props: ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component_Props ) : ProteinPage_Display_MultipleSearches_SingleProtein_ReportedPeptideListSection_Component_State => {

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

        let updatingMessage = undefined;
        let gettingDataMessage = undefined;

        if ( this.props.showUpdatingMessage ) {

            updatingMessage = (
                <div style={ {  fontSize : 18, color: "red", backgroundColor: "#DDDDDD", minHeight: 100, textAlign: "center", paddingTop: 30, position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } } >
                    Updating Peptide List
                </div>
            )
        } else if ( this.props.showGettingDataMessage ) {

            gettingDataMessage = (
                <div style={ {  fontSize : 18, color: "red", backgroundColor: "#DDDDDD", minHeight: 100, textAlign: "center", paddingTop: 30, position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } } >
                    Loading Data to show Peptides
                </div>
            )
        }

        return (

            <div style={ { position: "relative" }}>
                <div style={ { position: "relative" }}>
                    <ReportedPeptideList_Component
                        create_GeneratedReportedPeptideListData_Result={ this.props.create_GeneratedReportedPeptideListData_Result }

                        reporterIonMassesSelected={ this.props.reporterIonMassesSelected }
                        staticModificationMassesToFilterOn={ this.props.staticModificationMassesToFilterOn }
                        proteinSequenceVersionId={ this.props.proteinSequenceVersionId }
                        projectSearchIds={ this.props.projectSearchIds }
                        searchDataLookupParamsRoot={ this.props.searchDataLookupParamsRoot }
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                        loadedDataCommonHolder={ this.props.loadedDataCommonHolder }
                        dataPageStateManager={ this.props.dataPageStateManager }
                        showUpdatingMessage={ this.props.showUpdatingMessage }
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

    create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For dispaying the peptide list in sub component

    reporterIonMassesSelected : Set<number>, 
    staticModificationMassesToFilterOn, 
    proteinSequenceVersionId : number, 
    projectSearchIds : Array<number>,
    searchDataLookupParamsRoot,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    showUpdatingMessage : boolean 
}

/**
 * 
 */
interface ReportedPeptideList_Component_State {

    placeholder?
    // prev_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId? : Map<number, Array<number>>
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
            // prev_reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : this.props.reportedPeptideIdsForDisplay_Map_KeyProjectSearchId 
        };
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ReportedPeptideList_Component_Props, nextState : ReportedPeptideList_Component_State ) {

        // console.log("ModificationMass_UserSelections_VariableModifications: shouldComponentUpdate")

        //  Only update if changed: props or state: 

        if ( nextProps.showUpdatingMessage ) {
            return false;  //  Never update when showing updating message
        }

        if ( this.props.create_GeneratedReportedPeptideListData_Result !== nextProps.create_GeneratedReportedPeptideListData_Result ) {
            return true;
        }
        return false;

        //  If Comment out prev code, comment out this method
    }

    /**
     * 
     */    
    render() {

        const getDataTableDataObjects_Result : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result = createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein({ //  External Function

            create_GeneratedReportedPeptideListData_Result : this.props.create_GeneratedReportedPeptideListData_Result, 

            reporterIonMassesSelected : this.props.reporterIonMassesSelected, 
            staticModificationMassesToFilterOn : this.props.staticModificationMassesToFilterOn, 
            proteinSequenceVersionId : this.props.proteinSequenceVersionId, 
            projectSearchIds : this.props.projectSearchIds,
            searchDataLookupParamsRoot : this.props.searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.props.loadedDataCommonHolder,
            dataPageStateManager : this.props.dataPageStateManager
        });

        const dataTable_RootTableObject : DataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

        let noPeptidesMessage = undefined;
        let peptideListTable = undefined;

        if ( this.props.create_GeneratedReportedPeptideListData_Result.numberOfReportedPeptides === 0 ) {

            noPeptidesMessage = (
                <div className=" padding-for-room-for-child-table-show-hide-icon "> 
                {/* add className padding-for-room-for-child-table-show-hide-icon to match positioning of peptide list table */}
                    No peptides meet the current filtering criteria.
                </div>
            );
        } else {

            peptideListTable = (
                <DataTable_TableRoot
                    tableObject={ dataTable_RootTableObject }
                />
            );
        }

        const numberOfPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.numberOfReportedPeptides.toLocaleString();
        const numberOfPSMsForReportedPeptidesShown = this.props.create_GeneratedReportedPeptideListData_Result.numberOfPsmsForReportedPeptides.toLocaleString();

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
                        <span >Currently showing: </span>
                        <span >{ numberOfPeptidesShown }</span>
                        <span > peptides </span>
                        <span >({ numberOfPSMsForReportedPeptidesShown } PSMs)</span>
                    </div>
                </div>

                <div >  {/* Remove paddingLeft.  peptideListTable will make room for show/hide child table icons as is needed style={ { paddingLeft: 20 } } */}

                    {/* Container for Reported Peptides using Data Table - */}
                    <div className="  "
                        >  {/* Padding to make room for expand icon to left of each row of data  */}
                        {/* Loading Reported Peptides  */}
                        { peptideListTable }
                    </div>
                    { noPeptidesMessage }
                </div>
            </div>
        );
    }

}
