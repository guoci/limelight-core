/**
 * userCreateAccountPage_Root.ts
 * 
 * Javascript for createAccount_NoInvite.jsp page
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

///////////////////////////////////////////

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import {UserCreateAccount_NO_Invite_Subpart} from "page_js/user_account_page_js/sub_parts/createUserAccount_NO_Invite";

/**
 * 
 */
export class UserCreateAccountPage_Root {

	private _initializeCalled = false;

	private _userCreateAccount_NO_Invite_Subpart = new UserCreateAccount_NO_Invite_Subpart();

	/**
	 * 
	 */
	constructor() {

	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {
		
		const objectThis = this;

		initShowHideErrorMessage();
		catchAndReportGlobalOnError.init();

		//  Click handlers to return to Sign In

		const $signin_fake_link = $("#signin_fake_link");
		$signin_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				window.location.href="";

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		const main_container_below_logo = this._get_main_container_below_logo();
		this._userCreateAccount_NO_Invite_Subpart.showOnPage({containerHTMLElement: main_container_below_logo });

		this._initializeCalled = true;
	};
	
	/**
	 * Get main_container_below_logo element
	 */
	_get_main_container_below_logo() {

		const main_container_below_logo = document.getElementById( "main_container_below_logo" );
		if ( main_container_below_logo === undefined || main_container_below_logo === null ) {
			throw Error( "No element with id 'main_container_below_logo'" );
		}
		return main_container_below_logo;
	}
};


///////////////

{
	//Instance of class
	var userCreateAccountPage_Root = new UserCreateAccountPage_Root();

	try {
		userCreateAccountPage_Root.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

}
