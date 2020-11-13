/**
 * proteinPage_Display_SingleSearch__SingleProtein_nonClass_Functions.ts
 * 
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 * 
 */

//
// import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
//
// import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing'
//
// import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';
// import {getOpenModificationsForProteinSequenceVersionId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Open_Modifications_Processing";
// import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
// import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
// import {loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
// import {loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
// import {loadProteinSequences_LoadTo_loadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/loadProteinSequences_LoadTo_loadedDataCommonHolder";
// import {loadData_PeptideSequences_LoadTo_loadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/loadPeptideSequencesForReportedPeptideIds_SingleSearch_LoadTo_loadedDataCommonHolder";
// import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
// import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
// import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
//
//
// //  Constants
//
// // Min width for outer container. Increase to 1120 to fit 5 digits.
// const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120;
//
// const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1270; // Min width for upper section of protein sequence and boxes to right
//
//
//
// /**
//  *
//  */
// const _resize_OverlayHeight_BasedOnViewportHeight_SingleSearch_SingleProtein = function({ singleProteinContainer_addedDivElementDOM }) {
//
// 	if ( ! singleProteinContainer_addedDivElementDOM ) {
// 		// Exit if no overlay
// 		return;
// 	}
//
// 	const $window = $(window);
//
// 	const windowHeight = $window.height();
//
// 	//  Subtract header and footer heights
//
// 	const $header_outer_container_div = $("#header_outer_container_div");
// 	if ( $header_outer_container_div.length === 0 ) {
// 		throw Error("No DOM element found with id 'header_outer_container_div'");
// 	}
// 	const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );
//
// 	// const $footer_outer_container_div = $("#footer_outer_container_div");
// 	// if ( $footer_outer_container_div.length === 0 ) {
// 	// 	throw Error("No DOM element found with id 'footer_outer_container_div'");
// 	// }
// 	// const footerOuterHeight = $footer_outer_container_div.outerHeight( true /* [includeMargin ] */ );
//
// 	const footerOuterHeight = 31;  // Hard code footer height since measuring doesn't work right
//
// 	const overlayHeight = windowHeight - headerOuterHeight - footerOuterHeight;
//
// 	const $singleProteinContainer_addedDivElementDOM = $( singleProteinContainer_addedDivElementDOM );
//
//
// 	const $view_single_protein_inner_overlay_div = $singleProteinContainer_addedDivElementDOM.find("#view_single_protein_inner_overlay_div");
//
// 	// console.warn("!!!!!!!!!!!!!!!   Skipping resizing DOM id 'view_single_protein_inner_overlay_div' since cannot find DOM element with that id.  $view_single_protein_inner_overlay_div.length: " + $view_single_protein_inner_overlay_div.length );
//
// 	if ( $view_single_protein_inner_overlay_div.length === 0 ) {
// 		throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
// 	}
//
// 	$view_single_protein_inner_overlay_div.css('min-height', overlayHeight + 'px');
// }
//
// /**
//  *
//  */
// const _update_Overlay_OnWindowResize_SingleSearch_SingleProtein = function( params ) {
//
// 	let singleProteinContainer_addedDivElementDOM = undefined;
// 	let $view_single_protein_overlay_div = undefined;
// 	let overlayWidth = undefined;
//
// 	if ( params ) {
// 		singleProteinContainer_addedDivElementDOM = params.singleProteinContainer_addedDivElementDOM;
// 		$view_single_protein_overlay_div = params.$view_single_protein_overlay_div;
// 		overlayWidth = params.overlayWidth;
// 	}
//
// 	if ( ! singleProteinContainer_addedDivElementDOM ) {
// 		// Exit if no overlay
// 		return;
// 	}
//
// 	if ( $view_single_protein_overlay_div === undefined ) {
// 		$view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
// 		if ( $view_single_protein_overlay_div.length === 0 ) {
// 			throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
// 		}
// 	}
// 	if ( overlayWidth === undefined ) {
// 		overlayWidth = $view_single_protein_overlay_div.outerWidth();
// 	}
//
// 	//  Adjust width of block above reported peptide list to keep the boxes to the right within the viewport, if necessary.
//
// 	const $window = $(window);
// 	const windowWidth = $window.width();
//
// 	const $selector_section_above_reported_peptides_list_block = $view_single_protein_overlay_div.find(".selector_section_above_reported_peptides_list_block");
//
// 	if ( overlayWidth <= windowWidth ) {
//
// 		$selector_section_above_reported_peptides_list_block.css('width', ''); // clear setting
//
// 	} else {
//
// 		let sectionAboveReportedPeptidesList_Width = windowWidth - 50; // - 50 to adjust in from right edge
// 		if (sectionAboveReportedPeptidesList_Width < _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH) {
// 			sectionAboveReportedPeptidesList_Width = _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH; // Min width
// 		}
// 		$selector_section_above_reported_peptides_list_block.css('width', sectionAboveReportedPeptidesList_Width + 'px');
// 	}
//
// }
//
//
// //////////
//
// /**
//  * Adjust overlay width to fit reported peptide
//  *
//  * called internally from this class
//  */
// const _resize_OverlayWidth_BasedOnReportedPeptidesTableWidth = function({ singleProteinContainer_addedDivElementDOM }) {
//
// 	if ( ! ( singleProteinContainer_addedDivElementDOM ) ) {
// 		// Exit if no overlay
// 		return;
// 	}
//
// 	//  Adjust overlay width to fit reported peptide list
//
// 	const $contentDivHTMLElement = $( singleProteinContainer_addedDivElementDOM );
//
// 	let $selector_reported_peptides_data_table_container = $contentDivHTMLElement.find(".selector_reported_peptides_data_table_container");
// 	if ( $selector_reported_peptides_data_table_container.length === 0 ) {
// 		throw Error( '$contentDivHTMLElement.find(".selector_reported_peptides_data_table_container") found no elements' );
// 	}
// 	if ( $selector_reported_peptides_data_table_container.length > 1 ) {
// 		throw Error( '$contentDivHTMLElement.find(".selector_reported_peptides_data_table_container") found > 1 elements' );
// 	}
// 	const $selector_data_table_container_TopLevelTable = $selector_reported_peptides_data_table_container.children(".selector_data_table_container");
// 	if ( $selector_reported_peptides_data_table_container.length === 0 ) {
// 		throw Error( '$selector_reported_peptides_data_table_container.children(".selector_data_table_container") found no elements' );
// 	}
// 	if ( $selector_reported_peptides_data_table_container.length > 1 ) {
// 		throw Error( '$selector_reported_peptides_data_table_container.children(".selector_data_table_container") found > 1 elements' );
// 	}
//
// 	const reported_peptides_data_table_container_Width = $selector_data_table_container_TopLevelTable.outerWidth();
//
// 	const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
// 	if ( $view_single_protein_inner_overlay_div.length === 0 ) {
// 		throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
// 	}
//
// 	let overlayWidth = reported_peptides_data_table_container_Width + 60;
// 	if ( overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH ) {
// 		overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
// 	}
//
// 	$view_single_protein_inner_overlay_div.css('width', overlayWidth + 'px');
//
// 	_update_Overlay_OnWindowResize_SingleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM });
// }
//
// /////////////
//
// //  loadDataForInitialOverlayShow
//
// /**
//  * From proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
//  *
//  *
//  *
//  */
// const _loadDataForInitialOverlayShow_SingleSearch_SingleProtein = function ({
//
// 	proteinSequenceVersionId,
// 	projectSearchIds,
// 	dataPageStateManager_DataFrom_Server,
// 	loadedDataCommonHolder,
// 	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 	searchDataLookupParamsRoot,
// 	reporterIonMass_UserSelections_StateObject,
// 	open_Modifications_Subpart_UserSelections_StateObject
// } : {
// 	proteinSequenceVersionId,
// 	projectSearchIds : Array<number>
// 	dataPageStateManager_DataFrom_Server : DataPageStateManager
// 	loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
// 	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
// 	searchDataLookupParamsRoot
// 	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
// 	open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
// }) {
//
// 	//  NOT valid test to determine if skip loading. Broken if user changes PSM/Peptide FIlters and thus loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is cleared
//
// 	// if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) !== undefined ) {
// 	// 	return null;
// 	// }
//
// 	if ( projectSearchIds.length === undefined ) {
// 		throw Error("_loadDataForInitialOverlayShow_SingleSearch_SingleProtein: projectSearchIds.length === undefined");
// 	}
// 	if ( projectSearchIds.length !== 1 ) {
// 		throw Error("_loadDataForInitialOverlayShow_SingleSearch_SingleProtein: projectSearchIds.length !== 1");
// 	}
//
// 	const projectSearchId = projectSearchIds[ 0 ];
//
// 	// console.log("Experiment: Single Protein: _loadDataForInitialOverlayShow(...)")
//
// 	const promise_FirstRetrieval_Array : Array<Promise<any>> = [];
//
// 	const promise_FirstRetrieval = _loadDataForInitialOverlayShow_FirstRetrieval({
// 		proteinSequenceVersionId,
// 		projectSearchIds,
// 		dataPageStateManager_DataFrom_Server,
// 		loadedDataCommonHolder,
// 		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 		searchDataLookupParamsRoot,
// 		reporterIonMass_UserSelections_StateObject,
// 		open_Modifications_Subpart_UserSelections_StateObject
// 	});
//
// 	promise_FirstRetrieval_Array.push( promise_FirstRetrieval );
//
// 	{
// 		const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
// 		if ( ! loadedDataPerProjectSearchIdHolder ) {
// 			throw Error("loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId ); return nothing for projectSearchId: " + projectSearchId )
// 		}
// 		const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds()
// 		const promise = loadData_PeptideSequences_LoadTo_loadedDataCommonHolder( { projectSearchId, reportedPeptideIds, loadedDataCommonHolder } );
// 		if ( promise ) {
// 			promise_FirstRetrieval_Array.push(promise);
// 		}
// 	}
//
// 	const promise_FirstRetrieval_PromiseAll = Promise.all( promise_FirstRetrieval_Array );
//
//
// 	//  Returned Promise
//
// 	return new Promise( (resolve, reject) => {
//
// 		promise_FirstRetrieval_PromiseAll.catch( (reason) => {
// 			reject(reason)
// 		});
//
// 		promise_FirstRetrieval_PromiseAll.then( (value) => {
// 			try {
// 				//  Populate Static Mods for the Protein
//
// 				const proteinSequenceData = loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId });
//
// 				if ( ! proteinSequenceData ) {
// 					const msg = "_loadDataForInitialOverlayShow: No proteinSequenceData for proteinSequenceVersionId: " + proteinSequenceVersionId;
// 					console.warn( msg );
// 					throw Error( msg );
// 				}
//
// 				const proteinSequenceString = proteinSequenceData.getProteinSequence();
//
// 				const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
// 				if ( loadedDataPerProjectSearchIdHolder === undefined ) {
// 					throw Error("_loadDataForInitialOverlayShow_SingleSearch_SingleProtein: loadedDataPerProjectSearchIdHolder === undefined");
// 				}
//
// 				if ( loadedDataPerProjectSearchIdHolder ) {
// 					_populateStaticModificationsPositionsOnProteinSequence({ proteinSequenceVersionId, proteinSequenceString, loadedDataPerProjectSearchIdHolder });
// 				}
//
// 				//  Get Reported Peptide sequences
//
// 				const reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( proteinSequenceVersionId );
// 				if ( loadedDataPerProjectSearchIdHolder === undefined ) {
// 					throw Error("_loadDataForInitialOverlayShow_SingleSearch_SingleProtein: reportedPeptideIds === undefined");
// 				}
// 				// returns null or Promise
// 				const promise_getReportedPeptideSequences_For_ReportedPeptideIds =  loadReportedPeptideStringIfNeeded_ProteinPagePeptidePage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
// 					reportedPeptideIds, projectSearchId, loadedDataCommonHolder
// 				});
//
// 				if ( ! promise_getReportedPeptideSequences_For_ReportedPeptideIds ) {
// 					//  No peptide sequences to load so just call next function
//
// 					resolve();  //  RESOLVE of returned Promise
//
// 					return;
// 				}
//
// 				promise_getReportedPeptideSequences_For_ReportedPeptideIds.catch( (reason) => {
// 					reject( reason );
// 				});
//
// 				promise_getReportedPeptideSequences_For_ReportedPeptideIds.then( (value) => {
// 					try {
//
// 						resolve();  //  RESOLVE of returned Promise
//
// 					} catch( e ) {
// 						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 						throw e;
// 					}
// 				});
//
// 			} catch( e ) {
// 				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 				throw e;
// 			}
// 		});
// 	});
// }
//
// /**
//  * From proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
//  *
//  *
//  *
//  */
// const _loadDataForInitialOverlayShow_FirstRetrieval = function (
// 	{
// 		proteinSequenceVersionId,
// 		projectSearchIds,
// 		dataPageStateManager_DataFrom_Server,
// 		loadedDataCommonHolder,
// 		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 		searchDataLookupParamsRoot,
// 		reporterIonMass_UserSelections_StateObject,
// 		open_Modifications_Subpart_UserSelections_StateObject
// 	} : {
// 		proteinSequenceVersionId,
// 		projectSearchIds,
// 		dataPageStateManager_DataFrom_Server,
// 		loadedDataCommonHolder,
// 		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 		searchDataLookupParamsRoot,
// 		reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
// 		open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
// 	}) {
//
// 	//  NOT valid test to determine if skip loading. Broken if user changes PSM/Peptide FIlters and thus loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is cleared
//
// 	// if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) !== undefined ) {
// 	// 	return null;
// 	// }
//
// 	// console.log("Experiment: Single Protein: _loadDataForInitialOverlayShow_FirstRetrieval(...)")
//
// 	//  Get a projectSearchId that proteinSequenceVersionId is in
//
// 	let projectSearchId_Contains_proteinSequenceVersionId = undefined;
//
// 	for ( const projectSearchId of projectSearchIds ) {
//
// 		const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
//
// 		if ( loadedDataPerProjectSearchIdHolder ) {
//
// 			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();
// 			const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
// 			if ( proteinInfo ) {
// 				projectSearchId_Contains_proteinSequenceVersionId = projectSearchId;
// 				break;
// 			}
// 		}
// 	}
//
// 	if ( ! projectSearchId_Contains_proteinSequenceVersionId ) {
// 		const msg = ( "proteinSequenceVersionId not found in proteinInfoMapKeyProteinSequenceVersionId for any projectSearchId. proteinSequenceVersionId: "
// 			+ proteinSequenceVersionId
// 			+ ", projectSearchIds: "
// 			+ projectSearchIds.join(",")
// 		);
// 		console.warn( msg );
// 		throw Error( msg );
// 	}
//
// 	const promises = [];
//
// 	//  Get Protein Sequence String
//
// 	if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) === undefined ) {
//
// 		const promise_GetProteinSequence = loadProteinSequences_LoadTo_loadedDataCommonHolder({
// 			proteinSequenceVersionId, projectSearchId_Contains_proteinSequenceVersionId, loadedDataCommonHolder
// 		});
//
// 		promises.push( promise_GetProteinSequence );
// 	}
//
// 	//  Get data per projectSearchId
//
// 	for ( const projectSearchId of projectSearchIds ) {
//
// 		const promise = _loadDataForInitialOverlayShow_GetPer_projectSearchId({
// 			proteinSequenceVersionId,
// 			projectSearchId,
// 			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 			loadedDataCommonHolder,
// 			dataPageStateManager_DataFrom_Server,
// 			searchDataLookupParamsRoot,
// 			reporterIonMass_UserSelections_StateObject,
// 			open_Modifications_Subpart_UserSelections_StateObject
// 		});
//
// 		if ( promise ) {
//
// 			promises.push( promise );
// 		}
// 	}
//
// 	const promise_All = Promise.all( promises );
//
// 	return promise_All;
// }
//
//
// /**
//  * GetPer_projectSearchId
//  *
//  * From proteinViewPage_DisplayData_SingleSearch_SingleProtein.js
//  *
//  *
//  * Calls proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
//  *
//  *
//  *
//  */
// const _loadDataForInitialOverlayShow_GetPer_projectSearchId = function (
// 	{
// 		proteinSequenceVersionId,
// 		projectSearchId,
// 		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 		loadedDataCommonHolder,
// 		dataPageStateManager_DataFrom_Server,
// 		searchDataLookupParamsRoot,
// 		reporterIonMass_UserSelections_StateObject,
// 		open_Modifications_Subpart_UserSelections_StateObject
// 	} : {
// 		proteinSequenceVersionId,
// 		projectSearchId,
// 		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
// 		loadedDataCommonHolder,
// 		dataPageStateManager_DataFrom_Server,
// 		searchDataLookupParamsRoot
// 		reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
// 		open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
// 	}) {
//
// 	const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
//
// 	if ( loadedDataPerProjectSearchIdHolder ) {
//
// 		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
// 		if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {
//
// 			//  reportedPeptideIds for this proteinSequenceVersionId
// 			let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
// 			if ( reportedPeptideIds_For_proteinSequenceVersionId ) {
//
// 				const promises_LoadData_Array = [];
//
// 				// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display
//
// 				const promise_loadDataAfterInitialOverlayShow = (
// 					loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
// 						retrieveForSingleSearch : true,
// 						retrieveForMultipleSearches : false,
// 						proteinSequenceVersionId,
// 						projectSearchId,
// 						searchDataLookupParamsRoot,
// 						searchDetailsBlockDataMgmtProcessing : undefined,
// 						loadedDataPerProjectSearchIdHolder,
// 						loadedDataCommonHolder,
// 						dataPageStateManager_DataFrom_Server
// 					})
// 				);
//
// 				promises_LoadData_Array.push( promise_loadDataAfterInitialOverlayShow );
//
// 				try {
// 					const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
// 						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
// 						proteinSequenceVersionId,
// 						projectSearchId });
//
// 					if (promise_getDynamicModificationsForProteinSequenceVersionId) {
// 						promises_LoadData_Array.push(promise_getDynamicModificationsForProteinSequenceVersionId);
// 					}
// 				} catch( e ) {
// 					console.warn("Exception caught calling getDynamicModificationsForProteinSequenceVersionId:");
// 					console.warn( e );
// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 					throw e;
// 				}
//
// 				//  Open Modifications Rounded Unique at Reported Peptide Level
// 				try {
// 					const promise_ = getOpenModificationsForProteinSequenceVersionId({ //  Imported function
// 						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
// 						proteinSequenceVersionId,
// 						projectSearchId });
//
// 					if (promise_) {
// 						promises_LoadData_Array.push(promise_);
// 					}
// 				} catch( e ) {
// 					console.warn("Exception caught calling getOpenModificationsForProteinSequenceVersionId:");
// 					console.warn( e );
// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
// 					throw e;
// 				}
//
// 				{  //  Run here if any selected Reporter Ion Mass entries OR selected Open Modifications Mass entries in URL at time of load
//
// 					const anyReporterIonMassesSelected = reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected();
// 					const anyOpenModificationMassesSelected = open_Modifications_Subpart_UserSelections_StateObject.is_Any_Modification_Selected();
//
// 					if ( anyReporterIonMassesSelected || anyOpenModificationMassesSelected ) {
//
// 						// Reporter Ion Masses or Open Modifications selected in filter so load Reporter Ion data and/or Open Modification Ion Data and PSM data
//
// 						const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
// 						const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;
//
// 						let searchDataLookupParams_For_projectSearchId = undefined;
// 						for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {
//
// 							if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
// 								searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
// 								break;
// 							}
// 						}
// 						if ( ! searchDataLookupParams_For_projectSearchId ) {
// 							const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
// 							console.warn( msg );
// 							throw Error( msg );
// 						}
//
// 						const promise = (
// 							loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
// 								for_SingleSearch : true,
// 								for_MultipleSearch_Or_Experiment : false,
// 								anyReporterIonMassesSelected,
// 								anyOpenModificationMassesSelected,
// 								proteinSequenceVersionId : proteinSequenceVersionId,
// 								projectSearchId,
// 								searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
// 								loadedDataPerProjectSearchIdHolder
// 							})
// 						);
// 						if (promise) {
// 							promises_LoadData_Array.push(promise);
// 						}
// 					}
// 				}
//
// 				const promisesAll = Promise.all( promises_LoadData_Array );
//
// 				return promisesAll;
// 			}
// 		}
// 	}
//
// 	return undefined;
// }
//
// /////////////////////////////
//
//
// /**
//  * Find the Positions on the Protein Sequence String of the Static modifications for the Search
//  * Store on loadedDataPerProjectSearchIdHolder
//  *
//  * This can be (but not likely) called multiple times for the same search due to where it is currently called from.
//  */
// const _populateStaticModificationsPositionsOnProteinSequence = function({ proteinSequenceVersionId, proteinSequenceString, loadedDataPerProjectSearchIdHolder }) {
//
// 	{
// 		const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
//
// 		if ( staticModificationsOnProtein_KeyProteinSequenceVersionId && staticModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId ) ) {
// 			//  Already populated for proteinSequenceVersionId
// 			return;  // EARLY EXIT
// 		}
// 	}
//
// 	//  Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet : Set( mass (number) ) } >
// 	//  (Format for class ProteinSequenceFormattedDisplay_Main_displayWidget)
//
// 	const staticModificationMassesByProteinPosition = new Map();
//
// 	const staticModsForSearch = loadedDataPerProjectSearchIdHolder.get_staticMods();
//
// 	if ( ( ! staticModsForSearch ) || staticModsForSearch.length === 0 ) {
// 		//  No Static Modifications so Exit
// 		return; // EARLY EXIT
// 	}
//
// 	for ( const staticModForSearch of staticModsForSearch ) {
//
// 		const staticModResidue = staticModForSearch.residue;
// 		const staticModMass = staticModForSearch.mass;
//
// 		//  Search for static mod residue in protein
// 		let residueFoundIndex = undefined;
// 		let searchStartIndex = 0;
// 		while ( ( residueFoundIndex = proteinSequenceString.indexOf( staticModResidue, searchStartIndex ) ) != -1 ) {
//
// 			const proteinPosition = residueFoundIndex + 1; // '1' based
// 			let staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPosition.get( proteinPosition );
// 			if ( ! staticModificationResiduesMassesForProteinPosition ) {
// 				staticModificationResiduesMassesForProteinPosition = { residue : staticModResidue, massesSet: new Set() };
// 				staticModificationMassesByProteinPosition.set( proteinPosition, staticModificationResiduesMassesForProteinPosition );
// 			}
// 			staticModificationResiduesMassesForProteinPosition.massesSet.add( staticModMass );
//
// 			searchStartIndex = residueFoundIndex + 1; // advance to searching to after last found index
// 		}
// 	}
//
// 	//  Sort masses at each position
// 	for ( const staticModificationMassesByProteinPositionEntry of staticModificationMassesByProteinPosition.entries() ) {
// 		const position = staticModificationMassesByProteinPositionEntry[ 0 ];
// 		const staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPositionEntry[ 1 ];
// 		const residue = staticModificationResiduesMassesForProteinPosition.residue;
// 		const massesAtPositionSet = staticModificationResiduesMassesForProteinPosition.massesSet;
// 		const massesAtPositionArray = Array.from( massesAtPositionSet );
// 		massesAtPositionArray.sort( function(a, b) {
// 			if ( a < b ) {
// 				return -1;
// 			}
// 			if ( a > b ) {
// 				return 1;
// 			}
// 			return 0;
// 		});
// 		//  Place the sorted Array in the final output Object in the map
//
// 		staticModificationResiduesMassesForProteinPosition.massesArray = massesAtPositionArray;
// 	}
//
// 	{
// 		let staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
//
// 		if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
// 			staticModificationsOnProtein_KeyProteinSequenceVersionId = new Map();
// 			loadedDataPerProjectSearchIdHolder.set_staticModificationsOnProtein_KeyProteinSequenceVersionId( staticModificationsOnProtein_KeyProteinSequenceVersionId );
// 		}
//
// 		staticModificationsOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, staticModificationMassesByProteinPosition );
// 	}
//
// }
//
// ////////////////////////////
//
//
//
// ////////////////////////////
//
//
// ///////////////////////////
// ///////////////////////////
// ///////////////////////////
//
// //    After Inital Data Loaded
//
// /////////////////////////////////////////////////////
// /////////////////////////////////////////////////////
//
// export {
// 	_loadDataForInitialOverlayShow_SingleSearch_SingleProtein,
// 	_resize_OverlayHeight_BasedOnViewportHeight_SingleSearch_SingleProtein,
// 	_update_Overlay_OnWindowResize_SingleSearch_SingleProtein
// }
