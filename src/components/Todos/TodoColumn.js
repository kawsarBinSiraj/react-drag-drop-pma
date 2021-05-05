import React from "react";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";
const _ = require('lodash');


const Column = ({ onEdit, onDelete, openModal, col: { list, id } }) => {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div className="todo-task-progress">
                    <div className="task-progress-header d-flex align-items-center justify-content-between">
                        <h3 className="title">
                            {id === 'todo' ? 'To-do' : id === 'doing' ? 'In Progress' : id === 'done' ? 'Done' : null}
                            &nbsp; ({!_.isEmpty(list) ? list.length : '0'})
                        </h3>
                        {
                            id === 'todo' ?
                                <button onClick={openModal} className="btn btn-new-task" type="button">
                                    + New Task
                                </button> : null
                        }
                    </div>
                    <div className="task-lists" {...provided.droppableProps} ref={provided.innerRef}>
                        {
                            !_.isEmpty(list) &&
                                list.map((text, index) => (
                                    <TodoItem onEdit={onEdit}  onDelete={onDelete} key={index} text={text} index={index} />
                                ))
                        }
                        {provided.placeholder}
                    </div>
                </div>
            )}
        </Droppable>
    );
};

export default Column;
