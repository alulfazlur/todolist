import React, { Component } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { connect } from "react-redux";
import { sort } from "../store/actions";

import TDList from "../components/TDList";
import TDCreate from "../components/TDCreate";
import Navbar from "../components/Navbar";
import axios from "axios";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 0 20px;
`;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  async componentDidMount() {
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=jakarta&appid=3597cbc4e281612141e5200d2210cc0c`;
    let response = await axios.get(URL);
    let data = response.data;
    console.log(data)
    this.setState({ data });
  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    let data = this.state.data
    const { lists, cards, boards } = this.props;
    const listOrder = boards.lists;
    return (
      <React.Fragment>
        <Navbar data={data}/>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <ListsContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {listOrder.map((listID, index) => {
                  const list = lists[listID];
                  if (list) {
                    const listCards = list.cards.map((cardID) => cards[cardID]);

                    return (
                      <TDList
                        listID={list.id}
                        key={list.id}
                        title={list.title}
                        cards={listCards}
                        index={index}
                      />
                    );
                  }
                })}
                {provided.placeholder}
                <TDCreate list />
              </ListsContainer>
            )}
          </Droppable>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  lists: state.lists,
  cards: state.cards,
  boards: state.boards,
});

export default connect(mapStateToProps)(Home);
