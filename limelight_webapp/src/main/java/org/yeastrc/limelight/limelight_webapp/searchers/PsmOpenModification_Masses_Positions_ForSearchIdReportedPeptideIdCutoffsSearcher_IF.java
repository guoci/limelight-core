package org.yeastrc.limelight.limelight_webapp.searchers;

import java.sql.SQLException;
import java.util.List;

import org.yeastrc.limelight.limelight_shared.searcher_psm_peptide_cutoff_objects.SearcherCutoffValuesSearchLevel;
import org.yeastrc.limelight.limelight_webapp.searchers.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher.PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry;

public interface PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_IF {

	List<PsmOpenModification_Masses_Positions_ForSearchIdReportedPeptideIdCutoffsSearcher_ResultEntry> getPsmOpenModificationMassesForSearchIdReportedPeptideIdCutoffs(

			int reportedPeptideId, int searchId, SearcherCutoffValuesSearchLevel searcherCutoffValuesSearchLevel)
			throws SQLException;

}