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
package org.yeastrc.limelight.limelight_shared.enum_classes;


/**
 * Enum for is this Annotation Type record for Filterable or Descriptive 
 * 
 * Keep these values in sync with the enum field 'filterable_descriptive_type' 
 * in the tables annotation_type and 
 */
public enum FilterableDescriptiveAnnotationType {

    /**
     * Annotation type records for filterable
     */
    FILTERABLE("filterable"),
    
    /**
     * Annotation type records for descriptive
     */
    DESCRIPTIVE("descriptive");

    
    private final String value;

    
    
    /**
     * constructor:  Make private to hide 
     */
    private FilterableDescriptiveAnnotationType(String v) {
        value = v;
    }

    public String value() {
        return value;
    }

    /**
     * Get the enum from the String value
     * 
     * @param value_
     * @return
     */
    public static FilterableDescriptiveAnnotationType fromValue( String value_ ) {
        for (FilterableDescriptiveAnnotationType c: FilterableDescriptiveAnnotationType.values()) {
            if (c.value.equals( value_ )) {
                return c;
            }
        }
        throw new IllegalArgumentException( "PsmPeptideProteinAnnotationType not valid for value: " + value_ );
    }

}
