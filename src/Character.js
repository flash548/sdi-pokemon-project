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

    removeCharFromCollection = (event) => {
        event.target.disabled = true
        this.parent.removeFromCollection(this.props.data)
        event.preventDefault()
    }

    render() {
        if (!this.props.remove) {
            if (!this.parent.charIsInCollection(this.props.data.id)) {
                return (    
                    <div>
                        <img src={this.props.data.sprites.front_default} /><br/>
                        {"Name: "}{this.props.data.species.name}<br/>
                        {"Height: "}{this.props.data.height}<br/>
                        {"Weight: "}{this.props.data.weight}<br/>
                        {"Base XP: "}{this.props.data.base_experience}<br/>                
                        <input type='button' onClick={this.parent.setCurrentChar} id={this.props.data.id} value={"View Detail"}/><br/>
                        <input type='button' onClick={this.addCharToCollection} value={"Add To Collection"}/>                     
                    </div>                
                )
            }
            else {
                return (    
                    <div>
                        <img src={this.props.data.sprites.front_default} /><br/>
                        {"Name: "}{this.props.data.species.name}<br/>
                        {"Height: "}{this.props.data.height}<br/>
                        {"Weight: "}{this.props.data.weight}<br/>
                        {"Base XP: "}{this.props.data.base_experience}<br/>                
                        <input type='button' onClick={this.parent.setCurrentChar} id={this.props.data.id} value={"View Detail"}/><br/>
                        <input type='button' onClick={this.addCharToCollection} disabled value={"Add To Collection"}/>                     
                    </div>                
                )
            }
        } else {
            return (
                <div>
                    <img src={this.props.data.sprites.front_default} /><br/>
                    {"Name: "}{this.props.data.species.name}<br/>
                    {"Height: "}{this.props.data.height}<br/>
                    {"Weight: "}{this.props.data.weight}<br/>
                    {"Base XP: "}{this.props.data.base_experience}<br/>                
                    <input type='button' onClick={this.parent.setCurrentChar} id={this.props.data.id} value={"View Detail"}/><br/>
                    <label>Battle: 
                    <input name="btlBox" type="checkbox" onChange={this.handleInputChange} />
                    </label>
                    <input type='button' onClick={this.removeCharFromCollection} value={"Remove From Collection"}/>
                </div>                
            )     
        } 
    }    
}           


export default Character