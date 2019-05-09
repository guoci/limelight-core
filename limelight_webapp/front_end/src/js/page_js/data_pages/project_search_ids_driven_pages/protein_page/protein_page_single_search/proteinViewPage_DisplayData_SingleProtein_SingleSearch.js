/**
 * proteinViewPage_DisplayData_SingleProtein_SingleSearch.js
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Protein in Single Search  
 */

let Handlebars = require('handlebars/runtime');

let _protein_table_template_bundle = require("../../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { dataPageStateManager_Keys } from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager.js';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes.js';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile.js';

import { SearchDetailsAndFilterBlock_MainPage }  from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_MainPage.js';

import { SharePage_dataPages } from 'page_js/data_pages/data_pages_common/sharePage_dataPages.js';

import { downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds } from 'page_js/data_pages/project_search_ids_driven_pages_sub_parts/psm_downloadForCriteriaAndOptionalRepPepIdsProtSeqVIds.js';

import { ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_widget_SequenceCoverageParam.js';
import { ProteinSequenceFormattedDisplay_Main_displayWidget } from 'page_js/data_pages/display_widgets/protein_sequence_formatted_display__display_widget/proteinSequenceFormattedDisplay_Main_displayWidget.js';

import { ProteinViewDataLoader } from '../protein_page_common/proteinViewDataLoader.js';

import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer } from './proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js';
import { ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList } from './proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.js';

import { getDynamicModificationsForProteinSequenceVersionId } from '../protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.js';

import { ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect } from '../protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.js';
import { ProteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect } from '../protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.js';

import { Protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId } from '../protein_page_single_protein_common/protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.js';


//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1270; // Min width for upper section of protein sequence and boxes to right

/**
 * 
 */
export class ProteinViewPage_Display_SingleProtein_SingleSearch {

	/**
	 * 
	 */
	constructor(
			{ proteinViewPage_Display_SingleSearch,
				proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer, 
				dataPages_LoggedInUser_CommonObjectsFactory,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_OtherUserSelections, 
				dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing, 
				loadedDataCommonHolder, 
				loadedDataPerProjectSearchIdHolder,
				singleProtein_CentralStateManagerObject } ) {
		
		this._proteinViewPage_Display_SingleSearch = proteinViewPage_Display_SingleSearch; // reference to creating class object

		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;

		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_OtherUserSelections = dataPageStateManager_OtherUserSelections;

		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;

		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;

		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;

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

		if (!_protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template");
		}
		this._protein_page_single_protein_user_filter_selection_template_Template = _protein_table_template_bundle.protein_page_single_protein_user_filter_selection_template;

		if ( this._dataPages_LoggedInUser_CommonObjectsFactory ) {
			this._saveView_dataPages = this._dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SaveView_dataPages();
		}

		this._sharePage_dataPages = new SharePage_dataPages();

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer(
			{
				loadedDataPerProjectSearchIdHolder ,
				loadedDataCommonHolder ,
				dataPageStateManager_DataFrom_Server ,
				searchDetailsBlockDataMgmtProcessing ,
				proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer
			});

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList = new ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList(
			{
				containing_ProteinViewPage_Display_SingleProtein_SingleSearch : this,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
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

		this._projectSearchId = undefined;
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
	openOverlay( { proteinSequenceVersionId, projectSearchId, proteinNameDescription, proteinSummaryStatistics, singleProteinCloseCallback } ) {

		const objectThis = this;

		this._singleProteinCloseCallback = singleProteinCloseCallback;

		this._proteinNameDescription = proteinNameDescription;

		//  Attach resize handler
		const $window = $(window);
		$window.on("resize", function() {

			objectThis._resize_OverlayHeight_BasedOnViewportHeight();

			objectThis._update_Overlay_OnWindowResize();
		});

		this._projectSearchId = projectSearchId;

		this._proteinSequenceVersionId = proteinSequenceVersionId;

		this._loadDataForInitialOverlay({
			proteinSequenceVersionId ,
			projectSearchId
		}).then(function(value) {
			try {
				// On to displaying the data
				objectThis._openOverlayAfterLoadData({
					proteinNameDescription,
					proteinSummaryStatistics
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, function(reason) {});
	}

	/**
	 * 
	 */
	_loadDataForInitialOverlay({proteinSequenceVersionId, projectSearchId}) {

		const objectThis = this;

		return new Promise(function(resolve, reject) {
			try {
				const promises_LoadData_Array = [];

				const promise_loadDataForInitialOverlayShow = objectThis._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
					.loadDataForInitialOverlayShow({
						proteinSequenceVersionId ,
						projectSearchId
					});
				if (promise_loadDataForInitialOverlayShow) {
					promises_LoadData_Array.push(promise_loadDataForInitialOverlayShow);
				}

				try {
					const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
						loadedDataPerProjectSearchIdHolder : objectThis._loadedDataPerProjectSearchIdHolder, 
						proteinSequenceVersionId, 
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

				if (promises_LoadData_Array.length !== 0) {

					const promisesAll = Promise.all(promises_LoadData_Array);

					promisesAll.catch(function(reason) {
						reject(reason);
					})
					promisesAll.then(function(value) {
						try {
							resolve(value);
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					})
				} else {

					resolve();
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	////////////////////////////////////////////////////////

	/**
	 * 
	 */
	_openOverlayAfterLoadData( { proteinNameDescription, proteinSummaryStatistics } ) {

		const objectThis = this;

		const projectSearchId = this._projectSearchId;
		const proteinSequenceVersionId = this._proteinSequenceVersionId;

		const proteinSequenceData = this._loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({
			proteinSequenceVersionId
		});
		if (proteinSequenceData === undefined) {
			throw Error("No Protein sequence Data in this._loadedDataCommonHolder for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
		}
		const proteinSequenceString = proteinSequenceData.getProteinSequence();
		if (proteinSequenceString === undefined) {
			throw Error("proteinSequenceData.getProteinSequence() is undefined: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
		}
		
		//  Create links to external resources
		const linksToExternalResources = this._createLinksToExternalResources( { proteinSequenceString } );
		
		const $contentDiv = this._createModalOverlayContentDiv( { proteinNameDescription, proteinSummaryStatistics, linksToExternalResources } );

		this._createSingleProteinModalOverlay( { $contentDiv } );

		this._contentDivHTMLElement = $contentDiv[0];

		this._resize_OverlayHeight_BasedOnViewportHeight();

		if ( this._saveView_dataPages ) {
			//  Set up handle the "Save View" Button in this Single PRotein Overlay

			const $selector_save_view_root_container__single_protein = $contentDiv.find(".selector_save_view_root_container__single_protein");
			if ( $selector_save_view_root_container__single_protein.length === 0 ) {
				throw Error("Fail find DOM element with class 'selector_save_view_root_container__single_protein'");
			}
			$selector_save_view_root_container__single_protein.show();
			const selector_save_view_root_container__single_proteinDOMElement = $selector_save_view_root_container__single_protein[0];

			this._saveView_dataPages.initialize({ projectSearchIds : [ this._projectSearchId ], container_DOM_Element : selector_save_view_root_container__single_proteinDOMElement, enableSetDefault : false });
		}

		if ( this._sharePage_dataPages ) {
			//  Set up handle the "Save View" Button in this Single PRotein Overlay

			const $selector_share_page_root_container__single_protein = $contentDiv.find(".selector_share_page_root_container__single_protein");
			if ( $selector_share_page_root_container__single_protein.length === 0 ) {
				throw Error("Fail find DOM element with class 'selector_share_page_root_container__single_protein'");
			}
			$selector_share_page_root_container__single_protein.show();
			const selector_share_page_root_container__single_proteinDOMElement = $selector_share_page_root_container__single_protein[0];

			this._sharePage_dataPages.initialize({ projectSearchIds : [ this._projectSearchId ], container_DOM_Element : selector_share_page_root_container__single_proteinDOMElement });
		}


		this._searchDetailsAndFilterBlock_MainPage.populatePage();
		
		this._attachClickHandlersOnLinksToExternalResources( { linksToExternalResources, $contentDiv } );



		/// Modification Display and Selection
		{
			const callbackMethodForSelectedModificationsChangeBoundThis = this._callbackMethodForSelectedModificationsChange.bind( this );
			const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = new Map();
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set( projectSearchId, this._loadedDataPerProjectSearchIdHolder );

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect = new ProteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect(
				{
					rootDisplayJquerySelector : ".selector_protein_mod_list_block",
					projectSearchIds : [ projectSearchId ],
					proteinSequenceVersionId,
					loadedDataCommonHolder : this._loadedDataCommonHolder, 
					loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
					callbackMethodForSelectedChange : callbackMethodForSelectedModificationsChangeBoundThis
				});


			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.initialize({ 
				proteinNameDescription : this._proteinNameDescription,
				encodedStateData : this._singleProtein_CentralStateManagerObject.getModsSelectedEncodedStateData()
			});

			this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.modListDisplay();
		}

		//  Peptide Sequence Selection
		{
			const callbackMethodForSelectedPeptideSequenceChangeBoundThis = this._callbackMethodForSelectedPeptideSequenceChange.bind( this );
			this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect = new ProteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect({
				callbackMethodForSelectedChange : callbackMethodForSelectedPeptideSequenceChangeBoundThis
			});

			this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.initialize({ 
				encodedStateData : this._singleProtein_CentralStateManagerObject.getPeptideSequenceFilterSelectedEncodedStateData() 
			});
		}

		//////


		let reportedPeptideIdsForDisplay = undefined; // Set in following block

		{  //   Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

			//    Modification Mass Info for display

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.
			const variableModificationMassesForProteinPositions = this._get_variableModificationMasses_All_OnProteinByPosition();

			//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:  mods per sequence position:  // Map <integer, Map<integer, Object> <proteinSequenceVersionId, Map < position 1 based (integer) : { Object: residue  (string), masses: [ mass (number) ] } >>
			const staticModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
			let staticModificationMassesForProteinPositions = undefined;
			if ( staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
				staticModificationMassesForProteinPositions = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
			}

			let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
			if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
				variableModificationMassesToFilterOn = undefined;
			}

			let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
			if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
				staticModificationMassesToFilterOn = undefined;
			}

			//  Sequence coverage for all peptides for this protein (no apply Mod mass or Protein Position filters)

			const widget_SequenceCoverageParam_All_Peptides = this._get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters();

			//  DOM element to put widget in

			const $selector_protein_sequence_container = $contentDiv.find(".selector_protein_sequence_container");
			if ($selector_protein_sequence_container.length === 0) {
				throw Error("No element with class 'selector_protein_sequence_container'");
			}

			const proteinSequenceContainerHTML_Element = $selector_protein_sequence_container[0];

			//  Callback function, with 'this' bound to this object

			const callbackMethodForSelectedProteinSequenceChangeBoundThis = this._callbackMethodForSelectedProteinSequenceChange.bind(this);

			//   Create Object:  Protein Sequence Widget: Display and Selection (including modifications on the protein sequence)

			this._proteinSequenceFormattedDisplay_Main_displayWidget = new ProteinSequenceFormattedDisplay_Main_displayWidget(
				{
					proteinSequenceString,
					variableModificationMassesForProteinPositions,
					staticModificationMassesForProteinPositions,
					variableModificationMassesToFilterOn,
					staticModificationMassesToFilterOn,
					widget_SequenceCoverageParam_All_Peptides,
					containerHTML_Element: proteinSequenceContainerHTML_Element,
					callbackMethodForSelectedChange: callbackMethodForSelectedProteinSequenceChangeBoundThis
				});

			//  Encoded Data Data from URL to pass to Protein Sequence Widget
			this._proteinSequenceFormattedDisplay_Main_displayWidget.set_encodedStateData({ encodedStateData : this._singleProtein_CentralStateManagerObject.getProteinSequenceFormattedDisplayWidgetEncodedStateData() });


			//  Create and initialize object of class Protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId
			//  here since used in call next to this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions()

			this._protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId = new Protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId({
				forSingleSearch : true,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				loadedDataCommonHolder : this._loadedDataCommonHolder,
				proteinSequenceFormattedDisplay_Main_displayWidget : this._proteinSequenceFormattedDisplay_Main_displayWidget, 
				proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect : this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect,
				proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect : this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect
			});

			this._protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.initialize();

			const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = this._getReportedPeptideIdsForDisplay();

			const proteinPositions_CoveredBy_PeptideSearchStrings = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.proteinPositions_CoveredBy_PeptideSearchStrings;
			// reportedPeptides_Filtered_Array,
			// peptideSearchStrings_AnyEntered,
			// peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
			// proteinPositions_CoveredBy_PeptideSearchStrings

			reportedPeptideIdsForDisplay = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

			const $protein_peptide_sequence_selection_not_found = $("#protein_peptide_sequence_selection_not_found");
			if ( $protein_peptide_sequence_selection_not_found.length === 0 ) {
				throw Error("No DOM element with id 'protein_peptide_sequence_selection_not_found' ");
			}
			if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.peptideSearchStrings_AnyEntered ) {
				if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence ) {
					$protein_peptide_sequence_selection_not_found.hide();
				} else {
					$protein_peptide_sequence_selection_not_found.show();
				}
			} else {
				$protein_peptide_sequence_selection_not_found.hide();
			}
			

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() ||
					this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ||
					this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.getPeptideSearchStrings() ||
					selectedProteinSequencePositions ) { 
				//   Set Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions({ reportedPeptideIdsForDisplay });
				this._proteinSequenceFormattedDisplay_Main_displayWidget.set_initial_widget_SequenceCoverageParam_Selected_Peptides({ initial_widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			}
			
			this._proteinSequenceFormattedDisplay_Main_displayWidget.set_initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings({ initial_widget_proteinPositions_CoveredBy_PeptideSearchStrings : proteinPositions_CoveredBy_PeptideSearchStrings });


			this._proteinSequenceFormattedDisplay_Main_displayWidget.initialize();

			this._proteinSequenceFormattedDisplay_Main_displayWidget.renderOnPage();
		}

		this._updateUserModificationProteinPositionSelectionDisplay();

		////

		//  Load and Display data after initial overlay show.  Currently Reported Peptide List

		const promise_loadDataAfterInitialOverlayShow = 
			this
			._proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer
			.loadDataAfterInitialOverlayShow({ retrieveForSingleSearch : true, proteinSequenceVersionId, projectSearchId });

		promise_loadDataAfterInitialOverlayShow.catch(function(reason) {});

		promise_loadDataAfterInitialOverlayShow.then(function(value) {
			try {
				objectThis._createOrReplaceReportedPeptideList({ reportedPeptideIdsForDisplay });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_getPeptideSequencesForPeptideIds() {

		//   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
		const peptideIdsToLoadSequencesForMap_Key_PeptideId = new Map();

		const loadedDataCommonHolder = this._loadedDataCommonHolder;

		const projectSearchId = this._projectSearchId;

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
			// No data for this projectSearchId
			throw Error("No No data for this projectSearchId: " + projectSearchId );
		}
		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		
		if ( ! reportedPeptideIds ) {
			// No data for this projectSearchId and this _proteinSequenceVersionId
			throw Error("No No data for this projectSearchId: " + projectSearchId 
				+ ", and this _proteinSequenceVersionId: " + this._proteinSequenceVersionId );
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
					try {
						if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
							throw Error("In _getPeptideSequencesAndProcess: foundAllReportedPeptideIdsForProjectSearchId is false");
							reject();
						}

						objectThis._process_getPeptideSequenceResult( { peptideSequenceString_PeptideId_MappingList, projectSearchId } );

						resolve();
						
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
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
	 * All Variable Modification masses by protein position
	 * 
	 * @returns  Map < {integer: position 1 based} : [ <mass> ] > -- Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
	 */
	_get_variableModificationMasses_All_OnProteinByPosition() {

		//  Format for class ProteinSequenceFormattedDisplay_Main_displayWidget:
		const modsOnProteinByPosition = new Map(); // mods per sequence position:  Map < {integer: position 1 based} : [ <mass> ] >.

		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		if ( dynamicModificationsOnProtein ) {

			//  Start with Map of Sets to remove duplicates
			const modsOnProteinByPosition_Sets = new Map(); // mods per sequence position:  Set < {integer: position 1 based} : [ <mass> ] >.

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
				const massNumber = Number.parseFloat( mass )
				massesAtPosition.add( massNumber );
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

	/**
	 * Get Sequence coverage for All Peptides.  Does not reflect User Modification or or Protein Sequence Position Selections 
	 * 
	 * This does NOT USE: user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_No_ModMassProteinPositionFilters() {

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  No Modification or Protein Sequence Positions Selected so use existing computed sequence coverage

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
		if (!proteinCoverageObject) {
			throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId);
		}

		const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ proteinCoverageObject });

		return widget_SequenceCoverageParam;
	}

	/**
	 * Uses the user selected modifications and sequence positions to compute the sequence
	 * 
	 * @returns widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam
	 */
	_get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions({ reportedPeptideIdsForDisplay }) {

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		if ( ( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() ) &&
				( ! this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() ) &&
				( ! this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.getPeptideSearchStrings() ) &&
				( ! selectedProteinSequencePositions ) ) {

			//  No Modification or Peptide Sequence Search Strings or Protein Sequence Positions Selected so use existing computed sequence coverage

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
			if (!proteinCoverageObject) {
				throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId);
			}

			const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ proteinCoverageObject });

			return widget_SequenceCoverageParam;

		} else {

			//  Modification or Protein Sequence Positions Selected so compute sequence coverage

			const proteinCoverageArrayOfBoolean = this._get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ 
				reportedPeptideIds : reportedPeptideIdsForDisplay, 
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId } );

			const widget_SequenceCoverageParam = new ProteinSequenceFormattedDisplay_widget_SequenceCoverageParam({ coverageArrayOfBoolean : proteinCoverageArrayOfBoolean });
			
			return widget_SequenceCoverageParam;
		}
	}

	/**
	 * Create links to external resources
	 */
	_createLinksToExternalResources( { proteinSequenceString } ) {

		const proteinSequenceVersionId = this._proteinSequenceVersionId;
		
		const NCBI_Blast_URL = "https://blast.ncbi.nlm.nih.gov/Blast.cgi?PAGE=Proteins&QUERY=" + proteinSequenceString;
		const PDR_Blast_URL = "https://yeastrc.org/pdr/blastSearchInit.do?query=" + proteinSequenceString;
		
		const proteinNames_URI_Encoded_Array = [];

		const proteinInfoMapKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId()

		let proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinInfo === undefined ) {
			throw Error("No proteinInfo found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}
		const annotations = proteinInfo.annotations;
		if ( annotations ) {
			for ( const annotation of annotations ) {
				const name = annotation.name;
//				const description = annotation.description;
//				const taxonomy = annotation.taxonomy;
				const proteinName_URI_Encoded = window.encodeURIComponent( name );
				proteinNames_URI_Encoded_Array.push( proteinName_URI_Encoded );
			}
		}
		
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

	////////////////////////////

	//    Display of User Selected Modifications and Protein Positions

	/**
	 * 
	 */
	_updateUserModificationProteinPositionSelectionDisplay() {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $selector_modifications_protein_positions_filtering_listing = $contentDiv.find(".selector_modifications_protein_positions_filtering_listing");
		if ( $selector_modifications_protein_positions_filtering_listing.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_modifications_protein_positions_filtering_listing'");
		}

		$selector_modifications_protein_positions_filtering_listing.empty();

		//  Selected Protein Positions:

		const selectedProteinSequencePositionsDisplay = this._userSelectionDisplay_GetProteinPositionsFormatted();

		const selectedModificationsMasses = this._userSelectionDisplay_GetModificationsFormatted();

		let peptideSequenceSearchStringsDisplay = undefined;

		const peptideSequenceSearchStrings_Array = this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.getPeptideSearchStrings();
		if ( peptideSequenceSearchStrings_Array ) {
			peptideSequenceSearchStringsDisplay = peptideSequenceSearchStrings_Array.join(" or ");
		}

		if ( selectedProteinSequencePositionsDisplay || selectedModificationsMasses || peptideSequenceSearchStringsDisplay ) {
			const context = {
				selectedProteinSequencePositions : selectedProteinSequencePositionsDisplay,
				selectedModificationsMasses : selectedModificationsMasses,
				peptideSequenceSearchStrings : peptideSequenceSearchStringsDisplay
			};
			const html = this._protein_page_single_protein_user_filter_selection_template_Template( context );
			$selector_modifications_protein_positions_filtering_listing.append( html );

			const $selector_clear_user_selection_modifications_protein_positions = $selector_modifications_protein_positions_filtering_listing.find(".selector_clear_user_selection_modifications_protein_positions");
			if ( $selector_clear_user_selection_modifications_protein_positions.length === 0 ) {
				throw Error("Failed to find DOM element with class 'selector_clear_user_selection_modifications_protein_positions'");
			}

			const objectThis = this;

			$selector_clear_user_selection_modifications_protein_positions.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._clearUserSelection_modificationPeptideSearchStringsAndProteinPositions();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});	
		}
	}

	/**
	 * Get User Selected Protein Positions
	 */
	_userSelectionDisplay_GetProteinPositionsFormatted() {

		const selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( ( ! selectedProteinSequencePositions ) || selectedProteinSequencePositions.size === 0 ) {
			//  Noting selected
			return undefined; // EARLY EXIT
		}
	
		const selectedProteinSequencePositionsArray = Array.from( selectedProteinSequencePositions );

		selectedProteinSequencePositionsArray.sort( function( a, b ) {
			//  Sort Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});

		//  Create position list using toString()
		const selectedProteinSequencePositionsFormattedArray = [];
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositionsArray ) {
			const selectedProteinSequencePositionFormatted = selectedProteinSequencePosition.toString();
			selectedProteinSequencePositionsFormattedArray.push( selectedProteinSequencePositionFormatted );
		}

		return this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : selectedProteinSequencePositionsFormattedArray });
	}

	/**
	 * Get User Selected Modifications Formatted
	 */
	_userSelectionDisplay_GetModificationsFormatted() {

		//  Variable and Static Modifications Selected

		const noModificationSelected = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoVariableModificationSelected();
		let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
		if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
			variableModificationMassesToFilterOn = undefined;
		}
		let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
		if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
			staticModificationMassesToFilterOn = undefined;
		}

		if ( ! noModificationSelected && ( ! variableModificationMassesToFilterOn ) && ( ! staticModificationMassesToFilterOn  ) ) {
			//  Noting selected
			return undefined; // EARLY EXIT
		}

		const result = {};

		if ( noModificationSelected ) {
			result.noModificationSelected = true;
		}

		const modsFilteringOnForDisplayArray = [];

		if ( variableModificationMassesToFilterOn ) {
			//  Have Variable Mod Mass selected so add to display array
			this._userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
		}
		if ( staticModificationMassesToFilterOn ) {
			//  Have Static Mod Mass selected so add to display array
			this._userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray });
		}

		if ( modsFilteringOnForDisplayArray.length !== 0 ) {
			result.modificationMassesVariableStatic = this._userSelectionDisplay_CombineArrayIntoFormattedString({ array : modsFilteringOnForDisplayArray });
		}

		return result;
	}

	/**
	 * Add User Selected Variable Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Variable_ModificationsFormatted({ variableModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		const modificationsSelectedArray = Array.from( variableModificationMassesToFilterOn );

		if ( modificationsSelectedArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedArray[ 0 ].toString(); 
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
		}

		// Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

		modificationsSelectedArray.sort( function( a, b ) {
			//  Sort Ascending
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});

		//  Add to list using toString()
		for ( const modification of modificationsSelectedArray ) {
			const modificationFormatted = modification.toString();
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * Add User Selected Static Modifications Formatted to array
	 */
	_userSelectionDisplay_Add_Static_ModificationsFormatted({ staticModificationMassesToFilterOn, modsFilteringOnForDisplayArray }) {

		//  staticModificationMassesToFilterOn is Map<String (Residue), Set< Number ( Mod Mass ) >>

		const modificationsSelectedEntriesArray = [];

		for ( const entry of staticModificationMassesToFilterOn.entries() ) {

			const residue = entry[ 0 ];
			const modMasses = entry[ 1 ];

			for ( const modMass of modMasses ) {
				const modificationSelectedEntry = { residue : residue, modMass : modMass };
				modificationsSelectedEntriesArray.push( modificationSelectedEntry );
			} 
		}

		if ( modificationsSelectedEntriesArray.length === 1 ) {
			//  Single selected modification so put in string
			const modificationFormatted = modificationsSelectedEntriesArray[ 0 ].modMass.toString() + " (" + modificationsSelectedEntriesArray[ 0 ].residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
			return; // EARLY RETURN
		}

		// Multiple selected modifications so sort, and put in comma delim string with ' or ' before last entry

		modificationsSelectedEntriesArray.sort( function( a, b ) {
			//  Sort Ascending on Mod Mass then Residue
			if ( a.modMass < b.modMass ) {
				return -1;
			}
			if ( a.modMass > b.modMass ) {
				return 1;
			}
			if ( a.residue < b.residue ) {
				return -1;
			}
			if ( a.residue > b.residue ) {
				return 1;
			}
			return 0;
		});

		//  Add to list using toString()
		for ( const modification of modificationsSelectedEntriesArray ) {
			const modificationFormatted = modification.modMass.toString() + " (" + modification.residue + ")";
			modsFilteringOnForDisplayArray.push( modificationFormatted );
		}
	}

	/**
	 * put in comma delim string with ' or ' before last entry
	 */
	_userSelectionDisplay_CombineArrayIntoFormattedString({ array }) {

		const numEntries = array.length;

		if ( numEntries === 1 ) {
			//  Single Element so return
			return array[ 0 ]; // EARLY RETURN
		}

		//  > 1 entry so format with Comma Delim except before last entry.  Put ' or ' before last entry

		const lastEntryIndex = numEntries - 1;
		const allEntriesButLast = array.slice( 0, lastEntryIndex );

		let allEntriesButLastCommaDelim = allEntriesButLast.join(", ");
		
		const result = allEntriesButLastCommaDelim + " or " + array[ lastEntryIndex ];
		return result;
	}

	///////////////////////////////////////////

	//  Handle Updates to User selection of Modifications, Peptide Sequence Search Strings and Protein Positions

	//   Click Handler for Clear All selections

	/**
	 * 
	 */
	_clearUserSelection_modificationPeptideSearchStringsAndProteinPositions() {

		this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.clear_selectedModifications();
		this._proteinSequenceFormattedDisplay_Main_displayWidget.clear_selectedProteinSequencePositions();
		this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.clearPeptideSearchStrings()

		this._handleSelectedModificationsChange();
		this._handleSelectedPeptideSequenceChange();
		this._handleSelectedProteinPositionsChange();
		this._updatePageForSelectionModificationPeptideSequenceProteinPositionChangeChange();
	}

	//  Callbacks for Updates to User selection of Modifications, Peptide Sequence Filter and Protein Positions

	/**
	 * 
	 */
	_callbackMethodForSelectedModificationsChange() {

		this._handleSelectedModificationsChange();
		this._updatePageForSelectionModificationPeptideSequenceProteinPositionChangeChange();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedPeptideSequenceChange() {

		this._handleSelectedPeptideSequenceChange();
		this._updatePageForSelectionModificationPeptideSequenceProteinPositionChangeChange();
	}

	/**
	 * 
	 */
	_callbackMethodForSelectedProteinSequenceChange( params ) {

		let newSelection = undefined;
		if ( params ) {
			newSelection = params.newSelection;
		}

		this._handleSelectedProteinPositionsChange();
		this._updatePageForSelectionModificationPeptideSequenceProteinPositionChangeChange();
	}

	//  Handling Specific Changes by updating the URL


	/**
	 * 
	 */
	_handleSelectedModificationsChange() {

		const modsSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
	}

	/**
	 * 
	 */
	_handleSelectedPeptideSequenceChange() {

		const peptideSequenceSelectedEncodedStateData = this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
	}

	/**
	 * 
	 */
	_handleSelectedProteinPositionsChange() {

		const widgetEncodedStateData = this._proteinSequenceFormattedDisplay_Main_displayWidget.getEncodedStateData();
		this._singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );
	}

	//  Updating Page for Altered Selection Change: 

	/**
	 * 
	 */
	_updatePageForSelectionModificationPeptideSequenceProteinPositionChangeChange() {


		const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = this._getReportedPeptideIdsForDisplay();

		// reportedPeptides_Filtered_Array,
		// peptideSearchStrings_AnyEntered,
		// peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
		// proteinPositions_CoveredBy_PeptideSearchStrings

		const proteinPositions_CoveredBy_PeptideSearchStrings = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.proteinPositions_CoveredBy_PeptideSearchStrings;

		
		const $protein_peptide_sequence_selection_not_found = $("#protein_peptide_sequence_selection_not_found");
		if ( $protein_peptide_sequence_selection_not_found.length === 0 ) {
			throw Error("No DOM element with id 'protein_peptide_sequence_selection_not_found' ");
		}
		if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.peptideSearchStrings_AnyEntered ) {
			if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence ) {
				$protein_peptide_sequence_selection_not_found.hide();
			} else {
				$protein_peptide_sequence_selection_not_found.show();
			}
		} else {
			$protein_peptide_sequence_selection_not_found.hide();
		}
		
		const reportedPeptideIdsForDisplay = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;

		{
			let variableModificationSelectionUnmodifiedSelected = undefined;
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoVariableModificationSelected() ) {
				variableModificationSelectionUnmodifiedSelected = true;
			}
			let variableModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getVariableModificationsSelected_ExcludingNoModificationOption();
			if ( variableModificationMassesToFilterOn && variableModificationMassesToFilterOn.size === 0 ) {
				variableModificationMassesToFilterOn = undefined;
			}
			let staticModificationMassesToFilterOn = this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.getStaticModificationsSelected();
			if ( staticModificationMassesToFilterOn && staticModificationMassesToFilterOn.size === 0 ) {
				staticModificationMassesToFilterOn = undefined;
			}

			//  Update Protein Sequence Display Widget with mods to display
			this._proteinSequenceFormattedDisplay_Main_displayWidget.update_modificationMassesToFilterOn( { variableModificationSelectionUnmodifiedSelected, variableModificationMassesToFilterOn, staticModificationMassesToFilterOn } );

			let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
			if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
				selectedProteinSequencePositions = undefined;
			}
			if ( this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyVariableModificationSelected() || 
					this._proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyStaticModificationSelected() || 
					this._proteinViewPage_DisplayData_SingleProtein_PeptideSequenceSelect.getPeptideSearchStrings() ||
					selectedProteinSequencePositions ) { 
				//  Update Sequence coverge for peptides for this protein applying Mod mass or Protein Position filters
				const widget_SequenceCoverageParam = this._get_widget_SequenceCoverageParam_Object_UsingCurrentModsAndProteinPositions({ reportedPeptideIdsForDisplay });
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : widget_SequenceCoverageParam });
			} else {
				//  No selections so clear widget_SequenceCoverageParam_Selected_Peptides
				this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_SequenceCoverageParam_Selected_Peptides({ widget_SequenceCoverageParam_Selected_Peptides : undefined });
			}

			this._proteinSequenceFormattedDisplay_Main_displayWidget.update_widget_proteinPositions_CoveredBy_PeptideSearchStrings({ widget_proteinPositions_CoveredBy_PeptideSearchStrings : proteinPositions_CoveredBy_PeptideSearchStrings })
		}

		this._updateUserModificationProteinPositionSelectionDisplay();

		this._createOrReplaceReportedPeptideList({ reportedPeptideIdsForDisplay });
	}

	///////////////////////////////////////////

	/**
	 * 
	 */
	_createOrReplaceReportedPeptideList({ reportedPeptideIdsForDisplay }) {

		const $contentDiv = $(this._contentDivHTMLElement);

		const $reported_peptides_outer_container = $contentDiv.find(".selector_reported_peptides_outer_container");
		if ( $reported_peptides_outer_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'reported_peptides_outer_container'");
		}

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createOrUpdateReportedPeptideDisplayData({
				reportedPeptideIdsForDisplay,
				proteinSequenceVersionId : this._proteinSequenceVersionId,
				projectSearchId : this._projectSearchId,
				$reported_peptides_outer_container });
		
		this._showDownloadsBlock_attachClickHandlersIfNeeded( { $contentDiv } );
	}

	/**
	 * 
	 */
	_createModalOverlayContentDiv( { proteinNameDescription, proteinSummaryStatistics, linksToExternalResources } ) {

		const summaryStatisticsDisplay = {
				sequenceCoverageAsPercent : proteinSummaryStatistics.sequenceCoverageAsPercent,
				peptideCountDisplay : proteinSummaryStatistics.peptideCount.toLocaleString(),
				uniquePeptideCountDisplay : proteinSummaryStatistics.uniquePeptideCount.toLocaleString(),
				psmCountDisplay : proteinSummaryStatistics.psmCount.toLocaleString(),
		}

		let contentDivHTML = 
			this._protein_page_single_protein_display_in_overlay_template_Template({
				proteinData : proteinNameDescription,
				summaryStatistics : summaryStatisticsDisplay,
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
		
		const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = this._getReportedPeptideIdsForDisplay({ not_filtered_position_modification_selections : true });

		// reportedPeptides_Filtered_Array,
		// peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
		// proteinPositions_CoveredBy_PeptideSearchStrings

		const reportedPeptideIdsForDisplay = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;
		
		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchId : this._projectSearchId
					});

        StringDownloadUtils.downloadStringAsFile( 
        		{ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' } );
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( { clickThis, eventObject } ) {
		const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = this._getReportedPeptideIdsForDisplay();

		// reportedPeptides_Filtered_Array,
		// peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
		// proteinPositions_CoveredBy_PeptideSearchStrings

		const reportedPeptideIdsForDisplay = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;
		
		const reportedPeptideDisplayDownloadDataAsString =
			this._proteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList.createReportedPeptideDisplayDownloadDataAsString(
					{
						reportedPeptideIdsForDisplay,
						proteinSequenceVersionId : this._proteinSequenceVersionId,
						projectSearchId : this._projectSearchId
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

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds ) {
			throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " + proteinSequenceVersionId 
					+ ", projectSearchId: " + this._projectSearchId );
		}

		this._downloadPsms( { reportedPeptideIds } );
	}

	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
	_downloadPsmsClickHandler_Shown( { clickThis, eventObject } ) {

		const getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result = this._getReportedPeptideIdsForDisplay();

		// reportedPeptides_Filtered_Array,
		// peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
		// proteinPositions_CoveredBy_PeptideSearchStrings

		const reportedPeptideIds = getReportedPeptideIdsForDisplay_SingleProjectSearchId_Result.reportedPeptides_Filtered_Array;
		
		this._downloadPsms( { reportedPeptideIds } );
	}
	
	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { reportedPeptideIds } ) {
		
		const reportedPeptideIdsPerProjectSearchId = {}
		
		reportedPeptideIdsPerProjectSearchId[ this._projectSearchId ] = reportedPeptideIds;

		const searchDataLookupParamsRoot = 
			this._searchDetailsBlockDataMgmtProcessing.
			getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

		downloadPsmsFor_projectSearchIds_FilterCriteria_RepPeptProtSeqVIds( { 
			projectSearchIds : [ this._projectSearchId ],
			searchDataLookupParamsRoot : searchDataLookupParamsRoot,
			reportedPeptideIdsPerProjectSearchId : reportedPeptideIdsPerProjectSearchId } );
	}
	
	
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	
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

		//  Remove resize handler
		const $window = $(window);
		$window.off("resize");

		if ( this._singleProteinCloseCallback ) {
			this._singleProteinCloseCallback();
		}
	}

	//////////////
	
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
	 * called by contained object of class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList
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
	 * called by contained object of class ProteinViewPage_DisplayData_SingleProtein_SingleSearch_ReportedPeptideList
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


		if (!this._contentDivHTMLElement) {
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
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections of protein positions and/or modification masses
	 * 
	 */
	_getReportedPeptideIdsForDisplay( params ) {

		let not_filtered_position_modification_selections = undefined;
		if ( params ) {
			not_filtered_position_modification_selections = params.not_filtered_position_modification_selections;
		}
		
		return this._protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.getReportedPeptideIdsForDisplay_SingleProjectSearchId( { 
			not_filtered_position_modification_selections, 
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
			projectSearchId : this._projectSearchId } );
	}

	////////////////////////////////////////////
		
	/**
	 * Get Protein Sequence Coverage for the Reported Peptide Ids for Display.  
	 * 
	 * @returns proteinCoverageArrayOfBoolean
	 *       proteinCoverageArrayOfBoolean : Array (position is '1' based) of boolean with true for is sequence coverage 
	 */
	_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay({ reportedPeptideIds, proteinSequenceVersionId, projectSearchId } ) {

		const proteinCoverageArrayOfBoolean = []; // function result

		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  User Selection of Positions in Protein Sequence

		let selectedProteinSequencePositions = this._proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			throw Error("_get_ProteinSequenceCoverageArrayOfBoolean_Matching_ReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId );
		}

		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		for ( const proteinCoverageEntries_PerReportedPeptideId_entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

			for ( const reportedPeptideId of reportedPeptideIds ) {
				if ( proteinCoverageEntries_PerReportedPeptideId_entry.reportedPeptideId === reportedPeptideId ) {

					if ( selectedProteinSequencePositions ) {
						//  Have User Selection of Positions in Protein Sequence
						let foundPositionWithinCoverageEntryInUserSelectedPositions = false;
						for ( let position = proteinCoverageEntries_PerReportedPeptideId_entry.proteinStartPosition ; position <= proteinCoverageEntries_PerReportedPeptideId_entry.proteinEndPosition ; position++  ) {
							foundPositionWithinCoverageEntryInUserSelectedPositions = true;
							break;
						}
						if ( ! foundPositionWithinCoverageEntryInUserSelectedPositions ) {
							//  This Coverage entry is not within any of the User selected positions so exclude
							//  (this would be the case when a peptide is on the protein >1 times and this specific coverage entry does not contain a user selected position)
							continue;  // EARLY CONTINUE
						}
					}

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
