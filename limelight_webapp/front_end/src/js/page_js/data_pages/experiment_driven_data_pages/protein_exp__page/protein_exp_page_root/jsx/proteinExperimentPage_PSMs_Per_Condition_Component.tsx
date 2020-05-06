/**
 * proteinExperimentPage_PSMs_Per_Condition_Component.tsx
 * 
 * React Component to show a graphic of PSM counts for conditions
 * 
 * 
 * !!!!!!!!   Initially for just first 3 conditions to simplify coding
 * 
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'
import { VictoryChart, VictoryContainer, VictoryTooltip, VictoryAxis, VictoryLabel, VictoryBar } from 'victory';

const _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component = 400;
const _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component = 120;

export { _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component, _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component }


/**
 * 
 */
export interface ProteinExperimentPage_PSMs_Per_Condition_Component_Props {

    cellMgmt_ExternalReactComponent_Data
}


/**
 * 
 */
interface ProteinExperimentPage_PSMs_Per_Condition_Component_State {

    displayChart
}

/**
 * 
 */
export class ProteinExperimentPage_PSMs_Per_Condition_Component extends React.Component< ProteinExperimentPage_PSMs_Per_Condition_Component_Props, ProteinExperimentPage_PSMs_Per_Condition_Component_State > {

    private _displayTimeout;

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_PSMs_Per_Condition_Component_Props ) {
        super(props);

        //  bind to 'this' for passing as parameters

        this.state = { displayChart : undefined };
    }


    /**
     * After render()
     */
    componentWillUnmount() {

        if ( this._displayTimeout ) {
            window.clearTimeout( this._displayTimeout );
        }
    }

    /**
     * @returns true if should update, false otherwise
     */
    shouldComponentUpdate(nextProps : ProteinExperimentPage_PSMs_Per_Condition_Component_Props, nextState : ProteinExperimentPage_PSMs_Per_Condition_Component_State) : boolean {

        // console.log("DataTable_Table_DataRowEntry_External_Cell_Mgmt_React: shouldComponentUpdate")

        //  Only update if changed: 
        //      props: cellMgmt_ExternalReactComponent_Data 
        //      state: displayChart

        if ( this.props.cellMgmt_ExternalReactComponent_Data !== nextProps.cellMgmt_ExternalReactComponent_Data ) {
            return true;
        }
        if ( this.state.displayChart !== nextState.displayChart ) {
            return true;
        }
        return false;

        //  If Comment out prev code, uncomment this:

        // return true;
    }

    /**
     * After render()
     */
    componentDidMount() {

        // console.log("ProteinExperimentPage_PSMs_Per_Condition_Component: componentDidMount");

        this._displayTimeout = window.setTimeout( () => {
            this._displayTimeout = null;
            

            this.setState( (state: ProteinExperimentPage_PSMs_Per_Condition_Component_State, props: ProteinExperimentPage_PSMs_Per_Condition_Component_Props ) : ProteinExperimentPage_PSMs_Per_Condition_Component_State => {

                return { displayChart : true };
            });
        }, 0 );
    }

    /**
     * 
     */    
    render() {

        // this.props:
        // cellMgmt_ExternalReactComponent_Data={ this.props.cellMgmt_ExternalReactComponent_Data }
        // columnWidth={ column.width }
        // columnHeightInitial={ column.heightInitial }

        // console.log("ProteinExperimentPage_PSMs_Per_Condition_Component")

        if ( ! this.state.displayChart ) {
            //  Delay displaying chart
            //  EARLY RETURN
            return (
                <div>Loading</div>
            );
        }


        const psmCountsPerCondition = this.props.cellMgmt_ExternalReactComponent_Data.psmCountsPerCondition;

        const chartData = [];

        for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
            const chartEntry = {
                x: psmCountsPerConditionEntry.condition.label,
                y: psmCountsPerConditionEntry.numPsms,
                label: "condition label: " + psmCountsPerConditionEntry.condition.label + "\n" + "numPsms: " + psmCountsPerConditionEntry.numPsms
            };
            chartData.push(chartEntry)
        }

        return  (

            <VictoryChart
                // domainPadding will add space to each side of VictoryBar to
                // prevent it from overlapping the axis
                domainPadding={ { x: 100, y: 0 } }
                containerComponent={<VictoryContainer responsive={false}/>}
                padding={ { top: 10, bottom: 40, left: 80, right: 10 } }
                width={ _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component }
                height={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component }
            >
                <VictoryAxis
                    // tickValues specifies both the number of ticks and where
                    // they are placed on the axis
                    // axisComponent={
                    //     <VictoryLabel y={250} style={{ fontSize: 8 }}
                    //     verticalAnchor={"end"} />
                    // }
                    fixLabelOverlap={true}
                    style={{
                        // axisLabel: {
                        //     fontFamily: "inherit",
                        //     // fontWeight: 100,
                        //     // letterSpacing: "1px",
                        //     // stroke: "white",
                        //     fontSize: 10
                        // },
                        tickLabels: { angle: -60, fontSize: 8 }
                    }}
                    // tickValues={[1, 2, 3, 4]}
                    // tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                />
                <VictoryAxis
                    dependentAxis
                    crossAxis={false} //  Show Zero tick mark
                    fixLabelOverlap={true}
                    style={{
                        // axisLabel: {
                        //     fontFamily: "inherit",
                        //     // fontWeight: 100,
                        //     // letterSpacing: "1px",
                        //     // stroke: "white",
                        //     fontSize: 10
                        // },
                        tickLabels: {

                            fontSize: 9
                        }
                    }}
                    // tickFormat specifies how ticks should be displayed
                    // tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryBar
                    data={ chartData }
                    containerComponent={<VictoryContainer responsive={false}/>}
                    labelComponent={<VictoryTooltip/>}
                    width={ _SVG_WIDTH_ProteinExperimentPage_PSMs_Per_Condition_Component }
                    height={ _SVG_HEIGHT_ProteinExperimentPage_PSMs_Per_Condition_Component }
                />
            </VictoryChart>
        )


        // const psmCountsPerCondition = this.props.cellMgmt_ExternalReactComponent_Data.psmCountsPerCondition;
        //
        //
        // let maxPsmCount = 0;
        //
        // for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
        //     if ( psmCountsPerConditionEntry.numPsms > maxPsmCount ) {
        //         maxPsmCount = psmCountsPerConditionEntry.numPsms;
        //     }
        // }
        //
        // const maxPsmCountString = maxPsmCount.toLocaleString();
        //
        // // const psmCountsPerConditionEntry = {
        // //     condition,
        // //     projectSearchIds,
        // //     numPsms
        // // }
        //
        // const conditions_singleBarRects = [];
        //
        // const conditions_labels = [];
        //
        // {
        //     let index = 0;
        //     for ( const psmCountsPerConditionEntry of psmCountsPerCondition ) {
        //
        //         if ( index > 2 ) {
        //             break;  // EARLY BREAK LOOP
        //         }
        //
        //         let x = 66;
        //         if ( index === 1 ) {
        //             x = 168;
        //         }
        //         if ( index === 2 ) {
        //             x = 271;
        //         }
        //
        //         const heightFraction = psmCountsPerConditionEntry.numPsms / maxPsmCount;
        //
        //         const singleBarRect = (
        //
        //             <SingleBarRect
        //                 x={ x }
        //                 heightFraction={ heightFraction }
        //             />
        //         );
        //
        //         conditions_singleBarRects.push( singleBarRect );
        //
        //         conditions_labels.push( psmCountsPerConditionEntry.condition.label );
        //
        //         index++;
        //     }
        // }

