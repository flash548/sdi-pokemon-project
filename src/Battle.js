import React from 'react';
import Character from './Character'

class Battle extends React.Component  {


    constructor (props) {
        super(props);
        this.parent = this.props.parent;
    }

    render() {
        return (
            <div class={'battle-div'}>
                <h1>Pokemon Throwdown</h1>
                    <div> 
                        { this.props.data.map((char) => { return (                            
                                    <div class={'inline-div'}><Character parent={this.parent} data={char} /></div>                            
                                )
                            })
                        }
                    </div>
            </div>

        )


    }

}

export default Battle