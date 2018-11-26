package org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects;

import org.yeastrc.limelight.limelight_shared.dto.AnnotationTypeDTO;

/**
 * Entry for each Annotation 
 *
 */
public class SearcherCutoffValuesAnnotationLevel {

	//  Warning:  Has equals(...) and hashCode() that need to be updated if properties change
	
	private int annotationTypeId;
	private double annotationCutoffValue;

	private AnnotationTypeDTO annotationTypeDTO;
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		long temp;
		temp = Double.doubleToLongBits(annotationCutoffValue);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + annotationTypeId;
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SearcherCutoffValuesAnnotationLevel other = (SearcherCutoffValuesAnnotationLevel) obj;
		if (Double.doubleToLongBits(annotationCutoffValue) != Double.doubleToLongBits(other.annotationCutoffValue))
			return false;
		if (annotationTypeId != other.annotationTypeId)
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "SearcherCutoffValuesAnnotationLevel [annotationTypeId=" + annotationTypeId + ", annotationCutoffValue="
				+ annotationCutoffValue + "]";
	}


	public int getAnnotationTypeId() {
		return annotationTypeId;
	}

	public void setAnnotationTypeId(int annotationTypeId) {
		this.annotationTypeId = annotationTypeId;
	}

	public double getAnnotationCutoffValue() {
		return annotationCutoffValue;
	}


	public void setAnnotationCutoffValue(double annotationCutoffValue) {
		this.annotationCutoffValue = annotationCutoffValue;
	}

	
	public AnnotationTypeDTO getAnnotationTypeDTO() {
		return annotationTypeDTO;
	}


	public void setAnnotationTypeDTO(AnnotationTypeDTO annotationTypeDTO) {
		this.annotationTypeDTO = annotationTypeDTO;
	}


}
