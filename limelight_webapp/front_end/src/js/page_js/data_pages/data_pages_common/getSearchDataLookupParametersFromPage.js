/**
 * getSearchDataLookupParametersFromPage.js
 * 
 * Javascript for getting the project search ids and their filters and annotation type display from page
 * 
 * This will change when groups are added.
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * 
 */
export class GetSearchDataLookupParametersFromPage {

	/**
	 * 
	 */
	constructor() {
		
		this._projectSearchIds_RetrievingDataFor = {};
	}
	
	/**
	 * @return SearchDataLookupParameters from Page DOM
	 */
	getSearchDataLookupParametersFromPage() {
		
		//   Process Search Data Lookup Parameters JSON and Code from DOM <script> text element 

		let $search_data_lookup_parameters_at_page_load_code = $("#search_data_lookup_parameters_at_page_load_code");
		if ( $search_data_lookup_parameters_at_page_load_code.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_code'");
		}
		let search_data_lookup_parameters_at_page_load_code = $search_data_lookup_parameters_at_page_load_code.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_code.remove();
		
		
		let $search_data_lookup_parameters_at_page_load_json = $("#search_data_lookup_parameters_at_page_load_json");
		if ( $search_data_lookup_parameters_at_page_load_json.length === 0 ) {
			throw Error("No DOM element with ID 'search_data_lookup_parameters_at_page_load_json'");
		}
		let search_data_lookup_parameters_at_page_load_json = $search_data_lookup_parameters_at_page_load_json.text();
		
		//  Remove from Page DOM
		$search_data_lookup_parameters_at_page_load_json.remove();
		
		let search_data_lookup_parameters_at_page_load = undefined;
		try {
			search_data_lookup_parameters_at_page_load = JSON.parse( search_data_lookup_parameters_at_page_load_json );
		} catch( e ) {
			throw Error("getSearchDataLookupParametersFromPage: Failed to parse: " + search_data_lookup_parameters_at_page_load_json );
		}

		// Get Project Search Ids
		let projectSearchIds = [];
		let paramsForProjectSearchIds = search_data_lookup_parameters_at_page_load.paramsForProjectSearchIds;
		if ( paramsForProjectSearchIds ) {
			let paramsForProjectSearchIdsList = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
			if ( paramsForProjectSearchIdsList ) {
				paramsForProjectSearchIdsList.forEach(function( paramsForProjectSearchId, index, array) {
					let projectSearchId = paramsForProjectSearchId.projectSearchId;
					projectSearchIds.push( projectSearchId );
				}, this );
			}
		}
				
		return {
			search_data_lookup_parameters_at_page_load_code : search_data_lookup_parameters_at_page_load_code,
			search_data_lookup_parameters_at_page_load : search_data_lookup_parameters_at_page_load,
			projectSearchIds : projectSearchIds
		};
	};
	
}
