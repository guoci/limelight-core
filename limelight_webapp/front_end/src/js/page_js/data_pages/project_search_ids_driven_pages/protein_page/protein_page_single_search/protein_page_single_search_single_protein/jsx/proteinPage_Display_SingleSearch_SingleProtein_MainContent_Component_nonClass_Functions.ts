/**
 * proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component_nonClass_Functions.ts
 * 
 * Functions for proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component.tsx
 * 
 */


// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//   Modification Mass Rounding to provide some level of commonality between searches
// import {
// 	modificationMass_CommonRounding_ReturnNumber_Function,
//     modificationMass_CommonRounding_ReturnString_Function,
//     modificationMass_CommonRounding_ReturnNumber, 
//     modificationMass_CommonRounding_ReturnString 
// } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber_Function,
    reporterIonMass_CommonRounding_ReturnString_Function,
    reporterIonMass_CommonRounding_ReturnNumber, 
    reporterIonMass_CommonRounding_ReturnString, 
    _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';


import { proteinSequenceWidgetDisplay_Component_Data__Build } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein//protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data__Build';
import { ProteinSequenceWidgetDisplay_Component_Data } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';
import { peptideSequence_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelection_BuildData_ForReactComponent';
import { UserSearchString_LocationsOn_ProteinSequence_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import { userSearchString_LocationsOn_ProteinSequence_Compute } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute';

import { modificationMass_UserSelections_BuildData_ForReactComponent } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { reporterIonMass_UserSelections_BuildData_ForReactComponent, ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { getReportedPeptideIdsForDisplay_AllProjectSearchIds } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'

import { getSequenceCoverageBooleanArray_ForReportedPeptideIds } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_FilteredOnReportedPeptideIds';
import { getSequenceCoverageBooleanArray_NotFiltered } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget__ForProtExp_SingleProtein/proteinSequenceWidgetDisplay_GetSequenceCoverage_NotFiltered';



import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages//protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer';
import { ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId';


/**
 * return type of linksToExternalResources
 */  
class LinksToExternalResources {
    NCBI_Blast_URL : string
    PDR_Blast_URL : string
    UniProtKB_Search_URL : string
    NCBI_Search_URL : string
}

/**
 * 
 */  
const initialPopulate = function({

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchId,
    loadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
    peptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject
} : {
    proteinSequenceVersionId : number,
    proteinSequenceString : string,
    projectSearchId : number,
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject
}  ) :

{
    linksToExternalResources : LinksToExternalResources,
    protein_fractionCovered_Unfiltered : number,
    psmCountForUnfiltered : number,
    modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
    reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
    peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
    userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
    proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
    reportedPeptideIdsForDisplay : Array<number>
}
{    
    const modificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({ 
        modificationMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchId,
        loadedDataPerProjectSearchIdHolder
    });

    const reporterIons_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({

        reporterIonMass_UserSelections_StateObject,
        proteinSequenceVersionId,
        projectSearchId,
        loadedDataPerProjectSearchIdHolder 
    });

    const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({

        peptideSequence_UserSelections_StateObject
    });

    //  Create initial instance.  Updated instance will be created in peptideSequence_UserSelections.tsx when user changes the input field value
    const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Compute({
        proteinSequenceString,
        searchStrings : peptideSequence_UserSelections_StateObject.getPeptideSearchStrings()
    });

    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );

    // External Class in Experiment Code

    const proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
        forSingleSearch : true,
        forMultipleSearch : false,
        proteinSequenceVersionId,
        loadedDataCommonHolder,
        proteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root
    });

    const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = (
        proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.
        getReportedPeptideIdsForDisplay_SingleProjectSearchId({
            not_filtered_position_modification_selections : false, 
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        })
    );

    let reportedPeptideIdsForDisplay : Array<number> = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

    if ( ! reportedPeptideIdsForDisplay ) {
        reportedPeptideIdsForDisplay = [];
    }
    
    const sequenceCoverageBooleanArray_Unfiltered = getSequenceCoverageBooleanArray_NotFiltered({ // External Function in Experiment Code
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        projectSearchIds : [ projectSearchId ]
    });

    let proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data = undefined;

    {
        let proteinPositions_CoveredBy_SearchStrings = userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings;
        if ( proteinPositions_CoveredBy_SearchStrings.length < 1 ) {
            proteinPositions_CoveredBy_SearchStrings = undefined;
        }

        proteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data({  // Function in this file

            proteinSequenceWidget_StateObject,

            reportedPeptideIdsForDisplay,  

            proteinSequenceVersionId,
            proteinSequenceString,
            projectSearchId,
            proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
            proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
            loadedDataPerProjectSearchIdHolder,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject
        });
    }

    const linksToExternalResources = _createLinksToExternalResources({ proteinSequenceVersionId, proteinSequenceString, projectSearchId, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    const protein_fractionCovered_Unfiltered = _computeSequenceCoverageFractionForUnfiltered({ proteinSequenceString, sequenceCoverageBooleanArray_Unfiltered });
    
    const psmCountForUnfiltered = _computePsmCountForUnfiltered({ proteinSequenceVersionId, projectSearchId, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

    return {
        linksToExternalResources,
        protein_fractionCovered_Unfiltered,
        psmCountForUnfiltered,
        modificationMass_UserSelections_ComponentData,
        reporterIons_UserSelections_ComponentData,
        peptideSequence_UserSelections_ComponentData,
        userSearchString_LocationsOn_ProteinSequence_Root,
        proteinSequenceWidgetDisplay_Component_Data,
        sequenceCoverageBooleanArray_Unfiltered,
        reportedPeptideIdsForDisplay
    }
}        

///////////////////////////



/**
 * Create links to external resources
 */
const _createLinksToExternalResources = function({ 
    
    proteinSequenceVersionId, 
    proteinSequenceString, 
    projectSearchId, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    proteinSequenceVersionId : number, 
    proteinSequenceString : string, 
    projectSearchId : number, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : LinksToExternalResources {

    const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
    const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
    
    const proteinNames_URI_Encoded_Set = new Set();

    const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
    
    if ( ! loadedDataPerProjectSearchIdHolder ) {
        const msg = "_createLinksToExternalResources(): No value in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()
    if ( ! proteinInfoMapKeyProteinSequenceVersionId ) {
        const msg = "_createLinksToExternalResources(): No value in loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId() for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinInfo ) {
        const annotations = proteinInfo.annotations;
        if ( annotations ) {
            for ( const annotation of annotations ) {
                const name = annotation.name;
//				const description = annotation.description;
//				const taxonomy = annotation.taxonomy;
                const proteinName_URI_Encoded = window.encodeURIComponent( name );
                proteinNames_URI_Encoded_Set.add( proteinName_URI_Encoded );
            }
        }
    }

    if ( proteinNames_URI_Encoded_Set.size === 0 ) {
        throw Error("No Protein names found for any searches.");
    }

    const proteinNames_URI_Encoded_Array = Array.from( proteinNames_URI_Encoded_Set );

    const proteinNamesForQueries = proteinNames_URI_Encoded_Array.join("+or+");

    // (if more than one name for this sequence, separate they by "+or+")
    const UniProtKB_Search_URL ="https://www.uniprot.org/uniprot/?query=" + proteinNamesForQueries + "&sort=score";

    const NCBI_Search_URL ="https://www.ncbi.nlm.nih.gov/protein/?term=" + proteinNamesForQueries;

        
    const linksToExternalResources = {
            NCBI_Blast_URL,
            PDR_Blast_URL,
            UniProtKB_Search_URL,
            NCBI_Search_URL
    }
    
    return linksToExternalResources;
}


/**
 * Create links to external resources
 */
const _computeSequenceCoverageFractionForUnfiltered = function({ 
    
    proteinSequenceString, 
    sequenceCoverageBooleanArray_Unfiltered 
} : { 
    proteinSequenceString : string, 
    sequenceCoverageBooleanArray_Unfiltered : Array<boolean>
}) : number {

    //  Array of data is 1 based for protein position that starts at 1

    const proteinSequenceString_length = proteinSequenceString.length;

    let positionsCoveredCount = 0;

    for ( let position = 1; position <= proteinSequenceString_length; position++ ) {
        if ( sequenceCoverageBooleanArray_Unfiltered[ position ] ) {
            positionsCoveredCount++;
        }
    }

    const fractionCovered = ( positionsCoveredCount / proteinSequenceString_length )

    return fractionCovered;
}


/**
 * Compute PSM Count for Protein for All Project Search Ids - No Filtering for any user choices on this single protein or in protein list
 */
const _computePsmCountForUnfiltered = function({ 
    
    proteinSequenceVersionId, 
    projectSearchId, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
} : {
    proteinSequenceVersionId : number, 
    projectSearchId : number, 
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>

}) : number {

    let psmCount = 0;

    const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
    if ( ! loadedDataPerProjectSearchIdHolder ) {
        //  No entry for this projectSearchId
        {
            const msg = "loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ) not return a value. _computePsmCountForUnfiltered(): proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component_nonClass_Functions.ts";
            console.warn( msg )
            throw Error( msg )
        }
    }

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
    if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
        //  No entry 
        {
            const msg = "loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId() not return a value. _computePsmCountForUnfiltered(): proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component_nonClass_Functions.ts";
            console.warn( msg )
            throw Error( msg )
        }
    }

    const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( ! reportedPeptideIds ) {
        //  No entry 
        {
            const msg = "reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId ); not return a value. _computePsmCountForUnfiltered(): proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component_nonClass_Functions.ts";
            console.warn( msg )
            throw Error( msg )
        }
    }

    const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
    if ( ! numPsmsForReportedPeptideIdMap ) {
        //  No entry 
        {
            const msg = "loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap() not return a value. _computePsmCountForUnfiltered(): proteinPage_Display_SingleSearch__SingleProtein_MainContent_Component_nonClass_Functions.ts";
            console.warn( msg )
            throw Error( msg )
        }
    }

    for ( const reportedPeptideId of reportedPeptideIds ) {
        const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
        if ( numPsmsForReportedPeptideId ) {
            psmCount += numPsmsForReportedPeptideId;
        }
    }

    return psmCount;
}





///////////////////////////

/**
 * 
 */
const create_ModificationMass_UserSelections_ComponentData = function({

    modificationMass_UserSelections_StateObject,
    proteinSequenceVersionId,
    projectSearchId,
    loadedDataPerProjectSearchIdHolder
} : {
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    proteinSequenceVersionId : number,
    projectSearchId : number,
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
}) : ModificationMass_UserSelections_ComponentData {

    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map()
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );

    const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({   //  External Function: data_pages/experiment_driven_data_pages
        modificationMass_UserSelections_StateObject : modificationMass_UserSelections_StateObject, 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : [ projectSearchId ], 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        modificationMass_CommonRounding_ReturnNumber : undefined
    });
    
    return modificationMass_UserSelections_ComponentData;
}

/**
 * 
 */
const create_ReporterIons_UserSelections_ComponentData = function( {

    reporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId,
    projectSearchId,
    loadedDataPerProjectSearchIdHolder
} : {
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
    proteinSequenceVersionId : number,
    projectSearchId : number,
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
}) : ReporterIonMass_UserSelections_ComponentData {

    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map()
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );

    const reporterIons_UserSelections_ComponentData = reporterIonMass_UserSelections_BuildData_ForReactComponent({ 

        reporterIonMass_UserSelections_StateObject : reporterIonMass_UserSelections_StateObject, 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : [ projectSearchId ],
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
        reporterIonMass_CommonRounding_ReturnNumber : undefined // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
    });

    return reporterIons_UserSelections_ComponentData;
}

/**
 * 
 */
const create_PeptideSequence_UserSelections_ComponentData = function( {

    peptideSequence_UserSelections_StateObject
} : {
    peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject,
}) : PeptideSequence_UserSelections_ComponentData {

    const peptideSequence_UserSelections_ComponentData = peptideSequence_UserSelections_BuildData_ForReactComponent({ 

        peptideSequence_UserSelections_StateObject : peptideSequence_UserSelections_StateObject
    });

    return peptideSequence_UserSelections_ComponentData;
}

/**
 * 
 */
const create_ProteinSequenceWidgetDisplay_Component_Data = function({

    proteinSequenceWidget_StateObject,

    reportedPeptideIdsForDisplay,

    proteinSequenceVersionId,
    proteinSequenceString,
    projectSearchId,
    proteinCoverageArrayOfBoolean, //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings,
    loadedDataPerProjectSearchIdHolder,
    modificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject,
} : {
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject,

    reportedPeptideIdsForDisplay : Array<number>,

    proteinSequenceVersionId : number,
    proteinSequenceString : string,
    projectSearchId : number,
    proteinCoverageArrayOfBoolean : Array<boolean>, //  All Peptides
    proteinPositions_CoveredBy_PeptideSearchStrings : Array<boolean>,
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject

}) : ProteinSequenceWidgetDisplay_Component_Data {


    const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map()
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, loadedDataPerProjectSearchIdHolder );

    let sequenceCoverageBooleanArray_ForReportedPeptideIds : Array<boolean> = null;
    
    if ( 
        modificationMass_UserSelections_StateObject.is_Any_VariableModification_Selected()
        || modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected()
        || reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected()
        || proteinPositions_CoveredBy_PeptideSearchStrings
        || proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
    ) { 
        const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId : Map<number, number[]>  = new Map();
        reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.set( projectSearchId, reportedPeptideIdsForDisplay );

        //  Populate since have user selection
        sequenceCoverageBooleanArray_ForReportedPeptideIds = getSequenceCoverageBooleanArray_ForReportedPeptideIds({ //  External Function: data_pages/experiment_driven_data_pages
        
            reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            projectSearchIds : [ projectSearchId ]
        });
    }

    //    Modification Mass Info for display

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
    const variableModificationMassesForProteinPositions = _get_variableModificationMasses_All_OnProteinByPosition({   // function: Same File 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds :[ projectSearchId ], 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    //  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
    const staticModificationMassesForProteinPositions = _get_staticModificationMasses_All_OnProteinByPosition({   // function: Same File 
        proteinSequenceVersionId : proteinSequenceVersionId, 
        projectSearchIds : [ projectSearchId ], 
        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds 
    });

    const staticModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected();
        
    const variableModificationSelectionUnmodifiedSelected = modificationMass_UserSelections_StateObject.is_NO_VariableModification_AKA_Unmodified_Selected();
    const variableModificationMassesToFilterOn = modificationMass_UserSelections_StateObject.get_VariableModificationsSelected_ExcludingNoModificationOption();

    
    const proteinSequenceWidgetDisplay_Component_Data = proteinSequenceWidgetDisplay_Component_Data__Build({  //  External Function Call
        proteinSequenceString, 
        proteinSequenceWidget_StateObject : proteinSequenceWidget_StateObject, 
        proteinCoverageArrayOfBoolean,
        proteinCoverageArrayOfBoolean_UserSelectedPeptides : sequenceCoverageBooleanArray_ForReportedPeptideIds,  // - null or undefined if not set - Only User Selected Peptides 
        variableModificationSelectionUnmodifiedSelected,
        variableModificationMassesToFilterOn,
        staticModificationMassesToFilterOn : staticModificationMassesToFilterOn,
        variableModificationMassesForProteinPositions,
        staticModificationMassesForProteinPositions,
        proteinPositions_CoveredBy_PeptideSearchStrings  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
    });

    return proteinSequenceWidgetDisplay_Component_Data;
}


////////////////////////////////////////////////////////



/////////

//  Modification Mass Info for display


//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

/**
 * All Variable modification masses by protein position
 * 
 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
 */
const _get_variableModificationMasses_All_OnProteinByPosition = function({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }) {

	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

	{
		//  Start with Map of Sets to remove duplicates
		const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

			const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
			if ( ! dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
				//  No data for projectSearchId so skip to next
				continue; // EARLY CONTINUE
			}

			const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! dynamicModificationsOnProtein ) {
				// No Data for _proteinSequenceVersionId so skip to next
				continue; // EARLY CONTINUE
			}

			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

				const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				let massesAtPosition = modsOnProteinByPosition_Sets.get( position );
				if ( ! massesAtPosition ) {
					massesAtPosition = new Set();
					modsOnProteinByPosition_Sets.set( position, massesAtPosition );
                }
                massesAtPosition.add( mass );

				//  Round mass since Multiple Search
				// const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
				// massesAtPosition.add( roundedMass );
			}
		}

		//  Sort masses at each position
		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition_Sets.entries() ) {
			const position = modsOnProteinByPositionEntry[ 0 ];
			const massesAtPositionSet = modsOnProteinByPositionEntry[ 1 ];
			const massesAtPositionArray = Array.from( massesAtPositionSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			});
			//  Place the sorted Array in the final output Map
			modsOnProteinByPosition.set( position, massesAtPositionArray );
		}
	}

	return modsOnProteinByPosition;
}

//////////////////////////////////

///   Get Reporter Ion Mass Info


/**
 * 
 * @returns null if no data to load, otherwise returns Promise<any>
 */
const load_ReporterIonMasses_IfNeeded = function({

    proteinSequenceVersionId,
    projectSearchIds,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    loadedDataCommonHolder,
    searchDataLookupParamsRoot
} : {

    proteinSequenceVersionId : number,
    projectSearchIds : Array<number>,
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>,
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
    searchDataLookupParamsRoot

}) : Promise<any> {

    const promises_LoadData_Array = [];

    for ( const projectSearchId of projectSearchIds ) {

        const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
        if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

            //  reportedPeptideIds for this proteinSequenceVersionId
            let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
            if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

                const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
                const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;
            
                let searchDataLookupParams_For_projectSearchId = undefined;
                for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

                    if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
                        searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
                        break;
                    }
                }
                if ( ! searchDataLookupParams_For_projectSearchId ) {
                    const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
                    loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder
                });

                const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer({
                    loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
                    loadedDataCommonHolder : loadedDataCommonHolder ,
                    dataPageStateManager_DataFrom_Server : undefined, // Not Provided
                    searchDetailsBlockDataMgmtProcessing : undefined, // Not Provided
                    proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
                });
                const promise = (
                    proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
                    .loadDataFor_PSM_ReporterIonMasses_Per_ReportedPeptideId_For_ProteinSequenceVersionId({
                        proteinSequenceVersionId : proteinSequenceVersionId,
                        projectSearchId,
                        searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId
                        // searchDataLookupParams_For_Single_ProjectSearchId // Same as retrieved from this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId(...)
                    })
                );
                if (promise) {
                    promises_LoadData_Array.push(promise);
                }
            }
        }
    }

    if ( promises_LoadData_Array.length === 0 ) {

        return null;  // EARLY RETURN
    }

    const promiseAll = Promise.all( promises_LoadData_Array );

    return promiseAll;
}