//         return (
// <svg width={ _SVG_WIDTH } height={ _SVG_HEIGHT } aria-label="A chart." style={ { overflow: "hidden" } }>
// 	<rect x="0" y="0" width="400" height="100" stroke="none" strokeWidth="0" fill="#ffffff"></rect>
// 	<rect x="46" y="19" width="308" height="62" stroke="none" strokeWidth="0" fillOpacity="0" fill="#ffffff"></rect>
// 	<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>
//     <rect x="46" y="19" width="308" height="1" stroke="none" strokeWidth="0" fill="#cccccc"></rect>
//
//         { conditions_singleBarRects[ 0 ] }
//         { conditions_singleBarRects[ 1 ] }
//         { conditions_singleBarRects[ 2 ] }
//
// 	<rect x="46" y="80" width="308" height="1" stroke="none" strokeWidth="0" fill="#333333"></rect>
//
// 	<text textAnchor="middle" x="97.66666666666666" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 0 ]}</text>
// 	<text textAnchor="middle" x="200" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 1 ] }</text>
// 	<text textAnchor="middle" x="302.3333333333333" y="94.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#222222">{ conditions_labels[ 2 ] }</text>
// 	<text textAnchor="end" x="38" y="84.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">0</text>
// 	<text textAnchor="end" x="38" y="23.7" fontFamily="Arial" fontSize="12" stroke="none" strokeWidth="0" fill="#444444">{ maxPsmCountString }</text>
//
// </svg>
//
//         );
    }

}



const _VALUE_RECT_COLOR_DEFAULT = "#3366cc";
const _VALUE_RECT_COLOR_HOVER = "#ff0000";

interface SingleBarRect_Props {
    
    x
    heightFraction
}

interface SingleBarRect_State {
    
    color
}

/**
 * 
 */
class SingleBarRect extends React.Component< SingleBarRect_Props, SingleBarRect_State > {

    //  bind to 'this' for passing as parameters
    private _onMouseEnter_BindThis = this._onMouseEnter.bind(this);
    private _onMouseLeave_BindThis = this._onMouseLeave.bind(this);

    /**
     * 
     */    
    constructor(props : SingleBarRect_Props) {
        super(props);

        //  bind to 'this' for passing as parameters
        // this._onMouseEnter_BindThis = this._onMouseEnter.bind(this);
        // this._onMouseLeave_BindThis = this._onMouseLeave.bind(this);

        this.state = {
            color: _VALUE_RECT_COLOR_DEFAULT
        }
    }


    /**
     * After render()
     */
    // componentDidMount() {

    //     console.log("SingleBarRect: componentDidMount");


    // }

    /**
     * 
     */   
    _onMouseEnter( event ) {

        console.log("_onMouseEnter");

        this.setState( (state, props) => {
            return {
                color: _VALUE_RECT_COLOR_HOVER
            };
        });
    }   
    /**
     * 
     */   
    _onMouseLeave( event ) {

        console.log("_onMouseLeave");

        this.setState( (state, props) => {
            return {
                color: _VALUE_RECT_COLOR_DEFAULT
            };
        });
    } 

    /**
     * 
     */    
    render() {

        const _FULL_HEIGHT_Y = 20; //  Y position of full height rect

        const _MAX_HEIGHT = 60;   //  Max height of rect

        const height = Math.floor( _MAX_HEIGHT * this.props.heightFraction );

        const y = _FULL_HEIGHT_Y + ( _MAX_HEIGHT - height );

        return (
            <rect x={ this.props.x } y={ y } width="63" height={ height } stroke="none" strokeWidth="0" fill={ this.state.color }
                onMouseEnter={ this._onMouseEnter_BindThis } onMouseLeave={ this._onMouseLeave_BindThis }
            >
            </rect>
        );
    }

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

//   Not in a class:

