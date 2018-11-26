/**
 * proteinViewPage_DisplayData_SingleProtein_ReportedPeptideList.js
 * 
 * Javascript for proteinView.jsp page - Single Protein Overlay - Show Reported Peptide List
 * 
 * Companion file to proteinViewPage_DisplayData_SingleSearch.js
 * 
 * 
 * 
 */

const Handlebars = require('handlebars/runtime');

//  for DataTable
const _common_template_bundle =
	require("../../../../../../handlebars_templates_precompiled/common/common_template-bundle.js" );

const _protein_table_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/protein_page/protein_page_single_search_template-bundle.js" );

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { TableDisplayHandler } from 'page_js/data_pages/data_tables/tableDisplayHandler.js';

import { PSMListingUtilsSingleSearch } from 'page_js/data_pages/data_tables/psmListingUtilsSingleSearch.js';

/**
 * 
 */
export class ProteinViewPage_DisplayData_SingleProtein_ReportedPeptideList {

	/**
	 * 
	 */
	constructor( 
			{ containing_ProteinViewPage_Display_SingleProtein_SingleSearch,
				loadedDataCommonHolder, loadedDataPerProjectSearchIdHolder, annotationTypeData_ReturnSpecifiedTypes,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server, 
				searchDetailsBlockDataMgmtProcessing
			}) {
		
		this._containing_ProteinViewPage_Display_SingleProtein_SingleSearch = containing_ProteinViewPage_Display_SingleProtein_SingleSearch;
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder;
		this._annotationTypeData_ReturnSpecifiedTypes = annotationTypeData_ReturnSpecifiedTypes;
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		
		// From common template:

		if ( ! _common_template_bundle.dataTable ) {
			throw Error("Nothing in _common_template_bundle.dataTable");
		}
		this._common_template_dataTable_Template = _common_template_bundle.dataTable;
		
		// From Protein template:
		
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template");
		}
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template");
		}
		if ( ! _protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template");
		}
		
		this._protein_page_single_protein_reported_peptide_table_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_table_template;
		this._protein_page_single_protein_reported_peptide_entry_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_entry_template;
		this._protein_page_single_protein_reported_peptide_child_row_template_Template = 
			_protein_table_template_bundle.protein_page_single_protein_reported_peptide_child_row_template;
	}


	/**
	 * 
	 */
	createOrUpdateReportedPeptideDisplayData( { 
		proteinSequenceFormattedDisplay_Main_displayWidget, 
		proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, 
		proteinSequenceVersionId, projectSearchId, $reported_peptides_outer_container } ) {

		const filteredOn_selectedProteinSequencePositions = this._is_filteredOn_selectedProteinSequencePositions( proteinSequenceFormattedDisplay_Main_displayWidget );

		const reportedPeptideIdsForDisplay =
			this.getReportedPeptideIdsForDisplay( { proteinSequenceFormattedDisplay_Main_displayWidget, proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, proteinSequenceVersionId, projectSearchId } );

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId } );
		reportedPeptideDisplayData.filteredOn_selectedProteinSequencePositions = filteredOn_selectedProteinSequencePositions;

		this._createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, projectSearchId } );
	}


	/**
	 * Create Reported Peptide Data as String, for Download
	 * 
	 * @param proteinSequenceFormattedDisplay_Main_displayWidget - ONLY populated when filtering on selection in that object
	 */
	createReportedPeptideDisplayDownloadDataAsString( { proteinSequenceFormattedDisplay_Main_displayWidget, proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, proteinSequenceVersionId, projectSearchId } ) {

		const filteredOn_selectedProteinSequencePositions = this._is_filteredOn_selectedProteinSequencePositions( proteinSequenceFormattedDisplay_Main_displayWidget );

		const reportedPeptideIdsForDisplay = 
			this.getReportedPeptideIdsForDisplay( { proteinSequenceFormattedDisplay_Main_displayWidget, proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, proteinSequenceVersionId, projectSearchId } );

		const reportedPeptideDisplayData = this._createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId } );

		reportedPeptideDisplayData.filteredOn_selectedProteinSequencePositions = filteredOn_selectedProteinSequencePositions;

		const peptideList = reportedPeptideDisplayData.peptideList;
		const annotationTypeRecords_DisplayOrder = reportedPeptideDisplayData.annotationTypeRecords_DisplayOrder;

		const psmAnnotationTypes = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
		const reportedPeptideAnnotationTypes = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;;

		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [ 'Sequence', 'PSM Count' ]
			
			for ( let annotation of reportedPeptideAnnotationTypes ) {
				reportLineParts.push( annotation.name );
			}
			for ( let annotation of psmAnnotationTypes ) {
				reportLineParts.push( 'Best PSM: ' + annotation.name );
			}
			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines
		for ( const peptideItem of peptideList ) {
		
			const reportLineParts = [
				
				peptideItem.reportedPeptideSequence,
				peptideItem.numPsms,
			];

			if ( reportedPeptideAnnotationTypes ) {
				for ( let annotation of reportedPeptideAnnotationTypes ) {

					//  peptideAnnotationMap and psmAnnotationMap are Object with ann type id as property names

					const annData = peptideItem.peptideAnnotationMap[ annotation.annotationTypeId ];
					if ( ! annData ) {
						throw Error("No Ann Data for Ann Type Id: " + annotation.annotationTypeId );
					}
					reportLineParts.push( annData.valueString );
				}
			}
			if ( psmAnnotationTypes ) {
				for ( let annotation of psmAnnotationTypes ) {

					const annData = peptideItem.psmAnnotationMap[ annotation.annotationTypeId ];
					if ( ! annData ) {
						throw Error("No Ann Data for Ann Type Id: " + annotation.annotationTypeId );
					}
					reportLineParts.push( annData.valueString );
				}
			}
			
			reportLineParts_AllLines.push( reportLineParts );
		}
		
		//  Join all line parts into strings, delimit on '\t'
		
		const reportLine_AllLines = [];
		
		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for ( const reportLineParts of reportLineParts_AllLines ) {
			
			reportLineParts_AllLinesIndex++;
			
			let reportLine = reportLineParts.join( "\t" );
			if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push( reportLine );
		}
