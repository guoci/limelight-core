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
import java.util.Collections;
import java.util.List;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.constants.Database_OneTrueZeroFalse_Constants;
import org.yeastrc.limelight.limelight_shared.constants.SearcherGeneralConstants;
import org.yeastrc.limelight.limelight_shared.enum_classes.FilterDirectionTypeJavaCodeEnum;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesAnnotationLevel;
import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;
import org.yeastrc.limelight.limelight_webapp.exceptions.LimelightInternalErrorException;

/**
 * 
 *
 */
@Component
public class PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher extends Limelight_JDBC_Base implements PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF {

	private static final Logger log = LoggerFactory.getLogger( PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher.class );
	
	public static class PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry {
		
		private long psmId;
		private double openModificationMass;
		private Integer openModificationPosition;
		private Boolean is_N_Terminal;
		private Boolean is_C_Terminal;
		
		public long getPsmId() {
			return psmId;
		}
		public double getOpenModificationMass() {
			return openModificationMass;
		}
		public Integer getOpenModificationPosition() {
			return openModificationPosition;
		}
		public Boolean getIs_N_Terminal() {
			return is_N_Terminal;
		}
		public Boolean getIs_C_Terminal() {
			return is_C_Terminal;
		}
	}
	
	/* (non-Javadoc)
	 * @see org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF#getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs(int, int, org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel)
	 */
	@Override
	public List<PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs(
			
			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel ) throws SQLException {
		
		List<PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> resultList = new ArrayList<>();

		//  Create reversed version of list
		List<SearcherCutoffValuesAnnotationLevel> psmCutoffValuesList_Reversed = 
				new ArrayList<>( searcherCutoffValuesSearchLevel.getPsmPerAnnotationCutoffsList() );
		
		Collections.reverse(psmCutoffValuesList_Reversed);
		
		//  Generate nested sub selects for each annotation type filtering on,
		//     with a innermost subselect of PSM Ids for search id / reported peptide id
				

		StringBuilder sqlSB = new StringBuilder( 10000 );
		
		if ( psmCutoffValuesList_Reversed.isEmpty() ) {
			sqlSB.append( "SELECT psm_tbl.id as psm_id, psm_open_modification_tbl.mass, " );
			sqlSB.append( " psm_open_modification_position_tbl.position, psm_open_modification_position_tbl.is_n_terminal, psm_open_modification_position_tbl.is_c_terminal " );
			sqlSB.append( " FROM psm_tbl " );
			sqlSB.append( " INNER JOIN psm_open_modification_tbl ON psm_tbl.id = psm_open_modification_tbl.psm_id " );
			sqlSB.append( " LEFT OUTER JOIN psm_open_modification_position_tbl ON psm_open_modification_tbl.id = psm_open_modification_position_tbl.psm_open_modification_id " );
			sqlSB.append( " WHERE psm_tbl.search_id = ? AND psm_tbl.reported_peptide_id = ? " );
			
		} else {
			{
				//  Main Select
				sqlSB.append( " SELECT psm_ids.psm_id as psm_id, psm_open_modification_tbl.mass, " ); 
				sqlSB.append( " psm_open_modification_position_tbl.position, psm_open_modification_position_tbl.is_n_terminal, psm_open_modification_position_tbl.is_c_terminal " );
				sqlSB.append( " FROM " );
				{
					//  Start Subselect

					//  generate sub-selects from outer most to inner most 
			
					for ( int counter = 0; counter < psmCutoffValuesList_Reversed.size(); counter++ ) {

						sqlSB.append( " ( SELECT psm_filterable_annotation_tbl.psm_id FROM psm_filterable_annotation_tbl INNER JOIN " );
					}
					
					//  Add innermost subselect on psm_tbl to get psm ids
					
					sqlSB.append( " ( SELECT id AS psm_id FROM psm_tbl WHERE search_id = ? AND reported_peptide_id = ? ) " );

					//  Close sub-selects from inner most to outer most 
			
					for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {

						sqlSB.append( " as psm_ids ON psm_filterable_annotation_tbl.psm_id = psm_ids.psm_id " );
						sqlSB.append( " WHERE annotation_type_id = ? AND " );
						sqlSB.append( " value_double " );
						if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO() == null ) {
							String msg = "ERROR: Annotation type data must contain Filterable DTO data.  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
							log.error( msg );
							throw new LimelightInternalErrorException(msg);
						}
						if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.ABOVE ) {
							sqlSB.append( SearcherGeneralConstants.SQL_END_BIGGER_VALUE_BETTER );
						} else if ( entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() == FilterDirectionTypeJavaCodeEnum.BELOW ) {
							sqlSB.append( SearcherGeneralConstants.SQL_END_SMALLER_VALUE_BETTER );
						} else {
							String msg = "ERROR: entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum() is unknown value: "
									+ entry.getAnnotationTypeDTO().getAnnotationTypeFilterableDTO().getFilterDirectionTypeJavaCodeEnum()
									+ ".  Annotation type id: " + entry.getAnnotationTypeDTO().getId();
							log.error( msg );
							throw new LimelightInternalErrorException(msg);
						}
						sqlSB.append( " ? )  " );
					}
					sqlSB.append( "  as psm_ids " );
					
					
				}  //  End Subselect
				
//				sqlSB.append( " ) " );
			}
//			sqlSB.append( " AS psm_ids " );
			sqlSB.append( " INNER JOIN psm_open_modification_tbl ON psm_ids.psm_id = psm_open_modification_tbl.psm_id " );
			sqlSB.append( " LEFT OUTER JOIN psm_open_modification_position_tbl ON psm_open_modification_tbl.id = psm_open_modification_position_tbl.psm_open_modification_id " );

		}
		
		String sql = sqlSB.toString();
		
		try ( Connection connection = super.getDBConnection();
			     PreparedStatement preparedStatement = connection.prepareStatement( sql ) ) {

			int counter = 0;
			if ( psmCutoffValuesList_Reversed.isEmpty() ) {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
			} else {
				//  psm_tbl fields
				counter++;
				preparedStatement.setInt( counter, searchId );
				counter++;
				preparedStatement.setInt( counter, reportedPeptideId );
				
				//  Close sub-selects from inner most to outer most 
				for ( SearcherCutoffValuesAnnotationLevel entry : psmCutoffValuesList_Reversed ) {
					counter++;
					preparedStatement.setInt( counter, entry.getAnnotationTypeDTO().getId() );
					counter++;
					preparedStatement.setDouble( counter, entry.getAnnotationCutoffValue() );
				}
			}
			
			
			try ( ResultSet rs = preparedStatement.executeQuery() ) {
				while( rs.next() ) {
					PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry result = new PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry();
					result.psmId = rs.getLong( "psm_id" );
					result.openModificationMass = rs.getDouble( "mass" );
					/// following only populated if psm_open_modification_position_tbl record joined in via Left Outer Join
					{
						int position = rs.getInt( "position" );
						if ( ! rs.wasNull() ) {
							result.openModificationPosition = position;
						}
					}
					{
						int is_n_terminalInt = rs.getInt( "is_n_terminal" );
						if ( ! rs.wasNull() ) {
							if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE == is_n_terminalInt ) {
								result.is_N_Terminal = true;
							} else {
								result.is_N_Terminal = false;
							}
						}
					}
					{
						int is_c_terminalInt = rs.getInt( "is_c_terminal" );
						if ( ! rs.wasNull() ) {
							if ( Database_OneTrueZeroFalse_Constants.DATABASE_FIELD_TRUE == is_c_terminalInt ) {
								result.is_C_Terminal = true;
							} else {
								result.is_C_Terminal = false;
							}
						}
					}
					resultList.add( result );
				}
			}
		} catch ( RuntimeException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		} catch ( SQLException e ) {
			log.error( "ERROR :  SQL: " + sql, e );
			throw e;
		}
		return resultList;		
	}


}
