/**
 * proteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager.ts
 *
 * PSM Count Chart - Tooltip Manager for Tooltip on Overall Chart
 *
 *
 */


import {
    tooltip_Limelight_Create_Tooltip,
    tooltip_Limelight_Create_Tooltip_PassElementPositions,
    Tooltip_Limelight_Created_Tooltip
} from 'page_js/common_all_pages/tooltip_LimelightLocal_ReactBased';
import React from "react";

/**
 * Class to manage tooltip for ...
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Chart_OverallChart_TooltipManager {

    private _tooltip_CurrentTooltip : Tooltip_Limelight_Created_Tooltip

    private _tooltip_TimeoutId;

    /**
     * Called when onMouseEnter of Overall Chart Containing <div>
     */
    mouseEnter_ChartOverallArea({

                                    mouseEnter_target_DOM_Element,
                                    tooltipContents
                                } : {
        mouseEnter_target_DOM_Element : HTMLElement
        tooltipContents : JSX.Element
    }) {

        // console.log("mouseEnter_ChartBar(...): entered")

        // if ( ! ( mouseEnter_target_DOM_Element instanceof rect ) ) {
        //     const msg = "mouseEnter_ChartBar(...): ( ! ( mouseEnter_target_DOM_Element instanceof rect ) )"
        //     console.warn( msg );
        //     throw Error( msg )
        // }

        const targetDOMElement_domRect = mouseEnter_target_DOM_Element.getBoundingClientRect();

        /// targetDOMElement_domRect properties: left, top, right, bottom, x, y, width, and height

        const elementLeft = targetDOMElement_domRect.left;
        const elementRight = targetDOMElement_domRect.right;
        const elementTop = targetDOMElement_domRect.top;
        const elementBottom = targetDOMElement_domRect.bottom;

        // this._tooltip_TimeoutId = window.setTimeout( ( ) => {

        // console.log("mouseEnter_SequencePosition(...): window.setTimeout entered")

        if ( this._tooltip_CurrentTooltip ) {

            // console.log("mouseEnter_SequencePosition(...): window.setTimeout this._tooltip_CurrentTooltip populated")

            //  Already have tooltip so remove it

            this._tooltip_CurrentTooltip.removeTooltip();

            this._tooltip_CurrentTooltip = undefined;
        }

        const tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip_PassElementPositions({
            preferRenderAbove : true, elementLeft, elementRight, elementTop, elementBottom, tooltipContents
        });

        this._tooltip_CurrentTooltip = tooltip_Limelight_Created_Tooltip;

        // }, 30 );

    }

    /**
     * Called when onMouseLeave of Sequence Position
     */
    mouseLeave_ChartOverallArea({

                                    event
                                } : {
        event: React.MouseEvent<HTMLElement, MouseEvent>
    }) {

        // console.log("mouseLeave_ChartBar(...) entered");

        if ( ( ! this._tooltip_CurrentTooltip ) && ( ! this._tooltip_TimeoutId ) ) {

            // console.log("mouseLeave_ChartBar(...) true: if ( ! this._tooltip_CurrentTooltip ) && ( ! this._tooltip_TimeoutId )");

            //  No <div> to hold tooltip exists so exit

            return; // EARLY EXIT
        }

        if ( this._tooltip_TimeoutId ) {

            // console.log("mouseLeave_ChartBar(...) this._tooltip_TimeoutId populated");

            window.clearTimeout( this._tooltip_TimeoutId );
        }

        if ( this._tooltip_CurrentTooltip ) {

            // console.log("mouseLeave_ChartBar(...) this._tooltip_CurrentTooltip populated");

            this._tooltip_CurrentTooltip.removeTooltip();
        }

        this._tooltip_TimeoutId = undefined;
        this._tooltip_CurrentTooltip = undefined;

    }

}
