/**
 * projectPage_Root_ProjectLocked_ResearcherUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Researcher Users when the Project is Locked
 * 
 * 
 */


/**
 * Always do in Root Javascript for page:
 */

//  Required Import for Handlebars Support on this page
import { Handlebars, _dummy_template_template_bundle } from './projectPage_Root_Handlebars_Include'

const Handlebars_Local = Handlebars
const _dummy_template_template_bundle_Local = _dummy_template_template_bundle


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

import { CollapsableSection_StandardProcessing } from 'page_js/main_pages/collapsableSection_StandardProcessing';


//  Local Imports

import { ProjectPage_CommonOverall } from './projectPage_CommonOverall';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './projectPage_ProjectSection_AllUsersInteraction';

import { ProjectPage_ExperimentsSection_AllUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_AllUsersInteraction';

import { ProjectPage_SearchesSection_AllUsersInteraction } from './projectPage_SearchesSection_AllUsersInteraction';
import { ProjectPage_SavedViews_Section_AllUsersInteraction } from './projectPage_SavedViews_Section_AllUsersInteraction'

import { ProjectPage_ProjectUserAccessAdminSection } from './projectPage_ProjectUserAccessAdminSection';
import { ProjectPage_PublicAccessSection_ProjectOwnerInteraction } from './projectPage_PublicAccessSection_ProjectOwnerInteraction';

/**
 * 
 */
class ProjectViewPage_Root_ProjectLocked_ResearcherUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_AllUsersInteraction : ProjectPage_ProjectSection_AllUsersInteraction

	private _projectPage_ExperimentsSection_AllUsersInteraction : ProjectPage_ExperimentsSection_AllUsersInteraction

	private _projectPage_SearchesSection_AllUsersInteraction : ProjectPage_SearchesSection_AllUsersInteraction
	private _projectPage_SavedViews_Section_AllUsersInteraction : ProjectPage_SavedViews_Section_AllUsersInteraction
	private _projectPage_ProjectUserAccessAdminSection : ProjectPage_ProjectUserAccessAdminSection
	private _projectPage_PublicAccessSection_ProjectOwnerInteraction : ProjectPage_PublicAccessSection_ProjectOwnerInteraction

	/**
	 * 
	 */
	constructor() {

		this._initializeCalled = false;
		
	}

	/**
	 * 
	 */
	initialize() {

		catchAndReportGlobalOnError.init();
		
		initShowHideErrorMessage();

		//  Collapse/Expand for Project Info and Searches
		const collapsableSection_StandardProcessing = new CollapsableSection_StandardProcessing();
		collapsableSection_StandardProcessing.initialize();

		const projectPage_CommonOverall = new ProjectPage_CommonOverall();
		projectPage_CommonOverall.initialize();
		
		const userIsProjectOwner = false;
		const projectLocked = true;
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();
		
		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL } );

		this._projectPage_ExperimentsSection_AllUsersInteraction = new ProjectPage_ExperimentsSection_AllUsersInteraction( {
			projectIdentifierFromURL : this._projectIdentifierFromURL
		} );

		this._projectPage_SearchesSection_AllUsersInteraction = 
			new ProjectPage_SearchesSection_AllUsersInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL } );
		
		this._projectPage_SavedViews_Section_AllUsersInteraction =
			new ProjectPage_SavedViews_Section_AllUsersInteraction({ 
				projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction =
			new ProjectPage_PublicAccessSection_ProjectOwnerInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		this._projectPage_ExperimentsSection_AllUsersInteraction.initialize();

		this._projectPage_SearchesSection_AllUsersInteraction.initialize();
		this._projectPage_SavedViews_Section_AllUsersInteraction.initialize();

		
		window.setTimeout(() => {
			//  Run in setTimeout to catch Errors
			this._projectPage_ProjectUserAccessAdminSection.initialize();
		}, 10 );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction.initialize();
		
		////Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();
		
		this._projectPage_ProjectSection_AllUsersInteraction.getProjectData();
		this._projectPage_SavedViews_Section_AllUsersInteraction.getSavedViewsData();
		this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
		
		this._initializeCalled = true;
	};
	

	/**
	 * 
	 */
	_getProjectIdentifierFromURL() : string {

		let windowPath = window.location.pathname;
		
		let lastIndexOfSlash = windowPath.lastIndexOf( "/" );
		
		if ( lastIndexOfSlash === -1 ) {
			throw Error("No Project Identifier in URL. windowPath: " + windowPath );
		}
		
		let projectIdentifier = windowPath.substring( lastIndexOfSlash + 1 );

		return projectIdentifier;
	};

};


///////////////

$(document).ready(function() {

	//Instance of class
	let projectViewPage_Root_ProjectLocked_ResearcherUser = new ProjectViewPage_Root_ProjectLocked_ResearcherUser();

	try {
		projectViewPage_Root_ProjectLocked_ResearcherUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



