/**
 * proteinViewPage_DisplayData_SingleSearch_ProteinDescription_DataTable_Component.tsx
 * 
 * Protein Page Single Search - Protein List - React Component for Protein Description for Data Table
 * 
 * Implemented to support tooltip on Protein Description
 */


import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } from './proteinViewPage_DisplayData_SingleSearch_Constants'



import React from 'react'

/**
 * Class for cellMgmt_ExternalReactComponent_Data property in SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props
 */
export class SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data {
    
    proteinDescription : string
    proteinSequenceVersionId : number

    constructor({ proteinDescription, proteinSequenceVersionId } : {
        proteinDescription : string
        proteinSequenceVersionId : number
    }) {
        this.proteinDescription = proteinDescription;
        this.proteinSequenceVersionId = proteinSequenceVersionId;
    }
}

/**
 * 
 */
export interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props {

    //  Standard required props property name for Component used in Data Table
    cellMgmt_ExternalReactComponent_Data : SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data
}

interface SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State {

    _placeholder
}



/**
 * 
 */
export class SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent extends React.Component< SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props, SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_State > {

    /**
     * 
     */
    constructor(props : SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props) {
        super(props);

        // this.state = {};
    }


    render() {

        if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data ) ) {
            const msg = "SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent: if ( ! ( this.props.cellMgmt_ExternalReactComponent_Data instanceof SingleSearch_ProteinList_ProteinDescription_ExternalReactComponent_Props_Data ) )"
            console.warn( msg );
            throw Error( msg );
        }

        return (
            <div className={ _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } 
                style={ {  whiteSpace : "nowrap", overflow:"hidden", textOverflow: "ellipsis", fontSize: 12 } }
                data-protein-id={ this.props.cellMgmt_ExternalReactComponent_Data.proteinSequenceVersionId.toString() }
            >
                <span style={ { overflowWrap : "break-word" } }>
                    { this.props.cellMgmt_ExternalReactComponent_Data.proteinDescription }
                </span>
            </div>
        );
    }
}

