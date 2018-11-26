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
package org.yeastrc.limelight.limelight_shared.file_import_limelight_xml_scans.enum_classes;

/**
 * Enum for is this Limelight XML File Import Run record for the sub status 
 * 
 * Keep these values in sync with the values in the table 
 * 'file_import_tracking_run_sub_status_values_lookup_tbl'
 * 
 */
public enum FileImportRunSubStatus {

    SYSTEM_ERROR( 1 ),
	DATA_ERROR( 2 ),
    PROJECT_NOT_ALLOW_IMPORT( 3 )
    ;

	
    
    private final int value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FileImportRunSubStatus( int v) {
        value = v;
    }

    public int value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static FileImportRunSubStatus fromValue( int value_ ) {
        for (FileImportRunSubStatus c: FileImportRunSubStatus.values()) {
            if (c.value == value_ ) {
                return c;
            }
        }
        throw new IllegalArgumentException( "FileImportRunSubStatus not valid for value: " + value_ );
    }

}
