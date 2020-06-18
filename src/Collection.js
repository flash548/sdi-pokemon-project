import React from 'react';
import Character from './Character'

class Collection extends React.Component  {


    constructor (props) {
        super(props);
        this.parent = this.props.parent;
    }

    render() {
        return (
            <div class={'collection-div'}>
                <h1>My Collection</h1>
                    <div> 
                        { this.parent.state.collection.map((char) => {return (
                            <div class={'inline-div'}><Character parent={this.parent} data={char} remove={true} /></div>
                        )
                        })}
                    </div>
            </div>

        )


    }

}

export default Collection