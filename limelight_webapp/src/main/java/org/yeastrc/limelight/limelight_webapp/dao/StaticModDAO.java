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
package org.yeastrc.limelight.limelight_webapp.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.stereotype.Component;
import org.yeastrc.limelight.limelight_shared.dto.StaticModDTO;
import org.yeastrc.limelight.limelight_webapp.db.Limelight_JDBC_Base;

/**
 * table static_mod_tbl
 *
 */
@Component
public class StaticModDAO extends Limelight_JDBC_Base implements StaticModDAO_IF {

	private static final Logger log = LoggerFactory.getLogger( StaticModDAO.class );

	/**
	 * @param rs
	 * @return
	 * @throws SQLException
	 */
	@Override
	public StaticModDTO populateResultObject(ResultSet rs) throws SQLException {
		
		StaticModDTO returnItem = new StaticModDTO();

		returnItem.setId( rs.getInt( "id" ) );
		returnItem.setSearchId( rs.getInt( "search_id" ) );
		returnItem.setResidue( rs.getString( "residue" ) );
		returnItem.setMass( rs.getBigDecimal( "mass" ) );
		returnItem.setMassString( rs.getString( "mass_string" ) );

		return returnItem;
	}
}
