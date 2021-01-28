/**
 * modExperimentPage_Experiment_Name_Graphic_Component.tsx
 *
 * Mod Experiment Page
 *
 * Render the Experiment Name and the Experiment Graphic
 */



import React from 'react'
import {
    Experiment_SingleExperiment_ConditionsGraphicRepresentation,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params,
    ExperimentConditions_GraphicRepresentation_PropsData
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation";
import {
    Experiment_Condition,
    Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class";
import {SearchNames_AsMap} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";


/**
 *
 */
export interface ModExperimentPage_Experiment_Name_Graphic_Component_Props {

    experimentId : number;
    experimentName : string;
    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap; // Map with key being project search id
    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    selectedConditionsChanged_Callback : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition
}


/**
 *
 */
interface ModExperimentPage_Experiment_Name_Graphic_Component_State {

    //  Selected cells in Experiment_SingleExperiment_ConditionsGraphicRepresentation
    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

    fakeObj_ForForceReRender?
}

/**
 *
 */
export class ModExperimentPage_Experiment_Name_Graphic_Component extends React.Component< ModExperimentPage_Experiment_Name_Graphic_Component_Props, ModExperimentPage_Experiment_Name_Graphic_Component_State > {

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);
    private _selectedConditionsChanged_Callback_BindThis : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = this._selectedConditionsChanged_Callback.bind(this);

    private _DO_NOT_CALL___CAST_TEST_ONLY_() { //  Confirm that can cast this. function as type
        const mainCell_getHoverContents : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;
        const selectedConditionsChanged_Callback : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_Callback_Definition = this._selectedConditionsChanged_Callback;
    }

    /**
     *
     */
    constructor(props: ModExperimentPage_Experiment_Name_Graphic_Component_Props) {
        super(props);

        //  bind to 'this' for passing as parameters

        //  Set object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells_IF
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
                conditionGroupsContainer : this.props.conditionGroupsContainer,
                selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis
            })
        );

        this.state = {
            graphicRepresentation_SelectedCells
        };
    }

    /**
     *
     */
    private _mainCell_getHoverContents( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) {

        const conditionIdPath = params.conditionIdPath;

        const conditionGroupsContainer = this.props.conditionGroupsContainer;
        const conditionGroupsDataContainer = this.props.conditionGroupsDataContainer;
        const searchNamesMap_KeyProjectSearchId = this.props.searchNamesMap_KeyProjectSearchId;

        return _mainCell_getHoverContents_StandAlone({
            conditionIdPath, conditionGroupsContainer, conditionGroupsDataContainer, searchNamesMap_KeyProjectSearchId
        });
    }

    /**
     *
     */
    private _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) : void {

        //  Set object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells_IF
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this.props.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
                conditionGroupsContainer : this.props.conditionGroupsContainer,
                selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis
            })
        );

        this.setState({ graphicRepresentation_SelectedCells });

        // Trigger update of page

        this.props.selectedConditionsChanged_Callback( params );
    }


    render() {
        return (

            <React.Fragment>

                <h3>
                    Experiment: <span id="experiment_name">{ this.props.experimentName }</span>
                </h3>

                <div>
                    <Experiment_SingleExperiment_ConditionsGraphicRepresentation
                        data={ this.props.experimentConditions_GraphicRepresentation_PropsData }
                        selectedCells={ this.state.graphicRepresentation_SelectedCells }
                        conditionGroupsContainer={ this.props.conditionGroupsContainer }
                        manage_SelectedCells_ConditionCell_Selection_UserClick_Updates={ true }
                        conditionCellClickHandler={ undefined /* this._conditionCellClickHandler_BindThis */ }
                        mainCellClickHandler={ undefined }
                        mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                    />
                </div>
            </React.Fragment>
        )
    }

}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//   Not in a class:


/**
 *
 */
