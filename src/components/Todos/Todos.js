import React, { useState, useEffect } from 'react'
import TodoColumn from './TodoColumn'
import './Todos.scss'
import { DragDropContext } from 'react-beautiful-dnd'
import CreateTodoModal from './CreateTodoModal'
import { useSelector, useDispatch } from 'react-redux';
const _ = require('lodash');

const Todos = () => {

    /** Making perform local State*/
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editTodoData, setEditTodoData] = useState(null);
    const dispatch = useDispatch();
    const getTodos = useSelector(state => {
        if (_.isEmpty(state.todos)) {
            return null
        }
        return  state.todos
    });

    const [columns, setColumns] = useState({
        todo: {
            id: 'todo',
            list: []
        },
        doing: {
            id: 'doing',
            list: []
        },
        done: {
            id: 'done',
            list: []
        }
    });


     /**
     * Making perform setColumns func
     *
     * @action - setColumns to columns
     */
    useEffect(() => {
        setColumns(state => ({
            ...state,
            todo: {
                id: 'todo',
                list: getTodos
            }
        }));
    }, [getTodos])


    /** Making perform to openModal - func */
    const openModal = () => {
        setIsOpen(true);
    }

    /** Making perform to closeModal - func */
    const closeModal = () => {
        setIsOpen(false);
        setEditTodoData(null)
    }


    /**
     * Making perform deleteTodo func
     *
     * @param - {number} id
     * @action - dispatch to redux store
     */
    const deleteTodo = (id) => {
        dispatch({
            type: 'DELETE_TODO',
            payload: id
        });
    }


    /**
     * Making perform editTodo func
     *
     * @param - {obj} todo
     * @action - dispatch to redux store
     */
    const editTodo = (todo) => {
        setEditTodoData(todo);
        openModal();
    }


    const onDragEnd = ({ source, destination }) => {
        // Make sure we have a valid destination
        if (destination === undefined || destination === null) return null

        // Make sure we're actually moving the item
        if (
            source.droppableId === destination.droppableId &&
            destination.index === source.index
        )
            return null

        // Set start and end variables
        const start = columns[source.droppableId]
        const end = columns[destination.droppableId]

        // If start is the same as end, we're in the same column
        if (start === end) {
            // Move the item within the list
            // Start by making a new list without the dragged item
            const newList = start.list.filter(
                (_, idx) => idx !== source.index
            )

            // Then insert the item at the right location
            newList.splice(destination.index, 0, start.list[source.index])

            // Then create a new copy of the column object
            const newCol = {
                id: start.id,
                list: newList
            }

            // Update the state
            setColumns(state => ({ ...state, [newCol.id]: newCol }))
            return null
        } else {
            // If start is different from end, we need to update multiple columns
            // Filter the start list like before
            const newStartList = start.list.filter(
                (_, idx) => idx !== source.index
            )

            // Create a new start column
            const newStartCol = {
                id: start.id,
                list: newStartList
            }

            // Make a new end list array
            const newEndList = end.list

            // Insert the item into the end list
            newEndList.splice(destination.index, 0, start.list[source.index])

            // Create a new end column
            const newEndCol = {
                id: end.id,
                list: newEndList
            }

            // Update the state
            setColumns(state => ({
                ...state,
                [newStartCol.id]: newStartCol,
                [newEndCol.id]: newEndCol
            }))
            return null
        }
    }

    return (
        <>
            <div className="todo">
                {modalIsOpen ? <CreateTodoModal open={modalIsOpen} close={closeModal} editTodoData={editTodoData} /> : null}
                <DragDropContext onDragEnd={onDragEnd}>
                    {Object.values(columns).map(col => (
                        <TodoColumn onEdit={editTodo} onDelete={deleteTodo} openModal={openModal} col={col} key={col.id} />
                    ))}
                </DragDropContext>
            </div>
        </>
    )
}

export default Todos
