/**
 * projectPage_Root_ResearcherUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Root JS file for Researcher Users 
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

import { ProjectPage_ExperimentsSection_LoggedInUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_LoggedInUsersInteraction';

import { ProjectPage_SavedViews_Section_LoggedInUsersInteraction } from './projectPage_SavedViews_Section_LoggedInUsersInteraction';

import { ProjectPage_ExperimentsSection_AllUsersInteraction } from './project_page_experiments_section/projPg_Expermnts_AllUsersInteraction';

import { ProjectPage_ProjectSection_AllUsersInteraction } from './projectPage_ProjectSection_AllUsersInteraction';
import { ProjectPage_SearchesSection_AllUsersInteraction } from './project_page_main_page_react_based/js/projectPage_SearchesSection_AllUsersInteraction';
import { ProjectPage_SavedViews_Section_AllUsersInteraction } from './projectPage_SavedViews_Section_AllUsersInteraction'

import { ProjectPage_ProjectUserAccessAdminSection } from './projectPage_ProjectUserAccessAdminSection';
import { ProjectPage_ProjectSection_LoggedInUsersInteraction } from './projectPage_ProjectSection_LoggedInUsersInteraction';
import { ProjectPage_PublicAccessSection_ProjectOwnerInteraction } from './projectPage_PublicAccessSection_ProjectOwnerInteraction';
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";

/**
 * 
 */
class ProjectViewPage_Root_ResearcherUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL : string

	private _projectPage_ProjectSection_LoggedInUsersInteraction : ProjectPage_ProjectSection_LoggedInUsersInteraction

	private _projectPage_ExperimentsSection_LoggedInUsersInteraction : ProjectPage_ExperimentsSection_LoggedInUsersInteraction

	private _projectPage_SavedViews_Section_LoggedInUsersInteraction : ProjectPage_SavedViews_Section_LoggedInUsersInteraction

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
		const projectLocked = false;

		const dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails = new DataPages_LoggedInUser_CommonObjectsFactory();
		
		this._projectIdentifierFromURL = this._getProjectIdentifierFromURL();

		this._projectPage_ProjectSection_LoggedInUsersInteraction = new ProjectPage_ProjectSection_LoggedInUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectLocked : projectLocked });

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction = new ProjectPage_ExperimentsSection_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction = new ProjectPage_SavedViews_Section_LoggedInUsersInteraction({ projectIdentifierFromURL : this._projectIdentifierFromURL });

		this._projectPage_ProjectSection_AllUsersInteraction = 
			new ProjectPage_ProjectSection_AllUsersInteraction( { projectIdentifierFromURL : this._projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction : this._projectPage_ProjectSection_LoggedInUsersInteraction } );

		this._projectPage_ExperimentsSection_AllUsersInteraction = new ProjectPage_ExperimentsSection_AllUsersInteraction( {
			projectIdentifierFromURL : this._projectIdentifierFromURL,
			projectPage_ExperimentsSection_LoggedInUsersInteraction : this._projectPage_ExperimentsSection_LoggedInUsersInteraction
		} );

		this._projectPage_SearchesSection_AllUsersInteraction = 
			new ProjectPage_SearchesSection_AllUsersInteraction( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails
			} );

		this._projectPage_SavedViews_Section_AllUsersInteraction =
			new ProjectPage_SavedViews_Section_AllUsersInteraction({ 
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectPage_SavedViews_Section_LoggedInUsersInteraction : this._projectPage_SavedViews_Section_LoggedInUsersInteraction });
		

		this._projectPage_ProjectUserAccessAdminSection =
			new ProjectPage_ProjectUserAccessAdminSection( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction =
				new ProjectPage_PublicAccessSection_ProjectOwnerInteraction( { 
					projectIdentifierFromURL : this._projectIdentifierFromURL, userIsProjectOwner, projectLocked } );

		this._projectPage_ExperimentsSection_LoggedInUsersInteraction.initialize({ projectPage_ExperimentsSection_AllUsersInteraction : this._projectPage_ExperimentsSection_AllUsersInteraction });

		this._projectPage_SavedViews_Section_LoggedInUsersInteraction.initialize({ projectPage_SavedViews_Section_AllUsersInteraction : this._projectPage_SavedViews_Section_AllUsersInteraction });

		this._projectPage_ProjectSection_AllUsersInteraction.initialize();

		this._projectPage_ExperimentsSection_AllUsersInteraction.initialize();

		this._projectPage_SearchesSection_AllUsersInteraction.initialize();
		this._projectPage_SavedViews_Section_AllUsersInteraction.initialize();

		this._projectPage_ProjectSection_LoggedInUsersInteraction.initialize({ projectPage_ProjectSection_AllUsersInteraction : this._projectPage_ProjectSection_AllUsersInteraction });
		
		window.setTimeout(() => {
			//  Run in setTimeout to catch Errors
			this._projectPage_ProjectUserAccessAdminSection.initialize();
		}, 10 );

		this._projectPage_PublicAccessSection_ProjectOwnerInteraction.initialize();
		
		////  Instance of class
		let mainPagesPopulateHeader = new MainPagesPopulateHeader();
		
		mainPagesPopulateHeader.initialize();
		
//		let projectViewPage_UserAccessAdminSection = 
//			new ProjectViewPage_UserAccessAdminSection( { projectIdentifierFromURL : this._projectIdentifierFromURL } );
//		projectViewPage_UserAccessAdminSection.initialize();
		
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
	let projectViewPage_Root_ResearcherUser = new ProjectViewPage_Root_ResearcherUser();

	try {
		projectViewPage_Root_ResearcherUser.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});