/////////////////////////////////

//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>

/**
 * All Static modification masses by protein position
 * 
 * Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  
 * 		 Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >
 * 
 * Match format from loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
 * 
 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
 */
const _get_staticModificationMasses_All_OnProteinByPosition = function({ proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }) {

	//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	// Map<integer, Object> Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet: Set< mass (number)> >
	const modsOnProteinByPosition = new Map(); 

	{
		for ( const projectSearchId of projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
			const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
			if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
				//  no data for project search id
				continue;  //  EARLY CONTINUE
			}
			const staticModificationMassesForProteinPositions = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! staticModificationMassesForProteinPositions ) {
				//  no data for proteinSequenceVersionId for project search id
				continue;  //  EARLY CONTINUE
			}

			for ( const mapEntry of staticModificationMassesForProteinPositions.entries() ) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions

				//  modificationOnProtein { mass: 9945.99, position: 23, reportedPeptideId: 26043 }

				const position = mapEntry[ 0 ];
				const dataForPosition = mapEntry[ 1 ];

				let resultDataForPosition = modsOnProteinByPosition.get( position );

				if ( ! resultDataForPosition ) {

					resultDataForPosition = { residue : dataForPosition.residue, massesSet : new Set() };
					modsOnProteinByPosition.set( position, resultDataForPosition );
				}

				//  Copy all masses from entry for project search id to output Set
				//     Round the mass since Multiple Search
				for ( const mass of dataForPosition.massesSet ) {
                    resultDataForPosition.massesSet.add( mass );
					// const roundedMass = _roundModificationMass_ReturnNumber_LocalFunction({ mass });
					// resultDataForPosition.massesSet.add( roundedMass );
				}
			}
			
		}

		//  Sort masses at each position
		for ( const modsOnProteinByPositionEntry of modsOnProteinByPosition.entries() ) {
			const position = modsOnProteinByPositionEntry[ 0 ];
			const dataForPosition = modsOnProteinByPositionEntry[ 1 ];
			const massesAtPositionArray = Array.from( dataForPosition.massesSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			});
			//  Place the sorted Array in the final output Map
			dataForPosition.massesArray = massesAtPositionArray;
		}
	}

	return modsOnProteinByPosition;
}


////////////////////////////////////////////
	
//   Modification Mass Rounding to provide some level of commonality between searches

/**
 * 
 */
// const _roundModificationMass_ReturnNumber_LocalFunction = function({ mass }) {
// 	return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
// }

	

///////////////////////////////////////////////


export { 
    initialPopulate, 
    create_ModificationMass_UserSelections_ComponentData, 
    create_ReporterIons_UserSelections_ComponentData, 
    create_PeptideSequence_UserSelections_ComponentData,
    create_ProteinSequenceWidgetDisplay_Component_Data, 
    load_ReporterIonMasses_IfNeeded,
    LinksToExternalResources // return type
}
