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
package org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.other_like_project;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF;
import org.yeastrc.limelight.limelight_webapp.access_control.access_control_rest_controller.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds.ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_BadRequest_InvalidParameter_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_ErrorResponse_Base_Exception;
import org.yeastrc.limelight.limelight_webapp.exceptions.webservice_access_exceptions.Limelight_WS_InternalServerError_Exception;
import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF;
import org.yeastrc.limelight.limelight_webapp.experiment.searchers.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher.Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.data_pages.rest_controllers.AA_RestWSControllerPaths_Constants;
import org.yeastrc.limelight.limelight_webapp.spring_mvc_parts.rest_controller_utils_common.Unmarshal_RestRequest_JSON_ToObject;
import org.yeastrc.limelight.limelight_webapp.web_utils.MarshalObjectToJSON;
import org.yeastrc.limelight.limelight_webapp.webservice_sync_tracking.Validate_WebserviceSyncTracking_CodeIF;

/**
 * List Experiments that contain Project Search Ids
 *
 */
@RestController
public class Project_List_Experiments_Containing_ProjectSearchIds_RestWebserviceController {
  
	private static final Logger log = LoggerFactory.getLogger( Project_List_Experiments_Containing_ProjectSearchIds_RestWebserviceController.class );

	@Autowired
	private Validate_WebserviceSyncTracking_CodeIF validate_WebserviceSyncTracking_Code;

	@Autowired
	private ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIdsIF validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds;

	@Autowired
	private Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_IF experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher;
	
	@Autowired
	private Unmarshal_RestRequest_JSON_ToObject unmarshal_RestRequest_JSON_ToObject;

	@Autowired
	private MarshalObjectToJSON marshalObjectToJSON;

    /**
	 * 
	 */
	public Project_List_Experiments_Containing_ProjectSearchIds_RestWebserviceController() {
		super();
//		log.warn( "constructor no params called" );
	}
	
	//  Convert result object graph to JSON in byte[] in the controller body so can cache it

	//  These 2 annotations work the same
	

	//  Mapping the value in {} in the path to parameters in the method:
	//
	//    The value in {} has to match the value in the "value = " in the @PathVariable
	//    If they don't match, a 500 error is thrown and nothing is logged and the method is not called.
	//    If there is no "value = " in the @PathVariable, the method parameter name is used.
	
	@PostMapping( 
			path = {
					AA_RestWSControllerPaths_Constants.PATH_START_ALL
					+ AA_RestWSControllerPaths_Constants.LIST_EXPERIMENTS_CONTAINING_PROJECT_SEARCH_IDS_REST_WEBSERVICE_CONTROLLER
			},
			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE )

//	@RequestMapping( 
//			path = AA_RestWSControllerPaths_Constants.,
//			method = RequestMethod.POST,
//			consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    public @ResponseBody ResponseEntity<byte[]>  webserviceMethod(
    		
