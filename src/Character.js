import React from 'react';

class Character extends React.Component {

    constructor(props) {
        super(props)
        this.parent = this.props.parent;
    }

    addCharToCollection = (event) => {
        event.target.disabled = true
        this.parent.addToCollection(this.props.data)
        event.preventDefault()
    }


    render() {
        return (
            <div>
                <img src={this.props.data.sprites.front_shiny} /><br/>
                {"Name: "}{this.props.data.species.name}<br/>
                {"Height: "}{this.props.data.height}<br/>
                {"Weight: "}{this.props.data.weight}<br/>
                {"Base XP: "}{this.props.data.base_experience}<br/>                
                <input type='button' onClick={this.parent.setCurrentChar} id={this.props.data.id} value={"View Detail"}/><br/>
                <input type='button' onClick={this.addCharToCollection} value={"Add To Collection"}/>
            </div>
        )
    }

}

export default Character