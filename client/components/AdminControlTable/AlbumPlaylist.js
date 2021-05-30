import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragIndicator, RemoveCircle as Remove } from "@material-ui/icons";

const getItemStyle = (isDragging, draggableStyle) => ({
  ...draggableStyle
  //...
});

const getListStyle = isDraggingOver => ({
  //...
});

export class AlbumPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items.map(props.map).map(
        (item, i) => ({
          original: props.items[i],
          ...item,
        })
      ),
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  // a little function to help us with reordering the result
  static reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    
    return result;
  };
  
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    
    const items = AlbumPlaylist.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    
    const { onReorder = (items) => {} } = this.props;
    onReorder(items.map(item => item.original.id));
    
    this.setState({
      items
    });
  }
  
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="admin-albums-playlist"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {!this.state.items.length && (
                <div style={{width: 250, padding: '0.5rem', boxSizing: 'border-box'}}><h3 style={{margin: 0}}>No songs yet.</h3><br/>Add songs to this album from the table on the right.</div>
              )}
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className="admin-albums-playlist__item"
                    >
                      <div>
                        <DragIndicator/>
                        {' '}{index + 1}{'. '}{item.content}
                      </div>
                      <div
                        className="admin-albums-playlist__remove-icon"
                        onClick={() => {
                          this.props.onRemoveClick(item.original.id, item.original.album.id);
                        }}
                      >
                        <Remove/>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
