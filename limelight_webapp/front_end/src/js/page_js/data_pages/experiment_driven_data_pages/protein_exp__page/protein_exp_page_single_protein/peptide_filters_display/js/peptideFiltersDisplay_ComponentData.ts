/**
 * peptideFiltersDisplay_ComponentData.ts
 * 
 * Component Data for: peptideFiltersDisplay.tsx
 * 
 */

import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';


/**
 * 
 */
export interface PeptideFiltersDisplay_ComponentData {
    
	modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
	proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;

}