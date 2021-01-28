/**
 * modExperimentPage_Display.ts
 * 
 * Display Javascript for mod_Experiment.jsp page
 * 
 * 
 */


import React from 'react';
import ReactDOM from 'react-dom';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { Experiment_DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import { Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';

import { ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';
import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { ConditionGroupsDataContainer, ProcessAllDataEntries_callback_Param } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    ModExperimentPage_Experiment_Name_Graphic_Component,
    ModExperimentPage_Experiment_Name_Graphic_Component_Props
} from "page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/jsx/modExperimentPage_Experiment_Name_Graphic_Component";


/**
 *
 */
export class ModExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry  {
    condition : Experiment_Condition
    projectSearchIds : Set<number>
}

/**
 * 
 */
export class ModExperimentPage_Display {

    private _selectedConditionsChanged_Callback_BindThis = this._selectedConditionsChanged_Callback.bind(this);

    private _DO_NOT_CALL() {  // Only test this. function is valid type
        const selectedConditionsChanged_Callback: ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = this._selectedConditionsChanged_Callback
    }

    private _usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON : String
	
    private _dataPageStateManager_DataFrom_Server : DataPageStateManager;

    private _experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

    private _experimentId : number;
    private _experimentName : string;

    private _projectSearchIds : Array<number>;

    private _searchDataLookupParamsRoot : SearchDataLookupParameters_Root

    private _conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    private _conditionGroupsDataContainer : ConditionGroupsDataContainer;
    
    private _experimentConditions_GraphicRepresentation_PropsData

    // private _centralPageStateManager : CentralPageStateManager;
    private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;

    private _renderedReactComponent_ModExperimentPage_Experiment_Name_Graphic_Component : ModExperimentPage_Experiment_Name_Graphic_Component;

	/**
	 * 
	 */
	constructor({ 
        dataPageStateManager_DataFrom_Server,
        experiment_DataPages_LoggedInUser_CommonObjectsFactory,
        experimentId, 
        experimentName, 
        projectSearchIds,
        searchDataLookupParamsRoot,
        conditionGroupsContainer,
        conditionGroupsDataContainer,
        experimentConditions_GraphicRepresentation_PropsData,
        // centralPageStateManager,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

     } : { 
        dataPageStateManager_DataFrom_Server : DataPageStateManager,
        experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory,
        experimentId : number, 
        experimentName : string, 
        projectSearchIds : Array<number>,
        searchDataLookupParamsRoot : SearchDataLookupParameters_Root
        conditionGroupsContainer : Experiment_ConditionGroupsContainer,
        conditionGroupsDataContainer : ConditionGroupsDataContainer,
        experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData,
        // centralPageStateManager : CentralPageStateManager,
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

     }) {

        this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

        this._experiment_DataPages_LoggedInUser_CommonObjectsFactory = experiment_DataPages_LoggedInUser_CommonObjectsFactory;

        this._experimentId = experimentId;
        this._experimentName = experimentName;

        this._projectSearchIds = projectSearchIds;

		this._searchDataLookupParamsRoot = searchDataLookupParamsRoot;

		this._conditionGroupsContainer = conditionGroupsContainer;
		this._conditionGroupsDataContainer = conditionGroupsDataContainer;
        
        this._experimentConditions_GraphicRepresentation_PropsData = experimentConditions_GraphicRepresentation_PropsData;

        // this._centralPageStateManager = centralPageStateManager;
        this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass;
    }
	

	/**
	 * 
	 */
	initialize() {


        //  Save current values:

        this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON = JSON.stringify( this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding() );


        //  For getting search info for projectSearchIds.  Object with property name being project search id
        const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        //  Render to page:

        const containerDOMElement = document.getElementById("mod_experiment_data_page_experiment_name_graphic_container_block_div");

        if ( ! containerDOMElement ) {
            throw Error("No DOM element with id 'mod_experiment_data_page_experiment_name_graphic_container_block_div'");
        }

        containerDOMElement.style.display = ""; //  Remove display : none


        //  Called on render complete
        const renderCompleteCallbackFcn = () => {

        };


        const modExperimentPage_Experiment_Name_Graphic_Component_Props : ModExperimentPage_Experiment_Name_Graphic_Component_Props = {

            experimentId : this._experimentId,
            experimentName : this._experimentName ,
            experimentConditions_GraphicRepresentation_PropsData : this._experimentConditions_GraphicRepresentation_PropsData ,
            conditionGroupsContainer : this._conditionGroupsContainer ,
            conditionGroupsDataContainer : this._conditionGroupsDataContainer ,
            searchNamesMap_KeyProjectSearchId : searchNamesMap_KeyProjectSearchId,

            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis
        }
		

        //  Create React component instance using React.createElement(...) so don't have to make this file .tsx
		const modExperimentPage_Experiment_Name_Graphic_Component = (
			React.createElement(
                ModExperimentPage_Experiment_Name_Graphic_Component,
                modExperimentPage_Experiment_Name_Graphic_Component_Props,
                null
            )
        )

        this._renderedReactComponent_ModExperimentPage_Experiment_Name_Graphic_Component =
            ReactDOM.render(
                modExperimentPage_Experiment_Name_Graphic_Component,
                containerDOMElement,
                renderCompleteCallbackFcn
            );

    }

	/**
	 * 
	 */
    _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) {

        //  Save current values:

        this._usedForCurrentDisplay__experiment_SelectedConditionIdsAndPaths_AsJSON = JSON.stringify( this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding() );

        //  Cancel Queued DOM updates to add PSM Count Charts
        // this._modExperiment__CreateModDataTableColumns_Class.cancel_scheduledDOMUpdates();

        //  Update Page

        // window.setTimeout( () => {
        //     try {
        //         //  Run in settimeout so Update to FilterBlock paints first so user gets immediate visual feedback

                // Update rest of page with new values

                this._displayModDataOnPage();

        //     } catch (e) {
        //         reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
        //         throw e;
        //     }
        // }, 10 )
    }

    /**
     *
     */
    private _displayModDataOnPage() {

        this._displayModDataOnPage_ActualRender();
    }

	/**
	 * 
	 */
    private _displayModDataOnPage_ActualRender() {

        //  Get for First Condition Group - Hard Code to First Condition Group for now
        let conditions_for_condition_group_with_their_project_search_ids : Array<ModExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> = undefined;
        {
            const conditionGroups = this._conditionGroupsContainer.conditionGroups;
            const conditionGroup = conditionGroups[ 0 ];
        
            conditions_for_condition_group_with_their_project_search_ids = _create_conditions_with_their_project_search_ids_for_condition_group({ 
                conditionGroup, 
                conditionGroupsContainer : this._conditionGroupsContainer,
                conditionGroupsDataContainer : this._conditionGroupsDataContainer,
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
            });
        }

        //  Get all Project Search Ids after filtering to use for generating the mod list

        let projectSearchIds_ToDisplayModsFor_Array : Array<number> = undefined;
        {
            const projectSearchIds_ToDisplayModsFor_Set : Set<number> = new Set();
            for ( const entry of conditions_for_condition_group_with_their_project_search_ids ) {
                for ( const projectSearchId of entry.projectSearchIds ) {
                    projectSearchIds_ToDisplayModsFor_Set.add( projectSearchId )
                }
            }
            projectSearchIds_ToDisplayModsFor_Array = Array.from( projectSearchIds_ToDisplayModsFor_Set );
        }

        //  TODO  Need code here???

    }
}


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//   NOT IN THE CLASS


///////////////

/**
 * Create conditions for first condition group with their project search ids 
 */
const _create_conditions_with_their_project_search_ids_for_condition_group = function({ 
    
    conditionGroup, conditionGroupsContainer, conditionGroupsDataContainer, experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
} : { 
    
    conditionGroup : Experiment_ConditionGroup
    conditionGroupsContainer : Experiment_ConditionGroupsContainer // Needed by called code
    conditionGroupsDataContainer : ConditionGroupsDataContainer
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

}) : Array<ModExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> {

    const experimentConditions_GraphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
        create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            conditionGroupsContainer
        })
    );

    const conditions = conditionGroup.conditions;

    //  Accumulate projectSearchIds Per id_Condition

    const conditionIds_For_ConditionGroup : Set<number> = new Set();

    for ( const condition of conditions ) {

        const condition_id = condition.id;
        conditionIds_For_ConditionGroup.add( condition_id );
    }

    //  Map<Int, Set>  Map<[id_Condition],Set([projectSearchIds]).  Contents restricted to conditionIds_For_ConditionGroup
    const projectSearchIds_Map_Key_id_Condition : Map<number, Set<number>> = new Map();

    // const projectSearchIds_All = new Set();
                
    const processAllDataEntries_Callback = ( param : ProcessAllDataEntries_callback_Param ) => {

        const conditionIds_Path = param.conditionIds_Path;
        const data = param.data;

        // console.log( ": callback: data:" );
        // console.log( data );
        const dataProperty = data.data;
        if ( dataProperty ) {
            const projectSearchIds = dataProperty.projectSearchIds;
            if ( projectSearchIds && projectSearchIds.size !== 0 ) {

                for ( const conditionIds_Path_Entry of conditionIds_Path ) {

                    if ( conditionIds_For_ConditionGroup.has( conditionIds_Path_Entry ) ) {
                        //  have entry for ConditionGroup collecting data for
                        const id_Condition = conditionIds_Path_Entry;
                        let projectSearchIds_For_id_Condition = projectSearchIds_Map_Key_id_Condition.get( id_Condition );
                        if ( ! projectSearchIds_For_id_Condition ) {
                            projectSearchIds_For_id_Condition = new Set();
                            projectSearchIds_Map_Key_id_Condition.set( id_Condition, projectSearchIds_For_id_Condition );
                        }
                        for ( const projectSearchId of projectSearchIds ) {
                            projectSearchIds_For_id_Condition.add( projectSearchId );
                        }
                    }
                }
            }
        }
    }
    conditionGroupsDataContainer.processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({ 
        callback : processAllDataEntries_Callback, experimentConditions_GraphicRepresentation_SelectedCells, conditionGroupsContainer
    });


    //  Array of each condition with it's projectSearchIds

    const result = [];

    for ( const condition of conditions ) {

        const id_Condition = condition.id;

        const projectSearchIds_For_id_Condition  = projectSearchIds_Map_Key_id_Condition.get( id_Condition );

        if ( projectSearchIds_For_id_Condition ) {

            const resultEntry = {
                condition,
                projectSearchIds : projectSearchIds_For_id_Condition
            }
            result.push( resultEntry );
        }
    }

    // console.log( "_create_conditions_with_their_project_search_ids_for_condition_group: result: ", result )

    return result;
}


