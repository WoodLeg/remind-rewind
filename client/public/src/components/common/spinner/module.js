import React from 'react';

export default class SpinnerComponent extends React.Component {

    constructor(){
        super();
    }


    render() {
        return (
            <div className="loader">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }



}
