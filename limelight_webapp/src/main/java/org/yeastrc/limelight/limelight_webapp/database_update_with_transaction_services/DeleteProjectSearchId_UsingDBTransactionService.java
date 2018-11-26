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
package org.yeastrc.limelight.limelight_webapp.database_update_with_transaction_services;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.yeastrc.limelight.limelight_webapp.dao.DataPageSavedViewDAO_IF;
import org.yeastrc.limelight.limelight_webapp.dao.ProjectSearchDAO_IF;

/**
 * Delete Project Search Id and associated data in tables that are not deleted via foreign key cascade
 * 
 * !!!!  Important.  This cannot throw checked exceptions.  Otherwise Spring will not roll back the transaction
 *
 */
@Service
public class DeleteProjectSearchId_UsingDBTransactionService implements DeleteProjectSearchId_UsingDBTransactionServiceIF  {

	private static final Logger log = LoggerFactory.getLogger( DeleteProjectSearchId_UsingDBTransactionService.class );

	@Autowired
	private ProjectSearchDAO_IF projectSearchDAO;

	@Autowired
	private DataPageSavedViewDAO_IF dataPageSavedViewDAO;

	
	/**
	 * @param projectSearchId
	 */
	@Override
	//  Spring DB Transactions
	@Transactional( propagation = Propagation.REQUIRED)  //  Do NOT throw checked exceptions, they don't trigger rollback in Spring DB Transactions
	
	public void deleteProjectSearchId( int projectSearchId ) { //  No 'Throws' allowed due to 
		
		try {
			projectSearchDAO.delete( projectSearchId );
			
			//  Remove any Shared Views with this project search id
			dataPageSavedViewDAO.deleteForProjectSearchId( projectSearchId ); 
			
		} catch ( RuntimeException e ) {
			String msg = "fail deleteProjectSearchId(...)";
			log.error( msg, e );
			throw e;

		} catch (Exception e ) {
			String msg = "fail deleteProjectSearchId(...)";
			log.error( msg, e );
			throw new RuntimeException( e );
		}
		
	}

}
