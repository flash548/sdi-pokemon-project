import React from 'react';
import PokemonFetcher from './PokemonFetcher'

class DetailedChar extends React.Component {

    constructor(props) {
        super(props)
        this.viewOthers = this.viewOthers.bind(this)
        this.parent = this.props.parent;
        this.state = { showOthers: false, 'characters': [] }
    }

    viewOthers(event) {
        this.setState({'type': this.props.data.types[0].slot })
        this.queryType(this.props.data.types[0].slot);
        event.preventDefault()
    }

    async queryType(type) {

        const response = await fetch('https://pokeapi.co/api/v2/type/' + type)
        const json = await response.json() 
        let others = []
        json.pokemon.forEach((pokemon) => {

            others.push(pokemon.pokemon.url);
        })

        let characters = []
        others.forEach(async (url) => {
            let response = await fetch(url)
            let json = await response.json()   
            characters.push(json);
        })
        this.setState({'characters': characters, 'showOthers': true})
    }

    render() {
        if (!this.state.showOthers) {
            if (this.props.data) {
                return (
                    <div>
                        <img src={this.props.data.sprites.front_shiny} /><br/>
                        {"Name: "}{this.props.data.species.name}<br/>
                        {"Height: "}{this.props.data.height}<br/>
                        {"Weight: "}{this.props.data.weight}<br/>
                        {"Base XP: "}{this.props.data.base_experience}<br/>
                        {"Type: "}{this.props.data.types[0].slot + " (" + this.props.data.types[0].type.name + ") "}<br/>
                        <input type={'button'} onClick={this.viewOthers} value='View Similar Types'/>
                    </div>
                )
            }
            else {
                return (
                    <div></div>
                )
            }
        }
        else {
            
            if (this.props.data) {
                return (
                    <div>
                        <div>
                            <img src={this.props.data.sprites.front_shiny} /><br/>
                            {"Name: "}{this.props.data.species.name}<br/>
                            {"Height: "}{this.props.data.height}<br/>
                            {"Weight: "}{this.props.data.weight}<br/>
                            {"Base XP: "}{this.props.data.base_experience}<br/>
                            {"Type: "}{this.props.data.types[0].slot + " (" + this.props.data.types[0].type.name + ") "}<br/>
                            <input type={'button'} onClick={this.viewOthers} disabled value='View Similar Types'/>
                        </div>
                        <div>
                            {this.state.characters.map((c) =>  <div>{c.species.name}</div> )}
                        </div>
                    </div>

                )
            }
            else {
                return (
                    <div>{"ERROR"}</div>
                )
            }


        }
    }

}

export default DetailedChar