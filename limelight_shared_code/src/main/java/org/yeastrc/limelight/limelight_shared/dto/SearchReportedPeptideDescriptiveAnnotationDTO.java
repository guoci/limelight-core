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
package org.yeastrc.limelight.limelight_shared.dto;


/**
 * table srch__rep_pept_descriptive_annotation_tbl
 *
 */
public class SearchReportedPeptideDescriptiveAnnotationDTO  extends AnnotationDataDescriptiveBaseDTO {

	private int searchId;
	private int reportedPeptideId;
	
	@Override
	public String toString() {
		return "SearchReportedPeptideDescriptiveAnnotationDTO [searchId=" + searchId + ", reportedPeptideId="
				+ reportedPeptideId + ", valueString=" + valueString + ", id=" + id + ", annotationTypeId="
				+ annotationTypeId + "]";
	}

	
	
	public int getSearchId() {
		return searchId;
	}
	public void setSearchId(int searchId) {
		this.searchId = searchId;
	}
	public int getReportedPeptideId() {
		return reportedPeptideId;
	}
	public void setReportedPeptideId(int reportedPeptideId) {
		this.reportedPeptideId = reportedPeptideId;
	}

}
