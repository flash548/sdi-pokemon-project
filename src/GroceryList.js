import React from 'react';


class GroceryList extends React.Component  {

    constructor (props) {
        super(props);
        this.parent = this.props.parent;
    }

    render() {
        var items = new Set();
        this.props.data.forEach(item => {
            item.held_items.forEach(i => {
                items.add(i.item.name);
            })
        })
        return (
            <div class={'grocery-div'}>
                <h1>Grocery List</h1>
                    <div> <ul>
                        {[...items.values()].map(item => {
                            return <li>{item}</li>
                        })}
                        </ul>
                    </div>
            </div>

        )


    }

}

export default GroceryList