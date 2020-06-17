import React from 'react';
import Character from './Character'

class Collection extends React.Component  {


    constructor (props) {
        super(props);
        this.parent = this.props.parent;
    }

    render() {
        console.log(this.props.data)
        return (
            <div class={'collection-div'}>
                <h1>My Collection</h1>
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

export default Collection