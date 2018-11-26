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
package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.SearchReportedPeptideDescriptiveAnnotationDTO;
import org.yeastrc.limelight.limelight_webapp.dao.SearchReportedPeptideDescriptiveAnnotationDAO_IF;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * 
 *
 */
@Component
public class ReportedPeptideDescriptiveData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher extends Limelight_JDBC_Base implements ReportedPeptideDescriptiveData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_SearcherIF  {

	private static final Logger log = LoggerFactory.getLogger( ReportedPeptideDescriptiveData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher.class );
	
	@Autowired
	private SearchReportedPeptideDescriptiveAnnotationDAO_IF searchReportedPeptideDescriptiveAnnotationDAO;
	
	private final String SQL_MAIN = 
			"SELECT *  "

			+ " FROM srch__rep_pept_descriptive_annotation_tbl "

			+ " WHERE search_id = ? "
			;
	
	
	private final String SQL_ANN_TYPE_VALUES_START =
			" AND annotation_type_id IN ( ";

	private final String SQL_ANN_TYPE_VALUES_END =
			" ) ";

	private final String SQL_REPORTED_PEPTIDE_ID_VALUES_START =
			" AND reported_peptide_id IN ( ";

	private final String SQL_REPORTED_PEPTIDE_ID_VALUES_END =
			" ) ";
	
	/**
	 * @param searchId
	 * @param reportedPeptideIds
	 * @param annotationTypeIds
	 * @return
	 * @throws SQLException
	 */
	@Override
	public List<SearchReportedPeptideDescriptiveAnnotationDTO>  getReportedPeptideDescriptiveAnnDataList( 
			int searchId, 
    		List<Integer> reportedPeptideIds,
    		List<Integer> annotationTypeIds ) throws SQLException {

		List<SearchReportedPeptideDescriptiveAnnotationDTO> resultList = new ArrayList<>( 10000 );
		
		StringBuilder sqlSB = new StringBuilder( 50000 );
		
		sqlSB.append( SQL_MAIN );
		
		sqlSB.append( SQL_ANN_TYPE_VALUES_START );
		
		for ( int i = 0; i < annotationTypeIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( SQL_ANN_TYPE_VALUES_END );
		

		sqlSB.append( SQL_REPORTED_PEPTIDE_ID_VALUES_START );
		
		for ( int i = 0; i < reportedPeptideIds.size(); i++ ) {
			if ( i != 0 ) {
				sqlSB.append( "," );
			}
			sqlSB.append( "?" );
		}
		sqlSB.append( SQL_REPORTED_PEPTIDE_ID_VALUES_END );
		
		final String querySQL = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement pstmt = connection.prepareStatement( querySQL ) ) {
			
			int paramCounter = 0;

			paramCounter++;
			pstmt.setInt( paramCounter, searchId );
			
			// Process Ann Type Ids
			for ( Integer annotationTypeId : annotationTypeIds ) {
				paramCounter++;
				pstmt.setInt( paramCounter, annotationTypeId );
			}

			// Process Reported Peptide Ids
			for ( Integer reportedPeptideId : reportedPeptideIds ) {
				paramCounter++;
				pstmt.setInt( paramCounter, reportedPeptideId );
			}

//			if ( log.isDebugEnabled() ) {
//			if ( pstmt instanceof org.apache.commons.dbcp2.DelegatingPreparedStatement ) {
//				//  Use with DBCP in web app 
//				String executedStatement = "Executed Statement: " + ((org.apache.commons.dbcp2.DelegatingPreparedStatement)pstmt).getDelegate().toString();
//				log.debug( executedStatement );
//			}
			//  Cannot use since jar not in classpath for compile
//			if ( pstmt instanceof org.apache.tomcat.dbcp.dbcp2.DelegatingPreparedStatement ) {
//				//  Use with DBCP in Tomcat 
//				String executedStatement = "Executed Statement: " + ((org.apache.tomcat.dbcp.dbcp2.DelegatingPreparedStatement)pstmt).getDelegate().toString();
//				log.debug( executedStatement );
//			}
//			}
			
			try ( ResultSet rs = pstmt.executeQuery() ) {
				while( rs.next() ) {
					SearchReportedPeptideDescriptiveAnnotationDTO item = 
							searchReportedPeptideDescriptiveAnnotationDAO.populateFromResultSet( rs );
					resultList.add( item );
				}
			}
		} catch ( SQLException e ) {
			log.error( "error running SQL: " + querySQL, e );
			throw e;
		}
		
		return resultList;
	}
		
}