    		@RequestBody byte[] postBody,
    		HttpServletRequest httpServletRequest,
    		HttpServletResponse httpServletResponse
    		) throws Exception {
    	
    	try {
    		//		log.warn( "webserviceMethod(...) called" );

    		//  Throws exception extended from Limelight_WS_ErrorResponse_Base_Exception 
    		//    to return specific error to web app JS code if webserviceSyncTracking is not current value
    		validate_WebserviceSyncTracking_Code.validate_webserviceSyncTracking_Code( httpServletRequest );

    		//  Always accept POST body as byte[] and parse to JSON here so have POST body for caching or other needs

    		if ( postBody == null ) {
    			log.warn( "No Post Body" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		WebserviceRequest webserviceRequest = unmarshal_RestRequest_JSON_ToObject.getObjectFromJSONByteArray( postBody, WebserviceRequest.class );

    		//		String postBodyAsString = new String( postBody, StandardCharsets.UTF_8 );
    		
    		String projectIdentifier = webserviceRequest.projectIdentifier;
    		Set<Integer> projectSearchIds = webserviceRequest.projectSearchIds;
    		
    		if ( StringUtils.isEmpty( projectIdentifier ) ) {
    			log.warn( "projectIdentifier is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		if ( projectSearchIds == null || projectSearchIds.isEmpty() ) {
    			log.warn( "projectSearchIds is empty or not assigned" );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}
    		
    		List<Integer> projectSearchIdsList = new ArrayList<>( projectSearchIds );

    		int projectIdFromRequest = 0;

    		try {
    			projectIdFromRequest = Integer.parseInt( projectIdentifier );

    		} catch ( RuntimeException e ) {
    			log.warn( "Project Identifier not parsable to int: " + projectIdentifier );
    			throw new Limelight_WS_BadRequest_InvalidParameter_Exception();
    		}

    		ValidateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result =
					validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds
					.validateProjectOwnerAllowed( projectSearchIdsList, httpServletRequest );

    		{
    			//  Validate
//    		validateWebSessionAccess_ToWebservice_ForAccessLevelAndProjectSearchIds_Result.getProjectIdsForProjectSearchIds()


    		}
    		
			///  Finished Auth
    		
			
			List<Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result> dbResultList = 
					experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher
					.getExperiments_ProjectSearchIds_List_ForProjectSearchIds( projectSearchIds );
			
			//  First store in Map to group by Experiment Id
			
			Map<Integer, WebserviceResultItem> resultsMap_Key_ExperimentId = new HashMap<>();
			
			for ( Experiments_ProjectSearchIds_List_ForProjectSearchIds_Searcher_Result dbResult : dbResultList ) {
				
				WebserviceResultItem webserviceResultItem = resultsMap_Key_ExperimentId.get(  dbResult.getExperimentId() );
				
				if (  webserviceResultItem == null ) {
					webserviceResultItem = new WebserviceResultItem();
					resultsMap_Key_ExperimentId.put(  dbResult.getExperimentId(), webserviceResultItem );
					
					webserviceResultItem.experimentId = dbResult.getExperimentId();
					webserviceResultItem.experimentIsDraft = dbResult.isExperimentIsDraft();
					webserviceResultItem.experimentName = dbResult.getExperimentName();
					if ( dbResult.getProjectId() != projectIdFromRequest ) {
						webserviceResultItem.experimentNoInProject = true;
					}
				}
				
				webserviceResultItem.projectSearchIds.add( dbResult.getProjectSearchId() );
			}
			
			
			//  Create webservice result object

    		WebserviceResult webserviceResult = new WebserviceResult();

			List<WebserviceResultItem> experiments = new ArrayList<>( resultsMap_Key_ExperimentId.size() );
			webserviceResult.status = true;
			webserviceResult.experiments = experiments;
			
			for ( Map.Entry<Integer, WebserviceResultItem> mapEntry :  resultsMap_Key_ExperimentId.entrySet() ) {
				
				experiments.add( mapEntry.getValue() );
			}
						
    		byte[] responseAsJSON = marshalObjectToJSON.getJSONByteArray( webserviceResult );

    		return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body( responseAsJSON );

    	} catch ( Limelight_WS_ErrorResponse_Base_Exception e ) {
    		
    		//  only rethrow Error Response Exceptions 
    		throw e;
    		
    	} catch ( Exception e ) {
    		String msg = "Failed in controller: ";
			log.error( msg, e );
			throw new Limelight_WS_InternalServerError_Exception();
    	}
    }
    

    public static class WebserviceRequest {
    	
    	private String projectIdentifier;
    	private Set<Integer> projectSearchIds;
    	
		public void setProjectIdentifier(String projectIdentifier) {
			this.projectIdentifier = projectIdentifier;
		}
		public void setProjectSearchIds(Set<Integer> projectSearchIds) {
			this.projectSearchIds = projectSearchIds;
		}
    }
    
    public static class WebserviceResult {

		private boolean status;
		private List<WebserviceResultItem> experiments;
		
		public boolean isStatus() {
			return status;
		}
		public List<WebserviceResultItem> getExperiments() {
			return experiments;
		}
    }

	/**
	 * Item in WebserviceResult
	 */
	public static class WebserviceResultItem {
		
		private int experimentId;
		private String experimentName;
		private boolean experimentIsDraft;
		private boolean experimentNoInProject;
		private Set<Integer> projectSearchIds = new HashSet<>();
		
		public int getExperimentId() {
			return experimentId;
		}
		public String getExperimentName() {
			return experimentName;
		}
		public boolean isExperimentNoInProject() {
			return experimentNoInProject;
		}
		public Set<Integer> getProjectSearchIds() {
			return projectSearchIds;
		}
		public boolean isExperimentIsDraft() {
			return experimentIsDraft;
		}

	}    

}

