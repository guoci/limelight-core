package org.yeastrc.limelight.limelight_webapp.dto_lorikeet;

/**
 * Response from LorikeetSpectrumService
 *
 */
public class LorikeetGetSpectrumServiceResult {

	private String status;
	
	private LorikeetRootData data;
	private Lorikeet_ScanData_RetentionTime_PrecursorMZ lorikeet_ScanData_RetentionTime_PrecursorMZ;


	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public LorikeetRootData getData() {
		return data;
	}
	public void setData(LorikeetRootData data) {
		this.data = data;
	}
	public Lorikeet_ScanData_RetentionTime_PrecursorMZ getLorikeet_ScanData_RetentionTime_PrecursorMZ() {
		return lorikeet_ScanData_RetentionTime_PrecursorMZ;
	}
	public void setLorikeet_ScanData_RetentionTime_PrecursorMZ(
			Lorikeet_ScanData_RetentionTime_PrecursorMZ lorikeet_ScanData_RetentionTime_PrecursorMZ) {
		this.lorikeet_ScanData_RetentionTime_PrecursorMZ = lorikeet_ScanData_RetentionTime_PrecursorMZ;
	}
}
