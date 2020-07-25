/**
 * setDefaultView_Component_React.tsx
 *
 * Set Default View Button as React Component
 *
 *
 *
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { SetDefaultView_dataPages } from 'page_js/data_pages/data_pages_common/setDefaultView_dataPages';

/**
 *
 */
export class SetDefaultView_Component_Props_Prop {

    projectSearchId? : number;
    experimentId? : number

    constructor({ projectSearchId, experimentId } : {

        projectSearchId? : number
        experimentId? : number
    }) {
        this.projectSearchId = projectSearchId
        this.experimentId = experimentId
    }
}

/**
 *
 */
export class SetDefaultView_Component_Props {

    propsValue : SetDefaultView_Component_Props_Prop
}

/**
 *
 */
class SetDefaultView_Component_State {

    _placeholder  // Used so don't put anything in the state
}


/**
 *
 */
export class SetDefaultView_Component extends React.Component< SetDefaultView_Component_Props, SetDefaultView_Component_State > {

    //  bind to 'this' for passing as parameters

    private _setDefaultViewButton_ClickHandler_BindThis = this._setDefaultViewButton_ClickHandler.bind(this);

    /**
     *
     */
    constructor(props : SetDefaultView_Component_Props) {
        super(props);

        if ( ! ( props.propsValue instanceof SetDefaultView_Component_Props_Prop ) ) {
            const msg = "SetDefaultView_Component: props.propsValue NOT instanceof SetDefaultView_Component_Props_Prop";
            console.warn( msg );
            throw Error( msg );
        }
    }

    /**
     *
     */
    _setDefaultViewButton_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        event.preventDefault();

        const setDefaultView_dataPages = new SetDefaultView_dataPages();
        setDefaultView_dataPages.initializeFrom_SetDefaultView_Component_React({
            experimentId : this.props.propsValue.experimentId,
            projectSearchId : this.props.propsValue.projectSearchId
        });

        setDefaultView_dataPages.setDefaultView_MainPage_ButtonClicked_SetDefaultView_Component_React();
    }

    /**
     *
     */
    render() {

        return (
            <div className=" set-default-view-container ">
                <input type="button" value="Set Default"
                       onClick={ this._setDefaultViewButton_ClickHandler_BindThis }
                />
            </div>
        );

    }

}



