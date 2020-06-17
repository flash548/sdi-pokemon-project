import React from 'react';

class Search extends React.Component  {

    constructor(props) {
        super(props)
        this.parent = this.props.data;

    }

    render() {
        return ( 
            <div>
                <form>
                <input type='search' id={"searchBox"}/>
                <input type='button' onClick={this.parent.searchChar} value='Search'/>
                <input type='button' onClick={this.parent.showAll} value='Show All'/><br/>
                <input type='button' onClick={this.parent.decrOffset} value={"<< Prev"}/>&nbsp;||&nbsp;<input type='button' onClick={this.parent.incrOffset} value={"Next >> "}/>
                <br/>
                {this.parent.state.offset + " to " + (this.parent.state.offset+this.parent.state.increment)}
                </form>
            </div> 
        );
    }

}


export default Search;