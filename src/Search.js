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
                <input type='button' onClick={this.parent.showAll} value='Show All'/>
                <input type='checkbox' onClick={this.parent.toggleCollection}/>{"Show Collection?"}   
                <br/>                
                </form>
            </div> 
        );
    }

}


export default Search;