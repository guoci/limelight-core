/**
 * modViewPage_RootLaunch_PublicUser.js
 * 
 * For modView.jsp page  
 * 
 * Root Launch Javascript for Public User, or Project Is Locked
 * 
 * Create and initialize object of class ModViewPage_RootClass_Common
 * 
 * 
 * This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 * 
 * 
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

/**
* Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
*/
const Handlebars = require('handlebars/runtime');
const _dummy_template_template_bundle = 
   require("../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//  From local dir
import { ModViewPage_RootClass_Common }  from 'page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootClass_Common';

///////////////

$(document).ready(function() {

	try {
		var modViewPage_RootClass_Common = new ModViewPage_RootClass_Common({});
		modViewPage_RootClass_Common.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