7		
		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

	/**
	 * Is filtering on Protein Sequence Positions
	 * 
	 * @param proteinSequenceFormattedDisplay_Main_displayWidget 
	 */
	_is_filteredOn_selectedProteinSequencePositions( proteinSequenceFormattedDisplay_Main_displayWidget ) {

		if ( proteinSequenceFormattedDisplay_Main_displayWidget ) {
			
			//  Only filter if proteinSequenceFormattedDisplay_Main_displayWidget is passed in
			
			const selectedProteinSequencePositionsLocal = proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

			if ( selectedProteinSequencePositionsLocal && selectedProteinSequencePositionsLocal.size !== 0 ) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param proteinSequenceFormattedDisplay_Main_displayWidget - ONLY populated when filtering on selection in that object
	 * @param proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect - ONLY populated when filtering on selection in that object
	 */
	getReportedPeptideIdsForDisplay( { proteinSequenceFormattedDisplay_Main_displayWidget, proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect, proteinSequenceVersionId, projectSearchId } ) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
		//  reportedPeptideIds for this proteinSequenceVersionId
		let reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! reportedPeptideIds ) {
			throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
		}

		let selectedProteinSequencePositions = undefined;

		if ( proteinSequenceFormattedDisplay_Main_displayWidget ) {
			
			//  Only filter if proteinSequenceFormattedDisplay_Main_displayWidget is passed in
			
			const selectedProteinSequencePositionsLocal = proteinSequenceFormattedDisplay_Main_displayWidget.get_selectedProteinSequencePositions();

			if ( selectedProteinSequencePositionsLocal && selectedProteinSequencePositionsLocal.size !== 0 ) {
				selectedProteinSequencePositions = selectedProteinSequencePositionsLocal;
			}
		}

		//  Used in filter on position if applicable
		let filterOnModMap_KeyPosition_SetReportedPeptideIds = undefined;

		if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect ) {

			//  Only filter if proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect is passed in

			if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isAnyModificationSelected() ) {

				//  Mod mass(es) selected so filter on them

				let reportedPeptideIdsSelection = undefined;

				if ( selectedProteinSequencePositions ) {
					filterOnModMap_KeyPosition_SetReportedPeptideIds = new Map();  // Build map for filter on position if filtering on position
				} else {
					reportedPeptideIdsSelection = new Set();  // Build set of filtered reportedPeptideIds if only filter on Mod Mass
				}

				const modificationsOnProtein_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId();
				const modificationsOnProtein = modificationsOnProtein_KeyProteinSequenceVersionId.get(proteinSequenceVersionId);
		
				if ( modificationsOnProtein ) {
					//  Have modifications for this protein so process them
					for ( const modificationOnProtein of modificationsOnProtein) {
						//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
						const position = modificationOnProtein.position;
						const mass = modificationOnProtein.mass;
						const reportedPeptideId = modificationOnProtein.reportedPeptideId;

						if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isModificationSelected( mass ) ) {
			
							if ( reportedPeptideIdsSelection ) {
								reportedPeptideIdsSelection.add( reportedPeptideId );
							} else if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
								if ( selectedProteinSequencePositions.has( position ) ) {
									//  for selection position
									let reportedPeptideIdsSet = filterOnModMap_KeyPosition_SetReportedPeptideIds.get(position);
									if ( ! reportedPeptideIdsSet ) {
										reportedPeptideIdsSet = new Set();
										filterOnModMap_KeyPosition_SetReportedPeptideIds.set(position,reportedPeptideIdsSet);
									}
									reportedPeptideIdsSet.add(reportedPeptideId);
								}
							} else {
								throw Error("Neither reportedPeptideIdsSelection nor filterOnModMap_KeyPosition_SetReportedPeptideIds is set. proteinSequenceVersionId: " + proteinSequenceVersionId );
							}
						}
					}
				}

				if ( proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect.isNoModificationSelected() ) {
					
					//  User selected to include no modifications in filter on modifications

					if ( ! selectedProteinSequencePositions ) {

						//  User has NOT selected ANY Protein Sequence Positions

						//  Process all reported peptide ids for protein 

						const reportedPeptideIdsKeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
						//  re-get here since variable reportedPeptideIds may have been replaced
						const reportedPeptideIds_All_ForNoModsSearch = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
						if ( ! reportedPeptideIds_All_ForNoModsSearch ) {
							throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
						}
				
						const modificationsOnReportedPeptide_KeyReportedPeptideId = this._loadedDataPerProjectSearchIdHolder.get_modificationsOnReportedPeptide_KeyReportedPeptideId();

						for ( const reportedPeptideId of reportedPeptideIds_All_ForNoModsSearch ) {
							const modificationsForReportedPeptide = modificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
							if ( ! modificationsForReportedPeptide ) {
								reportedPeptideIdsSelection.add(reportedPeptideId);
							}
						}

					} else {

						//  User has selected Protein Sequence Positions

						//  Sequence Coverage Data
						const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

						//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
						const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
						if ( ! proteinCoverageObject ) {
							throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId );
						}

						//  Create a Set of reported Peptide Ids which do not contain modifications at the selected protein positions
						const reportedPeptideIdsFilteredForModsAtSelectedPositions = new Set();

						for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
							const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
								
							for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
								reportedPeptideIdsFilteredForModsAtSelectedPositions.add( reportedPeptideIdAtPosition );
							}
						}

						//  Remove any reported peptide ids with modifications at any of the selected positions
						if ( modificationsOnProtein ) {
							//  Have modifications for this protein so process them
							for ( const modificationOnProtein of modificationsOnProtein) {
								//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
								const position = modificationOnProtein.position;
								const mass = modificationOnProtein.mass;
								const reportedPeptideId = modificationOnProtein.reportedPeptideId;

								if ( selectedProteinSequencePositions.has( position ) ) {
									//  'modificationOnProtein' is for one of the selected positions so remove the reportedPeptideId
									reportedPeptideIdsFilteredForModsAtSelectedPositions.delete( reportedPeptideId );
								}
							}
						}

						//  Create (Or Update) a set of reported peptide ids for each selected position

						for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
							const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
							for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {

								if ( reportedPeptideIdsFilteredForModsAtSelectedPositions.has( reportedPeptideIdAtPosition ) ) {
									//  Get existing filterOnModMap_... entry for position. Create if not exist
									let reportedPeptideIdsSet = filterOnModMap_KeyPosition_SetReportedPeptideIds.get(selectedProteinSequencePosition);
									if ( ! reportedPeptideIdsSet ) {
										reportedPeptideIdsSet = new Set();
										filterOnModMap_KeyPosition_SetReportedPeptideIds.set(selectedProteinSequencePosition,reportedPeptideIdsSet);
									}
									reportedPeptideIdsSet.add(reportedPeptideIdAtPosition);
								}
							}
						}

					}
				} //  End if isNoModificationSelected() is true

				if ( reportedPeptideIdsSelection ) {
					reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
				}
			}
		}
		
		if ( selectedProteinSequencePositions ) {
			//  Have User Selections of Protein Coverage on the Protein Sequences 
			//    so create reportedPeptideIds based on that selection

			const reportedPeptideIdsSelection = new Set();

			//  Sequence Coverage Data
			const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

			//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
			const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( ! proteinCoverageObject ) {
				throw Error("_addProteinSequenceToContentDiv(...): No proteinCoverageObject for proteinSequenceVersionId: " + proteinSequenceVersionId );
			}

			for ( const positionEntry of selectedProteinSequencePositions.entries() ) {
				//  positionEntry is a Map Entry format so it is Array [key,value]
				const positionValue = positionEntry[ 1 ];
				let reportedPeptideIdsAtPositionFilteredForMods = undefined;
				if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
					reportedPeptideIdsAtPositionFilteredForMods = filterOnModMap_KeyPosition_SetReportedPeptideIds.get( positionValue );
				}
				const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : positionValue } );
				for ( const reportedPeptideId of reportedPeptideIdsAtPosition ) {
					if ( filterOnModMap_KeyPosition_SetReportedPeptideIds ) {
						//  Filtering on Modification values
						if ( reportedPeptideIdsAtPositionFilteredForMods ) {
							// Have Reported Peptide ids filtered on Mods for this position
							if ( reportedPeptideIdsAtPositionFilteredForMods.has(reportedPeptideId) ) {
								// This reported peptide id found in filtering so add to output
								reportedPeptideIdsSelection.add( reportedPeptideId );
							}
						}
					} else {
						//  No filtering on Modifications so add to output
						reportedPeptideIdsSelection.add( reportedPeptideId );
					}
				}
			}
			reportedPeptideIds = Array.from( reportedPeptideIdsSelection );
		}

		return reportedPeptideIds;
	}
	
	/**
	 * Create Reported Peptide Data for Display or Download
	 * 
	 * proteinSequenceFormattedDisplay_Main_displayWidget only passed in when filtering on user selection of proteinSequence
	 * 
	 * proteinViewPage_DisplayData_SingleProtein_ModsDisplayAndSelect only passed in when filtering on user selection of modification masses
	 * 
	 * Reported Peptide List
	 * Number of Reported Peptides
	 * Number of PSMs total
	 */
	_createReportedPeptideDisplayData( { reportedPeptideIdsForDisplay, proteinSequenceVersionId, projectSearchId } ) {

		const peptideListResult = [];
		
		const loadedDataCommonHolder = this._loadedDataCommonHolder;
		const loadedDataPerProjectSearchIdHolder = this._loadedDataPerProjectSearchIdHolder;

		//  Various Maps, key Reported Peptide Id
		const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
//		const modificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsOnReportedPeptide_KeyReportedPeptideId();
		const reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
		const reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId();
		const psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId();
		
		//  reportedPeptideIds filtered if applicable so now create display peptide row objects

		for ( const reportedPeptideId of reportedPeptideIdsForDisplay ) {
		
			const peptideItem = { reportedPeptideId : reportedPeptideId };

			const reportedPeptideStringData =
				loadedDataCommonHolder.get_reportedPeptideStringData_For_reportedPeptideId( { reportedPeptideId } );
			if ( ! reportedPeptideStringData ) {
				throw Error("_createReportedPeptideDisplayData: No reportedPeptideStringData for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
			}
			peptideItem.reportedPeptideSequence = reportedPeptideStringData.getReportedPeptideString();

			const numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
			if ( ! numPsms ) {
				throw Error("_createReportedPeptideDisplayData: No numPsms for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
			}
			peptideItem.numPsms = numPsms;
			
//			const modificationsArray = modificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
//			if ( modificationsArray && modificationsArray.length !== 0 ) {
//				//  [{mass, position, reportedPeptideId}]
//				peptideItem.modMassList = modificationsArray;
//			}
			
			{
				//  Reported Peptide Ann Values
				
				//  Create Object from Map since that is expected in other code
				let peptideAnnotationData = undefined; // property name will be ann type id

				{ //  Reported Peptide Filterable Ann Data
					if ( reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
						const reportedPeptideFilterable_annData_KeyAnnTypeId = reportedPeptideFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
						if ( reportedPeptideFilterable_annData_KeyAnnTypeId ) {

							for ( const annDataEntry of reportedPeptideFilterable_annData_KeyAnnTypeId ) {
								const annTypeId = annDataEntry[ 0 ]; // key
								const annData = annDataEntry[ 1 ]; // value
								const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
								if ( ! peptideAnnotationData ) {
									peptideAnnotationData = {};
								}
								peptideAnnotationData[ annTypeId ] = annDataForDisplay;
							}
						}
					}
				}

				{ //  Reported Peptide Descriptive Ann Data
					if ( reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId ) {
						const reportedPeptideDescriptive_annData_KeyAnnTypeId = reportedPeptideDescriptive_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
						if ( reportedPeptideDescriptive_annData_KeyAnnTypeId ) {

							for ( const annDataEntry of reportedPeptideDescriptive_annData_KeyAnnTypeId ) {
								const annTypeId = annDataEntry[ 0 ]; // key
								const annData = annDataEntry[ 1 ]; // value
								const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
								if ( ! peptideAnnotationData ) {
									peptideAnnotationData = {};
								}
								peptideAnnotationData[ annTypeId ] = annDataForDisplay;
							}
						}
					}
				}
				peptideItem.peptideAnnotationMap = peptideAnnotationData;
			}

			{
				//  Best PSM Ann Values

				//  Create Object from Map since that is expected in other code
				const psmBestFilterable_annData_KeyAnnTypeId = psmBestFilterable_annData_KeyAnnTypeId_KeyReportedPeptideId.get( reportedPeptideId );
				if ( psmBestFilterable_annData_KeyAnnTypeId ) {

					const psmAnnotationData = {}; // property name will be ann type id
					for ( const annDataEntry of psmBestFilterable_annData_KeyAnnTypeId ) {
						const annTypeId = annDataEntry[ 0 ]; // key
						const annData = annDataEntry[ 1 ]; // value
						const annDataForDisplay =  { annotationTypeId : annTypeId, valueDouble : annData.valueDouble, valueString : annData.valueString };
						psmAnnotationData[ annTypeId ] = annDataForDisplay;
					}
					peptideItem.psmAnnotationMap = psmAnnotationData;
				}
			}
			
			peptideListResult.push( peptideItem )
		}

		/**
		 * Get array ann type entries, sorted on sortOrder
		 */
		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated =
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated( { projectSearchId } );

		//  Get AnnotationType records for Displaying Annotation data in display order in peptideList
		let annotationTypeRecords_DisplayOrder = this._getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList : peptideListResult } );

		// Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
		this._sortPeptideListOnSortOrder( { peptideList : peptideListResult, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } );
		
		const numberOfReportedPeptides = peptideListResult.length;
		
		let numberOfPsmsForReportedPeptides = 0;
		
		for ( const peptideItem of peptideListResult ) {
			numberOfPsmsForReportedPeptides += peptideItem.numPsms;
		}
		
		//  Add property filteredOn_selectedProteinSequencePositions in calling function
		return { peptideList : peptideListResult, numberOfReportedPeptides, numberOfPsmsForReportedPeptides, annotationTypeRecords_DisplayOrder };
	}

	/**
	 * Sort Peptides Array on Reported Peptide Ann Types Sort Order then Best PSM order then Reported Peptide Id
	 */
	_sortPeptideListOnSortOrder( { peptideList, reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated, annotationTypeRecords_DisplayOrder } ) {

		let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated.length;
		let psmAnnotationTypesForPeptideListEntriesLength = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries.length;

		peptideList.sort( function( a, b ) {

			//  Compare Reported Peptide Ann Values, if they are populated
			let a_peptideAnnotationMap = a.peptideAnnotationMap;
			let b_peptideAnnotationMap = b.peptideAnnotationMap;
			if ( a_peptideAnnotationMap && b_peptideAnnotationMap ) {

				for ( let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index = 0; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index < reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Length; reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index++ ) {
					let reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated[ reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Index ];
					let annotationTypeId = reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.annotationTypeId;
					let a_peptideAnnotationMap_ForAnnType = a_peptideAnnotationMap[ annotationTypeId ];
					let b_peptideAnnotationMap_ForAnnType = b_peptideAnnotationMap[ annotationTypeId ];

					if ( a_peptideAnnotationMap_ForAnnType && b_peptideAnnotationMap_ForAnnType ) {
						if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionBelow ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( reportedPeptide_AnnotationTypeRecords_WhereSortOrderPopulated_Entry.filterDirectionAbove ) {
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble > b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_peptideAnnotationMap_ForAnnType.valueDouble < b_peptideAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}

			//  All Reported Peptide Type Values match or no Reported Peptide Type values exist so compare Best PSM Ann Type Values match
			let a_psmAnnotationMap = a.psmAnnotationMap;
			let b_psmAnnotationMap = b.psmAnnotationMap;
			if ( a_psmAnnotationMap && b_psmAnnotationMap ) {

				for ( let psmAnnotationTypesForPeptideListEntriesLength_Index = 0; psmAnnotationTypesForPeptideListEntriesLength_Index < psmAnnotationTypesForPeptideListEntriesLength; psmAnnotationTypesForPeptideListEntriesLength_Index++ ) {
					let psmAnnotationTypesForPeptideListEntries_Entry = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries[ psmAnnotationTypesForPeptideListEntriesLength_Index ];
					let annotationTypeId = psmAnnotationTypesForPeptideListEntries_Entry.annotationTypeId;
					let a_psmAnnotationMap_ForAnnType = a_psmAnnotationMap[ annotationTypeId ];
					let b_psmAnnotationMap_ForAnnType = b_psmAnnotationMap[ annotationTypeId ];

					if ( a_psmAnnotationMap_ForAnnType && b_psmAnnotationMap_ForAnnType ) {
						if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionBelow ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else if ( psmAnnotationTypesForPeptideListEntries_Entry.filterDirectionAbove ) {
							if ( a_psmAnnotationMap_ForAnnType.valueDouble > b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return -1;
							}
							if ( a_psmAnnotationMap_ForAnnType.valueDouble < b_psmAnnotationMap_ForAnnType.valueDouble ) {
								return 1;
							}
							//  Values match so go to next ann type values
						} else {
							throw Error( "filterDirectionBelow, filterDirectionAbove: Neither is true. annotationTypeId: " + annotationTypeId );
						}
					}
				}
			}

			//  All Reported Peptide and PSM Ann Type Values match so order on reported peptide id
			if ( a.reportedPeptideId < b.reportedPeptideId ) {
				return -1;
			}
			if ( a.reportedPeptideId > b.reportedPeptideId ) {
				return 1;
			}
			return 0;

		});
	}
	

	/**
	 * Return Both Reported Peptide and PSM Annotation Type Records in Display Order
	 */
	_getAnnotationTypeRecords_DisplayOrder( { projectSearchId, peptideList } ) {

		//   Get all annotation type ids returned in all entries and produce a list of them to put in columns

		let resultObject = {};
		
		//  First get all Unique Reported Peptide and PSM Annotation Type Ids in the Peptide List
		
		let uniquePSMAnnotationTypeIds_InPeptideList = new Set();
		let uniqueReportedPeptideAnnotationTypeIds_InPeptideList = new Set();
//		let uniqueMatchedProteinAnnotationTypeIds_InPeptideList = new Set; // Not populated yet

		peptideList.forEach( function( peptideListItem, index, array ) {
			let psmAnnotationMap = peptideListItem.psmAnnotationMap;
			if ( psmAnnotationMap ) {
				Object.keys ( psmAnnotationMap ).forEach( function( psmAnnotationMapKeyItem, index, array ) {
					let psmAnnotationDTOItem = psmAnnotationMap[ psmAnnotationMapKeyItem ];
					uniquePSMAnnotationTypeIds_InPeptideList.add( psmAnnotationDTOItem.annotationTypeId );
				}, this );
			}
			let peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
			if ( peptideAnnotationMap ) {
				Object.keys ( peptideAnnotationMap ).forEach( function( peptideAnnotationMapKeyItem, index, array ) {
					let peptideAnnotationDTOItem = peptideAnnotationMap[ peptideAnnotationMapKeyItem ];
					uniqueReportedPeptideAnnotationTypeIds_InPeptideList.add( peptideAnnotationDTOItem.annotationTypeId );
				}, this );
			}
		}, this );
		
		//  Get AnnotationType records for found AnnotationTypeIds to Get AnnotationType Names
		
		let psmAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_Psm_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniquePSMAnnotationTypeIds_InPeptideList } );
		let reportedPeptideAnnotationTypesForPeptideListEntries = 
			this._annotationTypeData_ReturnSpecifiedTypes.get_ReportedPeptide_AnnotationTypeRecords_InDisplayOrder( { 
				projectSearchId, uniqueAnnotationTypeIds : uniqueReportedPeptideAnnotationTypeIds_InPeptideList } );

		return {
			psmAnnotationTypesForPeptideListEntries : psmAnnotationTypesForPeptideListEntries,
			reportedPeptideAnnotationTypesForPeptideListEntries : reportedPeptideAnnotationTypesForPeptideListEntries
		};
	};

	
	///////////////////////////////////////////
	
	///   Display
	
	/////////////////////////
	
	/**
	 * Create and Populate the Reported Peptides Data Table
	 * 
	 * peptideList is generated in JS code in this class
	 * 
	 * Could re-write to accept Annotation Data in Maps instead of Objects and change the code that generates peptideList
	 */
	_createAndPopulate_ReportedPeptidesDataTable( { $reported_peptides_outer_container, reportedPeptideDisplayData, projectSearchId } ) {
		
		const objectThis = this;
		
		const peptideList = reportedPeptideDisplayData.peptideList;
		const annotationTypeRecords_DisplayOrder = reportedPeptideDisplayData.annotationTypeRecords_DisplayOrder;

		{
			//  Update display of data outside of actual table
			const numberOfReportedPeptides = reportedPeptideDisplayData.numberOfReportedPeptides;
			const numberOfPsmsForReportedPeptides = reportedPeptideDisplayData.numberOfPsmsForReportedPeptides;
			const filteredOn_selectedProteinSequencePositions = reportedPeptideDisplayData.filteredOn_selectedProteinSequencePositions;

			const numberOfReportedPeptidesFormatted = numberOfReportedPeptides.toLocaleString();
			const numberOfPsmsForReportedPeptidesFormatted = numberOfPsmsForReportedPeptides.toLocaleString();

			let $selector_number_of_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_reported_peptides_shown");
			let $selector_number_of_psms_for_reported_peptides_shown = $reported_peptides_outer_container.find(".selector_number_of_psms_for_reported_peptides_shown");

			$selector_number_of_reported_peptides_shown.text( numberOfReportedPeptidesFormatted );
			$selector_number_of_psms_for_reported_peptides_shown.text( numberOfPsmsForReportedPeptidesFormatted );

			const $selector_reported_peptides_filtered_on_protein_sequence_positions = $reported_peptides_outer_container.find(".selector_reported_peptides_filtered_on_protein_sequence_positions");
			if ( filteredOn_selectedProteinSequencePositions ) {
				$selector_reported_peptides_filtered_on_protein_sequence_positions.show();
			} else {
				$selector_reported_peptides_filtered_on_protein_sequence_positions.hide();
			}
		}

		//  Container element
		let $selector_reported_peptides_data_table_container = $reported_peptides_outer_container.find(".selector_reported_peptides_data_table_container");
		$selector_reported_peptides_data_table_container.empty();
		
		//   Peptide List of objects with properties for Data Table
		const peptideList_ForDataTable = this._createPeptideList_ForDataTable( { peptideList, annotationTypeRecords_DisplayOrder } );
		
		const $selector_reported_peptides_none_to_display = $reported_peptides_outer_container.find(".selector_reported_peptides_none_to_display");
		$selector_reported_peptides_none_to_display.hide();
		
		if ( peptideList_ForDataTable.length === 0 ) {
			
			//  No Reported Peptides for filters so display msg and exit
			
			$selector_reported_peptides_none_to_display.show();
						
			return;  //  EARLY EXIT
		}
		
		//  Create Data Table and insert on page

		const tableDisplayHandler = new TableDisplayHandler();

		// the columns for the data being shown on the page
		const columns = this._getReportedPeptideDataTableColumns( 
				{ psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries,
					reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries });

		// the data we're showing on the page
		const tableObjects = peptideList_ForDataTable;
		tableDisplayHandler.addGraphWidths( { dataObjects : tableObjects, columns } );

		// add the table to the page

		const tableObject = { };
		tableObject.columns = columns;
		tableObject.dataObjects = tableObjects;
		tableObject.expandableRows = true;

		const dataTableContainer_HTML = this._common_template_dataTable_Template( { tableObject } );
		const $tableContainerDiv = $( dataTableContainer_HTML );
		$selector_reported_peptides_data_table_container.append( $tableContainerDiv );

		// add in the click handlers for sorting the table
		tableDisplayHandler.addSortHandlerToHeader( $tableContainerDiv );

		// add in the click and over handlers for the rows
		{
			const functionParams = { };
			functionParams.projectSearchId = projectSearchId;
			functionParams.searchDetailsBlockDataMgmtProcessing = this._searchDetailsBlockDataMgmtProcessing;
			functionParams.dataPageStateManager_DataFrom_Server = this._dataPageStateManager_DataFrom_Server;

			tableDisplayHandler.addExpansionHandlerToRows( 
					{ $tableContainerDiv, getElementToInsertFunction : PSMListingUtilsSingleSearch.createJQueryElementForPSMListing, functionParams } );
		}

		tableDisplayHandler.addHoverHandlerToRows( { $tableContainerDiv } );
		
		{
			//  Adjust overlay width to fit reported peptide list
			
			let $selector_data_table_container = $tableContainerDiv;
			if ( ! $selector_data_table_container.hasClass( "selector_data_table_container" ) ) {

				let $selector_data_table_container = $tableContainerDiv.find(".selector_data_table_container");
			}
			if ( $selector_data_table_container.length === 0 ) {
				throw Error( '$tableContainerDiv not have class "selector_data_table_container" and $tableContainerDiv.find(".selector_data_table_container") found no elements' );
			}
			
			const data_table_container_Width = $selector_data_table_container.outerWidth();
			
			this._containing_ProteinViewPage_Display_SingleProtein_SingleSearch
			.resize_OverlayWidth_BasedOnReportedPeptidesWidth( { reportedPeptidesWidth : data_table_container_Width });
		}
	}



	/**
	 * Create object 
	 */
	_createPeptideList_ForDataTable( { peptideList, annotationTypeRecords_DisplayOrder } ) {

		const peptideList_ForDataTable = [];
		
		for ( const peptideListItem of peptideList ) {
			
			peptideList_ForDataTable.push( this._createPeptideItem_DataTableEntry( { peptideListItem, annotationTypeRecords_DisplayOrder } ) );
		}
		return peptideList_ForDataTable;
	}

	/**
	 * Create object 
	 */
	_createPeptideItem_DataTableEntry( { peptideListItem, annotationTypeRecords_DisplayOrder } ) {

		const context = 
		{ uniqueId : peptideListItem.reportedPeptideId, // Set for Data Table to identify the entry in the table
				reportedPeptideId : peptideListItem.reportedPeptideId,
				reportedPeptideSequence : peptideListItem.reportedPeptideSequence,
				numPsms : peptideListItem.numPsms,
				numUniquePsms : peptideListItem.numUniquePsms
		};

		if ( peptideListItem.numPsms === undefined || peptideListItem.numPsms === null ) {
			context.numPsmsNotSet = true;
		};
		if ( peptideListItem.numUniquePsms === undefined || peptideListItem.numUniquePsms === null ) {
			context.numUniquePsmsNotSet = true;
		};

//		const modMassList = peptideListItem.modMassList;
//		if ( modMassList && modMassList.length !== 0 ) {
//			modMassList.sort( function( a, b ) {
//				if ( a.position < b.position ) {
//					return -1;
//				}
//				if ( a.position > b.position ) {
//					return 1;
//				}
//				if ( a.mass < b.mass ) {
//					return -1;
//				}
//				if ( a.mass > b.mass ) {
//					return 1;
//				}
//				return 0;
//			} );
//			
//			const modMassesArray = [];
//			//  formatted Mods
//			for ( const modMassEntry of modMassList ) {
//				modMassesArray.push( modMassEntry.position + ":" + modMassEntry.mass );
//			}
//			const modMassesString = modMassesArray.join( ", " );
//			context.mods = modMassesString;
//		}

		//  Put Reported Peptide and Best PSM annotations into the context per ann type id for display matching table headers

		const peptideAnnotationMap = peptideListItem.peptideAnnotationMap;
		if ( peptideAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries ) {
				const entryForAnnTypeId = peptideAnnotationMap[ annTypeItem.annotationTypeId ];
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}
		const psmAnnotationMap = peptideListItem.psmAnnotationMap;
		if ( psmAnnotationMap ) {
			for ( const annTypeItem of annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries ) {
				const entryForAnnTypeId = psmAnnotationMap[ annTypeItem.annotationTypeId ];
				context[ annTypeItem.annotationTypeId ] = entryForAnnTypeId.valueString;
			}
		}

		return context;
	}
	
	/**
	 * Create Table Columns 
	 */
	_getReportedPeptideDataTableColumns( { psmAnnotationTypes, reportedPeptideAnnotationTypes } ) {

		let columns = [ ];

		{
			let column = {
				id :           'sequence',
				width :        '500px',
				displayName :  'Sequence',
				dataProperty : 'reportedPeptideSequence', // 'sequence',
                sort : 'string',
                style_override : 'white-space:nowrap;overflow-x:auto;font-size:12px;',   //prevent line breaks and scroll if too long
			};

			columns.push( column );
        }

//		{
//			let column = {
//				id :           'mods',
//				width :        '70px',
//				displayName :  'Mods',
//				dataProperty : 'mods',
////                sort : 'number',
////                style_override : 'font-size:12px;',
//			};
//
//			columns.push( column );
//        }

		{
			let column = {
				id :           'psms',
				width :        '70px',
				displayName :  'PSMs',
				dataProperty : 'numPsms', // 'psms',
                sort : 'number',
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        for( let annotation of reportedPeptideAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval 
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        for( let annotation of psmAnnotationTypes ) {

            let column = {
				id :           annotation.annotationTypeId,
				width :        '100px',
				displayName :  'Best PSM: ' + annotation.name,
				dataProperty : annotation.annotationTypeId,
                sort : annotation.sorttype,  // property sorttype populated in AnnotationTypeDataRetrieval
                style_override : 'font-size:12px;',
			};

			columns.push( column );
        }

        columns[ columns.length - 1 ].lastItem = true;
        return columns;
    };
	
}
