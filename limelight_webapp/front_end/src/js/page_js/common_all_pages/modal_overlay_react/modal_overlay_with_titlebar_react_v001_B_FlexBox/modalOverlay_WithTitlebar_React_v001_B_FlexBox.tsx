/**
 * modal_overlay_with_titlebar_react_v001_B_FlexBox.tsx
 *
 * Version v001_B_FlexBox
 * 
 * Modal Overlay with Title Bar on Top - Built using React
 * 
 * Has React component in this file
 */


import React from 'react'

/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component_v001_B_FlexBox_Props {

    set_CSS_Position_Fixed? : boolean
    heightMaximum : number
    heightMinimum : number
    widthMaximum : number
    widthMinimum : number
    title : string
    close_OnBackgroundClick : boolean
    callbackOnClicked_Close : () => void;

    constructor( { heightMaximum, heightMinimum, widthMaximum, title, hideOnBackgroundClick, callbackOnClicked_Close } : {
        heightMaximum : number
        heightMinimum : number
        widthMaximum : number
        title : string
        hideOnBackgroundClick : boolean
        callbackOnClicked_Close : () => void;
    }) {
        this.heightMaximum = heightMaximum
        this.heightMinimum = heightMinimum
        this.widthMaximum = widthMaximum
        this.title = title
        this.close_OnBackgroundClick = hideOnBackgroundClick
        this.callbackOnClicked_Close = callbackOnClicked_Close
    }
}

interface ModalOverlay_Limelight_Component_v001_B_FlexBox_State {

    _placeholder
    // modalOverlay_Left? : number;
    // modalOverlay_Top_PositionAbsolute? : number;  // modalOverlay_Top when use position absolute
}


/**
 * ModalOverlay - Local to Limelight (Not use a Library) - React Based
 *
 */
export class ModalOverlay_Limelight_Component_v001_B_FlexBox extends React.Component< ModalOverlay_Limelight_Component_v001_B_FlexBox_Props, ModalOverlay_Limelight_Component_v001_B_FlexBox_State > {

    /**
     *
     *
     */
    constructor(props : ModalOverlay_Limelight_Component_v001_B_FlexBox_Props) {
        super(props);

    }

    /**
     *
     */
    render () {

        const background_ClassName_Main = "modal-overlay-page-background "

        let background_ClassName_Addition = "";

        if ( this.props.close_OnBackgroundClick ) {
            background_ClassName_Addition = " modal-overlay-page-background-clickable "
        }

        const background_ClassName = background_ClassName_Main + background_ClassName_Addition;

        //  Width and Height:
        //          Starting size Computation: Smaller of  (80% of viewport) OR (100% viewport - 100 px)  --  100px to provide 50 px margin on each side
        //          Restricted by provided __Minimum and __Maximum values

        //  Left and Top compute to center in the viewport

        //  When viewport too small to fit __Minimum values, the __Minimum are used and the browser main scrollbars provide access all parts of the overlay.

        const width = "min( max( min( 80vw, calc( 100vw - 100px ) ), " + this.props.widthMinimum + "px), " + this.props.widthMaximum + "px )";

        const left = "max( calc( calc( calc( 100vw - 6px ) / 2) - calc( min( max( min( 80vw, calc( 100vw - 100px ) ), " + this.props.widthMinimum + "px), " + this.props.widthMaximum + "px ) / 2 ) ), 10px)";

        const height = "min( max( min( 80vh, calc( 100vh - 100px ) ), " + this.props.heightMinimum + "px), " + this.props.heightMaximum + "px )";

        const top = "max( calc( calc( calc( 100vh - 6px ) / 2) - calc( min( max( min( 80vh, calc( 100vh - 100px ) ), " + this.props.heightMinimum + "px), " + this.props.heightMaximum + "px ) / 2 ) ), 10px)";

        const modal_overlay_container_css : React.CSSProperties = {
            width: width,
            height: height,
            left: left,
            top: top
        }

        if ( this.props.set_CSS_Position_Fixed ) {
            modal_overlay_container_css.position = "fixed";
        }

        return (
            <div >
                <div className={ background_ClassName } >
                </div>

                <div className="modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container"
                     style={ modal_overlay_container_css }>

                    <div className="top-level fixed-heightMaximum modal-overlay-header" style={ { width: "100%" } }>
                        <h1 className="modal-overlay-X-icon" onClick={ this.props.callbackOnClicked_Close } >X</h1>
                        <h1 className="modal-overlay-header-text">{ this.props.title }</h1>
                    </div>

                    { this.props.children }

                </div>

            </div>
        );
    }
}
