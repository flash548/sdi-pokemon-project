import React from 'react';
import Character from './Character'
import DetailedChar from './DetailedChar'

class PokemonFetch extends React.Component {

    constructor(props) {
        super(props)
        this.state = {  'query' : null,
                        'names':  [],
                        'characters': [],
                        'increment': this.props.increment,
                        'currentChar': ''
                     }
        this.parent = this.props.parent;
    }

    async componentDidMount() {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=-1&offset=0')
        const json = await response.json()   
        let names = []
        json.results.forEach((item) => {
            names.push(item.name);
        })
        // store all possible names
        this.setState({'names': names})
        
    }

    async query(offset) {
        let characters = []
        for (var i=offset+1; i <= offset+this.state.increment; i++) {
            const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
            const item = await resp.json() 
            characters.push(item)
        }
        this.setState({'characters': characters})
    }    

    async queryID(id) {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        const item = await resp.json() 
        this.setState({'currentChar': item})
    }

    async queryName(id) {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        const item = await resp.json() 
        this.setState({'currentChar': item})
    }

    render() {
        if (this.props.cmd === 'detail') {
            this.queryID(this.props.id)
            return (
                <DetailedChar parent={this.parent} data={this.state.currentChar}/>
            )        
        }       
        else if (this.props.cmd === 'search') {
            if (this.state.names.includes(this.props.id)) {
                this.queryName(this.props.id)
                return (
                    <DetailedChar data={this.state.currentChar}/>
                )  
            }
            else {
                return (
                    <div><h1>{"Character Not Found!"}</h1></div>
                )
            }
        }
        else {
                this.query(this.props.offset);  // query for a page of content (using offset + 20)
                var resp = this.state.characters 
                return (
                    <div class={'results-div'}> 
                        { resp.map((char) => { return (                            
                                    <div class={'inline-div'}><Character parent={this.parent} data={char} /></div>                            
                                )
                            })
                        }
                    </div>
                )
            }
        
    }

}

export default PokemonFetch