const _mainCell_getHoverContents_StandAlone = function({
                                                           conditionIdPath,
                                                           conditionGroupsContainer,
                                                           conditionGroupsDataContainer,
                                                           searchNamesMap_KeyProjectSearchId
                                                       } : {
    conditionIdPath : Array<number>,
    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId  : SearchNames_AsMap
}) {
    // console.log("_mainCell_getHoverContents_StandAlone")

    const conditionGroupsDisplay = [];

    if ( conditionIdPath ) {

        if ( conditionGroupsContainer ) {
            const conditionGroups = conditionGroupsContainer.conditionGroups;
            if ( conditionGroups ) {
                const conditionGroupsLength = conditionGroups.length;

                for ( let index_conditionGroups = 0; index_conditionGroups < conditionGroupsLength; index_conditionGroups++ ) {

                    const conditionGroup = conditionGroups[ index_conditionGroups ];
                    const conditions = conditionGroup.conditions;

                    let condition_For_cell_conditionIdPath : Experiment_Condition = undefined;

                    for ( const condition_Entry of conditions ) {
                        for ( const cell_conditionIdPath of conditionIdPath ) {
                            if ( condition_Entry.id === cell_conditionIdPath ) {
                                condition_For_cell_conditionIdPath = condition_Entry;
                                break;
                            }
                        }
                        if ( condition_For_cell_conditionIdPath ) {
                            break;
                        }
                    }

                    if ( ! condition_For_cell_conditionIdPath ) {
                        //  No entry found so skip
                        continue;  // EARLY CONTINUE
                    }

                    const conditionGroupDisplay = (
                        <li key={ index_conditionGroups } style={ { whiteSpace : "nowrap", marginBottom: 3 } }>
                            <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                            >{ conditionGroup.label }</span>
                            <span >:&nbsp;</span>
                            <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                            >{ condition_For_cell_conditionIdPath.label }</span>
                        </li>
                    );

                    conditionGroupsDisplay.push( conditionGroupDisplay );
                }
            }
        }
    }

    let searchesDisplay = undefined;
    {
        let conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({
            conditionIds_Array : conditionIdPath
        });

        // let projectSearchIdsString = "none";

        if ( conditionGroupsDataContainer_Entry ) {

            const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;

            const projectSearchIds = conditionGroupsDataContainer_Entry_Data.projectSearchIds;

            if ( projectSearchIds ) {
                //  projectSearchIds is Set
                const projectSearchIdsArray = Array.from( projectSearchIds );
                if ( projectSearchIdsArray.length !== 0 ) {

                    const searchDataEntries = [];

                    for ( const projectSearchIdsArray_Entry of projectSearchIdsArray ) {

                        const projectSearchId = (projectSearchIdsArray_Entry as number);

                        //  searchNamesMap_KeyProjectSearchId is Map with projectSearchId as keys
                        const searchDataEntry = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
                        if ( ! searchDataEntry ) {
                            console.log("WARN: No entry in loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
                            continue; // EARLY CONTINUE
                        }
                        searchDataEntries.push( searchDataEntry );
                    }

                    searchDataEntries.sort( (a,b) => { // sort on searchId ascending
                        if (a.searchId < b.searchId) {
                            return -1;
                        } else if (a.searchId > b.searchId) {
                            return 1;
                        }
                        return 0
                    })

                    const searchComponents = [];
                    {
                        let index = 0;
                        for ( const searchDataEntry of searchDataEntries ) {
                            const searchComponent = (
                                <li key={ index } style={ { marginBottom: 4 } }>
                                    <span >(</span>
                                    <span >{ searchDataEntry.searchId }</span>
                                    <span >) </span>
                                    <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                    >{ searchDataEntry.name }</span>
                                </li>
                            );
                            searchComponents.push( searchComponent );
                            index++;
                        }
                    }
                    searchesDisplay = (
                        <div >
                            <div style={ { fontWeight: "bold", marginTop: 5, marginBottom: 5 } }>
                                Searches:
                            </div>
                            <div >
                                <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                                    { searchComponents }
                                </ul>
                            </div>
                        </div>
                    )
                }
            }
        }
    }
    if ( searchesDisplay === undefined ) {
        searchesDisplay = (
            <div style={ { marginTop: 5, marginBottom: 5 } }>
                <span style={ { fontWeight: "bold" } }>Searches:</span>
                <span >&nbsp;empty</span>
            </div>
        );
    }

    const hoverContent = (
        <div style={ { textAlign : "left" } }>
            <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                Conditions:
            </div>
            <div >
                <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                    { conditionGroupsDisplay }
                </ul>
            </div>
            <div >
                { searchesDisplay }
            </div>
        </div>
    );


    return { hoverContent };
}
