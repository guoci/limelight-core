/**
 * proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Protein in Multiple Searches
 */

let Handlebars = require('handlebars/runtime');

let _protein_table_template_bundle = require("../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

import { modificationMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/modification_dynamic_static_combined_display_utils/modification_dynamic_static_combined_DisplayUtilities.js';

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

import { ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js';
import { ProteinSequenceFormattedDisplay_Main_displayWidget } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_Main_displayWidget.js';

import { ProteinViewDataLoader } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewDataLoader.js';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.js';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js';

import { getTotalModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_TotalModifications_Processing.js';

import { ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList.js';

import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js';

import { ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js';

//  Constants

// Min width for outer container. Increased to 1070 for protein sequence length > 999 so need room for 4 digits.  Just increase to 1080 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1080; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1230; // Min width for upper section of protein sequence and boxes to right

/**
 * 
 */
export class ProteinViewPage_Display_MultipleSearches_SingleProtein {

	/**
	 * 
	 */
	constructor(
			{ proteinViewPage_Display_MultipleSearch,
				dataPages_LoggedInUser_CommonObjectsFactory,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_OtherUserSelections, 
				dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing, 
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
				singleProtein_CentralStateManagerObject } ) {
		
		this._proteinViewPage_Display_MultipleSearch = proteinViewPage_Display_MultipleSearch; // reference to creating class object

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._loadedDataCommonHolder = loadedDataCommonHolder;

		this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
		// this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;

		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;


		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes({
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server
		});

		//  Template Bundle _protein_table_template_bundle

		if (!_protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template");
		}
		this._protein_page_single_protein_display_in_overlay_template_Template = _protein_table_template_bundle.protein_page_single_protein_display_in_overlay_template;

		if (!_protein_table_template_bundle.protein_page_single_protein_overlay_container_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_overlay_container_template");
		}
		this._protein_page_single_protein_overlay_container_template_Template = _protein_table_template_bundle.protein_page_single_protein_overlay_container_template;

		if (!_protein_table_template_bundle.protein_page_single_protein_overlay_background_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_overlay_background_template");
		}
		this._protein_page_single_protein_overlay_background_template_Template = _protein_table_template_bundle.protein_page_single_protein_overlay_background_template;

		this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList = new ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList(
			{
				containing_ProteinViewPage_Display_MultipleSearches_SingleProtein : this,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
				annotationTypeData_ReturnSpecifiedTypes : this._annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing
			});

		this._searchDetailsAndFilterBlock_MainPage = new SearchDetailsAndFilterBlock_MainPage({
			displayOnly : true,  //  Display only.  No attach click handlers to allow changes
			dataPages_LoggedInUser_CommonObjectsFactory,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			// rerenderPageForUpdatedFilterCutoffs_Callback : rerenderPageForUpdatedFilterCutoffs_BindThis
		} );

		// @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in

		this._searchDetailsAndFilterBlock_MainPage.initialize({ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : "#view_single_protein_overlay_div" });

		//  Display content Div
		this._contentDivHTMLElement = undefined;

		this._projectSearchIds = undefined;
		this._proteinSequenceVersionId = undefined;

		//  Holds object of class ProteinSequenceFormattedDisplay_Main_displayWidget
		this._proteinSequenceFormattedDisplay_Main_displayWidget = undefined;

		//  Have click handlers been attached to download data elements?
		this._clickHandlersAttachedToDownloadDataElements = false;

		this._singleProteinCloseCallback = undefined; // passed in openOverlay

		this._proteinNameDescription = undefined; // passed in openOverlay
	}

	/**
	 * 
	 */
	openOverlay( { proteinSequenceVersionId, projectSearchIds, proteinNameDescription, singleProteinCloseCallback } ) {

		const objectThis = this;

		this._singleProteinCloseCallback = singleProteinCloseCallback;

		this._proteinNameDescription = proteinNameDescription;

		this._projectSearchIds = projectSearchIds;

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		this._loadDataForInitialOverlay().then(function(value) {
			try {
				// On to displaying the data
				objectThis._openOverlayAfterLoadData();

			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, function(reason) {});
	}

	/**
	 * 
	 */
	_loadDataForInitialOverlay() {

		const objectThis = this;

		return new Promise( (resolve, reject) => {
			try {
				const promises_Load_First_Set_Data_PerProjectSearchId_Array = [];

				for ( const projectSearchId of objectThis._projectSearchIds ) {

					const loadedDataPerProjectSearchIdHolder = objectThis._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

					const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
					if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {

						//  reportedPeptideIds for this proteinSequenceVersionId
						let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( objectThis._proteinSequenceVersionId );
						if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

							// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display
							const promise = objectThis._loadDataForOverlayForSpecific_projectSearchIds({proteinSequenceVersionId : objectThis._proteinSequenceVersionId, loadedDataPerProjectSearchIdHolder, projectSearchId});
							promises_Load_First_Set_Data_PerProjectSearchId_Array.push( promise );
						}
					}
				}

				const promise_promises_Load_First_Set_Data_PerProjectSearchId_Array = Promise.all( promises_Load_First_Set_Data_PerProjectSearchId_Array );

				promise_promises_Load_First_Set_Data_PerProjectSearchId_Array.catch(function(reason) { reject() });

				promise_promises_Load_First_Set_Data_PerProjectSearchId_Array.then(function(value) {

					const promise_getPeptideSequencesForPeptideIds = objectThis._getPeptideSequencesForPeptideIds( {} );

					if ( ! promise_getPeptideSequencesForPeptideIds ) {
						//  No peptide sequences to load so just call next function
						resolve();
						return;
					}

					promise_getPeptideSequencesForPeptideIds.catch(function(reason) {});

					promise_getPeptideSequencesForPeptideIds.then(function(value) {
						resolve();
					});
				});
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}

	/**
	 * 
	 */
	_loadDataForOverlayForSpecific_projectSearchIds({loadedDataPerProjectSearchIdHolder, projectSearchId}) {

		const objectThis = this;

		return new Promise( (resolve, reject) => {

			try {
				const promises_LoadData_Array = [];


				const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
					new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
						searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing
					});

				const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
					{
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
						loadedDataCommonHolder : objectThis._loadedDataCommonHolder ,
						dataPageStateManager_DataFrom_Server : objectThis._dataPageStateManager_DataFrom_Server ,
						searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing ,
						proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
					});

				const promise_loadProteinSequenceIfNeeded = proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
					.loadProteinSequenceIfNeeded({
						proteinSequenceVersionId : objectThis._proteinSequenceVersionId,
						projectSearchId
					});
				if (promise_loadProteinSequenceIfNeeded) {
					promises_LoadData_Array.push(promise_loadProteinSequenceIfNeeded);
				}

				try {
					const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder, 
						proteinSequenceVersionId : objectThis._proteinSequenceVersionId, 
						projectSearchId });

					if (promise_getDynamicModificationsForProteinSequenceVersionId) {
						promises_LoadData_Array.push(promise_getDynamicModificationsForProteinSequenceVersionId);
					}
				} catch( e ) {
					console.log("Exception caught calling getDynamicModificationsForProteinSequenceVersionId:");
					console.log( e );
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}

				const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
				if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {
							
					//  reportedPeptideIds for this proteinSequenceVersionId
					let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( objectThis._proteinSequenceVersionId );
					if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

						// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display

						const proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
							new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
								loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
								searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing
							});

						const proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
							{
								loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder ,
								loadedDataCommonHolder : objectThis._loadedDataCommonHolder ,
								dataPageStateManager_DataFrom_Server : objectThis._dataPageStateManager_DataFrom_Server ,
								searchDetailsBlockDataMgmtProcessing : objectThis._searchDetailsBlockDataMgmtProcessing ,
								proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
							});

						const promise_loadDataAfterInitialOverlayShow = 
							proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
							.loadDataAfterInitialOverlayShow({
								retrieveForMultipleSearches : true,
								proteinSequenceVersionId : objectThis._proteinSequenceVersionId,
								projectSearchId
							});

						promises_LoadData_Array.push( promise_loadDataAfterInitialOverlayShow );
					}
				}

				if (promises_LoadData_Array.length !== 0) {

					const promisesAll = Promise.all(promises_LoadData_Array);

					promisesAll.catch( (reason) => {
						reject(reason);
					})
					promisesAll.then( (value) => {

						resolve(value);
					})
				} else {

					resolve();
				}
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlayForSpecific_projectSearchIds(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}

		});
	}

	////////////////////////////////////////////////////////

	/**
	 * 
	 */
	_openOverlayAfterLoadData() {

		const objectThis = this;

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

					//  Call imported function
			getTotalModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId({ 
				loadedDataPerProjectSearchIdHolder, 
				loadedDataCommonHolder : this._loadedDataCommonHolder, 
				proteinSequenceVersionId : this._proteinSequenceVersionId, 
				projectSearchId });
		}

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId : this._proteinSequenceVersionId });
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		//  Create links to external resources
		const linksToExternalResources = this._createLinksToExternalResources( { proteinSequenceString } );

		const proteinSummaryStatistics = {
			sequenceCoverageAsPercent : this._computeSequenceCoverageAsPercent(),
			psmCount : this._computeTotalPsmCount({})
		};
		
		const $contentDiv = this._createModalOverlayContentDiv( { proteinSummaryStatistics, linksToExternalResources } );

		this._createSingleProteinModalOverlay( { $contentDiv } );

		this._contentDivHTMLElement = $contentDiv[0];

		this._resize_OverlayHeight_BasedOnViewportHeight();

		this._resizeWindow_Handler_Attach();

		this._searchDetailsAndFilterBlock_MainPage.populatePage();
		
		this._attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } );

		/// Modification Display and Selection

		{
			const callbackMethodForSelectedChangeBoundThis = this._callbackMethodForSelectedModificationsChange.bind(this);;

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = new ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect(
				{
					useCombinedModificationMasses : true, //  True so it uses the 'combined' mod mass values in the holder which were set before this is created
					rootDisplayJquerySelector : ".selector_protein_mod_list_block",
					projectSearchIds : this._projectSearchIds,
					proteinSequenceVersionId : this._proteinSequenceVersionId,
					loadedDataCommonHolder : this._loadedDataCommonHolder, 
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
					callbackMethodForSelectedChange : callbackMethodForSelectedChangeBoundThis
				});

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.initialize({ 
				proteinNameDescription : this._proteinNameDescription,
				encodedStateData : this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData() });

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.modListDisplay();
		}

		//////

		//   Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)
		{
			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
			const modificationMassesForProteinPositions = this._get_modificationMasses_All_OnProteinByPosition();

			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}

			//  Sequence coverage for all peptides for this protein (no apply Mod mass or Protein Position filters)

			const widget_SequenceCoverageParam_All_Peptides = this._get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters();

			//  DOM element to put widget in

			const $selector_protein_sequence_container = $contentDiv.find(".selector_protein_sequence_container");
			if ($selector_protein_sequence_container.length === 0) {
				throw Error("No element with class 'selector_protein_sequence_container'");
			}

			const proteinSequenceContainerHTML_Element = $selector_protein_sequence_container[0];

			const callbackMethodForSelectedProteinSequenceChangeBoundThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

			this._proteinSequenceFormattedDisplay_Main_displayWidget = new ProteinSequenceFormattedDisplay_Main_displayWidget(
				{
					proteinSequenceString,
					modificationMassesForProteinPositions,
					modificationMassesToFilterOn,
					widget_SequenceCoverageParam_All_Peptides,
					containerHTML_Element: proteinSequenceContainerHTML_Element,
					callbackMethodForSelectedChange: callbackMethodForSelectedProteinSequenceChangeBoundThis
				});

			//  Encoded Data Data from URL to pass to Protein Sequence Widget
			this._proteinSequenceFormattedDisplay_Main_displayWidget.set_encodedStateData({ encodedStateData : this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData() });

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() || selectedProteinSequencePositions ) { 
				//   Set Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.set_initial_widget_SequenceCoverageParam_Selected_Peptides({ initial_widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			}

			this._proteinSequenceFormattedDisplay_Main_displayWidget.initialize();

			this._proteinSequenceFormattedDisplay_Main_displayWidget.renderOnPage();
		}

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_computeSequenceCoverageAsPercent() {

		let proteinLength = undefined;
		
		const proteinCoverageCombined = new Set();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			
			if ( proteinCoverageObject === undefined ) {
				//  No proteinCoverageObject found for this projectSearchId and proteinSequenceVersionId
				continue;  //  EARLY CONTINUE
			}

			const proteinLengthForSearch = proteinCoverageObject.getProteinLength();
		
			if ( proteinLength === undefined ) {
				proteinLength = proteinLengthForSearch;
			} else if ( proteinLength !== proteinLengthForSearch ) {
				throw Error("Protein Length does not match across searches. current projectSearchId: " + projectSearchId );
			}

			for ( let position = 1; position <= proteinLength; position++ ) {
				if ( proteinCoverageObject.isProteinCoverageAtPosition({ position }) ) {
					proteinCoverageCombined.add( position );
				}
			}
		}
		if ( proteinLength === undefined ) {
			throw Error("No proteinCoverageObject found for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		const proteinCoverageRatio = proteinCoverageCombined.size / proteinLength;
		const sequenceCoverageAsPercent = ( proteinCoverageRatio * 100 ).toFixed( 1 );

		return sequenceCoverageAsPercent;
	}

	/**
	 * 
	 */
	_computeTotalPsmCount() {

		let totalPsmCount = 0;

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			//  reportedPeptideIds for proteinSequenceVersionId
			let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get( this._proteinSequenceVersionId );
		
			if ( reportedPeptideIds && ( reportedPeptideIds.length !== 0 ) ) {
				for ( let reportedPeptideId of reportedPeptideIds ) {

					let numberOfPSMsForReportedPeptide = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap().get( reportedPeptideId );
									
					if ( numberOfPSMsForReportedPeptide !== undefined || numberOfPSMsForReportedPeptide !== null ) {

						totalPsmCount += numberOfPSMsForReportedPeptide;
					}
				}
			}
		}

		return totalPsmCount;
	}

	/**
	 * 
	 */
	_getPeptideSequencesForPeptideIds() {

		//   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
		const peptideIdsToLoadSequencesForMap_Key_PeptideId = new Map();

		const loadedDataCommonHolder = this._loadedDataCommonHolder;

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

			if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
				// No data for this projectSearchId
				continue; // early continue
			}
			//  reportedPeptideIds for this proteinSequenceVersionId
			const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			
			if ( ! reportedPeptideIds ) {
				// No data for this projectSearchId and this _proteinSequenceVersionId
				continue; // early continue
			}
	
			for ( const reportedPeptideId of reportedPeptideIds ) {

				const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
				if ( ! peptideId ) {
					throw Error("_getPeptideSequencesForPeptideIds: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchIds: " + this._projectSearchIds );
				}

				if ( ! loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } ) ) {
					if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {
						peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId, peptideId } );
					}
				}
			}
		}
		if ( peptideIdsToLoadSequencesForMap_Key_PeptideId.size === 0 ) {
			//  No peptide sequence to load so return null
			return null; // EARLY EXIT
		}

		//  Re-order by projectSearchId

		//   Map<projectSearchId,[{ reportedPeptideId, projectSearchId, peptideId }]>
		const peptideIdsToLoadSequencesForMap_Key_ProjectSearchId = new Map();

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_PeptideId.entries() ) {

			const mapEntryValue = mapEntry[ 1 ];
			const projectSearchId = mapEntryValue.projectSearchId;

			let newMapEntryForProjectSearchId = peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.get( projectSearchId );
			if ( ! newMapEntryForProjectSearchId ) {
				newMapEntryForProjectSearchId = new Array();
				peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.set( projectSearchId, newMapEntryForProjectSearchId );
			}
			newMapEntryForProjectSearchId.push( mapEntryValue );
		}

		//  Retrieve peptide strings on a per projectSearchId basis

		const promiseArray_GetPeptideSequences = [];

		for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const entriesFor_projectSearchId = mapEntry[ 1 ];

			const promise_per_projectSearchIdProcessing = this._getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId } );
			promiseArray_GetPeptideSequences.push( promise_per_projectSearchIdProcessing );
		}

		return Promise.all( promiseArray_GetPeptideSequences );
	}

	/**
	 * goes with fcn _getPeptideSequencesForPeptideIds
	 */
	_getPeptideSequencesAndProcess( { projectSearchId, entriesFor_projectSearchId } ) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				//  Create array of reportedPeptideIds to get Peptide Sequences for
				const reportedPeptideIds = [];
				for ( const entry of entriesFor_projectSearchId ) {
					reportedPeptideIds.push( entry.reportedPeptideId );
				}

				const promise_getPeptideSequenceStringsFromReportedPeptideIds =
					ProteinViewDataLoader.getPeptideSequenceStringsFromReportedPeptideIds( { projectSearchId, reportedPeptideIds } );

				promise_getPeptideSequenceStringsFromReportedPeptideIds.catch((reason) => {});

				promise_getPeptideSequenceStringsFromReportedPeptideIds.then(({ peptideSequenceString_PeptideId_MappingList, foundAllReportedPeptideIdsForProjectSearchId }) => {
					if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
						throw Error("In _getPeptideSequencesAndProcess: foundAllReportedPeptideIdsForProjectSearchId is false");
						reject();
					}

					objectThis._process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, projectSearchId } );

					resolve();
				})
			} catch( e ) {
				console.log("Exception caught in New Promise in _getPeptideSequencesAndProcess(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, projectSearchId } ) {

		for ( const entry of peptideSequenceString_PeptideId_MappingList ) {

			this._loadedDataCommonHolder.add_peptideSequenceString_KeyPeptideId( { peptideSequenceString : entry.peptideSequence, peptideId : entry.peptideId } );
		}
	}

	/**
	 * All modification masses by protein position
	 * 
	 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	 */
	_get_modificationMasses_All_OnProteinByPosition() {

		//  Internal Collect Mods by position in Set to remove duplicates
		const modsInSetsOnProteinByPosition = new Map();  // mods per sequence position:  Map < {integer: position 1 based} : Set <mass> >.

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			//  Combined Dynamic and Static Mod masses
        	const modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();

			if ( modificationsOnProtein_KeyProteinSequenceVersionId ) {
				
				const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

				if ( modificationsOnProtein ) {
					for ( const modificationOnProtein of modificationsOnProtein) {
						//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
							// modificationOnProtein:
							// 	mass: 29
							// 	position: 67
							// 	reportedPeptideId: 4737
							// 	totalDynamicStaticMass: 29
							// 	totalDynamicStaticMassRounded: 29
							// 	totalDynamicStaticMassRoundedString: "29"

						const position = modificationOnProtein.position;
						const mass = modificationOnProtein.mass;

						let massesAtPosition = modsInSetsOnProteinByPosition.get( position );
						if ( ! massesAtPosition ) {
							massesAtPosition = new Set();
							modsInSetsOnProteinByPosition.set( position, massesAtPosition);
						}
						massesAtPosition.add( mass );
					}
				}
			}
		}

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget: mods per sequence position { <position 1 based> : [ <mass> ] }
		const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

		// Transfer masses from Map to Object (for Handlebars) and from Set into Array
		// Copy masses at each position from Set to Array and Sort
		for ( const modsMapEntry of modsInSetsOnProteinByPosition.entries() ) {
			const position = modsMapEntry[ 0 ];
			const massesAtPositionSet = modsMapEntry[ 1 ];
			const massesAtPositionArray = Array.from( massesAtPositionSet );
			massesAtPositionArray.sort( function(a, b) {
				if ( a < b ) {
					return -1;
				}
				if ( a > b ) {
					return 1;
				}
				return 0;
			})
			modsOnProteinByPosition.set( position, massesAtPositionArray );
		}

		return modsOnProteinByPosition;
	}

	/**
	 * Get Sequence coverage for All Peptides.  Does not reflect User Modification or or Protein Sequence Position Selections 
	 * 
	 * This does NOT USE: user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters() {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;

		const coverageArrayOfBooleanPerProjectSearchId = [];

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			//  Sequence Coverage Data
			const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! proteinCoverageObject ) {
				// No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
				continue; //  EARLY CONTINUE
			}

			const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();
			coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
		}

		if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
			const msg = "No proteinCoverageObject objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
			console.log( msg );
			throw Error( msg );
		}

		const coverageArrayOfBoolean = [];

		for ( const coverageArrayOfBooleanThisProjectSearchId of coverageArrayOfBooleanPerProjectSearchId ) {
			for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
				if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
					coverageArrayOfBoolean[ index ] = true;
				}
			}
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : coverageArrayOfBoolean });
		
		return widget_SequenceCoverageParam;
	}

	/**
	 * Uses the user selected modifications and sequence positions to compute the sequence coverage
	 * 
	 * Combine coverages for the searches
	 * 
	 * Create ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam object to pass to Protein Sequence widget
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions() {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;

		const coverageArrayOfBooleanPerProjectSearchId = [];


		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}


		if ( ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) && ( ! selectedProteinSequencePositions ) ) {

			//  No Modification or Protein Sequence Positions Selected so use existing computed sequence coverage

			for ( const projectSearchId of this._projectSearchIds ) {

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				//  Sequence Coverage Data
				const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

				//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
				const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
				if ( ! proteinCoverageObject ) {
					// No proteinCoverageObject for proteinSequenceVersionId for this projectSearchId so skip to next projectSearchId
					continue; //  EARLY CONTINUE
				}

				const coverageArrayOfBooleanThisProjectSearchId = proteinCoverageObject.getBooleanArrayOfProteinCoverage();
				coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
			}

			if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
				const msg = "No proteinCoverageObject objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
				console.log( msg );
				throw Error( msg );
			}
		} else {

			//  Modification or Protein Sequence Positions Selected so compute sequence coverage

			const reportedPeptideIdsForDisplay_AllProjectSearchIds = this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

			for ( const projectSearchId of this._projectSearchIds ) {

				const reportedPeptideIdsForDisplay = reportedPeptideIdsForDisplay_AllProjectSearchIds.get( projectSearchId );

				if ( ! reportedPeptideIdsForDisplay ) {
					// No reportedPeptideIdsForDisplay for this projectSearchId so skip to next projectSearchId
					continue; //  EARLY CONTINUE
				}

				const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

				const coverageArrayOfBooleanThisProjectSearchId = this._get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ 
					reportedPeptideIds : reportedPeptideIdsForDisplay, loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } );

				coverageArrayOfBooleanPerProjectSearchId.push( coverageArrayOfBooleanThisProjectSearchId );
			}

			if ( coverageArrayOfBooleanPerProjectSearchId.length === 0 ) {
				const msg = "No reportedPeptideIdsForDisplay objects found for proteinSequenceVersionId: " + proteinSequenceVersionId + ", for any projectSearchIds: " + this._projectSearchIds.join(",");
				console.log( msg );
				throw Error( msg );
			}
		}

		const coverageArrayOfBoolean = [];

		for ( const coverageArrayOfBooleanThisProjectSearchId of coverageArrayOfBooleanPerProjectSearchId ) {
			for ( let index = 0; index < coverageArrayOfBooleanThisProjectSearchId.length; index++ ) {
				if ( coverageArrayOfBooleanThisProjectSearchId[ index ] ) {
					coverageArrayOfBoolean[ index ] = true;
				}
			}
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : coverageArrayOfBoolean });
		
		return widget_SequenceCoverageParam;
	}


	/**
	 * Create links to external resources
	 */
	_createLinksToExternalResources( { proteinSequenceString } ) {

		const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
		const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
		
		const proteinNames_URI_Encoded_Set = new Set();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._proteinViewPage_Display_MultipleSearch._get_loadedDataPerProjectSearchIdHolder_for_projectSearchId( projectSearchId );

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

			let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
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
	 * On links to external resources, attach click handlers to open the links.
	 * 
	 * Do this since the click is eaten by another click handler so the browser does not open the link by default.
	 */
	_attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } ) {
		
		const $selector_ncbi_blast_link = $contentDiv.find(".selector_ncbi_blast_link");
		if ( $selector_ncbi_blast_link.length === 0 ) {
			throw Error("No element found for class 'selector_ncbi_blast_link'");
		}
		const $selector_pdr_blast_link = $contentDiv.find(".selector_pdr_blast_link");
		if ( $selector_pdr_blast_link.length === 0 ) {
			throw Error("No element found for class 'selector_pdr_blast_link'");
		}
		const $selector_uniprotkb_search_link = $contentDiv.find(".selector_uniprotkb_search_link");
		if ( $selector_uniprotkb_search_link.length === 0 ) {
			throw Error("No element found for class 'selector_uniprotkb_search_link'");
		}
		const $selector_ncbi_search_link = $contentDiv.find(".selector_ncbi_search_link");
		if ( $selector_ncbi_search_link.length === 0 ) {
			throw Error("No element found for class 'selector_ncbi_search_link'");
		}
		
		$selector_ncbi_blast_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.NCBI_Blast_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_pdr_blast_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.PDR_Blast_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_uniprotkb_search_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.UniProtKB_Search_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		$selector_ncbi_search_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				window.open( linksToExternalResources.NCBI_Search_URL );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedModificationsChange() {

		const modsSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );

		{
			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}

			//  Update Protein Sequence Display Widget with mods to display
			this._proteinSequenceFormattedDisplay_Main_displayWidget.update_modificationMassesToFilterOn( { modificationMassesToFilterOn } );

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() || selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}
		}

		this._createOrReplaceReportedPeptideList();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedProteinSequenceChange( params ) {

		let newSelection = undefined;
		if ( params ) {
			newSelection = params.newSelection;
		}

		const widgetEncodedStateData = this._proteinSequenceFormattedDisplay_Main_displayWidget.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );

		//  
		{
			let modificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();
			if ( modificationMassesToFilterOn && modificationMassesToFilterOn.size === 0 ) {
				modificationMassesToFilterOn = undefined;
			}
			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() || selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions();
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}
		}
		
		this._createOrReplaceReportedPeptideList();
	}


	/**
	 * 
	 */
	_createOrReplaceReportedPeptideList() {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $reported_peptides_outer_container = $contentDiv.find(".selector_reported_peptides_outer_container");
		if ( $reported_peptides_outer_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'reported_peptides_outer_container'");
		}

		this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createOrUpdateReportedPeptideDisplayData(
			{
				proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget,
				proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect : this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchIds : this._projectSearchIds,
				$reported_peptides_outer_container
			});
		
		this._showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } );
	}
	
	/**
	 * 
	 */
	_createModalOverlayContentDiv( { proteinSummaryStatistics, linksToExternalResources } ) {

		const summaryStatisticsDisplay = { // TODO  FAKE for now
			sequenceCoverageAsPercent : proteinSummaryStatistics.sequenceCoverageAsPercent,
			peptideCountDisplay : "", //  Not computed yet TODO
			uniquePeptideCountDisplay : "", //  Not computed yet TODO
			psmCountDisplay : proteinSummaryStatistics.psmCount.toLocaleString(),
		};

		let contentDivHTML = 
			this._protein_page_single_protein_display_in_overlay_template_Template({
				proteinData : this._proteinNameDescription,
				summaryStatistics :  summaryStatisticsDisplay,
				linksToExternalResources
			});
		let $contentDiv = $(contentDivHTML);
		return $contentDiv;
	}

	/**
	 * 
	 */
	_createSingleProteinModalOverlay( { $contentDiv } ) {

		const objectThis = this;


		// const $data_page_outermost_div = $("#data_page_outermost_div");
		// if ( $data_page_outermost_div.length === 0 ) {
		// 	throw Error("Failed to find DOM element with id 'data_page_outermost_div'");
		// }

		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
		if ( $data_page_overall_enclosing_block_div.length === 0 ) {
			throw Error("Failed to find DOM element with id 'data_page_overall_enclosing_block_div'");
		}
		
		const overlayContainerHTML = this._protein_page_single_protein_overlay_container_template_Template();
		const $overlayContainer = $( overlayContainerHTML );
		$overlayContainer.insertAfter( $data_page_overall_enclosing_block_div );
			
		const backgroundHTML = this._protein_page_single_protein_overlay_background_template_Template();
		const $background = $( backgroundHTML );
		$background.insertAfter( $data_page_overall_enclosing_block_div );
	
		const $single_protein_overlay_background = $("#single_protein_overlay_background");
		if ( $single_protein_overlay_background.length === 0 ) {
			throw Error("Failed to find DOM element with id 'single_protein_overlay_background'");
		}
		const $view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_div'");
		}

		const $view_single_protein_overlay_body = $("#view_single_protein_overlay_body");
		if ( $view_single_protein_overlay_body.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_body'");
		}
		$view_single_protein_overlay_body.append( $contentDiv );

		//   Remove Click on background to close Single Protein View
		
		// $single_protein_overlay_background.click( function(eventObject) {
		// 	try {
		// 		eventObject.preventDefault();
		// 		objectThis._overlayHideClicked();
		// 		return false;
		// 	} catch( e ) {
		// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		// 		throw e;
		// 	}
		// });	

		const $view_single_protein_overlay_X_for_exit_overlay = $("#view_single_protein_overlay_X_for_exit_overlay");
		if ( $view_single_protein_overlay_X_for_exit_overlay.length === 0 ) {
			throw Error("Failed to find DOM element with id 'view_single_protein_overlay_X_for_exit_overlay'");
		}
		$view_single_protein_overlay_X_for_exit_overlay.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._overlayHideClicked();
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
	}

	/**
	 * 
	 */
	_showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } ) {
		
		const objectThis = this;
		
		const $selector_downloads_block = $contentDiv.find(".selector_downloads_block");
		if ( $selector_downloads_block.length === 0 ) {
			throw Error("Failed to find Element with class 'selector_downloads_block'");
		}
				
		//  Have click handlers been attached to download data elements?
		if ( ! this._clickHandlersAttachedToDownloadDataElements ) {
		
			const $selector_download_peptides_all = $selector_downloads_block.find(".selector_download_peptides_all");
			if ( $selector_download_peptides_all.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_peptides_all'");
			}
			const $selector_download_peptides_shown = $selector_downloads_block.find(".selector_download_peptides_shown");
			if ( $selector_download_peptides_shown.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_peptides_shown'");
			}

			const $selector_download_psms_all = $selector_downloads_block.find(".selector_download_psms_all");
			if ( $selector_download_psms_all.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_psms_all'");
			}
			const $selector_download_psms_shown = $selector_downloads_block.find(".selector_download_psms_shown");
			if ( $selector_download_psms_shown.length === 0 ) {
				throw Error("Failed to find Element with class 'selector_download_psms_shown'");
			}
			
			this._clickHandlersAttachedToDownloadDataElements = true;
			
			//  Add Click handler to download Reported Peptides and PSMs, if not already added

			$selector_download_peptides_all.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPeptides_All_ClickHandler( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		

			$selector_download_peptides_shown.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPeptides_Shown_ClickHandler( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		
			
			$selector_download_psms_all.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPsmsClickHandler_All( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		

			$selector_download_psms_shown.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._downloadPsmsClickHandler_Shown( { clickThis : this, eventObject } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});		
		}
		
		$selector_downloads_block.show();
	}
	
	/**
	 * 
	 */
	_downloadPeptides_All_ClickHandler( { clickThis, eventObject } ) {

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds({ not_filtered_position_modification_selections : true });

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchIds : this._projectSearchIds
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( { clickThis, eventObject } ) {
		
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay_Map_KeyProjectSearchId,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchIds : this._projectSearchIds
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}
	

	/**
	 * Download ALL PSMs for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_All( { clickThis, eventObject } ) {

		//  Data in Map
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds({ not_filtered_position_modification_selections : true });

		//  Transfer Map into Object for serializing to JSON

		const reportedPeptideIdsPerProjectSearchId = {};

		for ( const mapEntry of reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const reportedPeptideIdsForDisplayData = mapEntry[ 1 ];
			reportedPeptideIdsPerProjectSearchId[ projectSearchId ] = reportedPeptideIdsForDisplayData; //  Object since serializing to JSON, property name is projectSearchId
		}			

		if ( Object.keys( reportedPeptideIdsPerProjectSearchId ).length === 0 ) {
			throw Error("_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId 
					+ ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		this._downloadPsms( { reportedPeptideIdsPerProjectSearchId } );
	}

	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_Shown( { clickThis, eventObject } ) {

		//  Data in Map
		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = 
			this._getReportedPeptideIdsForDisplay_AllProjectSearchIds();

		//  Transfer Map into Object for serializing to JSON

		const reportedPeptideIdsPerProjectSearchId = {};

		for ( const mapEntry of reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.entries() ) {

			const projectSearchId = mapEntry[ 0 ];
			const reportedPeptideIdsForDisplayData = mapEntry[ 1 ];
			reportedPeptideIdsPerProjectSearchId[ projectSearchId ] = reportedPeptideIdsForDisplayData; //  Object since serializing to JSON, property name is projectSearchId
		}			

		if ( Object.keys( reportedPeptideIdsPerProjectSearchId ).length === 0 ) {
			throw Error("_downloadPsmsClickHandler_Shown: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " + this._proteinSequenceVersionId 
					+ ", projectSearchIds: " + this._projectSearchIds.join(",") );
		}
		
		this._downloadPsms( { reportedPeptideIdsPerProjectSearchId } );
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 * 
	 * @param reportedPeptideIdsPerProjectSearchId -  Object since serializing to JSON, property name is projectSearchId
	 */
	_downloadPsms( { reportedPeptideIdsPerProjectSearchId } ) {
		
		const searchDataLookupParamsRoot = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
			projectSearchIds : this._projectSearchIds,
			searchDataLookupParamsRoot : searchDataLookupParamsRoot,
			reportedPeptideIdsPerProjectSearchId : reportedPeptideIdsPerProjectSearchId } );
	}
	
	//////////////

	/**
	 * 
	 */
	_overlayHideClicked() {

		const $single_protein_overlay_background = $("#single_protein_overlay_background");
		if ( $single_protein_overlay_background.length === 0 ) {
			throw Error("No DOM element found with id 'single_protein_overlay_background'");
		}
		$single_protein_overlay_background.remove();

		const $view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
		}
		$view_single_protein_overlay_div.remove();

		this._contentDivHTMLElement = undefined;
		this._proteinSequenceFormattedDisplay_Main_displayWidget = undefined;

		//  Have click handlers been attached to download data elements?
		this._clickHandlersAttachedToDownloadDataElements = false; //  reset to false since removed elements from DOM

		this._singleProtein_CentralStateManagerObject.clearAll();

		this._resizeWindow_Handler_Remove();

		if ( this._singleProteinCloseCallback ) {
			this._singleProteinCloseCallback();
		}
	}

	//////////////


	/**
	 * 
	 */
	_resizeWindow_Handler_Attach() {

		const objectThis = this;

		//  Attach resize handler
		const $window = $(window);
		$window.on("resize", function() {
			try {
				objectThis._resize_OverlayHeight_BasedOnViewportHeight();

				objectThis._update_Overlay_OnWindowResize();
			} catch( e ) {
				console.log("Exception caught in New Promise in _loadDataForInitialOverlay(...)");
				console.log( e );
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_resizeWindow_Handler_Remove() {

		//  Remove resize handler
		const $window = $(window);

		$window.off("resize");
	}
	
	/**
	 * 
	 */
	_resize_OverlayHeight_BasedOnViewportHeight() {

		if (!this._contentDivHTMLElement) {
			// Exit if no overlay
			return;
		}

		const $window = $(window);

		const windowHeight = $window.height();

		//  Subtract header and footer heights

		const $header_outer_container_div = $("#header_outer_container_div");
		if ( $header_outer_container_div.length === 0 ) {
			throw Error("No DOM element found with id 'header_outer_container_div'");
		}
		const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		// const $footer_outer_container_div = $("#footer_outer_container_div");
		// if ( $footer_outer_container_div.length === 0 ) {
		// 	throw Error("No DOM element found with id 'footer_outer_container_div'");
		// }
		// const footerOuterHeight = $footer_outer_container_div.outerHeight( true /* [includeMargin ] */ );

		const footerOuterHeight = 31;  // Hard code footer height since measuring doesn't work right

		const overlayHeight = windowHeight - headerOuterHeight - footerOuterHeight;

		const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
		if ( $view_single_protein_inner_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
		}

		$view_single_protein_inner_overlay_div.css('min-height', overlayHeight + 'px');
	}

	/**
	 * called by contained object of class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList
	 */
	resize_OverlayWidth_BasedOnReportedPeptidesWidth({reportedPeptidesWidth}) {

		if (!this._contentDivHTMLElement) {
			// Exit if no overlay
			return;
		}

		const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
		if ( $view_single_protein_inner_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
		}

		let overlayWidth = reportedPeptidesWidth + 60;
		if (overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH) {
			overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
		}

		$view_single_protein_inner_overlay_div.css('width', overlayWidth + 'px');
		
		this._update_Overlay_OnWindowResize();
	}

	/**
	 * called by contained object of class ProteinViewPage_DisplayData_MultipleSearches_SingleProtein_ReportedPeptideList
	 */
	_update_Overlay_OnWindowResize( params ) {

		let $view_single_protein_overlay_div = undefined;
		let overlayWidth = undefined;

		if ( params ) {
			$view_single_protein_overlay_div = params.$view_single_protein_overlay_div;
			overlayWidth = params.overlayWidth;
		}

		if ( $view_single_protein_overlay_div === undefined ) {
			$view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
			if ( $view_single_protein_overlay_div.length === 0 ) {
				throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
			}
		}
		if ( overlayWidth === undefined ) {
			overlayWidth = $view_single_protein_overlay_div.outerWidth();
		}

		if ( ! this._contentDivHTMLElement ) {
			// Exit if no overlay
			return;
		}

		//  Adjust width of block above reported peptide list to keep the boxes to the right within the viewport, if necessary.

		const $window = $(window);
		const windowWidth = $window.width();

		const $selector_section_above_reported_peptides_list_block = $view_single_protein_overlay_div.find(".selector_section_above_reported_peptides_list_block");

		if ( overlayWidth <= windowWidth ) {

			$selector_section_above_reported_peptides_list_block.css('width', ''); // clear setting

		} else {

			let sectionAboveReportedPeptidesList_Width = windowWidth - 50; // - 50 to adjust in from right edge
			if (sectionAboveReportedPeptidesList_Width < _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH) {
				sectionAboveReportedPeptidesList_Width = _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH; // Min width
			}
			$selector_section_above_reported_peptides_list_block.css('width', sectionAboveReportedPeptidesList_Width + 'px');
		}

	}


	///////////////////////////////////////////
	///////////////////////////////////////////

	/**
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 * Uses:
	 * 		this._proteinSequenceFormattedDisplay_Main_displayWidget
	 * 		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
	 * 
	 * @returns Map - < 
	 */
	_getReportedPeptideIdsForDisplay_AllProjectSearchIds( params ) {

		let not_filtered_position_modification_selections = undefined;
		if ( params ) {
			not_filtered_position_modification_selections = params.not_filtered_position_modification_selections;
		}

		let proteinSequenceFormattedDisplay_Main_displayWidget = undefined;
		let proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = undefined;

		if ( ! not_filtered_position_modification_selections ) {
			proteinSequenceFormattedDisplay_Main_displayWidget = this._proteinSequenceFormattedDisplay_Main_displayWidget;
			proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect;
		}

		const reportedPeptideIdsForDisplay_Map_KeyProjectSearchId = new Map();

		for ( const projectSearchId of this._projectSearchIds ) {

			const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
			if ( ! loadedDataPerProjectSearchIdHolder ) {
				throw Error( "No loadedDataPerProjectSearchIdHolder for projectSearchId: " + projectSearchId );
			}

			const reportedPeptideIdsForDisplay =
				this._getReportedPeptideIdsForDisplay_SpecificProjectSearchId( { 
					proteinSequenceFormattedDisplay_Main_displayWidget, 
					proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
					loadedDataPerProjectSearchIdHolder, 
					proteinSequenceVersionId : this._proteinSequenceVersionId, 
					projectSearchId } );

			reportedPeptideIdsForDisplay_Map_KeyProjectSearchId.set( projectSearchId, reportedPeptideIdsForDisplay );
		}

		return reportedPeptideIdsForDisplay_Map_KeyProjectSearchId;
	}
	
	/**
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 * Uses:
	 * 		this._proteinSequenceFormattedDisplay_Main_displayWidget
	 * 		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect
	 * 
	 * @returns empty array if no reportedPeptideIds for proteinSequenceVersionId for projectSearchId
	 */
	_getReportedPeptideIdsForDisplay_SpecificProjectSearchId( { 
		not_filtered_position_modification_selections, 
		loadedDataPerProjectSearchIdHolder,
		proteinSequenceVersionId, 
		projectSearchId } ) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
		if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
			//  No Data for projectSearchId so Return empty array
			return []; //  EARLY RETURN
		}

		//  reportedPeptideIds for this proteinSequenceVersionId
		let reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! reportedPeptideIds_All ) {
			//  No Data for proteinSequenceVersionId for projectSearchId so Return empty array
			return []; //  EARLY RETURN
		}

		if ( not_filtered_position_modification_selections ) {

			// Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		//  Potentially Filtering based on User Selections 
		const proteinSequenceFormattedDisplay_Main_displayWidget = this._proteinSequenceFormattedDisplay_Main_displayWidget;
		const proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect;

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		if ( ( ! selectedProteinSequencePositions ) && ( ! proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) ) {

			// No User Selections so NO Filtering based on User Selections

			return reportedPeptideIds_All;  // EARLY RETURN
		}

		if ( ! proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) {
			// no Modification Selections
			if ( selectedProteinSequencePositions ) {
				//  Protein Position Selections
				return this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder })
			}
			throw Error("Should not get here: No modification selection and no selectedProteinSequencePositions.")
		}

		//  Is 'unmodified' selected
		const noModificationSelected = proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoModificationSelected();
		if ( noModificationSelected ) {
			// Modification Section Selection: 'unmodified'
			if ( selectedProteinSequencePositions ) {
				//  Also have Protein Position Selections
				return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection_And_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
			}

			return this._getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder });
		}

		//  Have Modification Section Selection of Modification Masses

		const modificationsSelected_ExcludingNoModificationOption = proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getModificationsSelected_ExcludingNoModificationOption();

		if ( ! modificationsSelected_ExcludingNoModificationOption || modificationsSelected_ExcludingNoModificationOption.length === 0 ) {
			throw Error("modificationsSelected_ExcludingNoModificationOption cannot be not set or empty at this point");
		}

		if ( selectedProteinSequencePositions ) {
			// Have Modification Section Selection of Modification Masses AND Protein Position Selections
			return this._getReportedPeptideIdsForDisplay_ModificationMassesSelected_And_ProteinPositionsSelected({ modificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
		}

		return this._getReportedPeptideIdsForDisplay_ModificationMassesSelected({ modificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder });
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected 'unmodified' un the modification mass filter section
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection({ reportedPeptideIds_All, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		const modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId();
			
		for ( const reportedPeptideId of reportedPeptideIds_All ) {
			let modificationsForReportedPeptide = undefined;
			if ( modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId ) {
				modificationsForReportedPeptide = modificationsCombinedAndRoundedOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
			}
			if ( ( ! modificationsForReportedPeptide ) || ( modificationsForReportedPeptide.length === 0 ) ) {
				reportedPeptideIdsSelection.add(reportedPeptideId);
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Protein Positions - No Modifications Selections
	 */
	_getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		// 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
				reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected 'unmodified' un the modification mass filter section AND User has selected Protein Positions
	 */
	_getReportedPeptideIdsForDisplay_UnmodifiedSelectedInModificatinMassSection_And_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		// 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions
		// 2)  Remove from reportedPeptideIdsSelection all reportedPeptideIds that contain modifications

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
				reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
			}
		}

		const modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();
		const modificationsCombinedAndRoundedOnProtein = modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Remove from reportedPeptideIdsSelection any reported peptide ids with modifications (since 'unmodified' chosen)
		if ( modificationsCombinedAndRoundedOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of modificationsCombinedAndRoundedOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				// const position = modificationOnProtein.position;
				// const mass = modificationOnProtein.mass;
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;

				//  Remove from reportedPeptideIdsSelection any reported peptide ids with modifications (since 'unmodified' chosen)
				reportedPeptideIdsSelection.delete( reportedPeptideId );
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Modification Masses to filter on
	 * 
	 */
	_getReportedPeptideIdsForDisplay_ModificationMassesSelected({ modificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds

		const modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();
		const modificationsCombinedAndRoundedOnProtein = modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Add to reportedPeptideIdsSelection any reported peptide ids with modification masses that are selected
		if ( modificationsCombinedAndRoundedOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of modificationsCombinedAndRoundedOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				// const position = modificationOnProtein.position;
				const mass = modificationOnProtein.mass;
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;

				if ( modificationsSelected_ExcludingNoModificationOption.has( mass ) ) {
					reportedPeptideIdsSelection.add( reportedPeptideId );
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Modification Masses AND User has selected Protein Positions
	 * 
	 * 
		1) If a selected position has ANY modifications for ANY peptides,
		then the peptide being evaluated has to have at least one of the selected
		modification masses to be included in the display.

		2) If a selected position has NO modifications for any peptides,
		then the peptide being evaluated has to have protein coverage at the selected position 
		and include at least one of the selected modification masses in any position to be included in the display.

		The total reported peptide list is a union of the peptides from evaluating each selected position.
	* 
	 */
	_getReportedPeptideIdsForDisplay_ModificationMassesSelected_And_ProteinPositionsSelected({ modificationsSelected_ExcludingNoModificationOption, selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder }) {

		const reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds


		//  Build Set of positions contains selected Modification Masses and Set of positions contains any Modification Masses

		const positionContains_Any_ModificationMasses = new Set();  //  Set<position (number)>

		const reportedPeptideIds_at_position_For_Selected_ModificationMasses = new Map(); //  Map<position (number), Set<reported peptide id (number) >>

		const reportedPeptideIdsFor_Selected_ModificationMasses = new Set(); // Set<reported peptide id (number) >

		{
			const modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId();
			const modificationsCombinedAndRoundedOnProtein = modificationsCombinedAndRoundedOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

			//  Add to reportedPeptideIdsSelection any reported peptide ids with modification masses that are selected
			if ( modificationsCombinedAndRoundedOnProtein ) {
				//  Have modifications for this protein so process them
				for ( const modificationOnProtein of modificationsCombinedAndRoundedOnProtein) {
					//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
					const position = modificationOnProtein.position;
					const mass = modificationOnProtein.mass;
					const reportedPeptideId = modificationOnProtein.reportedPeptideId;

					positionContains_Any_ModificationMasses.add( position );
					
					if ( modificationsSelected_ExcludingNoModificationOption.has( mass ) ) {

						reportedPeptideIdsFor_Selected_ModificationMasses.add( reportedPeptideId );

						let reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = reportedPeptideIds_at_position_For_Selected_ModificationMasses.get( position );
						if ( ! reportedPeptideIds_For_Selected_ModificationMasses_MapEntry ) {
							reportedPeptideIds_For_Selected_ModificationMasses_MapEntry = new Set();
							reportedPeptideIds_at_position_For_Selected_ModificationMasses.set( position, reportedPeptideIds_For_Selected_ModificationMasses_MapEntry );
						}
						reportedPeptideIds_For_Selected_ModificationMasses_MapEntry.add( reportedPeptideId );
					}
				}
			}
		}

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
				
			if ( positionContains_Any_ModificationMasses.has( selectedProteinSequencePosition ) ) {

				// special logic when Selected Sequence Position contains modifications on any peptide

				//  Set<reported peptide id (number) > - reported peptide id found to have one of selected mod mass at this position
				const reportedPeptideIds_For_Selected_ModificationMasses = reportedPeptideIds_at_position_For_Selected_ModificationMasses.get( selectedProteinSequencePosition ); //  Map<position (number), Set<reported peptide id (number) >>

				if ( reportedPeptideIds_For_Selected_ModificationMasses ) {
					for ( const reportedPeptideIdAtPosition of reportedPeptideIds_For_Selected_ModificationMasses ) {
						reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
					}
				}

			} else {

				//  No Mod Masses for any peptide at this position so select reported peptide id with coverage at this location and has any selected mod mass at any position

				//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
				const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
					
				for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

					if ( reportedPeptideIdsFor_Selected_ModificationMasses.has( reportedPeptideIdAtPosition ) ) {

						reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
					}
				}
			}
		}

		return Array.from( reportedPeptideIdsSelection );
	}

	////////////////////////////////////////////
		
	/**
	 * Get Protein Sequence Coverage for the Reported Peptide Ids for Display.  
	 * 
	 * @returns proteinCoverageArrayOfBoolean
	 *       proteinCoverageArrayOfBoolean : Array (position is '1' based) of boolean with true for is sequence coverage 
	 */
	_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ reportedPeptideIds, loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } ) {

		const proteinCoverageArrayOfBoolean = []; // function result

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			//  No proteinCoverageObject for this proteinSequenceVersionId for this loadedDataPerProjectSearchIdHolder (projectSearchId)
			return proteinCoverageArrayOfBoolean; // EARLY RETURN
		}

		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

			for ( const reportedPeptideId of reportedPeptideIds ) {
				if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

					for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
						proteinCoverageArrayOfBoolean[ position ] = true;
					}
					break;
				}
			}
		}

		return proteinCoverageArrayOfBoolean;
	}
	
}
