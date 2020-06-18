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

    // cache all possible pokemon names on mount,
    // so we can search faster... that's debatable..
    async componentDidMount() {
        console.log("SDFSDFSDF")
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=-1&offset=0')
        const json = await response.json()   
        let names = []
        json.results.forEach((item) => {
            names.push(item.name);
        })
        // store all possible names
        this.setState({'names': names})
        
    }

    // responds to pagination changes to render a page of characters
    async query(offset) {
        let characters = []
        for (var i=offset+1; i <= offset+this.state.increment; i++) {
            try {
                const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
                const item = await resp.json() 
                
                //console.log(i + ' ' + item)
                characters.push(item)
            }
            catch (e) { // silent fail
            }
        }
        this.setState({'characters': characters})
    }    

    // qierues / fetches a single character by ID
    async queryID(id) {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        const item = await resp.json() 
        this.setState({'currentChar': item})
    }

    // queries fetches/ based on character's name
    async queryName(name) {
        const resp = await fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        const item = await resp.json() 
        this.setState({'currentChar': item})
    }

    render() {

        if (this.props.cmd === 'detail') {
            // detail view...
            this.queryID(this.props.id)
            return (
                <DetailedChar parent={this.parent} data={this.state.currentChar}/>
            )        
        }       
        else if (this.props.cmd === 'search') {
            /// search result view...
            if (this.state.names.includes(this.props.id)) {
                this.queryName(this.props.id)
                return (
                    <DetailedChar data={this.state.currentChar}/>
                )  
            }
            else {
                return (
                    <div class={'results-div'}><h1>{"Character Not Found!"}</h1></div>
                )
            }
        }
        else {
            // pagination view
            this.query(this.props.offset);  
            var resp = this.state.characters 
            return (
                <div class={'results-div'}> 
                    <div class={'page-tool'}>
                        <input type='button' onClick={this.parent.decrOffset} value={"<< Prev"}/>&nbsp;||&nbsp;<input type='button' onClick={this.parent.incrOffset} value={"Next >> "}/>
                        <br/>
                        {this.parent.state.offset + " to " + (this.parent.state.offset+this.parent.state.increment)}
                    </div>

                    { resp.map((char) => { return (                            
                                <div class={'inline-div'}><Character parent={this.parent} data={char} remove={false}/></div>                            
                            )
                        })
                    }
                </div>
            )
        }
        
    }

}

export default PokemonFetch


