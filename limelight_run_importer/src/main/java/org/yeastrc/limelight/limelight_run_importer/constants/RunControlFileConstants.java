/*
* Original author: Daniel Jaschob <djaschob .at. uw.edu>
*                  
* Copyright 2018 University of Washington - Seattle, WA
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
package org.yeastrc.limelight.limelight_run_importer.constants;

/**
 * 
 *
 */
public class RunControlFileConstants {



	public static final String CLIENT_RUN_CONTROL_FILENAME = "limelight_run_importer_run_control.txt";

	public static final String CLIENT_RUN_CONTROL_STOP_RUN_TEXT = "stop run";

	public static final String CLIENT_RUN_CONTROL_STOP_JOBS_TEXT = "stop jobs";

	/**
	 * One array element per output line
	 */
	public static final String[] CLIENT_RUN_CONTROL_INITIAL_CONTENTS
	= {
		"",
		"limelight run importer run control file.  ",

		"Change this file so it begins with '"
		+ CLIENT_RUN_CONTROL_STOP_RUN_TEXT
		+ "' ( without the quotes ) at the beginning of this file to stop the program after the import currently running completes.  ",

		"Change this file so it begins with '"
		+ CLIENT_RUN_CONTROL_STOP_JOBS_TEXT
		+ "' ( without the quotes ) at the beginning of this file to have the program stop processing new imports after the import currently running completes but not exit.  "
		+ "Use this option if using a job manager that would restart this job automatically.",

		"This file will be updated with the status when import currently running completes."
	};


	/**
	 * One array element per output line
	 */
	public static final String [] CLIENT_RUN_CONTROL_STOP_REQUEST_ACCEPTED
	= {
		"",
		"",
		"",
		"!!! Stop request accepted and no additional imports will be processed after the import currently running completes."
	};

	private static final String CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE = "Stop request specified in this file.  the import currently running is complete.";

	public static final String CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_READY_FOR_SHUTDOWN = CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE + "  Ready for shutdown.";

	public static final String CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE_SHUTDOWN_PROCEEDING = CLIENT_RUN_CONTROL_CURRENT_IMPORT_COMPLETE + "  Shutdown proceeding.";

}
